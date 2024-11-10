/* eslint-disable no-nested-ternary */
import React from 'react';
import Loader from 'src/components/loader';
import { useParams } from 'react-router-dom';

import { FaCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { MdOutlinePendingActions, MdDoneAll } from 'react-icons/md';
import { motion } from 'framer-motion';
import moment from 'jalali-moment';
import { formatNumber } from 'src/utils/formatNumbers';
import useGetPayment from '../service/use-getpayment';

const PaymentCalculate = () => {
  const { traceCode } = useParams();
  const { data, isLoading } = useGetPayment(traceCode);

  if (isLoading) {
    return <Loader />;
  }

  const statusLabels = {
    0: 'رد شده',
    1: 'در حال بررسی',
    2: 'تایید شده',
    3: 'تایید نهایی',
  };

  const getStatusLabel = (status) => {
    return statusLabels[status] || 'وضعیت نامشخص';
  };

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">شما هنوز دارایی ندارید</p>;
  }

  return (
    <div className="p-4 md:p-8 overflow-y-auto max-h-[72vh] bg-transparent">
      <p className="flex mb-10 text-center font-bold text-xl items-center justify-center">
        دارایی های شما{' '}
      </p>
      {data.map((item) => {
        const creationDate = item?.create_date ? moment(item.create_date) : null;
        const persianCreationDate =
          creationDate && creationDate.isValid()
            ? creationDate.locale('fa').format('YYYY/MM/DD')
            : 'تاریخ نامعتبر';

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="bg-white p-6 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <p className="text-gray-700 font-semibold">
                  مبلغ: <span className="text-blue-600">{formatNumber(item.value)}ریال</span>
                </p>
                <p className="text-gray-700 font-semibold">
                  مقدار: <span className="text-blue-600">{formatNumber(item.amount)}</span>
                </p>
                <p className="text-gray-700 font-semibold">
                  تاریخ: <span className="text-blue-600">{persianCreationDate}</span>
                </p>
                <div className="flex items-center text-gray-700 font-semibold mt-2">
                  وضعیت:
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`ml-2 flex items-center gap-1 ${
                      item.status === '3'
                        ? 'text-green-600'
                        : item.status === '2'
                        ? 'text-green-600'
                        : item.status === '1'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {item.status === '3' ? (
                      <MdDoneAll className="w-5 h-5" />
                    ) : item.status === '2' ? (
                      <FaCheck className="w-5 h-5" />
                    ) : item.status === '1' ? (
                      <MdOutlinePendingActions className="w-5 h-5" />
                    ) : (
                      <IoClose className="w-5 h-5" />
                    )}
                    <span>{getStatusLabel(item.status)}</span>
                  </motion.span>
                </div>
                <p className="text-gray-700 font-semibold mt-2">
                  نوع پرداخت:{' '}
                  <span className="text-blue-600">
                    {item.document ? 'فیش بانکی' : 'درگاه بانکی'}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PaymentCalculate;
