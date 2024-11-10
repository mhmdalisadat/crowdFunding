import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from 'src/api/apiClient';
import { OnRun } from 'src/api/OnRun';

const useApplyNationalCode = () => {
  return useMutation({
    mutationKey: ['applyNationalCode'],
    mutationFn: async ({ nationalCode, captchaInput, encryptedResponse }) => {
      const response = await api.post(`${OnRun}/api/otp/`, {
        uniqueIdentifier: nationalCode,
        captcha: captchaInput,
        encrypted_response: encryptedResponse,
      });
   

      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      return data;
    },
    onError: (error) => {
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      }
      if (error.response) {
        toast.error(error.response.data.message, 'خطا در دسترسی.');
      } else {
        console.error('خطا بدون پاسخ:', error.message);
      }
      toast.error('خطا در ارسال درخواست به سرور.');
    },
  });
};

export default useApplyNationalCode;
