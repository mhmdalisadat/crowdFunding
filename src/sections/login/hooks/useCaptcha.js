import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { OnRun } from 'src/api/OnRun';

const getCaptcha = async () => {
  const { data } = await api.get(`${OnRun}/api/captcha/`);
  return data.captcha;
};
const useCaptcha = () => {
  return useQuery({
    queryKey: ['captcha'],
    queryFn: getCaptcha,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    onError: (error) => {
      console.error('Error fetching captcha:', error);
    },
    onSuccess: (data) => {},
  });
};
export default useCaptcha;
