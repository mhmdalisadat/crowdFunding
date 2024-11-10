
  import React from 'react';
  import PropTypes from 'prop-types'; 

  const InputPercent = ({ label, keyName, value, disabled, handle }) => {
    const handleChange = (e) => {
      const newValue = e.target.value.replace(/[^0-9.]/g, '');
      handle({ ...value, [keyName]: newValue });
    };

    return (
      <div className="mb-6 relative">
        <label htmlFor='persent' className="block text-gray-800 text-xs font-semibold mb-2">{label}</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">% </span>
          <input
            type="number"
            name={label}
            value={value[keyName] || ''}
            disabled={disabled || false}
            onChange={handleChange}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9.]/g, '');
              if (e.target.value.split('.').length > 2) {
                e.target.value = e.target.value.slice(0, -1);
              }
            }}
            className="shadow bg-white appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 pl-8 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
          />
        </div>
      </div>
    );
  };


InputPercent.propTypes = {
  label: PropTypes.string.isRequired,
  keyName: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  handle: PropTypes.func.isRequired,
};

export default InputPercent;
