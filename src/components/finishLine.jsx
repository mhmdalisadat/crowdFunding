import React from 'react';

const CompletionMessage = () => (
  <div className="bg-white shadow-lg rounded-lg p-6 text-center">
    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full">
      <svg
        className="w-6 h-6 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h2 className="text-2xl font-bold text-gray-800">فرایند با موفقیت به پایان رسید!</h2>
    <p className="mt-2 text-gray-600"> عملیات مورد نظر شما با موفقیت انجام شد.</p>
    <button
      type="button"
      className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition-all duration-300"
    >
      بازگشت به بخش درخواست ها
    </button>
  </div>
);

export default CompletionMessage;
