import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'src/components/loader';
import SmallError from 'src/components/smallError';
import CommentItem from './itemcomment';
import useGetComments from '../service/getComments';

const CommentList = () => {
  const { traceCode } = useParams();
  const { isLoading, data, isError } = useGetComments(traceCode);
  

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <SmallError label="خطا در بارگزاری نظرات" />;
  }
  if (!data) {
    return <SmallError label="کامنتی وجود ندارد" />;
  }
  return (
    <div className="max-w-6xl mx-auto  bg-white shadow-lg rounded-lg overflow-hidden mt-8">
      <div className="bg-gradient-to-r from-[#004ff9] to-[#000000] p-3">
        <h2 className="text-2xl flex justify-center font-semibold text-white">نظرات کاربران</h2>
      </div>
      <div className="p-8 space-y-6">
        {data.length > 0 ? (
          data.map((commentData) => (
            <CommentItem
              key={commentData?.id}
              firstName={commentData?.firstName}
              lastName={commentData?.lastName}
              comment={commentData?.comment}
              known={commentData?.known}
              answer={commentData?.answer}
            />
          ))
        ) : (
          <div className="p-4 text-xl text-gray-600">کامنتی موجود نیست</div>
        )}
      </div>
    </div>
  );
};

export default CommentList;
