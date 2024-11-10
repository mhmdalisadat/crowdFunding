import { useQuery, useQueryClient } from '@tanstack/react-query';

const useNavigateStep = () => {
  const queryClient = useQueryClient();

  const { data: page = 0 } = useQuery({
    queryKey: ['page'],
    // queryFn: () => 0,
    initialData: 0,
  });

  const incrementPage = () => {
    queryClient.setQueryData(['page'], Math.min(page + 1, 9));
  };

  const decrementPage = () => {
    queryClient.setQueryData(['page'], Math.max(page - 1, 0));
  };

  const changePage = (num) => {
    queryClient.setQueryData(['page'], num);
  };

  return {
    page,
    incrementPage,
    decrementPage,
    changePage,
  };
};

export default useNavigateStep;
