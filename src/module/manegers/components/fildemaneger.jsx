/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

const Fildemnager = ({ index, field, setField }) => {
  const types = [
    { type: false, title: 'حقیقی' },
    { type: true, title: 'حقوقی' },
  ];
  const obliged = [
    { type: true, title: 'بله' },
    { type: false, title: 'خیر' },
  ];
  const position = [
    { type: 1, title: 'رئیس هیئت مدیره' },
    { type: 2, title: 'نایب رئیس' },
    { type: 3, title: 'عضو هیئت مدیره' },
    { type: 4, title: 'مدیرعامل' },
    { type: 5, title: ' مدیرعامل و عضو هیئت مدیره' },
  ];

  const handleChange = (input, value) => {
    const pervRow = field[index];

    let processedValue;
    if (value === 'true') {
      processedValue = true;
    } else if (value === 'false') {
      processedValue = false;
    } else {
      processedValue = value;
    }

    const newRow = { ...pervRow, [input]: processedValue };

    if (input === 'is_legal' && processedValue === false) {
      newRow.national_id = '';
      newRow.representative = '';
    }

    const updateField = [...field];
    updateField[index] = newRow;
    setField(updateField);
  };

  return (
    <div className="p-6 rounded-lg shadow-md">
      <form className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              نام و نام خانوادگی :
            </label>
            <input
              type="text"
              name="name"
              autoComplete="off"
              disabled={field[index].lock}
              value={field[index].name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              className="shadow bg-white appearance-none border rounded disabled:bg-gray-200 text-black w-full py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">نوع :</label>
            <select
              value={field[index].is_legal}
              disabled={field[index].lock}
              onChange={(e) => handleChange('is_legal', e.target.value)}
              name="is_legal"
              className="block w-full border bg-white rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {types.map((typeObj, i) => (
                <option key={i} value={typeObj.type}>
                  {typeObj.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">موظف :</label>
            <select
              value={field[index].is_obliged}
              onChange={(e) => handleChange('is_obliged', e.target.value)}
              disabled={field[index].lock}
              name="is_obliged"
              className="shadow appearance-none bg-white border rounded  w-full py-3 px-4 text-black disabled:bg-slate-200 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            >
              {obliged.map((typeObj, i) => (
                <option key={i} value={typeObj.type}>
                  {typeObj.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 text-xs font-semibold mb-2">سمت:</label>
            <select
              name="position"
              value={field[index].position}
              disabled={field[index].lock}
              onChange={(e) => handleChange('position', e.target.value)}
              className="shadow appearance-none border bg-white border-gray-300 rounded-lg w-full py-3 px-4 text-black disabled:bg-slate-200 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
            >
              <option value="">انتخاب کنید</option>
              {position.map((typeObj, i) => (
                <option key={i} value={typeObj.type}>
                  {typeObj.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">کدملی :</label>
            <input
              type="text"
              name="national_code"
              autoComplete="off"
              value={field[index].national_code}
              onChange={(e) => handleChange('national_code', e.target.value)}
              maxLength={10}
              disabled={field[index].lock}
              onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
              required
              className="shadow appearance-none border bg-white disabled:bg-gray-200 text-black rounded w-full py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          {field[index].is_legal && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  شناسه ملی شرکت:{' '}
                </label>
                <input
                  type="text"
                  value={field[index].national_id}
                  autoComplete="off"
                  onChange={(e) => handleChange('national_id', e.target.value)}
                  onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
                  name="national_id"
                  maxLength={11}
                  className="block w-full border bg-white rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">نماینده :</label>
                <input
                  type="text"
                  value={field[index].representative}
                  autoComplete="off"
                  onChange={(e) => handleChange('representative', e.target.value)}
                  name="representative"
                  className="block w-full border bg-white rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

Fildemnager.propTypes = {
  index: PropTypes.number.isRequired,
  field: PropTypes.array.isRequired,
  setField: PropTypes.func.isRequired,
};

export default Fildemnager;
