/* eslint-disable react/prop-types */
/* eslint-disable no-unsafe-optional-chaining */
import React from 'react';
import { useParams } from 'react-router-dom';
import { formatNumber } from 'src/utils/formatNumbers';
import Loader from 'src/components/loader';
import PropTypes from 'prop-types';
import { OnRun } from 'src/api/OnRun';
import ProgressLineChart from 'src/components/progressLine';
import {
  FiExternalLink,
  FiDollarSign,
  FiCalendar,
  FiFileText,
  FiFlag,
  FiHash,
} from 'react-icons/fi';
import { FaRegMoneyBill1 } from 'react-icons/fa6';
import { Divider } from '@mui/material';
import CountdownTimer from 'src/components/countDown';
import useGetPlan from '../service/use-plan';
import usePicure from '../service/use-picture';
import ChartLimitInvest from './chartLimitInvest';

const Field = ({ label, value, bold, hasBackground, icon: Icon }) => (
  <div className={`p-4 overflow-hidden ${hasBackground ? 'bg-gray-50 rounded-lg shadow-md' : ''}`}>
    <div className="text-right mb-2 text-sm">
      <p className="text-gray-400">{label}</p>
    </div>
    <div className="flex items-center justify-between relative">
      <p className={`text-lg text-gray-900 ${bold ? 'font-semibold' : ''}`}>{value}</p>
      {Icon && (
        <Icon className="text-violet-300 w-16 h-16 ml-2 absolute left-[-30px] top-[-10px] rotate-[30deg]" />
      )}
    </div>
  </div>
);

