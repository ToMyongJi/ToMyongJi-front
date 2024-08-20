import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import AppBar from '../../components/AppBar';

const EvaluationCommunity = () => {
  const { accessToken } = useAuth();
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('최신순');
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/reviewpost`);
        const formattedPosts = response.data.map((post) => ({
          postId: post.id,
          category: '심사',
          title: post.title,
          user: post.user?.username || '익명',
          content: post.content,
          date: new Date(post.createdDate).toLocaleDateString(),
          attachments: post.attachments,
          evaluationStatus: getEvaluationStatus(post.reviewStatus),
        }));
        setPosts(formattedPosts);
      } catch (error) {
        console.error('심사 게시물을 가져오는 중 오류 발생:', error);
      }
    };

    fetchPosts();
  }, []);

  const sortPosts = (posts) => {
    if (sortBy === '최신순') {
      return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === '인기순') {
      return [...posts].sort((a, b) => b.likes - a.likes);
    }
    return posts;
  };

  const sortedPosts = sortPosts(posts);

  const handlePostClick = (post) => {
    navigate(`/evaluation/${post.postId}`, {
      state: { postData: post },
    });
  };

  const handleWritePost = () => {
    if (!accessToken) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
    } else {
      navigate('/write-evaluation');
    }
  };

  return (
    <div className="max-w-[600px] min-h-[100vh] mx-auto p-4 bg-white">
      <Header />
      <div className="mt-8">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-GmarketBold">심사 게시글 목록</h1>
          <button
            onClick={handleWritePost}
            className="inline-block px-3 py-1 text-sm text-white bg-[#2EC4B6] rounded-lg font-GmarketMedium hover:bg-[#25A99D] active:bg-[#1F8C82]"
          >
            글쓰기
          </button>
        </div>
        <div className="grid gap-4">
          {sortedPosts.map((post) => (
            <div key={post.postId} onClick={() => handlePostClick(post)} className="block cursor-pointer">
              <div className="px-3 py-2 border rounded-lg shadow-sm border-[#DDDDDD] transition-all duration-200 ease-in-out hover:shadow-md hover:border-[#2EC4B6] active:bg-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-start flex-grow">
                    <span className="text-sm font-GmarketMedium text-[#2EC4B6] w-8">{post.category}</span>
                    <h3 className="flex ml-1 text-sm font-GmarketLight">{post.title}</h3>
                    <span
                      className={`ml-2 px-1 py-1 text-[10px] font-GmarketMedium rounded ${getStatusColor(
                        post.evaluationStatus
                      )}`}
                    >
                      {post.evaluationStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="mx-2 text-[10px] text-black font-GmarketLight">{post.user}</p>
                    <p className="w-16 text-[10px] text-black font-GmarketLight">{post.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AppBar />
    </div>
  );
};

export default EvaluationCommunity;
