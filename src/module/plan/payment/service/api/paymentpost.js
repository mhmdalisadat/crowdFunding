import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';

export const PostPyment = async ({ traceCode, data }) => {
  const access = getCookie('access');

  const formData = new FormData();
  formData.append('amount', data.amount);
  formData.append('name_status', data.name_status);
  formData.append('payment_id', data.payment_id);
  formData.append('description', data.description);
  formData.append('risk_statement', 'true');
  formData.append('picture', data.picture);

  const response = await api.post(`/api/payment/document/${traceCode}/`, formData, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
