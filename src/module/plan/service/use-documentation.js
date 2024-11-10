import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';

const getDocumentation = async (traceCode) => {
  const access = await getCookie('access');

  const response = await api.get(`/api/documentation/${traceCode}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

const useDocumentation = (traceCode) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['documentAudit', traceCode],
    queryFn: () => getDocumentation(traceCode),
    enabled: !!traceCode,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useDocumentation;
