import { useQuery } from '@tanstack/react-query';
import getManagement from '../service';

const useGetManagement = (cartId) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['getManagement', cartId],
    queryFn: () => getManagement(cartId),
  });

  return {
    data,
    isLoading,
    error,
    isError,
  };
};

export default useGetManagement;
// ...............