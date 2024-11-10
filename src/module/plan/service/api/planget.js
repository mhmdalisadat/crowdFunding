import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const getPlan = async (trace_code) => {
  const access = await getCookie('access');
  const response = await api.get(`/api/plan/${trace_code}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
