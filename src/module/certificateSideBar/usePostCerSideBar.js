import { useMutation } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';

const postCerti = async (trace_code) => {
  const access = getCookie('access');
  const response = await api.post(
    `/api/certificate/user/${trace_code}/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
const useCerti = () => {
  const { data, isLoading, error, mutate, isError } = useMutation({
    mutationKey: ['postCer'],
    mutationFn: (trace_code) => postCerti(trace_code),
  });
  return {
    data,
    isLoading,
    isError,
    error,
    mutate,
  };
};

export default useCerti;
