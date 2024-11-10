import { useMutation } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';

const postCertificate = async (traceCode) => {
  const access = getCookie('access');
  const response = await api.post(`/api/certificate/user/${traceCode}/`,{}, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
const useCertificate = (traceCode) => {
  const { data, isLoading, error , mutate} = useMutation({
    mutationKey: ['certificate', traceCode],
    mutationFn: () => postCertificate(traceCode),
  });
  return {
    data,
    isLoading,
    error,
    mutate
  };
};

export default useCertificate;
