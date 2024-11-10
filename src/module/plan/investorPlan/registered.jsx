import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'src/components/loader';
import useGetPlan from '../service/use-plan';

const Registere = () => {
  const { traceCode } = useParams();
  const { isLoading, error, data } = useGetPlan(traceCode);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 text-center">خطایی رخ داده است: {error.message}</div>;
  }

  const boardMembers = data?.board_member || [];

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4 text-center text-gray-800">اطلاعات اعضای هیئت مدیره</h1>

      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-4 py-2">نام</th>
              <th className="px-4 py-2">نام خانوادگی</th>
              <th className="px-4 py-2">نام شرکت</th>
              <th className="px-4 py-2">نماینده</th>
              <th className="px-4 py-2">سمت</th>
            </tr>
          </thead>
          <tbody>
            {boardMembers.map((item, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-4 py-2">{item?.first_name}</td>
                <td className="px-4 py-2">{item?.last_name}</td>
                <td className="px-4 py-2">{item?.company_name}</td>
                <td className="px-4 py-2">{item?.is_agent_from_company ? 'نماینده شرکت' : 'شخصی'}</td>
                <td className="px-4 py-2">{item?.organization_post_description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="block sm:hidden space-y-4">
        {boardMembers.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-gray-100 rounded-lg shadow-md"
          >
            <p><strong>نام:</strong> {item?.first_name}</p>
            <p><strong>نام خانوادگی:</strong> {item?.last_name}</p>
            <p><strong>نام شرکت:</strong> {item?.company_name}</p>
            <p><strong>کد ملی:</strong> {item?.national_id}</p>
            <p><strong>نماینده:</strong> {item?.is_agent_from_company ? 'نماینده شرکت' : 'شخصی'}</p>
            <p><strong>سمت:</strong> {item?.organization_post_description}</p>
            <p><strong>شماره موبایل:</strong> {item?.mobile_number}</p>
            <p><strong>ایمیل:</strong> {item?.email_address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Registere;
