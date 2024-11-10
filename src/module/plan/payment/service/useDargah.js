import { useMutation } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';

const postAmountDargah = async (traceCode, totalPrice , status) => {
  const access = getCookie('access');
  const response = await api.post(
    `/api/transmission/user/${traceCode}/`,
    { amount: totalPrice , name_status : status },
    {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

const useDargah = (traceCode) => {
  const { data, isLoading, error, mutate , isError } = useMutation({
    mutationKey: ['dargah', traceCode],
    mutationFn: ({totalPrice , status}) => postAmountDargah(traceCode, totalPrice , status),
  });
  return {
    data,
    isLoading,
    error,
    mutate,
    isError
  };
};



export default useDargah;
