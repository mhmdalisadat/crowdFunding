import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getCookie } from 'src/api/cookie'; // مسیر صحیح به تابع getCookie را وارد کنید

// هوک سفارشی برای بررسی وضعیت لاگین
export function useCheckAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getCookie('access');

    if (!accessToken) {
      // اگر کوکی access وجود نداشت، کاربر به صفحه لاگین هدایت می‌شود
      navigate('/login');
    }
  }, [navigate]); // وابسته به navigate برای اطمینان از هدایت
}
