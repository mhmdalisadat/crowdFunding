/* eslint-disable react/button-has-type */
/* eslint-disable import/order */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';
import HistoryRow from './historyRow';
import useCartId from 'src/hooks/use-cartId';
import useNavigateStep from 'src/hooks/use-navigate-step';
import { DateObject } from 'react-multi-date-picker';
import SmallLoader from 'src/components/SmallLoader';
import { useFinishCart } from 'src/hooks/useFinishCart';
import api from 'src/api/apiClient';

const HistoryList = () => {
  const { cartId } = useCartId();
  const [historyList, setHistoryList] = useState([]);
  const { incrementPage } = useNavigateStep();
  const [loading, setLoading] = useState(false);

  const fetchManagerData = async () => {
    try {
      const access = await getCookie('access');
      const response = await api.get(`${OnRun}/api/history/${cartId}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      if (response.data) {
        const manager = response.data.manager.map((i) => ({ ...i, date: new DateObject(i.date) }));
        setHistoryList(manager);
      }
    } catch (error) {
      console.error('خطا در دریافت اطلاعات:', error);
      toast.error('خطا!! مدیران یافت نشد , یک مدیر ایجاد کنید');
    }
  };
  const handleSubmit = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      let hasFile = false;

      historyList.forEach((element) => {
        if (element.file) {
          formData.append(element.national_code, element.file);
          const timestamp = element.date.toDate().getTime();
          formData.append(`${element.national_code}_date`, timestamp);
          hasFile = true;
        }
      });

      if (!hasFile) {
        toast.info('لطفا فایل‌ مورد نیاز را بارگذاری کنید');
        setLoading(false);
        return;
      }

      const access = await getCookie('access');
      await api.post(`${OnRun}/api/history/${cartId}/`, formData, {
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

  useEffect(() => {
    fetchManagerData();
  }, []);

  const { data: finishCart, isLoading: loader } = useFinishCart(cartId);

  const isDisabled = loader || finishCart?.cart?.finish_cart === true;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="bg-gray-200 w-full text-white rounded-t-md p-2 text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-700">سوء پیشینه</h1>
      </div>
      <ToastContainer />

      <div className="rounded-lg shadow-inner">
        {historyList.map((item, index) => (
          <div key={index}>
            <HistoryRow index={index} list={historyList} item={item} setList={setHistoryList} />
          </div>
        ))}
      </div>
      <p className="mt-4">
        تایپ های مجاز برای ارسال فایل :png ,jpg ,pdf ,rar ,jpeg ,docx ,xlsx ,csv ,xls , zip
      </p>
      <div className="flex flex-col justify-center items-center mt-10">
        <button
          onClick={handleSubmit}
          className={`flex items-center px-4 py-2 
      ${
        // eslint-disable-next-line no-nested-ternary
        loading
          ? 'bg-gray-500 cursor-wait'
          : isDisabled
          ? 'bg-gray-400 cursor-not-allowed opacity-50'
          : 'bg-blue-500 hover:bg-blue-600'
      } 
      text-white rounded-md font-semibold transition-all`}
          disabled={isDisabled || loading}
        >
          {loading ? 'در حال ارسال...' : 'ثبت'}
        </button>
      </div>

      {loading && (
        <div className="flex justify-center mt-4">
          <SmallLoader />
        </div>
      )}
    </div>
  );
};

export default HistoryList;
