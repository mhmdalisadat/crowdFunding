import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const postContract = async ({ cartId, contractData }) => {
  const access = getCookie('access');

  const response = await api.post(
    `/api/setcart/${cartId}/`,
    contractData,

    {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.cart;
};

const usePostContract = (cartId) => {
  const { mutate, isLoading, IsError, isPending, error } = useMutation({
    mutationKey: ['contract', cartId],
    mutationFn: (contractData) => postContract({ cartId, contractData }),
    onSuccess: (data) => {
      toast.success('اطلاعات با موفقیت ارسال شد!');
    },
  });
  return {
    mutate,
    isLoading,
    IsError,
    isPending,
    error,
  };
};

export default usePostContract;
