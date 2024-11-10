import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const DateDifference = ({ startDate, endDate }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    let calculatedMessage;

    if (start > today) {
      const difference = Math.ceil((start - today) / (1000 * 3600 * 24));
      calculatedMessage = `${difference} روز مانده به شروع`;
    } else if (end > today) {
      const difference = Math.ceil((end - today) / (1000 * 3600 * 24));
      calculatedMessage = `${difference} روز مانده به پایان`;
    } else {
      calculatedMessage = 'زمان طرح به پایان رسیده است.';
    }

    setMessage(calculatedMessage);
  }, [startDate, endDate]);

  return <p className="text-lg font-semibold text-center">{message}</p>;
};

DateDifference.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

export default DateDifference;
