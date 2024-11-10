import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { formatNumber } from 'src/utils/formatNumbers';

const ChartLimitInvest = ({ priceMin, priceMax, unit_price ,total_price}) => {
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex justify-between items-center text-lg font-semibold">
        <h2 className="text-purple-900">{formatNumber(priceMin)} ریال</h2>
       <h2 className="text-purple-900">
  {priceMax === null ? `${formatNumber(total_price)} ریال `  : `${formatNumber(priceMax)} ریال`}
</h2>
      </div>

      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-500">حداقل</p>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-4 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-purple-800"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <p className="text-sm text-gray-500">حداکثر</p>
      </div>

      <div className="flex justify-between items-center text-lg font-semibold">
        <h2 className="text-blue-900">{formatNumber(Number(priceMin / unit_price))} واحد</h2>
        <h2 className="text-blue-900">  {priceMax === null ?`${formatNumber(total_price)}  `  : `${formatNumber(priceMax/ unit_price)}`}
        واحد</h2>
      </div>
    </div>
  );
};

ChartLimitInvest.propTypes = {
  unit_price: PropTypes.number.isRequired,
  priceMin: PropTypes.number.isRequired,
  priceMax: PropTypes.number.isRequired,
  total_price: PropTypes.number.isRequired,
};

export default ChartLimitInvest;
