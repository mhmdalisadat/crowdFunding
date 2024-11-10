/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import PaymentContext from '../service/paymentContext';
import 'react-toastify/dist/ReactToastify.css';
import PasargadLogo from '../../../../../public/assets/images/avatars/pasargod.jpg';

const PaymentGateway = ({ handleDargah }) => {
  const { paymentMethod } = useContext(PaymentContext);

  if (paymentMethod !== 'dargah') {
    return null; 
  }

  return (
    <>
      <div className="flex items-center gap-8 mb-4">
        <img src={PasargadLogo} alt="بانک پاسارگاد" className="w-12 h-12" />
        <h1 className="text-lg font-semibold">درگاه پرداخت بانک پاسارگاد</h1>
      </div>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md w-full max-w-md mx-auto">
        <div className="space-y-4">
          <h1>لطفا قبل از اتصال به درگاه فیلترشکن خود را قطع کنید.</h1>
          <motion.button
            type="button"
            onClick={handleDargah}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ارجاع به درگاه پرداخت
          </motion.button>
        </div>
      </div>
    </>
  );
};

PaymentGateway.propTypes = {
  handleDargah: PropTypes.func.isRequired,
};

export default PaymentGateway;
