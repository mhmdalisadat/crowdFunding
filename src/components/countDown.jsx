import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { BsCalendarXFill } from 'react-icons/bs';
import useGetPlans from 'src/module/plan/service/use-plans';

const CountdownTimer = ({ startDate, endDate }) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();
  const { data } = useGetPlans();

  const initialTime = () => {
    if (now < start) {
      return Math.ceil((start - now) / 1000);
    }
    if (now > start && now < end) {
      return Math.ceil((end - now) / 1000);
    }
    return 0;
  };
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const days = Math.floor(timeRemaining / 86400);
  const hours = Math.floor((timeRemaining % 86400) / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  if (initialTime() === 0 || timeRemaining === 0) {
    return (
      <div className="  mt-2 flex items-center justify-between text-center text-md border-2 p-2 rounded-2xl shadow-inner ">
        <h1>طرح پایان یافته!</h1>
        <BsCalendarXFill className="text-2xl text-blue-500" />
      </div>
    );
  }
  const dd = data?.find((plan) => plan.information_complete?.status_second === '1');

  if (!dd) {
    return null;
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center  max-w-xs mx-auto p-4 "
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center items-center ">

        {[
          { label: 'روز', value: days },
          { label: 'ساعت', value: hours },
          { label: 'دقیقه', value: minutes },
          { label: 'ثانیه', value: seconds },
        ].map((unit, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center w-12 h-12 bg-white rounded-md shadow-md p-2"
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <span className="text-lg font-bold text-gray-700">{unit.value}</span>
            <span className="text-xs text-gray-500">{unit.label}</span>
          </motion.div>
        ))}
        <p className="text-base font-bold text-gray-900 mr-2">تا {now < start ? 'شروع' : 'پایان'} طرح</p>

      </div>
    </motion.div>
  );
};

CountdownTimer.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
};

export default CountdownTimer;
