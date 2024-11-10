/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RulesModal = ({ isOpen, onClose }) => {
  const [isChecked, setIsChecked] = useState(false);

  if (!isOpen) return null;

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleClose = () => {
    if (isChecked) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">قوانین و مقررات</h2>
        <p className="text-gray-700 mb-4">
          لطفاً قبل از درخواست، قوانین و مقررات را به دقت مطالعه کنید. این قوانین شامل حقوق و تعهدات
          شما و نحوه استفاده از خدمات است.
        </p>
        <p className="text-gray-700 mb-6">
          با کلیک بر روی موافقتنامه، شما تمامی شرایط را قبول می‌کنید.
        </p>

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="agree"
            className="mr-2"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="با قوانین موافقم" className="text-gray-700">
            با قوانین موافقم
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleClose}
            disabled={!isChecked}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors ${
              !isChecked ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            تائید
          </button>
        </div>
      </div>
    </div>
  );
};

RulesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RulesModal;
