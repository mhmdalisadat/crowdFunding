import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';

export const postInformation = async (trace_code, data) => {
  const access = await getCookie('access');
  const response = await api.post(
    `/api/information/plan/admin/${trace_code}/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
