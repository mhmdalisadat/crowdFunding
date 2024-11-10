import React from 'react';
import PropTypes from 'prop-types'; 
import { motion } from 'framer-motion';

const NoSejamModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(event) => event.key === 'Enter' && onkeypress()}
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white rounded-xl p-8 w-11/12 max-w-lg mx-auto shadow-lg transition-transform duration-500 ease-in-out"
      >
        <h2 className="text-2xl font-extrabold text-gray-800 mb-4 text-center">شما سجامی نیستید</h2>
        <p className="mb-6 text-center text-gray-600 leading-relaxed">
          لطفا ابتدا از طریق لینک زیر در سجام ثبت نام کنید:
        </p>
        <a
          href="https://profilesejam.csdiran.ir/"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-lg font-semibold text-blue-600 underline hover:text-blue-800 transition-colors duration-300 ease-in-out"
        >
          لینک ثیت نام در سجام
        </a>
        <button
          type="button"
          onClick={onClose}
          className="mt-8 w-full text-white bg-gradient-to-r from-[#004ff9] to-[#000000]  hover:text-blue-300 hover:outline-none py-3 px-4 rounded-lg font-medium text-lg  transition-all duration-300 "
        >
          بستن
        </button>
      </motion.div>
    </div>
  );
};

NoSejamModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,  
  onClose: PropTypes.func.isRequired,
};

export default NoSejamModal;
