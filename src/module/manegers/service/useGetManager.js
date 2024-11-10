import { useQuery } from '@tanstack/react-query';
import { getManager } from './api';

const useGetManager = (id) => {
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ['getMessage'],
    queryFn: () => getManager(id),
  });

  return {
    isLoading,
    data,
    error,
    refetch,
  };
};

export default useGetManager;
