import { useMutation } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import useAuth from 'src/module/navbar/service';

const LogOut = async (traceCode) => {
  const access = getCookie('access');

  const response = await api.post(
    `/api/log/out/`,
    { data: '' },
    {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    }
  );

  return response.data;
};

const useExist = () => {
  const { logout } = useAuth();

  const { mutate, isLoading, isError, data, error } = useMutation({
    mutationFn: LogOut,
    mutationKey: ['exist'],
    onSettled: () => {
      logout();
    },
  });

  return { mutate, isLoading, isError, data, error };
};

export default useExist;