const Descript = () => {
  const { traceCode } = useParams();
  const { data, isPending, error } = useGetPlan(traceCode);
  const { data: picture, isLoading: loadingpicture } = usePicure(traceCode);

  if (isPending || loadingpicture || !data) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">خطایی رخ داده است: {error.message}</div>;
  }

  const generalFields = [
    {
      label: 'نماد (فارسی)',
      value: data.plan.persoan_approved_symbol || 'نامشخص',
      icon: FiFileText,
    },
    { label: 'نام شرکت', value: data.company[0].name, icon: FiFileText },
    {
      label: 'سود',
      value: `%${data.information_complete.rate_of_return || 'نامشخص'}`,
      icon: FiDollarSign,
    },
    { label: 'عنوان گروه صنعت', value: data.plan.industry_group_description, icon: FiFileText },
    {
      label: 'عنوان زیر گروه صنعت',
      value: data.plan.sub_industry_group_description,
      icon: FiFileText,
    },
    {
      label: 'تاریخ شروع جمع آوری وجوه',
      value: data.plan.persian_suggested_underwiring_start_date,
      icon: FiCalendar,
    },
    {
      label: 'تاریخ پایان جمع آوری وجوه',
      value: data.plan.persian_suggested_underwriting_end_date,
      icon: FiCalendar,
    },
    {
      label: 'قیمت اسمی هر گواهی شراکت (ریال)',
      value: `${formatNumber(data.plan.unit_price)} ریال`,
      icon: FaRegMoneyBill1,
    },
    {
      label: 'تعداد کل گواهی‌های شراکت قابل عرضه',
      value: formatNumber(data.plan.total_units),
      icon: FiHash,
    },
    {
      label: 'تعداد گواهی شراکت متقاضی',
      value: formatNumber(data.plan.company_unit_counts),
      icon: FiHash,
    },
    {
      label: 'عنوان نوع تامین مالی',
      value: data.plan.crowd_funding_type_description,
      icon: FiFileText,
    },
    {
      label: 'تاریخ شروع اجرای طرح',
      value: data.plan.persian_project_start_date,
      icon: FiCalendar,
    },
    { label: 'تاریخ پایان اجرای طرح', value: data.plan.persian_project_end_date, icon: FiCalendar },
    { label: 'وضعیت پروژه', value: data.plan.project_status_description, icon: FiFlag },
    {
      label: 'مبلغ مورد نیاز (ریال)',
      value: `${formatNumber(data.plan.total_price)} ریال`,
      icon: FaRegMoneyBill1,
    },

    {
      label: 'حداقل مبلغ مورد نیاز جهت موفقیت تامین مالی (ریال)',
      value: `${formatNumber(data.plan.minimum_required_price) || 0} ریال`,
      icon: FaRegMoneyBill1,
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-4">
      <div className="text-center font-bold mb-4 text-xl">
        <h1>{data.plan.persian_name}</h1>
      </div>
      <div className="bg-gray-100 w-full mb-8 p-4 items-center justify-center flex rounded-lg shadow-md">
        {picture && picture.picture ? (
          <img
            src={`${OnRun}/${picture.picture}`}
            alt="تصویر پروژه"
            className="w-full max-w-[700px] h-auto sm:h-80 lg:h-auto rounded-lg mb-4 object-cover"
          />
        ) : (
          <img
            src="/public/img/nopic.jpg"
            alt="تصویر موجود نیست"
            className="w-full max-w-[700px] h-auto rounded-lg mb-4 object-cover"
          />
        )}
      </div>

      <div className="flex flex-col lg:flex-row justify-between">
        <a
          href="https://cf.ifb.ir/home/viewproject"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:text-blue-700 flex items-center"
        >
          مشاهده در فرابورس <FiExternalLink className="ml-2" />
        </a>
        <div className="mt-6 flex justify-center lg:justify-start">
          <CountdownTimer
            startDate={data.plan.suggested_underwriting_start_date}
            endDate={data.plan.suggested_underwriting_end_date}
          />
        </div>
      </div>
      <div className="w-full mb-8 p-4">
        <p className="text-base text-gray-700 font-medium break-words whitespace-normal">
          {data.plan.persian_subject}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {generalFields.map((field, index) => (
          <Field
            key={index}
            label={field.label}
            value={field.value}
            hasBackground
            icon={field.icon}
          />
        ))}
      </div>
      <div className="mt-6 px-4 mb-8">
        <ProgressLineChart
          target={100}
          progress={Math.round(
            (data.information_complete.amount_collected_now / data.plan.total_price) * 100
          )}
          label="تامین شده"
        />
        %{' '}
        {Math.round((data.information_complete.amount_collected_now / data.plan.total_price) * 100)}
        <p className="text-center flex justify-between text-sm font-semibold text-gray-900 mt-2 p-4">
          <span className="text-green-600">
            {formatNumber(data.plan.total_price ?? 0)} مبلغ مورد نیاز{' '}
          </span>
          <span className="text-gray-900">
            {formatNumber(data.information_complete.amount_collected_now ?? 0)} ریال تامین شده
          </span>
        </p>
      </div>
      <h1 className="text-lg font-bold mb-8 mt-8">سرمایه گذاری حقیقی</h1>
      <ChartLimitInvest
        priceMin={data.plan.real_person_minimum_availabe_price}
        priceMax={data.plan.real_person_maximum_available_price}
        unit_price={data?.plan?.unit_price}
        total_price={data?.plan?.total_price}
      />

      <Divider sx={{ borderBottomWidth: 3, marginY: 4, backgroundColor: 'gray' }} />

      <h1 className="text-lg font-bold mb-8 mt-8">سرمایه گذاری حقوقی</h1>
      <ChartLimitInvest
        priceMin={data.plan.legal_person_minimum_availabe_price}
        priceMax={data.plan.legal_person_maximum_availabe_price}
        unit_price={data?.plan?.unit_price}
        total_price={data?.plan?.total_price}
      />
    </div>
  );
};

Field.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  label: PropTypes.string.isRequired,
  bold: PropTypes.bool,
  hasBackground: PropTypes.bool,
  icon: PropTypes.elementType,
};

export default Descript;
