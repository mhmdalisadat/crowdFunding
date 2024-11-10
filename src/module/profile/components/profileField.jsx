import React from 'react';
import PropTypes from 'prop-types';

const ProfileField = ({ label, value }) => (
  <div>
    <label htmlFor="label" className="block text-gray-700 text-sm font-semibold mb-2">
      {label}:
    </label>
    <input
      type="text"
      value={value}
      readOnly
      className="peer bg-white w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
    />
  </div>
);

ProfileField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.number]),
};

export default ProfileField;
