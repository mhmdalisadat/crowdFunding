import { getCookie } from 'src/api/cookie';
import { useMutation } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { OnRun } from 'src/api/OnRun';

const postDetail = async ({ credit_amount, image_receipt, document_number }) => {
  const access = getCookie('access');

  const response = await api.post(
    `${OnRun}/api/transaction/`,
    {
      credit_amount,
      image_receipt,
      document_number,
    },
    {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

const useTransaction = () => {
  const {
    mutate,
    data: datapost,
    isLoading: islodingpost,
    error: errorpost,
    isError,
  } = useMutation({
    mutationKey: ['postDetail'],
    mutationFn: postDetail,
  });

  return {
    mutate,
    datapost,
    islodingpost,
    errorpost,
    isError,
  };
};

export default useTransaction;
