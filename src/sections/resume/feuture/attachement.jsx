/* eslint-disable react/button-has-type */
/* eslint-disable import/order */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import Row from '../component/row';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';
import UseCartId from 'src/hooks/use-cartId';
import useNavigateStep from 'src/hooks/use-navigate-step';
import { useFinishCart } from 'src/hooks/useFinishCart';
import api from 'src/api/apiClient';

const Attachement = () => {
  const { cartId } = UseCartId();
  const [resumeList, setResumeList] = useState([]);

  const { incrementPage } = useNavigateStep();

  const fetchManagerData = async () => {
    try {
      const access = await getCookie('access');
      const response = await api.get(`${OnRun}/api/resume/${cartId}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      if (response.data && response.data.manager) {
        setResumeList(response.data.manager);
      }
    } catch (error) {
      console.error('خطا در دریافت اطلاعات:', error);
      toast.error('خطا!! مدیران یافت نشد , یک مدیر ایجاد کنید');
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      let hasFile = false;

      resumeList.forEach((element) => {
        if (element.file) {
          formData.append(element.national_code, element.file);
          hasFile = true;
        }
      });

      if (!hasFile) {
        toast.info('لطفا فایل‌ مورد نیاز را بارگذاری کنید');
        return;
      }

      const access = await getCookie('access');
      await api.post(`${OnRun}/api/resume/${cartId}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${access}`,
        },
        maxBodyLength: Infinity,
      });

      toast.success('اطلاعات با موفقیت ارسال شد!');
      incrementPage();
    } catch (error) {
      console.error('خطا :', error);
      toast.error('خطا در ارسال اطلاعات');
    }
  };

  const { data: finishCart, isLoading: loader } = useFinishCart(cartId);

  const isDisabled = loader || finishCart?.cart?.finish_cart === true;

  useEffect(() => {
    fetchManagerData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <ToastContainer />
      <div className="bg-gray-200 w-full text-white rounded-t-md p-2 text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-700">لیست رزومه ها</h1>
      </div>

      <div className="rounded-lg">
        {resumeList.map((item, index) => (
          <div key={index}>
            <Row index={index} list={resumeList} item={item} setList={setResumeList} />
          </div>
        ))}
      </div>
      <p className="mt-4">
        تایپ های مجاز برای ارسال فایل :png ,jpg ,pdf ,rar ,jpeg ,docx ,xlsx ,csv ,xls , zip
      </p>
      <div className="flex flex-col justify-center items-center mt-10">
        <button
          onClick={handleSubmit}
          disabled={isDisabled}
          className={`py-2 w-full px-6 mx-24 text-white rounded-lg shadow-xl font-semibold transition-transform transform focus:outline-none focus:ring-4 focus:ring-blue-300 ${
            isDisabled
              ? 'bg-gray-400 cursor-not-allowed opacity-50' // Disabled state styles
              : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'
          }`}
        >
          ثبت
        </button>
      </div>
    </div>
  );
};

export default Attachement;
