/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import { cleanNumber } from 'src/utils/formatNumbers';
import PropTypes from 'prop-types';

const FileSharehold = ({ index, validite, setValidite }) => {
  const handleChange = (input, value) => {
    const updatedRow = { ...validite[index], [input]: value };
    const updatedList = [...validite];
    updatedList[index] = updatedRow;
    setValidite(updatedList);
  };

  return (
    <div className="flex justify-center items-center">
      <form className="mt-8 w-full max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              نام و نام خانوادگی :
            </label>
            <input
              type="text"
              name="name"
              value={validite[index].name}
              autoComplete="off"
              disabled={validite[index].lock}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              className="shadow appearance-none bg-white disabled:bg-gray-200 text-black border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">کدملی :</label>
            <input
              type="text"
              name="national_code"
              value={validite[index].national_code}
              disabled={validite[index].lock}
              autoComplete="off"
              onChange={(e) => handleChange('national_code', e.target.value)}
              maxLength={10}
              onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
              required
              className="shadow appearance-none bg-white disabled:bg-gray-200 text-black border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">تعداد سهام :</label>
            <input
              type="number"
              name="percent"
              value={validite[index].percent}
              disabled={validite[index].lock}
              onChange={(e) => handleChange('percent', cleanNumber(e.target.value))}
              required
              className="shadow appearance-none bg-white disabled:bg-gray-200 text-black border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">شماره تلفن :</label>
            <input
              type="text"
              
              name="phone"
              value={validite[index].phone}
              autoComplete="off"
              disabled={validite[index].lock}
              onChange={(e) => handleChange('phone', e.target.value)}
              onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
              maxLength={11}
              required
              className="shadow appearance-none bg-white disabled:bg-gray-200 text-black border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

FileSharehold.propTypes = {
  index: PropTypes.number.isRequired,
  validite: PropTypes.array.isRequired,
  setValidite: PropTypes.func.isRequired,
};
export default FileSharehold;
