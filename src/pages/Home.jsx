import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import AdvertiseButton from '../components/AdvertiseButton';
import AppBar from '../components/AppBar';
import defaultImage from '../assets/images/default.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SearchResults from '../components/SearchResults';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const categories = [
  { name: '등', path: '/back', icon: 'M4 7h4v10H4zM16 7h4v10h-4zM8 12h8' },
  { name: '가슴', path: '/chest', icon: 'M4 7h4v10H4zM16 7h4v10h-4zM8 12h8' },
  { name: '어깨', path: '/shoulder', icon: 'M4 7h4v10H4zM16 7h4v10h-4zM8 12h8' },
  { name: '팔', path: '/arm', icon: 'M4 7h4v10H4zM16 7h4v10h-4zM8 12h8' },
  { name: '하체', path: '/leg', icon: 'M4 7h4v10H4zM16 7h4v10h-4zM8 12h8' },
  { name: '복근', path: '/abs', icon: 'M4 7h4v10H4zM16 7h4v10h-4zM8 12h8' },
  { name: '심사', path: '/evaluation', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  {
    name: '루틴',
    path: '/routine',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  },
  {
    name: '영양',
    path: '/nutrition',
    icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
  },
];

const Home = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [feedbackPosts, setFeedbackPosts] = useState([]);
  const [routineNutritionPosts, setRoutineNutritionPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    fetchPosts();
    fetchExperts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/post`);
      const posts = response.data.map((post) => ({
        postId: post.id,
        category: post.category,
        title: post.title,
        user: post.username,
        userId: post.userId,
        date: new Date(post.createdDate).toLocaleDateString(),
        image: post.attachments.length > 0 ? post.attachments[0].filePath : null,
        likesNum: post.likesNum,
        content: post.content,
        attachments: post.attachments,
        liked: post.liked,
      }));

      const feedbackPosts = posts.filter((post) => post.category !== '루틴' && post.category !== '영양');
      const routineNutritionPosts = posts.filter((post) => post.category === '루틴' || post.category === '영양');

      setFeedbackPosts(feedbackPosts);
      setRoutineNutritionPosts(routineNutritionPosts);
    } catch (error) {
      console.error('게시물을 가져오는 중 오류 발생:', error);
    }
  };

  const fetchExperts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/experts`);
      setExperts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('전문가 목록을 가져오는 중 오류 발생:', error);
      setExperts([]);
    }
  };

  const handleCategoryClick = (path) => {
    if (path === '/routine' || path === '/nutrition') {
      navigate(`/routine-nutrition${path}`);
    } else if (path === '/evaluation') {
      navigate('/evaluation');
    } else {
      const category = path.slice(1);
      navigate(`/feedback/category/${category}`);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setSearchResults([]);
    } else {
      const results = filterPosts([...feedbackPosts, ...routineNutritionPosts], term);
      setSearchResults(results);
    }
  };

  const filterPosts = (posts, term) => {
    return posts.filter((post) => post.title.toLowerCase().includes(term.toLowerCase()));
  };

  const handlePostClick = (post, category) => {
    if (category === 'routine' || category === 'nutrition') {
      navigate(`/routine-nutrition/${category}/${post.postId}`, { state: { postData: post } });
    } else {
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
            likes: post.likesNum,
            attachments: post.attachments,
            liked: post.liked,
          },
        },
      });
    }
  };

  const renderSearchBar = () => (
    <form className="w-[90%] p-3">
      <input
        className="w-[100%] border-solid border-2 border-[#dddddd] rounded-[20px] px-5 py-[3px] text-[15px] font-GmarketLight focus:outline-none focus:border-[#2EC4B6]"
        type="text"
        placeholder="제목을 입력해주세요."
        value={searchTerm}
        onChange={handleSearch}
      />
    </form>
  );

  const renderCategories = () => (
    <div className="flex flex-wrap justify-between w-full p-2">
      {categories.map((category) => (
        <button
          key={category.name}
          className=" cursor-pointer w-[5%] min-w-[29px] aspect-square flex flex-col justify-center items-center m-1 transition-all duration-200 ease-in-out hover:bg-gray-50 active:bg-gray-100 rounded-lg group"
          onClick={() => handleCategoryClick(category.path)}
        >
          <svg
            className="flex flex-col w-[80%] text-black transition-colors duration-200 ease-in-out group-hover:text-[#2EC4B6]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
          </svg>
          <span className="flex justify-center items-center font-GmarketMedium text-gray-600 text-[10px] h-[40%] truncate group-hover:text-[#2EC4B6]">
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    swipeToSlide: true,
    variableWidth: true,
    adaptiveHeight: true,
    className: 'overflow-hidden',
  };

  const renderMasterBanner = () => (
    <div className="px-5 py-3 mt-5">
      <h2 className="text-xl font-GmarketBold mb-4 text-[#2EC4B6]">고수 추천</h2>
      <div className="relative overflow-hidden">
        {experts.length > 0 ? (
          experts.length === 1 ? (
            // 고수가 1명일 때
            <div className="flex justify-center">
              <div className="px-2 w-full max-w-[200px]">
                <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg">
                  <img
                    src={experts[0].profile || defaultImage}
                    alt={experts[0].username}
                    className="w-16 h-16 mb-2 rounded-full sm:w-20 sm:h-20 md:w-24 md:h-24"
                  />
                  <h3 className="text-xs sm:text-sm font-GmarketMedium">{experts[0].username}</h3>
                  <p className="text-xs text-gray-600 sm:text-sm">{experts[0].snsUrl}</p>
                </div>
              </div>
            </div>
          ) : (
            // 고수가 2명 이상일 때
            <div className="h-[220px]">
              <Slider {...sliderSettings}>
                {experts.map((expert) => (
                  <div key={expert.id} className="px-2" style={{ width: 200 }}>
                    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg">
                      <img
                        src={expert.profile || defaultImage}
                        alt={expert.username}
                        className="w-16 h-16 mb-2 rounded-full sm:w-20 sm:h-20 md:w-24 md:h-24"
                      />
                      <h3 className="text-xs sm:text-sm font-GmarketMedium">{expert.username}</h3>
                      <p className="text-xs text-gray-600 sm:text-sm">@{expert.snsUrl}</p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )
        ) : (
          <p className="text-center text-[#FF6B6B] font-GmarketMedium text-sm">
            고수 정보를 불러오는 중 오류가 발생했습니다.
          </p>
        )}
      </div>
    </div>
  );

  const renderPostSection = (title, posts, linkTo, category) => {
    const getCategoryKorean = (englishCategory) => {
      const categoryMap = {
        lower: '하체',
        abs: '복근',
        arm: '팔',
        back: '등',
        chest: '가슴',
        shoulder: '어깨',
        routine: '루틴',
        nutrition: '영양',
      };
      return categoryMap[englishCategory] || englishCategory;
    };

    // postId가 높은 순으로 정렬
    const sortedPosts = [...posts].sort((a, b) => b.postId - a.postId);

    return (
      <div className="px-5 py-3 mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm sm:text-xl font-GmarketBold text-[#2EC4B6]">{title}</h2>
          <Link
            to={linkTo}
            className="text-xs sm:text-sm text-black font-GmarketMedium hover:text-[#2EC4B6] active:text-black"
          >
            전체보기
          </Link>
        </div>
        {sortedPosts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {sortedPosts.slice(0, 4).map((post) => (
              <div
                key={post.postId}
                className="overflow-hidden border rounded-lg shadow-sm cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md hover:border-[#2EC4B6] active:bg-gray-100"
                onClick={() => handlePostClick(post, category)}
              >
                <div className="flex items-center px-1 sm:p-2">
                  <img
                    src={post.image || defaultImage}
                    alt={post.title}
                    className="object-cover mr-2 rounded-lg w-14 h-14 sm:w-20 sm:h-20"
                  />
                  <div className="flex flex-col justify-between w-full">
                    <div>
                      <span className="text-xs sm:text-xs font-GmarketMedium text-[#2EC4B6]">
                        {getCategoryKorean(post.category)}
                      </span>
                      <h3 className="text-xs truncate sm:text-sm font-GmarketMedium">{post.title}</h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600 font-GmarketLight">{post.user}</p>
                        <p className="text-xs text-gray-400 font-GmarketLight">{post.date}</p>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 mr-1 text-red-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-xs text-gray-600 font-GmarketLight">{post.likesNum}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-[#FF6B6B] font-GmarketMedium text-sm">게시물이 없습니다.</p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-[600px] min-h-screen ml-auto mr-auto bg-white font-bold text-3xl pb-14">
      <Header />
      <div className="flex flex-col justify-center items-center p-[10px]">
        <h1 className="text-3xl font-GmarketBold mb-[10px] text-[#2EC4B6]">Per-form</h1>
        {renderSearchBar()}
        {renderCategories()}
      </div>
      {searchTerm.trim() === '' ? (
        <>
          {renderMasterBanner()}
          <div className="flex justify-center items-center w-[100%] p-3 mt-5">
            <AdvertiseButton />
          </div>
          {renderPostSection('피드백 커뮤니티', feedbackPosts, '/feedback', 'feedback')}
          {renderPostSection('루틴/영양 커뮤니티', routineNutritionPosts, '/routine-nutrition', 'routine-nutrition')}
        </>
      ) : (
        <SearchResults
          results={searchResults}
          navigate={navigate}
          getCategoryPath={getCategoryPath}
          handlePostClick={handlePostClick}
        />
      )}
      <AppBar />
    </div>
  );
};

export default Home;
