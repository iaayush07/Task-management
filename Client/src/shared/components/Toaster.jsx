import React from 'react';

const Toaster = ({ toast }) => {
  if (!toast.show) return null;

  return (
    <div
      className={`fixed top-5 right-5 p-4 rounded ${
        toast.type === 'Success' ? 'bg-green-500' : 'bg-red-500'
      } text-white`}
    >
      {toast.message}
    </div>
  );
};

export default Toaster;


