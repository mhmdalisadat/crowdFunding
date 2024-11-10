import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import UseCartId from 'src/hooks/use-cartId';
import useNavigateStep from 'src/hooks/use-navigate-step';
import Fildemnager from 'src/module/manegers/components/fildemaneger';
import ConfirmationDialog from 'src/components/dialogMsg';
import Loader from 'src/components/loader';
import useGetManagement from 'src/sections/resume/hook/useGetmanagement';
import { useFinishCart } from 'src/hooks/useFinishCart';
import usePostManager from '../service/usePostManager';

const ManegersDetails = () => {
  const { cartId } = UseCartId();

  const singleFile = {
    name: '',
    position: '',
    national_code: '',
    national_id: '',
    representative: '',
    is_legal: false,
    is_obliged: false,
  };

  const [field, setField] = useState([singleFile]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const { incrementPage } = useNavigateStep();

  const { isLoading, data } = useGetManagement(cartId);

  const { data: finishCart, isLoading: loader } = useFinishCart(cartId);

  const isDisabled = loader || finishCart?.cart?.finish_cart === true;

  useEffect(() => {
    if (data) {
      if (data.length > 0) {
        setField(data);
      }
    }
  }, [data]);

  const handleAdd = () => {
    setField((prevField) => [...prevField, singleFile]);
  };

  const handleRemove = (index) => {
    if (field.length > 1) {
      setDeleteIndex(index);
      setOpenDialog(true);
    }
  };

  const handleDeleteConfirm = () => {
    setField((prevField) => prevField.filter((_, i) => i !== deleteIndex));
    setOpenDialog(false);
  };

  const { mutate, isSuccess, isPending, isError } = usePostManager();

  const handlePost = async () => {
    const sanitizedField = field.map((manager) => ({
      ...manager,
      national_id: manager.national_id || '',
      representative: manager.representative || '',
    }));
    mutate({ cartId, sanitizedField });
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      toast.success('اطلاعات با موفقیت ارسال شد');
      incrementPage();
    } else if (!isPending && isError) {
      toast.error('خطا در ارسال اطلاعات');
    }
  }, [isPending, isSuccess, isError, incrementPage]);

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4 sm:p-8">
      <ToastContainer />

      <div className="w-full max-w-4xl p-4 sm:p-6 bg-white shadow-xl rounded-lg">
        <div className="bg-gray-200 w-full text-white rounded-t-md p-2 text-center mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-700">اطلاعات مدیران</h1>
        </div>

        {field.map((item, index) => (
          <div key={index} className="relative w-full mb-8">
            {field.length > 1 && (
              <button
                onClick={() => handleRemove(index)}
                type="button"
                className="absolute top-0 left-0 mt-2 ml-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition duration-300"
              >
                <FaTimes />
              </button>
            )}
            <Fildemnager index={index} field={field} setField={setField} />
          </div>
        ))}

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

export default ManegersDetails;
