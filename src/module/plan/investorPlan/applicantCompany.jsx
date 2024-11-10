/* eslint-disable no-nested-ternary */
import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'src/components/loader';
import moment from 'moment-jalaali';
import useGetPlan from '../service/use-plan';

const ApplicantCompany = () => {
  const { traceCode } = useParams();
  const { isLoading, error, data } = useGetPlan(traceCode);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 text-center">خطایی رخ داده است: {error.message}</div>;
  }

  const registrationDateShamsi = moment(data?.company[0]?.registration_date, 'YYYY-MM-DD').format(
    'jYYYY/jMM/jDD'
  );

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">اطلاعات شرکت متقاضی</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'نام شرکت', value: data.company[0].name },
          { label: 'نوع شرکت', value: data.company[0].company_type_description },
          { label: 'شماره ثبت', value: data.company[0].registration_number },
          { label: 'کدملی', value: data.company[0].national_id },
          { label: 'کد اقتصادی', value: data.company[0].economic_id },
          { label: 'تاریخ ثبت', value: registrationDateShamsi },
          { label: 'کد پستی', value: data.company[0].postal_code },
          { label: 'تلفن', value: data.company[0].phone_number },
          { label: 'فکس', value: data.company[0].fax_number },
          { label: 'نشانی', value: data.company[0].address },
          { label: 'ایمیل', value: data.company[0].email_address },
        ].map((field, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg shadow transition-all hover:bg-gray-200"
          >
            <h2 className="font-semibold text-gray-700 mb-2">{field.label}</h2>
            <p className="text-gray-600 break-words">{field.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicantCompany;
