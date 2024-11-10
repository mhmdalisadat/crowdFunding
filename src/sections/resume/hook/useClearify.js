import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const fetchHistory = async (cartId) => {
  try {
    const access = await getCookie('access');

    if (!access) {
      throw new Error('No access token found.');
    }

    const response = await api.get(`/api/history/${cartId}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching history data:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch history data.');
  }
};
