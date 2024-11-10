import React from 'react';
import { OnRun } from 'src/api/OnRun';

import { AiOutlineInfoCircle } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { handleFileRemove } from '../utils/removeUploadFiles';
import { renderFileSection } from './renderFiles';

const CompanyUploads = ({ localData, setLocalData }) => {
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <div className="flex items-center justify-center mb-8">
        <AiOutlineInfoCircle className="text-2xl text-red-600 mr-2" />
        <p className="text-xl text-red-600 font-semibold">حجم فایل می تواند 20 مگابایت باشد</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="bg-white p-6">
          <h2 className="text-center text-gray-700 text-xl border-b font-bold mb-6 pb-4">
            گزارشات و مستندات منتهی به سال 1402
          </h2>

          {renderFileSection(
            'financial_report_lastyear',
            'صورت مالی',
            '1402 فایل صورت مالی',
            localData,
            setLocalData,
            handleFileRemove,
            OnRun
          )}

          {renderFileSection(
            'audit_report_lastyear',
            'حسابرسی گزارش',
            '1402 فایل گزارش حسابرسی',
            localData,
            setLocalData,
            handleFileRemove,
            OnRun
          )}

          {renderFileSection(
            'statement_lastyear',
            'اظهارنامه مالیات برعملکرد',
            '1402 فایل اظهارنامه',
            localData,
            setLocalData,
            handleFileRemove,
            OnRun
          )}
        </div>

   
        <div className="bg-white p-6">
          <h2 className="text-center text-gray-700 text-xl font-bold mb-6 border-b pb-4">
            گزارشات و مستندات منتهی به سال 1401
          </h2>

          {renderFileSection(
            'financial_report_yearold',
            'صورت مالی',
            '1401 فایل صورت مالی',
            localData,
            setLocalData,
            handleFileRemove,
            OnRun
          )}

          {renderFileSection(
            'audit_report_yearold',
            'حسابرسی گزارش',
            '1401 فایل گزارش حسابرسی',
            localData,
            setLocalData,
            handleFileRemove,
            OnRun
          )}

          {renderFileSection(
            'statement_yearold',
            'اظهارنامه مالیات برعملکرد',
            '1401 فایل اظهارنامه',
            localData,
            setLocalData,
            handleFileRemove,
            OnRun
          )}
        </div>

        <div className="bg-white p-6">
          <h2 className="text-center text-gray-700 text-xl font-bold mb-6 border-b pb-4">
            گزارشات و مستندات به روز
          </h2>

          {renderFileSection(
            'alignment_6columns_thisyear',
            'تراز 6ستونی',
            'فایل تراز 6ستونی',
            localData,
            setLocalData,
            handleFileRemove,
            OnRun
          )}
        </div>

   
        <div className="bg-white p-6">
          <h2 className="text-center text-gray-700 text-xl font-bold mb-6 border-b pb-4">
            لوگوی شرکت
          </h2>
          {renderFileSection(
            'logo',
            'لوگو',
            'فایل لوگو',
            localData,
            setLocalData,
            handleFileRemove,
            OnRun
          )}
        </div>
      </div>
    </div>
  );
};

CompanyUploads.propTypes = {
  localData: PropTypes.object.isRequired,
  setLocalData: PropTypes.func.isRequired,
};

export default CompanyUploads;
