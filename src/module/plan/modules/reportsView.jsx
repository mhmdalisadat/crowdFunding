import React, { useState } from 'react';
import Certificate from 'src/components/certificate';
import { RiArrowDropDownLine } from 'react-icons/ri';

import PlanProgress from '../feature/planProgress';
import Documentation from '../feature/documentation';
import Appendices from '../feature/appendices';
import Audit from '../feature/hesabrasi';

const ReportsView = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleOpen = (accordionId) => {
    setOpenAccordion((prev) => (prev === accordionId ? null : accordionId));
  };

  const renderComponents = [
    { label: 'مستندات', component: <Documentation /> },
    { label: 'تضامین و گزارشات اعتباری', component: <Appendices /> },
    { label: 'پیشرفت طرح', component: <PlanProgress /> },
    { label: 'گزارش حسابرسی', component: <Audit /> },
  ];

  return (
    <div id="accordion-flush" className="shadow-lg rounded-lg overflow-hidden">
      {renderComponents.map((item, index) => (
        <div key={index}>
          <button
            type="button"
            className="flex items-center justify-between w-full py-5 px-6 font-semibold rtl:text-right text-gray-900 bg-gray-100 border-b border-gray-300 hover:bg-gray-300 transition-all duration-300"
            onClick={() => handleOpen(index)}
            aria-expanded={openAccordion === index}
          >
            <span>{item.label}</span>
            <RiArrowDropDownLine
              className={`text-2xl transition-transform duration-300 ${
                openAccordion === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out bg-white ${
              openAccordion === index ? 'max-h-screen py-4 px-6' : 'max-h-0'
            }`}
          >
            {item.component}
          </div>
        </div>
      ))}
      <Certificate />
    </div>
  );
};

export default ReportsView;
