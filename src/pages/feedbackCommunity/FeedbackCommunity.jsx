import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import AppBar from '../../components/AppBar';

const FeedbackCommunity = () => {
  const { accessToken } = useAuth();
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('최신순');
  const navigate = useNavigate();

  const categories = ['전체', '등', '팔', '가슴', '하체', '어깨', '복근'];

  const categoryMapping = {
    back: '등',
    chest: '가슴',
    shoulder: '어깨',
    arm: '팔',
    abs: '복근',
    lower: '하체',
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      const koreanCategory = categoryMapping[category] || category;
      if (categories.includes(koreanCategory)) {
        setSelectedCategory(koreanCategory);
      }
    }
  }, [location]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/post`);
        const formattedPosts = response.data
          .filter((post) => post.category !== '루틴' && post.category !== '영양')
          .map((post) => ({
            postId: post.id,
            category: categoryMapping[post.category] || post.category,
            title: post.title,
            user: post.username,
            userId: post.userId,
            content: post.content,
            date: new Date(post.createdDate).toLocaleDateString(),
            likes: post.likesNum,
            attachments: post.attachments,
            liked: post.liked,
          }));
        setPosts(formattedPosts);
      } catch (error) {
        console.error('게시물을 가져오는 중 오류 발생:', error);
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

  const filteredPosts =
    selectedCategory === '전체' ? posts : posts.filter((post) => post.category === selectedCategory);

  const sortedPosts = sortPosts(filteredPosts);

  const handlePostClick = (post) => {
    console.log('클릭한 게시물 데이터:', post);
    navigate(`/feedback/${post.postId}`, {
      state: {
        postData: {
          postId: post.postId,
          category: post.category,
          title: post.title,
          user: post.user,
          userId: post.userId,
          content: post.content,
          date: post.date,
          likes: post.likes,
          attachments: post.attachments,
          liked: post.liked,
        },
      },
    });
  };

  const handleWritePost = () => {
    if (!accessToken) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
    } else {
      navigate('/write-post');
    }
  };

  return (
    <div className="max-w-[600px] min-h-[100vh] mx-auto p-4 bg-white">
      <Header />
      <div className="mt-8">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-GmarketBold">피드백 게시글 목록</h1>
          <button
            onClick={handleWritePost}
            className="inline-block px-3 py-1 text-sm text-white bg-[#2EC4B6] rounded-lg font-GmarketMedium hover:bg-[#25A99D] active:bg-[#1F8C82]"
          >
            글쓰기
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4 font-GmarketMedium">
          {categories.map((category) => (
            <Link
              key={category}
              to={category === '전체' ? '/feedback' : `/feedback?category=${category}`}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedCategory === category ? 'bg-[#2EC4B6] text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
        <div className="flex gap-2 mb-10 font-GmarketMedium">
          {['최신순', '인기순'].map((sort) => (
            <button
              key={sort}
              onClick={() => setSortBy(sort)}
              className={`px-3 py-1 text-sm rounded-full ${
                sortBy === sort ? 'bg-[#2EC4B6] text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {sort}
            </button>
          ))}
        </div>
        <div className="grid gap-4">
          {sortedPosts.map((post) => (
            <div key={post.postId} onClick={() => handlePostClick(post)} className="block cursor-pointer">
              <div className="px-3 py-2 border rounded-lg shadow-sm border-[#DDDDDD] transition-all duration-200 ease-in-out hover:shadow-md hover:border-[#2EC4B6] active:bg-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-start flex-grow">
                    <span className="text-sm font-GmarketMedium text-[#2EC4B6] w-8">
                      {categoryMapping[post.category] || post.category}
                    </span>
                    <h3 className="flex ml-3 text-sm font-GmarketLight">{post.title}</h3>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="mx-2 text-[10px] text-black font-GmarketLight">{post.user}</p>
                    <p className="w-16 text-[10px] text-black font-GmarketLight">{post.date}</p>
                    <p className="ml-2 text-[10px] text-red-500 font-GmarketLight">❤ {post.likes}</p>
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

export default FeedbackCommunity;
