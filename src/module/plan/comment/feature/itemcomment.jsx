import React from 'react';
import PropTypes from 'prop-types';
import { RxAvatar } from 'react-icons/rx';

const CommentItem = ({ firstName, lastName, comment, known, answer }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center">
      <div className="chat-image avatar">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center">
          <RxAvatar className="text-4xl" />
        </div>
      </div>
      <div className="flex-1 space-y-4">
        <div className="chat-bubble bg-gray-100 p-4 rounded-lg shadow-md">
          {known ? (
            <>
              <span className="font-bold text-blue-600">
                {firstName} 
              </span>
              : <span className="text-black">{comment}</span>
            </>
          ) : (
            <>
              <span className="font-bold text-blue-600">ناشناس</span>:{' '}
              <span className="text-black">{comment}</span>
            </>
          )}
        </div>
        <div className="chat-bubble bg-red-50 border-l-4 border-red-600 p-4 rounded-lg shadow-md">
          <span className="font-bold text-red-600">پاسخ ادمین:</span>{' '}
          <span className="text-gray-800 font-medium italic">{answer}</span>
        </div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  known: PropTypes.bool.isRequired,
  answer: PropTypes.string.isRequired,
};

export default CommentItem;
