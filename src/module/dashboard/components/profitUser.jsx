import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const ProfitUser = ({ dashbord }) => {
  const { profit } = dashbord;

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-6">گزارش سود</h1>
      <div dir="rtl" className="flex items-center justify-center ">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto w-full lg:w-3/4 relative shadow-md sm:rounded-lg"
        >
          <table className="w-full text-sm text-left bg-white text-gray-500 dark:text-gray-400">
            <thead className="text-base text-gray-700 uppercase ">
              <tr>
                <th scope="col" className="py-3 px-6">
                  مبلغ
                </th>
                <th scope="col" className="py-3 px-6">
                  تاریخ سررسید
                </th>
                <th scope="col" className="py-3 px-6">
                  نوع
                </th>
                <th scope="col" className="py-3 px-6">
                  طرح
                </th>
              </tr>
            </thead>
            <tbody>
              {profit && profit.length > 0 ? (
                profit.map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className=" border-b text-gray-800  hover:bg-gray-200 dark:hover:bg-gray-200"
                  >
                    <td className="py-4 px-6">{item.amount.toLocaleString()}</td>
                    <td className="py-4 px-6">{item?.date?.replace(/-/g, '/')}</td>
                    <td className="py-4 px-6">{item.type === '1' ? 'باز پرداخت اصل پول ' : 'سود علی الحساب'}</td>
                    <td className="py-4 px-6">{item.plan}</td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td className="py-4 px-6 text-center" colSpan="4">
                    گزارشی موجود نیست
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      </div>
    </>
  );
};

ProfitUser.propTypes = {
  dashbord: PropTypes.object.isRequired,
};

export default ProfitUser;
