/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { OnRun } from 'src/api/OnRun';
import { FiDownload } from 'react-icons/fi';
import { BsCloudUploadFill } from 'react-icons/bs';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

const ValidateRow = ({ index, list, item, setList }) => {
  const updateFile = (file, national_code) => {
    const updatedList = list.map((i) => (i.national_code === national_code ? { ...i, file } : i));
    setList(updatedList);
  };

  const handleFileRemove = (national_code) => {
    const updatedList = list.map((i) =>
      i.national_code === national_code ? { ...i, file_manager: '' } : i
    );
    setList(updatedList);
  };
  const handleDateChange = (date) => {
    const updatedList = [...list];
    updatedList[index].date = date;
    setList(updatedList);
  };
  return (
    <div
      key={index}
      className="flex flex-wrap justify-between  gap-8 disabled:bg-gray-300 mt-8 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out relative w-full"
    >
      <div className="flex items-center  w-full sm:w-auto">
        <label className="text-gray-900 font-semibold">اسم:</label>
        <div className="text-gray-700 text-sm font-medium">{item.name}</div>
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto">
        <label className="text-gray-900 font-semibold">کد ملی:</label>
        <div className="text-gray-700 text-sm font-medium">{item.national_code}</div>
      </div>
      <div className="min-w-[150px] ml-3">
        <span className="text-black">تاریخ:</span>
        <DatePicker
          style={{
            width: '100%',
            padding: 16,
            backgroundColor: '#ffffff',
            marginTop: '12px',
          }}
          value={item.date ? new Date(item.date) : null}
          onChange={handleDateChange}
          calendar={persian}
          locale={persian_fa}
          className="shadow appearance-none border bg-white border-gray-300 rounded-lg w-full text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
        />
      </div>
      <div className="flex items-center gap-4 w-full sm:w-auto">
        {typeof item.file_manager === 'string' && item.file_manager ? (
          <div className="flex flex-wrap gap-4 justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner w-full sm:w-auto">
            <a
              href={`${OnRun}${item.file_manager}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm flex font-medium ${
                item.lock ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              <FiDownload />
              دانلود فایل
            </a>
            <button
              type="button"
              className="text-red-400 hover:text-red-600 disabled:text-gray-200"
              onClick={() => handleFileRemove(item.national_code)}
              disabled={item.lock}
            >
              حذف
            </button>
          </div>
        ) : (
          <div className="flex items-center rounded-lg shadow-lg p-3 bg-gray-100 w-full sm:w-auto">
            <label className="flex items-center rounded-md bg-gradient-to-tr from-blue-500 to-blue-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              انتخاب فایل
              <BsCloudUploadFill className="ml-2" />
              <input
                name="file_upload"
                type="file"
                onChange={(e) => updateFile(e.target.files[0], item.national_code)}
                disabled={item.lock}
                className="hidden"
              />
            </label>
            <span className="ml-4 mr-8 text-xs">
              {item.file ? item.file.name : ' فایلی انتخاب نشده'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

ValidateRow.propTypes = {
  index: PropTypes.number.isRequired,
  list: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
  setList: PropTypes.func.isRequired,
};

export default ValidateRow;
