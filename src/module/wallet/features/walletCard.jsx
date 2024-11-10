// import { useState } from 'react';
// import { GoPlus } from 'react-icons/go';
// import { IoIosArrowRoundUp } from 'react-icons/io';
// import { LuArrowUpDown } from 'react-icons/lu';
// import UseCartId from 'src/hooks/use-cartId';
// import { formatNumber } from 'src/utils/formatNumbers';
// // eslint-disable-next-line import/no-extraneous-dependencies

// import Loader from 'src/components/loader';

// import { useFetchWallet } from '../hooks/getWalletData';
// import TransactionOptions from './transaction';
// import TranHistory from './transactionHistory';

// const WalletCard = () => {
//   const { cartId } = UseCartId();
//   const { data: walletData, isLoading } = useFetchWallet(cartId);

//   const [openTransaction, setOpenTransaction] = useState(false);
//   const [showTranHistory, setShowTranHistory] = useState(false);


  
//   const openModal = () => {
//     setOpenTransaction(true);
//   };

//   const openTranHistoryModal = () => {
//     setShowTranHistory(true);
//   };

//   if (isLoading) {
//     return <Loader />;
//   }

//   const { remaining } = walletData || {};

//   if (showTranHistory) {
//     return <TranHistory setShowTranHistory={setShowTranHistory} />;
//   }

//   return (
//     <div className="flex items-center justify-center ">
//       <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 flex flex-col space-y-4">
//         <div className="bg-gray-100 w-full text-white rounded-t-md p-2 text-center mb-4">
//           <h1 className="text-2xl font-bold text-gray-700">کیف پول</h1>
//         </div>

//         <div className="w-full max-w-md mx-auto p-4 mb-6">
//           <div dir="rtl" className="w-full">
//             <div className="flex flex-col items-center pb-10 rounded-lg bg-gradient-to-r from-[#004ff9] to-[#000000] shadow-2xl">
//               <div className="flex justify-end px-4 pt-4" />

//               <h5 className="mb-1 text-xl font-medium text-white mt-6">مانده کیف پول</h5>
//               <h5 className="mb-1 font-medium text-4xl text-white">
//                 {remaining !== null && remaining !== undefined ? formatNumber(remaining) : 0}
//               </h5>

//               <div className="flex mt-4">
//                 <button
//                   type="button"
//                   onClick={openModal}
//                   className="py-2 flex items-center px-4 ms-2 text-sm font-medium text-white rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:outline-none dark:border-gray-600 dark:hover:bg-white-700 duration-300"
//                 >
//                   <GoPlus className="ml-1 text-2xl" />
//                   واریز وجه
//                 </button>
//                 <button
//                   type="button"
//                   onClick={openModal}
//                   href="#"
//                   className="py-2 flex items-center px-4 ms-2 text-sm font-medium text-white rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:outline-none dark:border-gray-600 dark:hover:bg-white-700 duration-300"
//                 >
//                   <IoIosArrowRoundUp className="ml-1 text-2xl" />
//                   برداشت وجه
//                 </button>
//                 <button
//                   type="button"
//                   onClick={openTranHistoryModal}
//                   className="py-2 flex items-center px-4 ms-2 text-sm font-medium text-white rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:outline-none dark:border-gray-600 dark:hover:bg-white-700 duration-300"
//                 >
//                   <LuArrowUpDown className="ml-1 text-xl" />
//                   گردش حساب
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

  
//       </div>

//       {openTransaction && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="relative bg-white rounded-lg p-8 w-96 shadow-lg">
//             <TransactionOptions setOpenTransaction={setOpenTransaction} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WalletCard;
