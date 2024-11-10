import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

export const fetchValidation = async (cartId) => {
  try {
    const access = await getCookie('access');

    const response = await api.get(`/api/validation/${cartId}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching manager data:', error);
    throw new Error('Failed to fetch manager data.');
  }
};

export const sendValidation = async (cartId, data) => {
    try {
      const access = await getCookie('access');
      const url = `${OnRun}/api/validation/${cartId}/`;
  
      const formData = new FormData();
      formData.append('file_validation', data.file_validation || '');
      formData.append('file_manager', data.file_manager || '');
  
      const response = await api.post(url, formData, {
        headers: {
          Authorization: `Bearer ${access}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error sending validation data:', error);
      throw new Error('Failed to send validation data.');
    }
  };