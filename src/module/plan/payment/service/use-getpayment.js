/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query';
import { getPayment } from './api/paymentget';


const useGetPayment = (traceCode) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['partner', traceCode],
    queryFn: () =>  getPayment(traceCode),
    enabled: !!traceCode,   
  });
  return {
    data,
    isLoading,
    error,
  };
};

export default useGetPayment;
