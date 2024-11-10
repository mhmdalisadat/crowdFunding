import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';

export const getPayment = async (traceCode) => {
  const access = await getCookie('access');
  const response = await api.get(`/api/payment/user/${traceCode}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

