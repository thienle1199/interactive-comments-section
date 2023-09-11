export interface User {
  username: string;
  image: {
    [k: string]: string;
  };
}

export interface BaseComment {
  content: string;
  createdAt: string;
  id: number | string;
  score: number;
  user: User;
}

export interface ReplyComment extends BaseComment {
  replyingTo: string;
}

export interface Comment extends BaseComment {
  replies: ReplyComment[];
}
export interface DataType {
  comments: Comment[];
  currentUser: User;
}
