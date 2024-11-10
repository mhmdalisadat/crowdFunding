import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';
import { useQuery } from '@tanstack/react-query';

export const getCer = async (traceCode) => {
  const access = await getCookie('access');
  const response = await api.get(`/api/participant/menu/user/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

const useCer = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['cer'],
    queryFn: () => getCer(),
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useCer;
