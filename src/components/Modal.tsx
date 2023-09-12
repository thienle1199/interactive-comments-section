// Modal.tsx
import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onDelete: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-60"
        onClick={onClose}
      ></div>
      <div className="z-50 mx-auto flex w-11/12 flex-col gap-5 overflow-y-auto rounded bg-white px-7 py-6 shadow-lg desktop:max-w-[400px] desktop:p-8">
        <h2 className="text-heading-l text-dark-blue">Delete Comment</h2>
        <p className="text-body text-grayish-blue">
          Are you sure you want to delete this comment? This will remove the
          comment and can’t be undone.
        </p>
        <div className="grid grid-cols-2 gap-[14px]">
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-grayish-blue py-3 text-body-bold uppercase text-white"
          >
            No, Cancel
          </button>

          <button
            onClick={onDelete}
            className="w-full rounded-lg bg-soft-ed py-3 text-body-bold uppercase text-white"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!,
  );
};

export default Modal;
