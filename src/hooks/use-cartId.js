import { useQuery, useQueryClient } from '@tanstack/react-query';

const useCartId = () => {
  const queryClient = useQueryClient();

  const { data: cartId = 0 } = useQuery({
    queryKey: ['cartId'],
    initialData: 0,
  });

  const setCartId = (id) => {
    queryClient.setQueryData(['cartId'], id);
  };
  return {
    cartId,
    setCartId,
  };
};

export default useCartId;
