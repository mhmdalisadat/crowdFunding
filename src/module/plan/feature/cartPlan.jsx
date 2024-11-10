import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProgressLineChart from 'src/components/progressLine';
import { OnRun } from 'src/api/OnRun';
import { formatNumber } from 'src/utils/formatNumbers';
import { motion } from 'framer-motion';
import CountdownTimer from 'src/components/countDown';
import usePicure from '../service/use-picture';

const CartPlan = ({
  trace_code,
  persianName,
  rateOfReturn,
  totalUnits,
  totalPrice,
  crowdFundingType,
  company,
  endDate,
  startDate,
  statusSecond,
  amountCollectedNow,
  realPersonMinPrice,
}) => {
  const navigate = useNavigate();
  const { data: picture } = usePicure(trace_code);

  const statusValue = parseInt(statusSecond, 10);
  const isCompleted = statusValue === 4;

  const statusMapping = {
    1: 'شروع شده',
    2: 'جمع‌آوری شده',
    3: 'تمدید شده',
    4: 'سر رسید ناموفق',
    5: 'تکمیل شده',
  };
   
  const handleViewClick = () => {
    navigate(`/plan/${trace_code}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col gap-4   p-4 md:p-6 lg:p-8 rounded-lg shadow-2xl transition-shadow mx-auto 
        w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl ${
          isCompleted ? 'bg-gray-200' : 'bg-white'
        }`}
    >
      <div className="relative">
        <img
          src={picture?.picture ? `${OnRun}/${picture.picture}` : '/img/nopic.jpg'}
          alt={persianName || 'تصویر موجود نیست'}
          className="object-cover rounded-lg w-full aspect-[16/9]"
        />
        <div className="absolute top-4 left-4 bg-blue-500 py-1 px-4 rounded-full text-white text-xs sm:text-sm font-medium shadow-md transform -rotate-12 origin-top-left">
          {statusMapping[statusValue]}
        </div>

        <div className="absolute top-2 right-2 bg-green-600 py-1 px-3 rounded-full text-white text-xs sm:text-sm font-semibold shadow-md">
          %{rateOfReturn}
        </div>
      </div>

      <div className="flex flex-col bg-gray-50 rounded-lg h-80 shadow-inner p-4">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-center text-gray-800 mb-4">
          {persianName}
        </h2>

        <div className="grid gap-2 sm:gap-3 text-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm">مبلغ کل:</span>
            <span className="text-xs sm:text-sm font-bold">{formatNumber(totalPrice)} ریال</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm">شرکت:</span>
            <span className="text-xs sm:text-sm font-bold">{company}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm">تعداد گواهی‌های شراکت:</span>
            <span className="text-xs sm:text-sm font-bold">{totalUnits}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm">نوع تامین مالی:</span>
            <span className="text-xs sm:text-sm font-bold">{crowdFundingType}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs sm:text-sm">حداقل سرمایه‌گذاری:</span>
            <span className="text-xs sm:text-sm font-bold">
              {formatNumber(realPersonMinPrice)} ریال
            </span>
          </div>
        </div>
      </div>

      <div className="px-4">
        <ProgressLineChart
          progress={Math.round((amountCollectedNow / totalPrice) * 100)}
          label="تامین شده"
        />
        <CountdownTimer startDate={startDate} endDate={endDate} />
      </div>

      <div className="flex justify-center mt-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className="text-white  bg-blue-600 border-b-1 border-blue-900 rounded-2xl px-4 py-3 font-bold text-sm sm:text-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={handleViewClick}
        >
          {statusValue === 1 ? 'شروع سرمایه گذاری' : 'مشاهده جزئیات'}
        </motion.button>
      </div>
    </motion.div>
  );
};

CartPlan.propTypes = {
  trace_code: PropTypes.string.isRequired,
  persianName: PropTypes.string.isRequired,
  rateOfReturn: PropTypes.number.isRequired,
  totalUnits: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  crowdFundingType: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  statusSecond: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  amountCollectedNow: PropTypes.number.isRequired,
  realPersonMinPrice: PropTypes.number.isRequired,
};

export default CartPlan;
