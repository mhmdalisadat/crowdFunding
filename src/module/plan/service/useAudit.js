import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';

const getAudit = async (traceCode) => {
  const access = await getCookie('access');

  const response = await api.get(`/api/audit/report/admin/${traceCode}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

const useAudit = (traceCode) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['Audit', traceCode],
    queryFn: () => getAudit(traceCode),
    enabled: !!traceCode,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useAudit;
