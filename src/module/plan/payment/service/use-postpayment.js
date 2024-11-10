import { useMutation } from '@tanstack/react-query';
import { PostPyment } from './api/paymentpost';


const usePayment = (traceCode) => {
  const {
    mutate,
    data: datapost,
    isLoading: islodingpost,
    error: errorpost,
    isError
  } = useMutation({
    mutationKey: ['postDetail'],
    mutationFn: (data)=>PostPyment({traceCode,data}),
  });

  return {
    mutate,
    datapost,
    islodingpost,
    errorpost,
    isError
  };
};

export default usePayment;
