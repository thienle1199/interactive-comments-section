import { Comment, ReplyComment } from "../types";

export enum CommentActionsTypes {
  ADD_COMMENT = "ADD_COMMENT",
  DELETE_COMMENT = "DELETE_COMMENT",
  REPLY_COMMENT = "REPLY_COMMENT",
  DELETE_REPLY = "DELETE_REPLY",
  EDIT_COMMENT = "EDIT_COMMENT",
  EDIT_REPLY = "EDIT_REPLY",
  UP_VOTE = "UP_VOTE",
  DOWN_VOTE = "DOWN_VOTE",
}

type CommentState = Comment[];

type AddCommentAction = {
  type: CommentActionsTypes.ADD_COMMENT;
  payload: Comment;
};

type DeleteCommentAction = {
  type: CommentActionsTypes.DELETE_COMMENT;
  payload: number | string;
};

type DeleteReplyAction = {
  type: CommentActionsTypes.DELETE_REPLY;
  payload: {
    commentId: number | string;
    replyId: number | string;
  };
};

type ReplyCommentAction = {
  type: CommentActionsTypes.REPLY_COMMENT;
  payload: {
    commentId: string | number;
    replyComment: ReplyComment;
  };
};

type EditCommentAction = {
  type: CommentActionsTypes.EDIT_COMMENT;
  payload: {
    commentId: number | string;
    content: string;
  };
};

type EditReplyAction = {
  type: CommentActionsTypes.EDIT_REPLY;
  payload: {
    commentId: string | number;
    replyId: string | number;
    content: string;
  };
};

type VoteAction = {
  type: CommentActionsTypes.UP_VOTE | CommentActionsTypes.DOWN_VOTE;
  payload: {
    commentId: string | number;
    replyId?: string | number;
  };
};

export type CommentActions =
  | AddCommentAction
  | DeleteCommentAction
  | ReplyCommentAction
  | DeleteReplyAction
  | EditCommentAction
  | EditReplyAction
  | VoteAction;

export const commentReducer = (state: CommentState, action: CommentActions) => {
  switch (action.type) {
    case CommentActionsTypes.ADD_COMMENT:
      return [...state, action.payload];

    case CommentActionsTypes.DELETE_COMMENT: {
      return state.filter((comment) => comment.id !== action.payload);
    }

    case CommentActionsTypes.DELETE_REPLY: {
      return state.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            replies: comment.replies.filter(
              (rep) => rep.id !== action.payload.replyId,
            ),
          };
        }

        return comment;
      });
    }

    case CommentActionsTypes.REPLY_COMMENT: {
      return state.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            replies: [action.payload.replyComment, ...comment.replies],
          };
        }
        return comment;
      });
    }

    case CommentActionsTypes.EDIT_COMMENT: {
      return state.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            content: action.payload.content,
          };
        }

        return comment;
      });
    }

    case CommentActionsTypes.EDIT_REPLY: {
      return state.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            replies: comment.replies.map((rep) => {
              if (rep.id === action.payload.replyId) {
                return {
                  ...rep,
                  content: action.payload.content,
                };
              }
              return rep;
            }),
          };
        }
        return comment;
      });
    }

    case CommentActionsTypes.UP_VOTE: {
      return state.map((comment) => {
        if (comment.id === action.payload.commentId) {
          if (action.payload.replyId) {
            return {
              ...comment,
              replies: comment.replies.map((rep) =>
                rep.id === action.payload.replyId
                  ? {
                      ...rep,
                      score: rep.score + 1,
                    }
                  : rep,
              ),
            };
          }

          return {
            ...comment,
            score: comment.score + 1,
          };
        }

        return comment;
      });
    }

    case CommentActionsTypes.DOWN_VOTE: {
      return state.map((comment) => {
        if (comment.id === action.payload.commentId) {
          if (action.payload.replyId) {
            return {
              ...comment,
              replies: comment.replies.map((rep) =>
                rep.id === action.payload.replyId
                  ? {
                      ...rep,
                      score: rep.score - 1,
                    }
                  : rep,
              ),
            };
          }

          return {
            ...comment,
            score: comment.score - 1,
          };
        }

        return comment;
      });
    }
  }
};
