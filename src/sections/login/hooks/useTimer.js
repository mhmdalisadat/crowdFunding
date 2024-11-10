import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const useTimer = () => {
  const [timer, setTimer] = useState(90);
  const [step, setStep] = useState(1);

  const { mutate: startTimer } = useMutation({
    mutationKey: ['startTimer'],
    mutationFn: () => {
      return new Promise((resolve) => {
        const countdown = setInterval(() => {
          // eslint-disable-next-line consistent-return
          setTimer((prevTimer) => {
            if (prevTimer <= 1) {
              clearInterval(countdown);
              setStep(1);
              setTimer(90);
              toast.info('زمان وارد کردن کد تایید به پایان رسید. لطفاً دوباره تلاش کنید.');
              resolve();
            } else {
              return prevTimer - 1;
            }
          });
        }, 1000);
      });
    },
  });

  return { timer, step, setStep, startTimer };
};

export default useTimer;
