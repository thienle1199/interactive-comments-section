// Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onDelete: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-60"
        onClick={onClose}
      ></div>
      <div className="bg-white px-7 py-6 flex flex-col gap-5 desktop:p-8 w-11/12 desktop:max-w-[400px] mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <h2 className="text-heading-l text-dark-blue">Delete Comment</h2>
        <p className="text-body text-grayish-blue">
          Are you sure you want to delete this comment? This will remove the
          comment and can’t be undone.
        </p>
        <div className="grid grid-cols-2 gap-[14px]">
          <button
            onClick={onClose}
            className="py-3 bg-grayish-blue uppercase text-body-bold text-white w-full rounded-lg"
          >
            No, Cancel
          </button>

          <button
            onClick={onDelete}
            className="py-3 bg-soft-ed uppercase text-body-bold text-white w-full rounded-lg"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
