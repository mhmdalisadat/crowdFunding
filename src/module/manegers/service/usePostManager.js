import { useMutation } from '@tanstack/react-query';
import useGetManager from './useGetManager';
import { postManager } from './api';

const usePostManager = () => {
  const { refetch } = useGetManager();
  const { mutate, isPending, data, error, isSuccess, isError } = useMutation({
    mutationKey: ['postMessage'],

    mutationFn: ({ cartId, sanitizedField }) => {
      postManager({ cartId, sanitizedField });
    },
    onSettled: () => {
      refetch();
    },
  });

  return {
    mutate,
    isSuccess,
    isPending,
    data,
    error,
    isError,
  };
};

export default usePostManager;
