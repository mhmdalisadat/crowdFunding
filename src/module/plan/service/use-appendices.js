import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';

const getAppenices= async (traceCode) => {
  const access = await getCookie('access');
  const response = await api.get(`/api/appendices/${traceCode}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};


const useGetAppenices = (traceCode) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['appendices', traceCode],
    queryFn: () => getAppenices(traceCode),
    enabled: !!traceCode,   
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetAppenices;
