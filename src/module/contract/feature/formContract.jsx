import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import useCartId from 'src/hooks/use-cartId';
import InputPercent from 'src/components/input/inputPercent';
import SelectInput from 'src/components/input/inputSelect';
import { useFinishCart } from 'src/hooks/useFinishCart';
import useGetContract from '../hooks/useGetContract';
import ToggleContract from '../componets/toggelContract';
import usePostContract from '../hooks/use-contract';

const FormContract = () => {
  const { cartId } = useCartId();
  const [contractData, setContractData] = useState({});
  const { data: dataContract, isError } = useGetContract(cartId);
  const { mutate, isLoading, isError: err } = usePostContract(cartId);

  const handleSubmit = () => {
    mutate(contractData);
    toast.success('اطلاعات با موفقیت بارگزاری شد');
    
  };

  const periodOptions = [{ type: '1', title: '3ماهه' }];

  const toggleLabels = [
    { label: 'متقاضی تعهد می‌نماید مشمول ماده ۱۴۱ نباشد.', toggleKey: 'role_141' },
    { label: 'متقاضی تعهد می‌نماید هیچگونه چک برگشتی نداشته باشد.', toggleKey: 'bounced_check' },
    {
      label: 'متقاضی تعهد می‌نماید هیچگونه بدهی غیر جاری در شعبه بانکی نداشته باشد.',
      toggleKey: 'non_current_debt',
    },
    { label: 'عامل این شرکت، دارای هیچگونه سابقه کیفری نباشند.', toggleKey: 'criminal_record' },
    {
      label: 'متقاضی تعهد می‌نماید هیچ یک از اعضای هیئت مدیره این شرکت ممنوع المعامله نباشند.',
      toggleKey: 'Prohibited',
    },
    {
      label:
        'متقاضی متعهد است، پیش از انتشار کمپین نسبت به واریز حداقل 10 درصد از سرمایه مورد نیاز اقدام نماید.',
        toggleKey: 'minimum_deposit_10',
    },
  ];

  const guaranteeOptions = [
    { type: '1', title: ' تعهد پرداخت بانکی ' },
    { type: '2', title: 'حسن پرداخت ' },
    { type: '3', title: '(چک)اوراق بهادار' },
  ];

  const handleChangeToggle = (e, toggleKey) => {
    const { checked } = e.target;
    setContractData((prevData) => ({
      ...prevData,
      [toggleKey]: checked,
    }));
  };

  useEffect(() => {
    if ((dataContract && !isError) || err) {
      setContractData(dataContract?.cart);
    }
  }, [dataContract, isError, err]);

  const { data: finishCart, isLoading: loader } = useFinishCart(cartId);

  const isDisabledCart = loader || finishCart?.cart?.finish_cart === true;

  return (
    <>
      <ToastContainer autoClose={3000} />
      <div dir="rtl" className="">
        <div className="bg-gray-200 text-white rounded-t-md p-2 text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">اطلاعات قرارداد عاملیت</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-6 p-6 bg-white rounded-lg">
          <InputPercent
            label="درصد شناوری تامین مالی"
            value={contractData}
            handle={(updatedData) => setContractData(updatedData)}
            keyName="swimming_percentage"
          />
          <InputPercent
            label="درصد سود مشارکت اسمی"
            value={contractData}
            handle={(updatedData) => setContractData(updatedData)}
            keyName="partnership_interest"
          />
          <SelectInput
            label="نوع ضمانت"
            value={contractData.guarantee || ''}
            options={guaranteeOptions}
            setContractData={setContractData}
            contractData={contractData}
            keyName="guarantee"
          />
          <SelectInput
            label="دوره پرداخت"
            value={contractData.payback_period || ''}
            options={periodOptions}
            setContractData={setContractData}
            contractData={contractData}
            keyName="payback_period"
          />
        </div>

        {toggleLabels.map(({ label, toggleKey }) => {
          const lockKey = `Lock_${toggleKey}`;
          const isDisabled = contractData[lockKey] === true;

          return (
            <ToggleContract
              key={toggleKey}
              label={label}
              value={contractData}
              checked={contractData?.[toggleKey] || false}
              handle={(e) => handleChangeToggle(e, toggleKey)}
              name={toggleKey}
              disabled={isDisabled}
            />
          );
        })}
      </div>
      <div className="flex flex-col justify-center items-center mt-10">
        <button
          type="button"
          onClick={handleSubmit}
          className={`flex items-center px-4 py-2 
      ${
        isLoading || isDisabledCart
          ? 'bg-gray-500 cursor-not-allowed opacity-50'
          : 'bg-blue-500 hover:bg-blue-600'
      } 
      text-white rounded-md font-semibold transition-all`}
          disabled={isLoading || isDisabledCart}
        >
          {isLoading ? 'در حال ارسال...' : 'ارسال اطلاعات'}
        </button>
      </div>
    </>
  );
};

export default FormContract;