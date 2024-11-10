import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';

export const getInvestor = async (traceCode) => {
  const access = await getCookie('access');
  const response = await api.get(`/api/payment/document/${traceCode}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
