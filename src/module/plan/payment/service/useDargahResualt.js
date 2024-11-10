import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

// Function to fetch data from the API
const getDargahResult = async (invoiceId) => {
  const access = getCookie('access');
  const response = await api.get(
    `/api/transmission/user/${invoiceId}/`, 
    {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};


const useDargahResult = (traceCode, invoiceId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dargahResult', traceCode, invoiceId],
    queryFn: () => getDargahResult(invoiceId, traceCode), 
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useDargahResult;
