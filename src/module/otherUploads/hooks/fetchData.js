import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const useFetchData = (cartId) => {
  const fetchData = async () => {
    const access =  getCookie('access');
    const response = await api.get(`${OnRun}/api/addinformation/${cartId}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    return response.data;
  };

  const { isLoading, data , isError } = useQuery({
    queryKey: ['fetchData', cartId],
    queryFn: fetchData,
  });

  return { isLoading, data , isError  };
};

export default useFetchData;
