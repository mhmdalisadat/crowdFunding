import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'src/components/loader';
import { formatNumber } from 'src/utils/formatNumbers';
import moment from 'jalali-moment';
import useGetInvesor from './service/use-getInvestor';

const InvestProfile = () => {
  const { traceCode } = useParams();
  const { data, isLoading } = useGetInvesor(traceCode);

  if (isLoading) {
    return <Loader />;
  }

  const transactionData = data
    ? data.map((item) => {
        const creationDate = item?.create_date ? moment(item.create_date) : null;
        const persianCreationDate =
          creationDate && creationDate.isValid()
            ? creationDate.locale('fa').format('YYYY/MM/DD')
            : 'تاریخ نامعتبر';


            return {
          fulname: item.fullname,
          create_date: persianCreationDate,
          amount: item.amount,
          user: item.user,
          value: item.value,
          status: item.status,
          payment_id: item.payment_id === 'True',
        };
      })
    : [];

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4 text-center">پروفایل سرمایه‌گذاران</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                نام سرمایه گذار
              </th>
              <th scope="col" className="px-6 py-3">
                تاریخ ایجاد
              </th>
              <th scope="col" className="px-6 py-3">
                مبلغ واحد
              </th>
              <th scope="col" className="px-6 py-3">
                مجموع مبلغ
              </th>
            </tr>
          </thead>
          <tbody>
            {transactionData.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">{item.fulname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.create_date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatNumber(item.amount)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatNumber(item.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvestProfile;
