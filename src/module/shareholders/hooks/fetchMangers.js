
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';
import { toast } from 'react-toastify';
import api from 'src/api/apiClient';

const useShareholders = (cartId) => {
  const [validite, setValidite] = useState([]);

  const fetchManager = async () => {
    const access = await getCookie('access');
    if (cartId) {
      const response = await api.get(`${OnRun}/api/shareholder/${cartId}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      if (response.data.data && response.data.data.length > 0) {
        setValidite(response.data.data);
      }
      return response.data;
    }
    return null;
  };

  const { isLoading, error } = useQuery({
    queryKey: ['fetchShareholders', cartId],
    queryFn: fetchManager,
    enabled: !!cartId,
  });

  const postShareholders = async () => {
    const access = await getCookie('access');
    try {
      await api.post(
        `${OnRun}/api/shareholder/${cartId}/`,
        { shareholder: validite },
        {
          headers: {
            Authorization: `Bearer ${access}`,
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success('اطلاعات با موفقیت ارسال شد');
    } catch (err) {
      toast.error('فیلد های نام و شماره تماس اجباریست.');
      throw error;
    }
  };

  return {
    validite,
    setValidite,
    isLoading,
    error,
    postShareholders,
  };
};

export default useShareholders;
