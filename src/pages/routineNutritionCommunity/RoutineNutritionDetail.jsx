import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from '../../components/Header';
import AppBar from '../../components/AppBar';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const RoutineNutritionDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { accessToken, user } = useAuth();
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [error, setError] = useState(null);

  const getCategoryInKorean = (category) => {
    const categoryMap = {
      routine: '루틴',
      nutrition: '영양',
    };
    return categoryMap[category] || category;
  };

  useEffect(() => {
    const fetchPostData = async () => {
      if (location.state && location.state.postData) {
        const data = location.state.postData;
        setPost(data);
        setLikes(data.likes);

        try {
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/likes/post/${data.postId}`, {
            headers: { Authorization: `${accessToken}` },
          });
          setIsLiked(response.data.length > 0);
        } catch (error) {
          console.error('좋아요 상태를 가져오는 중 오류 발생:', error);
        }

        fetchComments(data.postId);
      } else {
        setError('게시물 데이터를 찾을 수 없습니다.');
      }
    };

    fetchPostData();
  }, [location.state, accessToken]);

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/comment/${postId}`, {
        headers: { Authorization: `${accessToken}` },
      });

      const commentsWithLikeStatus = await Promise.all(
        response.data.map(async (comment) => {
          const likeResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/likes/comment/${comment.id}`, {
            headers: { Authorization: `${accessToken}` },
          });
          return {
            ...comment,
            liked: likeResponse.data.length > 0,
            likesNum: likeResponse.data.length,
          };
        })
      );

      setComments(commentsWithLikeStatus);
    } catch (error) {
      console.error('댓글을 불러오는 중 오류 발생:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!accessToken) {
      setShowLoginMessage(true);
    } else {
      await submitComment();
    }
  };

  const submitComment = async () => {
    if (newComment.trim() === '') return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/comment/${post.postId}`,
        {
          content: newComment,
        },
        {
          headers: { Authorization: `${accessToken}` },
        }
      );

      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('댓글 작성 중 오류 발생:', error);
    }
  };

  const handleLike = async (commentId) => {
    if (!accessToken) {
      setShowLoginMessage(true);
    } else {
      try {
        const comment = comments.find((c) => c.id === commentId);
        if (comment.liked) {
          await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/likes/${commentId}`, {
            headers: { Authorization: `${accessToken}` },
          });
        } else {
          await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/likes/comment/${commentId}`,
            {},
            {
              headers: { Authorization: `${accessToken}` },
            }
          );
        }

        setComments(
          comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                liked: !comment.liked,
                likesNum: comment.liked ? comment.likesNum - 1 : comment.likesNum + 1,
              };
            }
            return comment;
          })
        );
      } catch (error) {
        console.error('댓글 좋아요 처리 중 오류 발생:', error);
      }
    }
  };

  const handlePostLike = async () => {
    if (!accessToken) {
      setShowLoginMessage(true);
    } else {
      try {
        if (isLiked) {
          // 좋아요 취소
          await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/likes/post/${post.postId}`, {
            headers: { Authorization: `${accessToken}` },
          });
        } else {
          // 좋아요 추가
          await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/likes/post/${post.postId}`,
            {},
            {
              headers: { Authorization: `${accessToken}` },
            }
          );
        }

        setIsLiked(!isLiked);
        setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
      } catch (error) {
        console.error('좋아요 처리 중 오류 발생:', error);
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  if (error) return <div>오류 발생: {error}</div>;
  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="max-w-[600px] min-h-[100vh] mx-auto p-4 bg-white pb-16">
      <Header />
      <div className="mt-8">
        <button onClick={handleGoBack} className="text-[#2EC4B6] mb-4 block font-GmarketMedium">
          &lt; 돌아가기
        </button>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-GmarketBold">{post?.title}</h1>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-GmarketMedium text-[#2EC4B6]">{getCategoryInKorean(post?.category)}</span>
          <div>
            <span className="mr-2 text-sm font-GmarketLight">{post?.user}</span>
            <span className="text-sm font-GmarketLight">{post?.date}</span>
          </div>
        </div>
        {post?.attachments && post.attachments.length > 0 && (
          <div className="mb-10">
            {post.attachments.length === 1 ? (
              <img src={post.attachments[0].filePath} alt="게시물 이미지" className="w-full rounded-lg" />
            ) : (
              <Slider {...settings}>
                {post.attachments.map((attachment, index) => (
                  <div key={index}>
                    <img src={attachment.filePath} alt={`게시물 이미지 ${index + 1}`} className="w-full rounded-lg" />
                  </div>
                ))}
              </Slider>
            )}
          </div>
        )}
        <p className="mb-8 text-base font-GmarketLight">{post?.content}</p>

        <div className="flex justify-end mb-4">
          <button
            onClick={handlePostLike}
            className={`flex items-center px-4 py-2 rounded-full ${
              isLiked ? 'bg-[#FF6B6B] text-white' : 'bg-gray-200 text-gray-800'
            } transition duration-200`}
          >
            <span className="mr-2">{isLiked ? '❤️' : '🤍'}</span>
            <span>{likes}</span>
          </button>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-md font-GmarketBold">댓글</h2>
          {accessToken ? (
            <>
              {comments.map((comment) => (
                <div key={comment.id} className="px-3 py-2 mb-4 bg-gray-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="text-sm font-GmarketMedium">{comment.username}</span>
                      {comment.expert && (
                        <span className="ml-2 px-1 py-1 text-[10px] font-GmarketMedium bg-[#2EC4B6] text-white rounded-full">
                          고수
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 font-GmarketLight">
                      {new Date(comment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="mb-2 text-xs font-GmarketLight">{comment.content}</p>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleLike(comment.id)}
                        className={`text-md mr-2 ${comment.liked ? 'text-red-500' : 'text-gray-500'}`}
                      >
                        {comment.liked ? '❤️' : '🤍'}
                      </button>
                      <span className="text-xs text-gray-500">{comment.likesNum}</span>
                    </div>
                  </div>
                </div>
              ))}

              <form onSubmit={handleCommentSubmit} className="mt-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="font-GmarketLight text-sm w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-[#2EC4B6] focus:border-[#2EC4B6] transition duration-200"
                  rows="3"
                  placeholder="댓글을 작성해주세요..."
                  disabled={!accessToken}
                ></textarea>
                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    className={`mt-2 px-4 py-2 ${
                      accessToken ? 'bg-[#2EC4B6] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    } rounded-lg transition duration-200 ease-in-out font-GmarketMedium`}
                    disabled={!accessToken}
                  >
                    댓글 작성
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="p-4 text-center bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600 font-GmarketMedium">로그인이 필요한 기능입니다.</p>
            </div>
          )}
        </div>
      </div>
      {showLoginMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-sm font-GmarketBold text-[#FF6B6B]">로그인이 필요한 서비스입니다.</h2>
            <button
              className="px-3 py-2 text-[#2EC4B6] border border-[#2EC4B6] rounded hover:text-white hover:bg-[#2EC4B6] active:text-[#2EC4B6] active:bg-white transition-colors duration-200 rounded-lg font-GmarketMedium text-xs"
              onClick={() => setShowLoginMessage(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
      <AppBar />
    </div>
  );
};

export default RoutineNutritionDetail;
