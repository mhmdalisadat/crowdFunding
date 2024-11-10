/* eslint-disable no-nested-ternary */
import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'src/components/loader';
import useGetPlan from '../service/use-plan';

const PlanShareholders = () => {
  const { traceCode } = useParams();
  const { isLoading, error, data } = useGetPlan(traceCode);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 text-center">خطایی رخ داده است: {error.message}</div>;
  }

  const shareholders = data?.shareholder || [];

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4 text-center text-gray-800">اطلاعات سهامداران</h1>

      {/* نمایش جدول در نمایشگرهای بزرگ */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full text-sm text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">نام شخص/نام شرکت</th>
              <th className="px-6 py-3">نام خانوادگی/مدیر عامل</th>
              <th className="px-6 py-3">درصد سهام</th>
              <th className="px-6 py-3">نوع سهام</th>
            </tr>
          </thead>
          <tbody>
            {shareholders.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{item?.first_name}</td>
                <td className="px-6 py-4">{item?.last_name}</td>
                <td className="px-6 py-4">%{item?.share_percent}</td>
                <td className="px-6 py-4">
                  {item?.shareholder_type === 2
                    ? 'حقوقی'
                    : item?.shareholder_type === 1
                    ? 'حقیقی'
                    : 'نامشخص'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* نمایش کارت‌ها در موبایل */}
      <div className="block sm:hidden space-y-4">
        {shareholders.map((item, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <p>
              <strong>نام:</strong> {item?.first_name}
            </p>
            <p>
              <strong>نام خانوادگی:</strong> {item?.last_name}
            </p>
            <p>
              <strong>درصد سهام:</strong> %{item?.share_percent}
            </p>
            <p>
              <strong>کد ملی:</strong> {item?.national_id}
            </p>
            <p>
              <strong>نوع سهام:</strong>{' '}
              {item?.shareholder_type === 2
                ? 'حقوقی'
                : item?.shareholder_type === 1
                ? 'حقیقی'
                : 'نامشخص'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanShareholders;
