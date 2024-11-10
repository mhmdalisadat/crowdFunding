import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const getcontract = async (cartId) => {
  const access = getCookie('access');

  const response = await api.get(`/api/cart/detail/${cartId}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
