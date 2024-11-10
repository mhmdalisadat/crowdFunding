import React from 'react';
import { PaymentProvider } from '../service/paymentContext';
import Payment from '../feature/payment';
import PaymentCalculate from '../feature/paymentcalculate';

const PaymentPage = () => {
  return (
    <PaymentProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-2 bg-gray-100 shadow-inner rounded-2xl">
          <Payment />
        </div>
        <div>
        <div className="p-2 bg-gray-100 shadow-inner rounded-2xl">
          <PaymentCalculate />
        </div>
        </div>
      </div>
    </PaymentProvider>
  );
};

export default PaymentPage;
