/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query';
import { getInformtion } from './api/information';



const useGetInformation = (trace_code) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['information', trace_code],
    queryFn: () =>  getInformtion(trace_code),
    enabled: !!trace_code,   
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetInformation;
