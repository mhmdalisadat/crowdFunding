import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'src/api/cookie';
import moment from 'jalali-moment';
import FilterPlans from 'src/components/filtring';
import useGetPlans from '../service/use-plans';
import CartPlan from './cartPlan';

const CartPlans = () => {
  const { data } = useGetPlans();
  const access = getCookie('access');
  const navigate = useNavigate();
  const [filterStatusSecond, setFilterStatusSecond] = useState([]);

  useEffect(() => {
    if (!access) {
      navigate('/login');
    }
  }, [access, navigate]);

  if (!data || data.length === 0) {
    return <p>هیچ درخواستی یافت نشد.</p>;
  }

  const filteredPlans =
    filterStatusSecond.length > 0
      ? data.filter((item) =>
          filterStatusSecond.includes(item?.information_complete?.status_second)
        )
      : data;

      
      const reversedPlans = filteredPlans.slice().reverse();
      
  return (
    <>
      <div className="bg-gray-200  text-white rounded-t-md p-2 md:p-4 lg:p-6 text-center ">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-700">طرح‌ها</h1>
      </div>
      <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 z-10">
        <FilterPlans setFilterStatusSecond={setFilterStatusSecond} />
      </div>
      <div className="flex justify-center items-center  ">
        <div className="max-w-8xl w-full bg-white rounded-lg shadow-2xl p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4   justify-center text-right">
            {reversedPlans.length > 0 ? (
              reversedPlans.map((item) => {
                
                const persianCreationDate = item.plan?.creation_date
                  ? moment(item.plan?.creation_date).locale('fa').format('YYYY/MM/DD')
                  : 'تاریخ نامعتبر';

                if (item?.information_complete?.status_show === true) {
                  return (
                    <div key={item.plan.id}>
                      <CartPlan
                        trace_code={item.plan.trace_code}
                        persianName={item.plan.persian_name}
                        englishName={item.plan.english_name}
                        industryGroup={item.plan.industry_group_description}
                        totalUnits={item.plan.total_units}
                        totalPrice={item.plan.total_price}
                        crowdFundingType={item.plan.crowd_funding_type_description}
                        projectStatus={item.plan.project_status_description}
                        settlementDescription={item.plan.settlement_description}
                        realPersonMinPrice={item.plan.real_person_minimum_availabe_price}
                        realPersonMaxPrice={item.plan.real_person_maximum_available_price}
                        crowdFundingtypeDescription={item.plan.crowd_funding_type_description}
                        creation_date={persianCreationDate}
                        persoanApprovedSymbol={item.plan.persoan_approved_symbol}
                        statusSecond={item?.information_complete?.status_second}
                        amountCollectedNow={item?.information_complete?.amount_collected_now}
                        rateOfReturn={item?.information_complete?.rate_of_return}
                        company={item?.company[0]?.name}
                        startDate={item.plan.suggested_underwriting_start_date}
                        endDate={item.plan.suggested_underwriting_end_date}
                        statusShow={item?.information_complete?.status_show}
                      />
                    </div>
                  );
                }
                return null;
              })
            ) : (
              <p>هیچ طرحی برای این فیلتر یافت نشد.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPlans;
