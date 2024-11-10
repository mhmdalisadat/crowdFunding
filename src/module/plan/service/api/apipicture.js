import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';

export const getPicure = async (trace_code) => {

  const access = await getCookie('access');
  const response = await api.get(`/api/send/picture/${trace_code}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};