import { useQuery } from '@tanstack/react-query';
import { OnRun } from 'src/api/OnRun';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const fetchWallet = async () => {
  const access = getCookie('access');
  const response = await api.get(`${OnRun}/api/wallet/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access}`,
    },
  });
  return response.data.wallet;
};

export const useFetchWallet = (cartId) => {
  return useQuery({
    queryKey: ['wallet', cartId],
    queryFn: () => fetchWallet(cartId),
  });
};
