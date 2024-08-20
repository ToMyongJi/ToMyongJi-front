import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/Header';
import AppBar from '../../components/AppBar';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const EvaluationDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [userVote, setUserVote] = useState(null);
  const { accessToken } = useAuth();
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserAndPost = async () => {
      if (!accessToken) return;

      try {
        // 사용자 정보 가져오기
        const userResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/my`, {
          headers: { Authorization: accessToken },
        });
        setUser(userResponse.data);

        // 게시물 정보 가져오기
        const postResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/reviewpost/${postId}`, {
          headers: { Authorization: accessToken },
        });
        const postData = postResponse.data;
        setPost(postData);
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    };

    fetchUserAndPost();
  }, [postId, accessToken]);

  const handleVote = async (voteType) => {
    if (!accessToken) {
      setShowLoginMessage(true);
      return;
    }

    try {
      const isAgree = voteType === 'agree';
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/uservote/${post.id}?isAgree=${isAgree}`,
        {},
        {
          headers: { Authorization: accessToken },
        }
      );

      setPost((prevPost) => ({
        ...prevPost,
        vote: {
          ...prevPost.vote,
          agreeNum: response.data.agreeNum,
          disagreeNum: response.data.disagreeNum,
        },
      }));
      setUserVote(voteType);
    } catch (error) {
      // console.error('투표 실패:', error);
      alert('투표는 한 번만 가능합니다.');
    }
  };

  const getEvaluationStatus = (reviewStatus) => {
    switch (reviewStatus) {
      case 'under review':
        return '심사중';
      case 'pass':
        return '합격';
      case 'non_pass':
        return '불합격';
      default:
        return '알 수 없음';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '심사중':
        return 'bg-yellow-200 text-yellow-800';
      case '합격':
        return 'bg-green-200 text-green-800';
      case '불합격':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  if (!post || !user) return <div>로딩 중...</div>;

  const evaluationStatus = getEvaluationStatus(post.reviewStatus);

  return (
    <div className="max-w-[600px] min-h-[100vh] mx-auto p-4 bg-white pb-16">
      <Header />
      <div className="mt-8">
        <Link to="/evaluation" className="font-GmarketMedium text-[#2EC4B6] mb-4 block">
          &lt; 돌아가기
        </Link>
        <div className="flex items-center mb-4">
          <h1 className="text-2xl font-GmarketBold">{post.title}</h1>
          <span className={`ml-2 px-1 py-1 text-[10px] font-GmarketMedium rounded ${getStatusColor(evaluationStatus)}`}>
            {evaluationStatus}
          </span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-GmarketMedium text-[#2EC4B6]">심사</span>
          <div>
            <span className="mr-2 text-sm font-GmarketLight">{post.username}</span>
            <span className="text-sm font-GmarketLight">{new Date(post.createdDate).toLocaleDateString()}</span>
          </div>
        </div>
        {post.attachments.length > 0 && (
          <img src={post.attachments[0].path} alt="게시물 이미지" className="w-full mb-4 rounded-lg" />
        )}
        <p className="mb-8 text-base font-GmarketLight">{post.content}</p>

        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => handleVote('agree')}
            className={`px-6 py-2 rounded-[10px] ${
              userVote === 'agree' ? 'bg-[#2EC4B6] text-white' : 'bg-gray-200 text-gray-800'
            } font-GmarketMedium transition duration-200`}
          >
            찬성
          </button>
          <button
            onClick={() => handleVote('disagree')}
            className={`px-6 py-2 rounded-[10px] ${
              userVote === 'disagree' ? 'bg-[#FF6B6B] text-white' : 'bg-gray-200 text-gray-800'
            } font-GmarketMedium transition duration-200`}
          >
            반대
          </button>
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

export default EvaluationDetail;
