import { useMutation } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';

const usePostComments = (traceCode) => {
  const postComment = async ({ comment, known }) => {
    const access = await getCookie('access');
    const response = await api.post(
      `/api/comment/user/${traceCode}/`,
      { known , comment  },
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: postComment,
    onSuccess: (data) => {
    },
    onError: (error) => {
    },
  });

  return mutation;
};

export default usePostComments;
