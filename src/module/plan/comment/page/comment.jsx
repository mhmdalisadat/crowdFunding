/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetProfile from 'src/module/profile/hooks/useGetProfile';
import usePostComments from '../service/postsComments';
import CommentList from '../feature/commentList';

const CommentForm = () => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showName, setShowName] = useState(true);
  const { traceCode } = useParams();

  const { mutate: postComment, isLoading } = usePostComments(traceCode);
  const { data: profileData} = useGetProfile();

  useEffect(() => {
    if (profileData && profileData.private_person && profileData.private_person.length > 0) {
      setName(profileData.private_person?.firstName);
    }
  }, [profileData]);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (comment.trim()) {
      postComment(
        {
          comment,
          known: showName,
        },
        {
          onSuccess: () => {
            setChatHistory([
              ...chatHistory,
              { sender: 'user', name: showName ? name : 'ناشناس', message: comment },
            ]);
            setComment('');
          },
        }
      );
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <CommentList traceCode={traceCode}  />
      <h1 className="text-xl font-bold mb-4 mt-10">ارسال دیدگاه</h1>

      <div className="mb-4">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`chat ${chat.sender === 'user' ? 'chat-start' : 'chat-end'}`}>
            <div
              className={`chat-bubble ${
                chat.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-900 text-white'
              }`}
            >
              <span className="font-bold">{chat.name}:</span> {chat.message}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          className="w-full p-2 border border-gray-300 bg-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="پیام خود را وارد کنید..."
          rows="2"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={isLoading}
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            id="show-name"
            checked={showName}
            onChange={() => setShowName(!showName)}
            className="mr-2 bg-white"
          />
          <label htmlFor="show-name" className="text-gray-700">
            نمایش نام
          </label>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-gradient-to-r from-[#004ff9] to-[#000000] text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
          disabled={isLoading}
        >
          {isLoading ? 'در حال ارسال...' : 'ارسال'}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
