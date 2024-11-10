import { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import Registere from './registered';
import PlanShareholders from './planShareholders';
import ApplicantCompany from './applicantCompany';

const InvestorPlan = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleOpen = (accordionId) => {
    setOpenAccordion((prev) => (prev === accordionId ? null : accordionId));
  };

  const renderComponents = [
    {
      label: 'اطلاعات ثبتی شرکت متقاضی',
      component: <ApplicantCompany /> || 'اطلاعاتی ثبتی شرکت متقاضی',
    },
    {
      label: 'اطلاعات سهام داران بالای 10درصد',
      component: <PlanShareholders /> || 'اطلاعات سهام داران بالای 10 درصد',
    },
    {
      label: 'اطلاعات مدیر عامل و اعضای هیئت مدیره',
      component: <Registere /> || 'اطلاعات مدیرعامل و اعضای هیئت مدیره',
    },
  ];

  return (
    <div
      id="accordion-flush"
      className="shadow-lg rounded-lg items-center overflow-hidden max-w-7xl mx-auto p-4 bg-white"
    >
      {renderComponents.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="mb-4"
        >
          <button
            type="button"
            className="flex items-center justify-between w-full rounded-2xl py-4 px-6 font-semibold text-gray-900 bg-gray-100 border-b border-gray-300 hover:bg-gray-400 transition-all duration-300 rtl:text-right shadow-md hover:shadow-lg"
            onClick={() => handleOpen(index)}
            aria-expanded={openAccordion === index}
          >
            <span className="text-base sm:text-lg">{item.label}</span>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: openAccordion === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <RiArrowDropDownLine className="text-2xl sm:text-3xl" />
            </motion.div>
          </button>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: openAccordion === index ? 'auto' : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className={`overflow-hidden bg-white rounded-b-2xl transition-all duration-500 ease-in-out shadow-inner ${
              openAccordion === index ? 'py-4 px-6' : 'p-0'
            }`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: openAccordion === index ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`${
                openAccordion === index ? 'max-h-64 sm:max-h-screen overflow-y-auto' : 'max-h-0'
              } transition-all duration-500 ease-in-out`}
            >
              {item.component}
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default InvestorPlan;
