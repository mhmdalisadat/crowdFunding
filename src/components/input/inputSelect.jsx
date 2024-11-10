
import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = ({ label, value, disabled, options, setContractData, contractData, keyName }) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    setContractData({
      ...contractData,
      [keyName]: newValue, 
    });
  };

  return (
    <div className="mb-6">
      <label htmlFor='select' className="block text-gray-800 text-xs font-semibold mb-2">{label}</label>
      <select
        name={label}
        value={value || ''}
        disabled={disabled || false}
        onChange={handleChange}
        className="shadow appearance-none border bg-white border-gray-300 rounded-lg w-full py-3 px-4 text-black disabled:bg-slate-200 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
      >
        <option value="">انتخاب کنید</option>
        {options.map((typeObj) => (
          <option key={typeObj.type} value={typeObj.type}>
            {typeObj.title}
          </option>
        ))}
      </select>
    </div>
  );
};


SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  setContractData: PropTypes.func.isRequired,
  contractData: PropTypes.object.isRequired,
  keyName: PropTypes.string.isRequired, 
};

export default SelectInput;
