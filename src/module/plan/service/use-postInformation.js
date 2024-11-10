import { useMutation } from '@tanstack/react-query';
import { postInformation } from './api/informationPost';

const usePostInformation = () => {
  const mutation = useMutation(({ trace_code, data }) => postInformation(trace_code, data));

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
    data: mutation.data,
  };
};

export default usePostInformation;
