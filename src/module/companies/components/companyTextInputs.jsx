/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { cleanNumber, formatNumber } from '../../../utils/formatNumbers';
import { CompanyOnlyLetters } from '../utils/onlyLetters';
import { companyTypes } from '../utils/companySelectionTypes';

const CompanyInputs = ({ localData, setLocalData }) => {
  const InputValues = (e) => {
    const { name, value } = e.target;
    const cleanedValue = cleanNumber(value);
    setLocalData({ ...localData, [name]: cleanedValue });
  };

  const handleDateChange = (date) => {
    const updatedData = { ...localData };
    updatedData.year_of_establishment = new Date(date).toISOString();
    setLocalData(updatedData);
  };

  const handleDateChangeNewse = (date) => {
    const updatedData = { ...localData };
    updatedData.date_newspaper = new Date(date).toISOString();
    setLocalData(updatedData);
  };

  return (
    <div className=" grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6 p-6 bg-white rounded-lg ">
      <div className="mb-6">
        <label className="block text-gray-800 text-xs font-semibold mb-2">نام شرکت:</label>
        <input
          type="text"
          autoComplete="off"
          value={localData.company_name || ''}
          name="company_name"
          disabled={localData.Lock_company_name}
          onChange={InputValues}
          onKeyDown={CompanyOnlyLetters}
          className="shadow appearance-none disabled:bg-gray-200 border bg-white border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-800 text-xs font-semibold mb-2">نوع شرکت: </label>
        <select
          name="company_kind"
          value={localData.company_kind || ''}
          disabled={localData.Lock_company_kind}
          onChange={InputValues}
          className="shadow appearance-none border bg-white border-gray-300 rounded-lg w-full py-3 px-4 text-black disabled:bg-slate-200 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
        >
          <option value="">انتخاب کنید</option>
          {companyTypes.map((typeObj, index) => (
            <option key={index} value={typeObj.type}>
              {typeObj.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-gray-800 text-xs font-semibold mb-2">شماره شناسه:</label>
        <input
          type="text"
          autoComplete="off"
          name="nationalid"
          disabled={localData.Lock_nationalid}
          value={localData.nationalid || ''}
          onChange={InputValues}
          maxLength={11}
          className="shadow appearance-none border bg-white border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-800 text-xs font-semibold mb-2">شماره ثبت:</label>
        <input
          type="text"
          autoComplete="off"
          name="registration_number"
          value={localData.registration_number || ''}
          disabled={localData.Lock_registration_number}
          onChange={InputValues}
          maxLength={11}
          className="shadow appearance-none border bg-white border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-800 text-xs font-semibold mb-2">
          سرمایه ثبتی (ریال):
        </label>
        <input
          type="text"
          name="registered_capital"
          value={formatNumber(localData.registered_capital) || ''}
          disabled={localData.Lock_registered_capital}
          autoComplete="off"
          onChange={InputValues}
          className="shadow appearance-none border bg-white border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-800 text-xs font-semibold mb-2">تعداد سهام ثبتی</label>
        <input
          type="text"
          name="amount_of_registered_shares"
          value={formatNumber(localData.amount_of_registered_shares || '')}
          disabled={localData.lock_amount_of_registered_shares}
          onChange={InputValues}
          className="shadow appearance-none border bg-white border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-800 text-xs text-nowrap  font-semibold mb-2">
          شماره روزنامه رسمی آخرین مدیران:
        </label>
        <input
          type="number"
          name="newspaper"
          autoComplete="off"
          value={localData.newspaper || ''}
          disabled={localData.Lock_newspaper}
          onChange={InputValues}
          maxLength={8}
          className="shadow appearance-none border bg-white border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-800 text-xs text-nowrap font-semibold mb-2">
          تاریخ روزنامه رسمی آخرین مدیران:
        </label>
        <DatePicker
          style={{
            width: '100%',
            padding: 22,
            backgroundColor: '#ffffff',
          }}
          value={localData.date_newspaper ? new DateObject(localData.date_newspaper) : null}
          onChange={handleDateChangeNewse}
          calendar={persian}
          disabled={localData.Lock_date_newspaper}
          locale={persian_fa}
          className="shadow appearance-none border bg-white border-gray-300 rounded-lg w-full text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-800 text-xs font-semibold mb-2">تعداد کارکنان:</label>
        <input
          type="number"
          autoComplete="off"
          name="personnel"
          value={localData.personnel || ''}
          disabled={localData.Lock_personnel}
          onChange={InputValues}
          className="shadow appearance-none border bg-white border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-800 text-xs font-semibold mb-2">شهر محل ثبت :</label>
        <input
          type="text"
          name="city"
          autoComplete="off"
          value={localData.city || ''}
          disabled={localData.lock_city}
          onChange={InputValues}
          className="shadow  border border-gray-300 bg-white rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-800 text-xs font-semibold mb-2">آدرس شرکت:</label>
        <input
          type="text"
          name="address"
          autoComplete="off"
          value={localData.address || ''}
          disabled={localData.Lock_address}
          onChange={InputValues}
          className="shadow appearance-none border bg-white border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-800 text-xs font-semibold mb-2">تاریخ تاسیس :</label>
        <DatePicker
          style={{
            width: '100%',
            padding: 22,
            backgroundColor: '#ffffff',
          }}
          value={localData.year_of_establishment ? new Date(localData.year_of_establishment) : null}
          onChange={handleDateChange}
          calendar={persian}
          locale={persian_fa}
          disabled={localData.Lock_year_of_establishment}
          className="shadow appearance-none border bg-white border-gray-300 rounded-lg w-full text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-800 text-xs font-semibold mb-2">کد بورسی </label>
        <input
          type="text"
          name="exchange_code"
          autoComplete="off"
          value={localData.exchange_code || ''}
          disabled={localData.lock_exchange_code}
          onChange={InputValues}
          className="shadow appearance-none border bg-white border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-800 text-xs font-semibold mb-2">کدپستی:</label>
        <input
          type="number"
          name="postal_code"
          autoComplete="off"
          value={localData.postal_code || ''}
          disabled={localData.lock_postal_code}
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) {
              value = value.slice(0, 10);
            }
            InputValues({ target: { name: 'postal_code', value } });
          }}
          maxLength={10}
          className="shadow appearance-none border bg-white border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-800 text-xs font-semibold mb-2">ایمیل شرکت:</label>
        <input
          type="email"
          name="email"
          autoComplete="off"
          value={localData.email || ''}
          disabled={localData.Lock_email}
          onChange={InputValues}
          className="shadow appearance-none border bg-white border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-800 text-xs font-semibold mb-2">موضوع فعالیت شرکت:</label>
        <input
          name="activity_industry"
          autoComplete="off"
          value={localData.activity_industry || ''}
          disabled={localData.Lock_activity_industry}
          onChange={InputValues}
          className="shadow appearance-none border bg-white border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
        />
      </div>
      <div className="col-span-full mt-8 flex flex-col justify-center items-center">
        <label className="block disabled:bg-gray-200 text-black text-xs font-medium mb-4 text-center">
          میزان منابع درخواستی (ریال):
        </label>
        <input
          type="range"
          name="amount_of_request"
          autoComplete="off"
          min={10000000000}
          max={250000000000}
          step={10000000000}
          value={localData.amount_of_request || ''}
          disabled={localData.Lock_amount_of_request}
          onChange={InputValues}
          className="w-1/2 "
        />
        <span className="block  text-gray-700 text-xs mt-4 text-center font-medium">
          {formatNumber(localData.amount_of_request)} ریال
        </span>
      </div>
    </div>
  );
};

CompanyInputs.propTypes = {
  localData: PropTypes.object.isRequired,
  setLocalData: PropTypes.func.isRequired,
};

export default CompanyInputs;
