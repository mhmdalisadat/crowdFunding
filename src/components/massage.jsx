import React from 'react';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';
import { useQuery } from '@tanstack/react-query';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import UseCartId from 'src/hooks/use-cartId';
import api from 'src/api/apiClient';
import SmallLoader from './SmallLoader';

const fetchMessage = async (cartId) => {
  const access = await getCookie('access');
  if (cartId) {
    const response = await api.get(`${OnRun}/api/message/${cartId}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data.message;
  }
  return null;
};

export const Message = () => {
  const { cartId } = UseCartId();

  const { data, error, isLoading } = useQuery({
    queryKey: ['fetchMessage', cartId],
    queryFn: () => fetchMessage(cartId),
  });

  if (isLoading) return <SmallLoader />;
  if (error) return <p className="text-red-500">خطایی رخ داده است</p>;

  if (!data || !cartId) {
    return null;
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg  shadow-inner">
      <div className="flex items-center">
        <AiOutlineInfoCircle className="text-blue-700 ml-2 mr-0 text-3xl" />
        <p className="text-gray-700 font-semibold"> پیام:</p>
      </div>
      <p className="text-black text-lg mt-2">{data?.message}</p>
    </div>
  );
};

export default Message;
