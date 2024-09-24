import React, { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  showCloseBtn?: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  showCloseBtn = false,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    
      <div className="bg-white rounded-lg shadow-lg p-4 w-1/3 relative">
      <p
        onClick={onClose}
        className="mt-1 px-2 py-1 bg-red-500 text-white text-[12px] cursor-pointer rounded absolute top-1 right-2"
      >
        X
      </p>
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="my-4">{children}</div>
        <div className="flex justify-center items-center">
          {showCloseBtn && (
            <button
              onClick={onClose}
              className="mt-4 p-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
