import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const useGetComments = (traceCode) => {
  const getComments = async () => {
    const access = await getCookie('access');
    const response = await api.get(`/api/comment/user/${traceCode}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  };

  const { isLoading, data } = useQuery({
    queryKey: ['getComments', traceCode],
    queryFn: getComments,
  });
  return { isLoading, data };
};
export default useGetComments;
