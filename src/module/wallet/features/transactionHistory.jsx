import React from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_simple.min.css';
import PropTypes from 'prop-types';
import Loader from 'src/components/loader';
import { useFetchTransaction } from '../hooks/getTransaction';


const columns = [
  { title: 'ردیف', field: 'id', width: 150 },
  { title: 'زمان و تاریخ تراکنش', field: 'date', hozAlign: 'left', sorter: 'date' },
  { title: 'مقدار بدهی', field: 'debt_amount', hozAlign: 'right', formatter: 'money' },
  { title: 'مقدار بستانکاری', field: 'credit_amount', hozAlign: 'right', formatter: 'money' },
  { title: 'وضعیت', field: 'status', hozAlign: 'center' },
  { title: 'روش', field: 'method', hozAlign: 'center' },
  { title: 'شرح تراکنش', field: 'description_transaction', hozAlign: 'center' },
];

const TranHistory = ({ setShowTranHistory }) => {
  const { data: transactions, isLoading } = useFetchTransaction();

  if (isLoading) {
    return <Loader />;
  }

  if (!transactions || transactions.length === 0) {
    return (
      <>
        <div className="text-center mt-4 text-2xl font-bold text-gray-700">

          <span className=" bg-gradient-to-r from-[#004ff9] to-[#000000]  text-transparent bg-clip-text">
            تراکنشی یافت نشد
          </span>
        </div>

        <div className="flex justify-center items-center w-full py-4 mt-6">
          <button
            type="button"
            onClick={() => setShowTranHistory(false)}
            className="px-8 py-3 rounded-md border bg-gradient-to-r from-[#004ff9] to-[#000000] text-white text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
          >
            بازگشت
          </button>
        </div>
      </>
    );
  }

  const formattedData = transactions.map((transaction) => ({
    id: transaction.id,
    date: new Date(transaction.transaction_date).toLocaleDateString(),
    status: transaction.status ? 'موفق' : 'ناموفق',
    method: transaction.method,
    credit_amount: transaction.credit_amount,
    debt_amount: transaction.debt_amount,
    description_transaction: transaction.description_transaction,
  }));

  return (
    <div dir="rtl" className="w-full h-full flex flex-col items-center p-4 ">
      <div className="bg-gray-100 w-full text-white rounded-t-md p-2 text-center mb-4">
        <h1 className="text-2xl font-bold text-gray-700">تاریخچه تراکنش ها</h1>
      </div>
      <div className="w-full bg-white rounded shadow mb-4">
        <ReactTabulator
          data={formattedData}
          columns={columns}
          layout="fitDataFill"
          options={{
            pagination: 'local',
            paginationSize: 5,
            responsiveLayout: true,
          }}
          className="tabulator-table w-full"
        />
      </div>
      <button
        type="button"
        onClick={() => setShowTranHistory(false)}
        className="px-8 py-3 rounded-md border bg-gradient-to-r from-[#004ff9] to-[#000000] text-white text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
      >
        بازگشت
      </button>
    </div>
  );
};

TranHistory.propTypes = {
  setShowTranHistory: PropTypes.func.isRequired,
};

export default TranHistory;
