import { OnRun } from 'src/api/OnRun';
import { getCookie } from 'src/api/cookie';
import { useMutation } from '@tanstack/react-query';
import api from 'src/api/apiClient';

const usePatchRefresh = () => {
  const patchRefresh = async (data) => {
    const access = await getCookie('access');

    const response = await api.patch(`${OnRun}/api/update/profile/`, data, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    return response.data;
  };

  const { mutate, isLoading, isError, error } = useMutation({
    mutationKey: ['profile'],
    mutationFn: patchRefresh,
    onError: (err) => {
      console.error('Error refreshing:', err);
    },
  });

  return { mutate, isLoading, isError, error };
};

export default usePatchRefresh;
