import React from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCertificate from 'src/hooks/use-certificate';

const Certificate = () => {
  const { traceCode } = useParams();
  const { data, mutate } = useCertificate(traceCode);


  const handleClick = () => {
    mutate();

    if (data?.ErrorMessage) {
      toast.error(data.ErrorMessage);
    } else if (data?.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div className="flex items-center justify-center p-8 bg-gray-100">
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
      <button
        type="button"
        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all duration-300"
        onClick={handleClick}
      >
        گواهی مشارکت
      </button>
    </div>
  );
};

export default Certificate;
