import React, { useState, useEffect } from 'react';
import Loader from 'src/components/loader';
import { useParams } from 'react-router-dom';
import { cleanNumber, formatNumber } from 'src/utils/formatNumbers';
import useGetInformation from '../service/use-getinformtion';

const Calculate = () => {
  const [inputValue, setInputValue] = useState('');
  // const [result, setResult] = useState(0);
  // const [payment, setPayment] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const { traceCode } = useParams();
  const { data, isLoading, error } = useGetInformation(traceCode);


  useEffect(() => {
    if (!Number.isNaN(inputValue) && inputValue !== '' && data) {
      const { rate_of_return: profit} = data;

      // const profitPerPeriod = Number(inputValue) * (profit / 100 / (12 / paymentPeriod));
      // const numberOfPayments = (12 / paymentPeriod) * (totalTime / 12);
      const totalProfit =Number( profit / 100 * inputValue )

      // setResult(profitPerPeriod);
      // setPayment(numberOfPayments);
      setTotalAmount(totalProfit);
    } else {
      // setResult(0);
      setTotalAmount(0);
      // setPayment(0);
    }
  }, [inputValue, data]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500">خطایی رخ داده است: {error.message}</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">محاسبه سود سرمایه‌گذاری</h1>

      <input
        type="text"
        value={formatNumber(inputValue)}
        onChange={(e) => setInputValue(cleanNumber(e.target.value))}
        placeholder="مبلغ سرمایه‌گذاری خود را وارد کنید"
        className="border bg-white border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 mb-6"
      />

      {/* <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-6">
        <p className="text-base font-medium text-gray-700">
          سود دریافتی در هر پرداخت (ریال):{' '}
          <span className="text-lg text-green-600 font-bold">{formatNumber(result)}</span>
        </p>
      </div> */}

      {/* <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-6">
        <p className="text-base font-medium text-gray-700">
          تعداد پرداخت‌ها:{' '}
          <span className="text-lg text-indigo-600 font-bold">{formatNumber(payment)}</span>
        </p>
      </div> */}

      <div className="bg-gray-50 p-4 rounded-lg shadow-md">
        <p className="text-base font-medium text-gray-700">
          مجموع سودهای دریافتی (ریال):{' '}
          <span className="text-lg text-blue-600 font-bold">{formatNumber(totalAmount)}</span>
        </p>
      </div>
    </div>
  );
};

export default Calculate;
