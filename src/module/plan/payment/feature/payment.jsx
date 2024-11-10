/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { formatNumber } from 'src/utils/formatNumbers';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AgreementPopup from 'src/components/Agreement';
import { motion } from 'framer-motion';
import usePlan from '../../service/use-plan';
import PayCheck from './payCheck';
import PaymentContext from '../service/paymentContext';
import usePayment from '../service/use-postpayment';
import PaymentGateway from './PaymentGateway';
import useDargah from '../service/useDargah';

const Payment = () => {
  const { traceCode } = useParams();

  const { mutate: mutatepost, error, isError } = useDargah(traceCode);

  if (isError || error) {
    toast.error('تعداد گواهی مجاز هست');
  }

  const {
    amount,
    setAmount,
    paymentMethod,
    setPaymentMethod,
    attachment,
    setAttachment,
    paymentId,
    setPaymentId,
    description,
    setDescription,
    status,
    setStatus,
    isPopupOpen,
    setIsPopupOpen,
  } = useContext(PaymentContext);

  const { data } = usePlan(traceCode);

  const totalPrice = Number(data?.plan?.unit_price) * Number(amount) || '';

  const {
    mutate: mutateFish,
    errorpost,
    isError: errorFish,
  } = usePayment(traceCode);

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    if (method !== 'fesh') {
      setAttachment(null);
      setDescription('');
      setPaymentId('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount < 1000) {
      alert('حداقل گواهی مشارکت باید 1000 عدد باشد.');
      return;
    }
    mutateFish(
      {
        amount,
        name_status: status,
        payment_id: paymentId,
        description,
        risk_statement: true,
        picture: attachment,
      },
      {
        onSuccess: () => toast.success('پرداخت با موفقیت ثبت شد!'),
      }
    );
  };

  const handleDargah = () => {
    mutatepost(
      { totalPrice, status },
      {
        // eslint-disable-next-line no-shadow
        onSuccess: (data) => {
          if (data?.url) {
            window.location.href = data.url;
          } else {
            console.error('No URL found in the response');
          }
        },
        onError: (err) => {
          console.error('Error during the payment process:', err);
        },
      }
    );
  };

  if (errorpost || errorFish) {
    toast.error('تعداد گواهی مجاز نیست');
  }

  const handleAgreementAccept = () => setIsPopupOpen(false);

  return (
    <div className="flex-col gap-6 p-8 max-w-4xl mx-auto">
      <ToastContainer />
      <h4 className="text-3xl text-center font-bold text-gray-900 mb-6">شروع سرمایه گذاری</h4>
      <p className="text-blue-800 text-lg font-semibold">
        قیمت هر گواهی: <span>{formatNumber(data?.plan?.unit_price)} ریال</span>
      </p>

      <div className="flex flex-col w-full mb-4 px-8">
        <label className="text-gray-700 font-medium mb-2">تعداد گواهی مشارکت:</label>
        <input
          type="number"
          placeholder="حداقل تعداد باید 10000 باشد "
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="shadow-md bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:shadow-lg transition-all"
        />
      </div>

      <div className="px-8">
        <p className="text-blue-800 text-lg font-semibold">
          مبلغ کل : <span>{formatNumber(totalPrice)}ریال</span>
        </p>
      </div>

      <div className="mt-6 px-8">
        <h3 className="text-gray-800 text-xl font-semibold mb-4">روش پرداخت:</h3>
        <div className="flex space-x-12">
          {['fesh', 'dargah'].map((method) => (
            <motion.button
              key={method}
              type="button"
              onClick={() => handlePaymentMethodSelect(method)}
              className={`px-4 py-2 rounded-lg border ${
                paymentMethod === method ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
              } transition-colors duration-200`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {method === 'fesh' ? 'پرداخت با فیش' : 'پرداخت درگاه'}
            </motion.button>
          ))}
        </div>
      </div>

      <PayCheck handleSubmit={handleSubmit} />
      <div className="mt-10">
        <PaymentGateway handleDargah={handleDargah} />
      </div>
      <div className="flex items-center gap-2 mt-6 px-8">
        <input
          type="checkbox"
          id="show-name"
          checked={status}
          onChange={() => setStatus(!status)}
          className="h-5 w-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="show-name" className="text-gray-700 font-medium">
          اطلاعات شما برای دیگر کاربران قابل روئیت باشد؟
        </label>
      </div>

      {isPopupOpen && <AgreementPopup onAccept={handleAgreementAccept} />}
    </div>
  );
};

export default Payment;
