import React from 'react';
import PropTypes from 'prop-types';

const ToggleContract = ({ label, checked, handle, isDisabled, value, toggleKey }) => (
  <div className="collapse p-3 collapse-close border rounded-lg border-none shadow-md">
    <div className="collapse-title flex justify-between items-center text-md font-medium bg-white">
      <span>{label}</span>
      <div className="flex items-center">
        <span className="mx-2">خیر</span>
        <input
          type="checkbox"
          className="toggle toggle-info bg-gray-500"
          value={value[toggleKey] || ''}
          checked={checked}
          onChange={handle}
          disabled={isDisabled}
        />
        <span className="mx-2">بله</span>
      </div>
    </div>
  </div>
);

ToggleContract.propTypes = {
  label: PropTypes.string.isRequired,
  toggleKey: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handle: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  value: PropTypes.object.isRequired,
};

export default ToggleContract;
