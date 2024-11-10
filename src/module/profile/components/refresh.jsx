import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';
import { IoKey } from 'react-icons/io5';
import SmallLoader from 'src/components/SmallLoader';
import SmallError from 'src/components/smallError';
import { toast } from 'react-toastify';
import useRefreshOTP from '../hooks/useGetOTP';
import usePatchRefresh from '../hooks/patchUpdates';

const Refresh = ({ setShowRefresh }) => {
  const { mutate: refreshOTP, isLoading, isError } = useRefreshOTP();
  const { mutate: refreshPatch } = usePatchRefresh();

  const [countdown, setCountdown] = useState(60);
  const [isDisabled, setIsDisabled] = useState(false);
  const [value, setValue] = useState('');

  const handleClose = () => {
    setShowRefresh(false);
  };

  const refreshReq = () => {
    refreshOTP();
    setIsDisabled(true);
    setCountdown(60);
  };

  const accessRefresh = () => {
    if (value && value.length === 5) {
      refreshPatch({ otp: value });
      setShowRefresh(false);
      toast.success('کد با موفقیت ارسال شد');
    } else {
      toast.error('کد نامعتبر است');
    }
  };


  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isDisabled) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            setIsDisabled(false);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isDisabled]);

  return (
    <>
      <div className="fixed inset-0 bg-gray-400 opacity-50 z-40" />

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="relative card bg-white w-96 shadow-xl rounded-lg p-5">
          <h2 className="card-title text-xl font-bold text-gray-900">کد تایید</h2>

          <button
            type="button"
            className="absolute top-3 left-3 text-red-500 hover:text-gray-800 focus:outline-none"
            onClick={handleClose}
          >
            <AiOutlineClose size={24} />
          </button>

          <div className="mt-5">
            {isLoading && <SmallLoader />}
            {isError && <SmallError />}
            <label htmlFor="otp" className="input input-bordered flex items-center gap-2 bg-white">
              <IoKey className="text-xl" />
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                className="grow bg-gray-400"
                placeholder="کد"
              />
            </label>
            <button
              type="button"
              className="mt-5 w-full btn btn-outline hover:bg-blue-500 text-black"
              onClick={accessRefresh}
            >
              تایید
            </button>
            <button
              type="button"
              className={`mt-5 w-full btn btn-outline hover:bg-blue-500 text-black ${
                isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              onClick={refreshReq}
              disabled={isDisabled}
            >
              ارسال مجدد {isDisabled && `(${countdown}s)`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

Refresh.propTypes = {
  setShowRefresh: PropTypes.func.isRequired,
};

export default Refresh;
