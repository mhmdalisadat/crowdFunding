import { OnRun } from 'src/api/OnRun';
import { getCookie } from 'src/api/cookie';
import { useMutation } from '@tanstack/react-query';
import api from 'src/api/apiClient';

const useRefreshOTP = () => {
  const postOtp = async () => {
    const access = await getCookie('access');

    const response = await api.post(
      `${OnRun}/api/otp/update/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    return response.data;
  };

  const { mutate, isLoading, isError, error } = useMutation({
    mutationKey: ['refreshOtp'],
    mutationFn: postOtp,

    onError: (err) => {
      console.error('Error refreshing OTP:', err);
    },
  });

  return { mutate, isLoading, isError, error };
};

export default useRefreshOTP;
