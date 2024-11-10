import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

export const usePlanProgress = (traceCode) => {

  const getPlanProgress = async () => {
    const access = await getCookie('access');
    
    const response = await api.get(`${OnRun}/api/progres/report/admin/${traceCode}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['progress', traceCode],
    queryFn: getPlanProgress,
    enabled: !!traceCode,
  });

  return {
    data,
    isLoading,
    error,
  };
};
