import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const useFinishCart = (cartId) => {
  const access = getCookie('access');

  const getFinishCart = async () => {
    const response = await api.get(`/api/cart/detail/${cartId}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    return response.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['Finish_Cart'],
    queryFn: getFinishCart,
  });

  return {
    data,
    isLoading,
  };
};
