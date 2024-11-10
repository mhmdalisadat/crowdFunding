/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query';
import { getPicure } from './api/apipicture';



const usePicure = (trace_code) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['picure', trace_code],
    queryFn: () =>  getPicure(trace_code),
    enabled: !!trace_code,   
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default usePicure;
