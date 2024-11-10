import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useDargahResult from 'src/module/plan/payment/service/useDargahResualt';
import { motion } from 'framer-motion';
import Loader from 'src/components/loader';


const PaymentResualt = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const invoiceId = queryParams.get('invoiceId');
  const navigate = useNavigate();
  const { traceCode } = useParams();

  const handleReturnToHome = () => {
    navigate('/');
  };
  const { data , isLoading } = useDargahResult(traceCode, invoiceId);

  if (isLoading) {
    return <Loader/>;
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-200">
      <motion.div
        className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {data === true ? (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl font-extrabold text-green-600 mb-4">پرداخت موفق بود!</h1>
            <p className="text-gray-600 mb-6">
              پرداخت شما با موفقیت انجام شد. از خرید شما متشکریم!
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl font-extrabold text-red-600 mb-4">پرداخت ناموفق</h1>
            <p className="text-gray-600 mb-6">پرداخت شما ناموفق بود. لطفاً مجدداً تلاش کنید.</p>
          </motion.div>
        )}
        <motion.button
          type="button"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 shadow-lg"
          onClick={handleReturnToHome}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          بازگشت به صفحه اصلی
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PaymentResualt;
