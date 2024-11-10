import { getCookie } from 'src/api/cookie';
import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';

const getProfile = async () => {
  const access = getCookie('access');

  const response = await api.get('/api/information/', {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  return response.data;
};

const useGetProfile = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  return { isPending, data, isError, error };
};

export default useGetProfile;
