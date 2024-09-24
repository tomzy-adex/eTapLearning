import React, { ReactNode } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-4 w-1/3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="my-4">{children}</div>
        <button onClick={onClose} className="mt-4 p-2 bg-red-500 text-white rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
