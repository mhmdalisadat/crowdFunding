import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from 'src/api/apiClient';
import { getCookie, setCookie } from 'src/api/cookie';

const getProfileUser = async () => {

  const access =  getCookie('access');

  const response = await api.get(`/api/information/`, {
    headers: { Authorization: `Bearer ${access}` },
  });

  return response.data;
};

const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate,
    isError,
    data: userData,
    isLoading: isLoadingUser,
    error: errorUser,
  } = useMutation({
    mutationKey: ['profile'],
    mutationFn: getProfileUser,
    onError: () => {
      logout();
    },
  });

  const logout = () => {
    setCookie('access', '', 0);
    queryClient.removeQueries('profile');
    queryClient.invalidateQueries('profile');
    navigate('/login');
  };
  return {
    mutate,
    isError,
    userData,
    isLoadingUser,
    errorUser,
    logout,
  };
};

export default useAuth;
