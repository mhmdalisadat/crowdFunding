import { useQuery } from '@tanstack/react-query';
import { OnRun } from 'src/api/OnRun';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const fetchTransaction = async () => {
  const access = getCookie('access');
  const response = await api.get(`${OnRun}/api/transaction/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access}`,
    },
  });
  return response.data.transaction;
};

export const useFetchTransaction = (cartId) => {
  return useQuery({
    queryKey: ['transaction', cartId],
    queryFn: () => fetchTransaction(cartId),
    // enabled: !!cartId,
  });
};
