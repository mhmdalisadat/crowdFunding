import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';

export const getDashbord = async () => {
  const access = await getCookie('access');
  const response = await api.get(`/api/dashboard/user/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  console.log("dashbord",access)
  return response.data;
};