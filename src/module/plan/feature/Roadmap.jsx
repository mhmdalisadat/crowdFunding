import React from 'react';
import { FaSquareCheck } from 'react-icons/fa6';
import { ImCheckboxUnchecked } from 'react-icons/im';
import { useParams } from 'react-router-dom';
import SmallLoader from 'src/components/SmallLoader';
import moment from 'moment-jalaali';
import useGetPlan from '../service/use-plan';

const Roadmap = () => {
  const { traceCode } = useParams();
  const { data, isLoading } = useGetPlan(traceCode);
  const persianDateStart = moment(data.date_start).format('jYYYY/jMM/jDD');

  if (isLoading) {
    return <SmallLoader />;
  }

  return (
    <div className="">
      <ul className="timeline timeline-vertical bg-white text-right">
        <li>
          <hr />
          <div className="timeline-start timeline-box bg-white">تاریخ شروع اجرا طرح</div>
          <div className="timeline-middle bg-white">
            {data.plan.date_start === 14 ? <FaSquareCheck /> : <ImCheckboxUnchecked />}
          </div>
          <div className="timeline-end bg-white">{persianDateStart}</div>
          <hr />
        </li>

        {data?.date_profit?.map((profit, index) => (
          <li key={index}>
            <hr />
            <div className={`  ${(index + 1) % 2 === 1 ? 'timeline-start' : ' timeline-end'}`}>
              {profit?.date?.replace(/-/g, '/')}
            </div>
            <div className="timeline-middle bg-white">
              {profit?.type === '0' ? <FaSquareCheck /> : <ImCheckboxUnchecked />}
            </div>
            <div
              className={`timeline-box bg-white  ${
                (index + 1) % 2 === 1 ? ' timeline-end' : ' timeline-start'
              }`}
            >
              {profit?.type === '1' ? 'بازپرداخت اصل پول' : 'پرداخت سود علی الحساب'}
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Roadmap;
