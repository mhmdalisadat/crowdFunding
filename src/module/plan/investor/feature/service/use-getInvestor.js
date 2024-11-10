import { useQuery } from '@tanstack/react-query';
import { getInvestor } from './invesor';

const useGetInvesor = (traceCode) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['investor', traceCode],
    queryFn: () => getInvestor(traceCode),
    enabled: !!traceCode,
  });
  
  return  {
    data,
    isLoading,
    error,
  };
};

export default useGetInvesor;
