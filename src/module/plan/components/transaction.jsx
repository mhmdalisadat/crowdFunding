import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoMdClose } from 'react-icons/io';
import { BsCloudUploadFill } from 'react-icons/bs';
import { RiBankCardFill } from 'react-icons/ri';
import { formatNumber } from 'src/utils/formatNumbers';

const TransactionOptions = ({ setOpenTransaction }) => {
  const [value] = useState('');
  const [activeTab, setActiveTab] = useState('bankPortal');
  const [documentNumber, setDocumentNumber] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [setImageReceipt] = useState(null);

  const handleInputChange = (e) => {
    const cleanedValue = e.target.value.replace(/,/g, '');
    setCreditAmount(cleanedValue);
  };

  const handleFileChange = (e) => {
    setImageReceipt(e.target.files[0]);
  };

  const handleSubmit = () => {};

  const closeModal = () => {
    setOpenTransaction(false);
  };

  const options = ['صادرات', 'سامان'];

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 modal-overlay">
      <div className="relative bg-white shadow-lg rounded-lg w-[400px] p-6">
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-4 left-3 text-gray-600 hover:text-red-500"
        >
          <IoMdClose size={24} />
        </button>

        <h2 className="text-2xl font-bold text-black mb-4 border-b pb-2">افزایش</h2>

        <div className="flex mb-4">
          <button
            type="button"
            className={`flex-1 py-2 text-center border-b-2 ${
              activeTab === 'bankPortal'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-500'
            }`}
            onClick={() => setActiveTab('bankPortal')}
          >
            درگاه بانکی
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-center border-b-2 ${
              activeTab === 'bankReceipt'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-500'
            }`}
            onClick={() => setActiveTab('bankReceipt')}
          >
            فیش بانکی
          </button>
        </div>

        {activeTab === 'bankPortal' && (
          <div>
            <input
              value={value}
              onChange={handleInputChange}
              type="text"
              placeholder="مبلغ"
              className="input input-bordered w-full bg-gray-100 mb-4"
            />

            <div className="mb-4">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className="btn border-blue-400 border-none shadow-lg hover:border-blue-400 bg-white text-gray-700 hover:bg-blue-400 flex-col items-center m-2"
                >
                  {option}
                  <div className="badge py-4 bg-gray-300 text-blue-400 border-blue-400 text-lg ">
                    <RiBankCardFill />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bankReceipt' && (
          <div>
            <input
              type="text"
              placeholder="شماره فیش بانکی"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              className="input input-bordered w-full bg-gray-100 mb-4"
            />
            <input
              type="text"
              placeholder="مبلغ فیش بانکی"
              value={formatNumber(creditAmount)}
              onChange={handleInputChange}
              className="input input-bordered w-full bg-gray-100 mb-4"
            />
            <label
              htmlFor="پیوست فایل"
              className="flex items-center rounded-md bg-gradient-to-tr from-blue-500 to-blue-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none"
            >
              <BsCloudUploadFill />
              پیوست فایل
              <input id="file_input" type="file" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
};

TransactionOptions.propTypes = {
  setOpenTransaction: PropTypes.func.isRequired,
};

export default TransactionOptions;
