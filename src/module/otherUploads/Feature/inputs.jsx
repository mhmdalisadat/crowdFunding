/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { OnRun } from 'src/api/OnRun';
import { BsCloudUploadFill } from 'react-icons/bs';

const Inputs = ({ Data, setData }) => {
  const handleFileRemove = (field) => {
    setData({ ...Data, [field]: null });
  };

  return (
    <>
      <div className="mb-6">
        <label className="block text-right text-gray-700 text-sm font-medium">وضعیت دعاوی:</label>

        {Data && Data.claims_status && typeof Data.claims_status === 'string' ? (
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
            <a
              href={Data.Lock_claims_status ? null : `${OnRun}/${Data.claims_status}`}
              onClick={(e) => Data.Lock_claims_status && e.preventDefault()}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium ${
                Data.Lock_claims_status ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              فایل وضعیت دعاوی
            </a>
            <button
              type="button"
              className="text-red-400 hover:text-red-600 disabled:text-gray-200"
              onClick={() => handleFileRemove('claims_status')}
              disabled={Data.Lock_claims_status}
            >
              حذف
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center rounded-lg shadow-lg p-3 bg-gray-100">
              <label className="flex items-center rounded-md bg-gradient-to-tr from-blue-500 to-blue-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                انتخاب فایل
                <BsCloudUploadFill className="ml-2" />
                <input
                  name="financial_report_yearold"
                  type="file"
                  onChange={(e) => setData({ ...Data, claims_status: e.target.files[0] })}
                  disabled={Data.claims_status}
                  className="hidden bg-white"
                />
              </label>
              <span className="ml-4 mr-8 text-sm">
                {Data.claims_status ? Data.claims_status.name : 'هیچ فایلی انتخاب نشده'}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-right text-gray-700 text-sm font-medium">
          آخرین لیست بیمه کارکنان:
        </label>

        {Data && typeof Data.latest_insurance_staf === 'string' ? (
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
            <a
              href={
                Data.Lock_latest_insurance_staf ? null : `${OnRun}/${Data.latest_insurance_staf}`
              }
              onClick={(e) => Data.Lock_latest_insurance_staf && e.preventDefault()}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium ${
                Data.Lock_latest_insurance_staf
                  ? 'text-gray-400'
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              فایل لیست بیمه کارکنان
            </a>
            <button
              type="button"
              className="text-red-400 hover:text-red-600 disabled:text-gray-200"
              onClick={() => handleFileRemove('latest_insurance_staf')}
              disabled={Data.Lock_latest_insurance_staf}
            >
              حذف
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center rounded-lg shadow-lg p-3 bg-gray-100">
              <label className="flex items-center rounded-md bg-gradient-to-tr from-blue-500 to-blue-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                انتخاب فایل
                <BsCloudUploadFill className="ml-2" />
                <input
                  name="latest_insurance_staf"
                  type="file"
                  onChange={(e) => setData({ ...Data, latest_insurance_staf: e.target.files[0] })}
                  disabled={Data.Lock_latest_insurance_staf}
                  className="hidden bg-white"
                />
              </label>
              <span className="ml-4 mr-8 text-sm">
                {Data.latest_insurance_staf
                  ? Data.latest_insurance_staf.name
                  : 'هیچ فایلی انتخاب نشده'}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-right text-gray-700 text-sm font-medium mb-2">
          لیست اظهار دارایی ها و بدهی ها :
        </label>

        {Data && typeof Data.assets_and_liabilities === 'string' ? (
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
            <a
              href={
                Data.Lock_assets_and_liabilities ? null : `${OnRun}/${Data.assets_and_liabilities}`
              }
              onClick={(e) => Data.Lock_assets_and_liabilities && e.preventDefault()}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium ${
                Data.Lock_assets_and_liabilities
                  ? 'text-gray-400'
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              فایل لیست اظهار دارایی ها و بدهی ها
            </a>
            <button
              type="button"
              className="text-red-400 hover:text-red-600 disabled:text-gray-200"
              onClick={() => handleFileRemove('assets_and_liabilities')}
              disabled={Data.Lock_assets_and_liabilities}
            >
              حذف
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center rounded-lg shadow-lg p-3 bg-gray-100">
              <label className="flex items-center rounded-md bg-gradient-to-tr from-blue-500 to-blue-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                انتخاب فایل
                <BsCloudUploadFill className="ml-2" />
                <input
                  name="statement_yearold"
                  type="file"
                  onChange={(e) => setData({ ...Data, assets_and_liabilities: e.target.files[0] })}
                  disabled={Data.Lock_assets_and_liabilities}
                  className="hidden bg-white"
                />
              </label>
              <span className="ml-4 mr-8 text-sm">
                {Data.assets_and_liabilities
                  ? Data.assets_and_liabilities.name
                  : 'هیچ فایلی انتخاب نشده'}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-right text-gray-700 text-sm font-medium mb-2">اساسنامه:</label>

        {Data && typeof Data.statutes === 'string' ? (
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
            <a
              href={Data.Lock_statutes ? null : `${OnRun}/${Data.statutes}`}
              onClick={(e) => Data.Lock_statutes && e.preventDefault()}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium ${
                Data.Lock_statutes ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              فایل اساسنامه
            </a>
            <button
              type="button"
              className="text-red-400 hover:text-red-600 disabled:text-gray-200"
              onClick={() => handleFileRemove('statutes')}
              disabled={Data.Lock_statutes}
            >
              حذف
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center rounded-lg shadow-lg p-3 bg-gray-100">
              <label className="flex items-center rounded-md bg-gradient-to-tr from-blue-500 to-blue-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                انتخاب فایل
                <BsCloudUploadFill className="ml-2" />
                <input
                  name="statutes"
                  type="file"
                  onChange={(e) => setData({ ...Data, statutes: e.target.files[0] })}
                  disabled={Data.Lock_statutes}
                  className="hidden bg-white"
                />
              </label>
              <span className="ml-4 mr-8 text-sm">
                {Data.statutes ? Data.statutes.name : 'هیچ فایلی انتخاب نشده'}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-right text-gray-700 text-sm font-medium mb-2">
          گردش حسابهای مالی اصلی شرکت:
        </label>

        {Data && typeof Data.bank_account_turnover === 'string' ? (
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
            <a
              href={
                Data.Lock_bank_account_turnover ? null : `${OnRun}/${Data.bank_account_turnover}`
              }
              onClick={(e) => Data.Lock_bank_account_turnover && e.preventDefault()}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium ${
                Data.Lock_bank_account_turnover
                  ? 'text-gray-400'
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              فایل گردش حسابهای بانکی اصلی شرکت
            </a>
            <button
              type="button"
              className="text-red-400 hover:text-red-600 disabled:text-gray-200"
              onClick={() => handleFileRemove('bank_account_turnover')}
              disabled={Data.Lock_bank_account_turnover}
            >
              حذف
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center rounded-lg shadow-lg p-3 bg-gray-100">
              <label className="flex items-center rounded-md bg-gradient-to-tr from-blue-500 to-blue-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                انتخاب فایل
                <BsCloudUploadFill className="ml-2" />
                <input
                  name="bank_account_turnover"
                  type="file"
                  onChange={(e) => setData({ ...Data, bank_account_turnover: e.target.files[0] })}
                  disabled={Data.Lock_bank_account_turnover}
                  className="hidden bg-white"
                />
              </label>
              <span className="ml-4 mr-8 text-sm">
                {Data.bank_account_turnover
                  ? Data.bank_account_turnover.name
                  : 'هیچ فایلی انتخاب نشده'}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-right text-gray-700 text-sm font-medium mb-2">
          آگهی آخرین تغییرات سرمایه ای:
        </label>

        {Data && typeof Data.announcement_of_changes_capital === 'string' ? (
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
            <a
              href={
                Data.Lock_announcement_of_changes_capital
                  ? null
                  : `${OnRun}/${Data.announcement_of_changes_capital}`
              }
              onClick={(e) => Data.Lock_announcement_of_changes_capital && e.preventDefault()}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium ${
                Data.Lock_announcement_of_changes_capital
                  ? 'text-gray-400'
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              فایل آگهی آخرین تغییرات سرمایه ای
            </a>
            <button
              type="button"
              className="text-red-400 hover:text-red-600 disabled:text-gray-200"
              onClick={() => handleFileRemove('announcement_of_changes_capital')}
              disabled={Data.Lock_announcement_of_changes_capital}
            >
              حذف
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center rounded-lg shadow-lg p-3 bg-gray-100">
              <label className="flex items-center rounded-md bg-gradient-to-tr from-blue-500 to-blue-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                انتخاب فایل
                <BsCloudUploadFill className="ml-2" />
                <input
                  name="announcement_of_changes_capital"
                  type="file"
                  onChange={(e) =>
                    setData({
                      ...Data,
                      announcement_of_changes_capital: e.target.files[0],
                    })
                  }
                  disabled={Data.Lock_announcement_of_changes_capital}
                  className="hidden bg-white"
                />
              </label>
              <span className="ml-4 mr-8 text-sm">
                {Data.announcement_of_changes_capital
                  ? Data.announcement_of_changes_capital.name
                  : 'هیچ فایلی انتخاب نشده'}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-right text-gray-700 text-sm font-medium mb-2">
          آگهی آخرین تغییرات مدیران:
        </label>

        {Data && typeof Data.announcement_of_changes_managers === 'string' ? (
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
            <a
              href={
                Data.Lock_announcement_of_changes_managers
                  ? null
                  : `${OnRun}/${Data.announcement_of_changes_managers}`
              }
              onClick={(e) => Data.Lock_announcement_of_changes_managers && e.preventDefault()}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium ${
                Data.Lock_announcement_of_changes_managers
                  ? 'text-gray-400'
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              فایل آگهی آخرین تغییرات مدیران
            </a>
            <button
              type="button"
              className="text-red-400 hover:text-red-600 disabled:text-gray-200"
              onClick={() => handleFileRemove('announcement_of_changes_managers')}
              disabled={Data.Lock_announcement_of_changes_managers}
            >
              حذف
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center rounded-lg shadow-lg p-3 bg-gray-100">
              <label className="flex items-center rounded-md bg-gradient-to-tr from-blue-500 to-blue-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                انتخاب فایل
                <BsCloudUploadFill className="ml-2" />
                <input
                  name="announcement_of_changes_managers"
                  type="file"
                  onChange={(e) =>
                    setData({
                      ...Data,
                      announcement_of_changes_managers: e.target.files[0],
                    })
                  }
                  disabled={Data.Lock_announcement_of_changes_managers}
                  className="hidden bg-white"
                />
              </label>
              <span className="ml-4 mr-8 text-sm">
                {Data.announcement_of_changes_managers
                  ? Data.announcement_of_changes_managers.name
                  : 'هیچ فایلی انتخاب نشده'}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-right text-gray-700 text-sm font-medium mb-2">
          کاتالوگ محصولات
        </label>

        {Data && typeof Data.product_catalog === 'string' ? (
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
            <a
              href={Data.Lock_product_catalog ? null : `${OnRun}/${Data.product_catalog}`}
              onClick={(e) => Data.Lock_product_catalog && e.preventDefault()}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium ${
                Data.Lock_product_catalog ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              فایل کاتالوگ محصولات
            </a>
            <button
              type="button"
              className="text-red-400 hover:text-red-600 disabled:text-gray-200"
              onClick={() => handleFileRemove('product_catalog')}
              disabled={Data.Lock_product_catalog}
            >
              حذف
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center rounded-lg shadow-lg p-3 bg-gray-100">
              <label className="flex items-center rounded-md bg-gradient-to-tr from-blue-500 to-blue-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                انتخاب فایل
                <BsCloudUploadFill className="ml-2" />
                <input
                  name="announcement_of_changes_managers"
                  type="file"
                  onChange={(e) =>
                    setData({
                      ...Data,
                      product_catalog: e.target.files[0],
                    })
                  }
                  disabled={Data.Lock_product_catalog}
                  className="hidden bg-white"
                />
              </label>
              <span className="ml-4 mr-8 text-sm">
                {Data.product_catalog ? Data.product_catalog.name : 'هیچ فایلی انتخاب نشده'}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="mb-6">
        <label className="block text-right text-gray-700 text-sm font-medium mb-2">مجوز</label>

        {Data && typeof Data.licenses === 'string' ? (
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
            <a
              href={Data.Lock_licenses ? null : `${OnRun}/${Data.licenses}`}
              onClick={(e) => Data.Lock_licenses && e.preventDefault()}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium ${
                Data.Lock_licenses ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              فایل مجوز ها
            </a>
            <button
              type="button"
              className="text-red-400 hover:text-red-600 disabled:text-gray-200"
              onClick={() => handleFileRemove('licenses')}
              disabled={Data.Lock_licenses}
            >
              حذف
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center rounded-lg shadow-lg p-3 bg-gray-100">
              <label className="flex items-center rounded-md bg-gradient-to-tr from-blue-500 to-blue-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                انتخاب فایل
                <BsCloudUploadFill className="ml-2" />
                <input
                  name="licenses"
                  type="file"
                  onChange={(e) =>
                    setData({
                      ...Data,
                      licenses: e.target.files[0],
                    })
                  }
                  disabled={Data.Lock_licenses}
                  className="hidden bg-white"
                />
              </label>
              <span className="ml-4 mr-8 text-sm">
                {Data.licenses ? Data.licenses.name : 'هیچ فایلی انتخاب نشده'}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="mb-6">
        <label className="block text-right text-gray-700 text-sm font-medium mb-2">
          معرف حسابرس
        </label>

        {Data && typeof Data.auditor_representative === 'string' ? (
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
            <a
              href={
                Data.Lock_auditor_representative ? null : `${OnRun}/${Data.auditor_representative}`
              }
              onClick={(e) => Data.Lock_auditor_representative && e.preventDefault()}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium ${
                Data.Lock_auditor_representative
                  ? 'text-gray-400'
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              فایل معرف حسابرس
            </a>
            <button
              type="button"
              className="text-red-400 hover:text-red-600 disabled:text-gray-200"
              onClick={() => handleFileRemove('auditor_representative')}
              disabled={Data.Lock_auditor_representative}
            >
              حذف
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center rounded-lg shadow-lg p-3 bg-gray-100">
              <label className="flex items-center rounded-md bg-gradient-to-tr from-blue-500 to-blue-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                انتخاب فایل
                <BsCloudUploadFill className="ml-2" />
                <input
                  name="auditor_representative"
                  type="file"
                  onChange={(e) =>
                    setData({
                      ...Data,
                      auditor_representative: e.target.files[0],
                    })
                  }
                  disabled={Data.Lock_auditor_representative}
                  className="hidden bg-white"
                />
              </label>
              <span className="ml-4 mr-8 text-sm">
                {Data.auditor_representative
                  ? Data.auditor_representative.name
                  : 'هیچ فایلی انتخاب نشده'}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="mb-6">
        <label className="block text-right text-gray-700 text-sm font-medium mb-2">
          اعلان شماره حساب
        </label>

        {Data && typeof Data.announcing_account_number === 'string' ? (
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
            <a
              href={
                Data.Lock_announcing_account_number
                  ? null
                  : `${OnRun}/${Data.announcing_account_number}`
              }
              onClick={(e) => Data.Lock_announcing_account_number && e.preventDefault()}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium ${
                Data.Lock_announcing_account_number
                  ? 'text-gray-400'
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              فایل اعلان شماره حساب
            </a>
            <button
              type="button"
              className="text-red-400 hover:text-red-600 disabled:text-gray-200"
              onClick={() => handleFileRemove('announcing_account_number')}
              disabled={Data.Lock_announcing_account_number}
            >
              حذف
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center rounded-lg shadow-lg p-3 bg-gray-100">
              <label className="flex items-center rounded-md bg-gradient-to-tr from-blue-500 to-blue-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                انتخاب فایل
                <BsCloudUploadFill className="ml-2" />
                <input
                  name="announcing_account_number"
                  type="file"
                  onChange={(e) =>
                    setData({
                      ...Data,
                      announcing_account_number: e.target.files[0],
                    })
                  }
                  disabled={Data.Lock_announcing_account_number}
                  className="hidden bg-white"
                />
              </label>
              <span className="ml-4 mr-8 text-sm">
                {Data.announcing_account_number
                  ? Data.announcing_account_number.name
                  : 'هیچ فایلی انتخاب نشده'}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

Inputs.propTypes = {
  Data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
};

export default Inputs;
