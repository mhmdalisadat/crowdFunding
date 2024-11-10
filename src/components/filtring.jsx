import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import DropButton from 'src/module/plan/filtering/dropButton';

const FilterPlans = ({ setFilterStatusSecond }) => {
  const planStatusOptions = [
    { id: '1', label: 'شروع شده' },
    { id: '2', label: 'جمع آوری شده' },
    { id: '3', label: 'تمدید شده' },
    { id: '5', label: 'تکمیل شده' },
    { id: '4', label: 'سررسید ناموفق' },
  ];

  const [selectedStatuses, setSelectedStatuses] = useState(['1']);

  useEffect(() => {
    setFilterStatusSecond(['1']);
  }, [setFilterStatusSecond]);

  const handleSelectStatus = (status) => {
    if (selectedStatuses.includes(status)) {
      const updatedStatuses = selectedStatuses.filter((s) => s !== status);
      setSelectedStatuses(updatedStatuses);
      setFilterStatusSecond(updatedStatuses);
    } else {
      const updatedStatuses = [...selectedStatuses, status];
      setSelectedStatuses(updatedStatuses);
      setFilterStatusSecond(updatedStatuses);
    }
  };

  return (
    <div className="">
      <DropButton
        planStatusOptions={planStatusOptions}
        onSelectStatus={handleSelectStatus}
        selectedStatuses={selectedStatuses}
      />
    </div>
  );
};

FilterPlans.propTypes = {
  setFilterStatusSecond: PropTypes.func.isRequired,
};

export default FilterPlans;
