import { OnRun } from 'src/api/OnRun';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const getManagement = async (cardId) => {
  const access = await getCookie('access');
  const response = await api.get(`${OnRun}/api/manager/${cardId}/`, {
    headers: { Authorization: `Bearer ${access}` },
  });

  return response.data.data;
};

export default getManagement;
