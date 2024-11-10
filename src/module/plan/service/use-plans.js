import { useQuery } from '@tanstack/react-query';
import { getPlans } from './api/plansget';





const useGetPlans = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['plans'],
    queryFn: () => getPlans(),
  });

  return {
    data,
    isLoading,
    error,
    
  };
};

export default useGetPlans;
