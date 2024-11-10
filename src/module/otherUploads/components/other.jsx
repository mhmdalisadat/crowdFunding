import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { OnRun } from 'src/api/OnRun';
import { getCookie } from 'src/api/cookie';
import useCartId from 'src/hooks/use-cartId';
import useNavigateStep from 'src/hooks/use-navigate-step';
import Loader from 'src/components/loader';
import SmallLoader from 'src/components/SmallLoader';

import { useFinishCart } from 'src/hooks/useFinishCart';
import api from 'src/api/apiClient';
import { getFormData } from '../utils/getFormData';
import useFetchData from '../hooks/fetchData';
import Inputs from '../Feature/inputs';

const Other = () => {
  const { cartId } = useCartId();
  const { incrementPage } = useNavigateStep();

  const [loading, setLoading] = useState(false);

  const [Data, setData] = useState({
    Lock_claims_status: false,
    Lock_announcement_of_changes_managers: false,
    Lock_announcement_of_changes_capital: false,
    Lock_bank_account_turnover: false,
    Lock_statutes: false,
    Lock_assets_and_liabilities: false,
    Lock_latest_insurance_staf: false,
    Lock_product_catalog: false,
    Lock_auditor_representative: false,
    Lock_announcing_account_number: false,
    Lock_licenses: false,
    claims_status: null,
    latest_insurance_staf: null,
    assets_and_liabilities: null,
    statutes: null,
    bank_account_turnover: null,
    announcement_of_changes_capital: null,
    announcement_of_changes_managers: null,
    product_catalog: null,
    auditor_representative: null,
    announcing_account_number: null,
    licenses: null,
  });

  const { isLoading, data } = useFetchData(cartId);

  const { data: finishCart, isLoading: loader } = useFinishCart(cartId);

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  const handleSubmit = async () => {
    setLoading(true);

    const formData = getFormData(Data);

    const access = await getCookie('access');

    const response = await api.post(`${OnRun}/api/addinformation/${cartId}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${access}`,
      },
    });

    toast.success('اطلاعات با موفقیت ارسال شد!');
    setLoading(false);

    incrementPage();
    console.error('خطا در ارسال اطلاعات:');
    toast.error('خطا در ارسال اطلاعات');
    setLoading(false);
    return response.data;
  };

  const isDisabled = loader || finishCart?.cart?.finish_cart === true;

  return (
    <div>
      <div className="flex items-center justify-center">
        <ToastContainer />
        <div className="bg-white w-[80%] md:w-[60%] items-center  shadow-2xl rounded-lg p-6 ">
          <div className="bg-gray-200 w-full text-white rounded-t-md p-2 text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-700"> پیوست موارد دیگر</h1>
          </div>
          <p className="mt-4 mb-4">
            تایپ های مجاز برای ارسال فایل :png ,jpg ,pdf ,rar ,jpeg ,docx ,xlsx ,csv ,xls , zip
          </p>
          <Inputs Data={Data} setData={setData} />

          <div className="flex flex-col justify-center items-center mt-10">
            <button
              type="button"
              onClick={handleSubmit}
              className={`flex items-center px-4 py-2 
              ${
                loading || isDisabled
                  ? 'bg-gray-500 cursor-not-allowed opacity-50'
                  : 'bg-blue-500 hover:bg-blue-600'
              } 
              text-white rounded-md font-semibold transition-all`}
              disabled={loading || isDisabled}
            >
              {loading ? 'در حال ارسال...' : 'ثبت'}
            </button>
          </div>

          {(isLoading || loading) && (
            <div className="flex justify-center mt-4">
              <SmallLoader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Other;
