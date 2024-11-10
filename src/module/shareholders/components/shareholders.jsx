import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useNavigateStep from 'src/hooks/use-navigate-step';
import UseCartId from 'src/hooks/use-cartId';
import Loader from 'src/components/loader';
import ConfirmationDialog from 'src/components/dialogMsg';
import { useFinishCart } from 'src/hooks/useFinishCart';
import useShareholders from '../hooks/fetchMangers';
import FileSharehold from './fildesharehold';

const Shareholders = () => {
  const { cartId } = UseCartId();
  const singleFile = {
    name: '',
    national_code: '',
    national_id: '',
  };

  const { validite, setValidite, isLoading, postShareholders } = useShareholders(cartId);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const { incrementPage } = useNavigateStep();

  const handleAdd = () => {
    setValidite((prev) => [...prev, singleFile]);
  };

  const handleRemove = (index) => {
    if (validite.length > 1) {
      setDeleteIndex(index);
      setOpenDialog(true);
    }
  };

  const handleDeleteConfirm = () => {
    setValidite((prev) => prev.filter((_, i) => i !== deleteIndex));
    setOpenDialog(false);
  };

  const handlePost = async () => {
    try {
      await postShareholders();
      incrementPage();
    } catch (error) {
      console.error('خطا در ارسال اطلاعات:', error);
    }
  };

  const { data: finishCart, isLoading: loader } = useFinishCart(cartId);

  const isDisabled = loader || finishCart?.cart?.finish_cart === true;

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4 sm:p-8">
      <ToastContainer />

      <div className="w-full max-w-4xl p-4 sm:p-6 bg-white shadow-2xl rounded-lg">
        <div className="bg-gray-200 w-full text-white rounded-t-md p-2 text-center mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-700">سهامداران</h1>
        </div>

        <div className="w-full mb-4">
          {validite.map((item, index) => (
            <div key={index} className="relative w-full space-y-2 mb-6">
              <div className="relative p-4 rounded-lg bg-white shadow-md">
                {validite.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="absolute top-0 left-0 mt-2 ml-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition duration-300"
                  >
                    <FaTimes />
                  </button>
                )}
                <FileSharehold index={index} validite={validite} setValidite={setValidite} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-6 w-full">
          <button
            onClick={handleAdd}
            type="button"
            className="py-2 px-6 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-200 font-semibold w-full sm:w-auto"
          >
            افزودن فرم جدید
          </button>
        </div>

        <div className="flex justify-center items-center mt-6 w-full">
          <button
            onClick={handlePost}
            disabled={isDisabled}
            type="button"
            className={`py-2 w-full sm:w-auto px-6 mx-0 sm:mx-24 text-white rounded-lg shadow-xl font-semibold transition-transform transform focus:outline-none focus:ring-4 focus:ring-blue-300 ${
              isDisabled
                ? 'bg-gray-400 cursor-not-allowed opacity-50' // Disabled state styles
                : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'
            }`}
          >
            ارسال اطلاعات
          </button>
        </div>
      </div>

      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDeleteConfirm}
        title="تایید حذف"
        message="آیا مطمئن هستید که می‌خواهید این فرم را حذف کنید؟"
      />
    </div>
  );
};

export default Shareholders;
