import React from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import useCer from './useGetCerSidebar';
import useCerti from './usePostCerSideBar';

const CertificateSideBar = () => {
  const { data } = useCer();
  const { data: response, mutate } = useCerti();

  if (!data || data.length === 0) {
    return <div className="text-center text-gray-500">اطلاعاتی برای نمایش وجود ندارد</div>;
  }

  if (response) {
    toast.error('اطلاعات مشارکت کننده یافت نشد');
  }

  return (
    <div className="flex flex-wrap gap-6 p-6">
      <ToastContainer />
      {data.map((item, index) => (
        <motion.div
          key={index}
          className="w-full md:w-1/2 lg:w-1/3 p-6 bg-gray-300 text-black shadow-lg rounded-2xl hover:shadow-2xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h2 className="text-xl font-bold mb-4">{item.persian_name}</h2>
          <p className="text-black text-opacity-90 mb-2">
            تاریخ شروع: {item.persian_approved_underwriting_start_date}
          </p>
          <p className="text-black text-opacity-90 mb-4">
            تاریخ پایان: {item.persian_approved_underwriting_end_date}
          </p>
          <button
            type="button"
            onClick={() => mutate(item.trace_code)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            دانلود گواهی
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default CertificateSideBar;
