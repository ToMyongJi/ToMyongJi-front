import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AppBar from '../components/AppBar';
import EditProfileModal from '../components/EditProfileModal';
import defaultImage from '../assets/images/default.png';
import axios from 'axios';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({
    id: '',
    username: '사용자 이름',
    profile: null,
    email: 'user@example.com',
    snsUrl: 'snsUrl을 설정해주세요',
    expert: false,
  });

  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [reviewPosts, setReviewPosts] = useState([]);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/my`, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      });

      setUserInfo({
        id: response.data.id,
        username: response.data.username,
        profile: response.data.profile,
        email: response.data.email,
        snsUrl: response.data.snsUrl || '@sns_url',
        expert: response.data.expert,
      });
    } catch (error) {
      console.error('사용자 정보를 가져오는 데 실패했습니다:', error);
    }
  };

  const fetchMyPosts = async () => {
    try {
      const [postsResponse, reviewPostsResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/post/my`, {
          headers: {
            Authorization: `${localStorage.getItem('accessToken')}`,
          },
        }),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/reviewpost/my`, {
          headers: {
            Authorization: `${localStorage.getItem('accessToken')}`,
          },
        }),
      ]);
      setPosts(postsResponse.data);
      setReviewPosts(reviewPostsResponse.data);
    } catch (error) {
      console.error('게시글을 가져오는 데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchMyPosts();
  }, [refreshTrigger]);

  const getCategoryKorean = (category) => {
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
    return categoryMap[category] || category;
  };

  const handleEdit = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  const handleDelete = async (postId) => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/post/${postId}`, {
          headers: {
            Authorization: `${localStorage.getItem('accessToken')}`,
          },
        });
        setRefreshTrigger((prev) => prev + 1);
      } catch (error) {
        console.error('게시글 삭제 중 오류가 발생했습니다:', error);
      }
    }
  };

  const handleEditProfile = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleSaveProfile = (updatedProfile) => {
    if (updatedProfile instanceof FormData) {
      // FormData에서 이미지 파일 추출
      const imageFile = updatedProfile.get('profileImage');
      if (imageFile) {
        // 이미지 파일을 URL로 변환
        const imageUrl = URL.createObjectURL(imageFile);
        setUserInfo((prevInfo) => ({
          ...prevInfo,
          username: updatedProfile.get('username'),
          snsUrl: updatedProfile.get('snsUrl'),
          profile: imageUrl,
        }));
      } else {
        // 이미지가 변경되지 않은 경우
        setUserInfo((prevInfo) => ({
          ...prevInfo,
          username: updatedProfile.get('username'),
          snsUrl: updatedProfile.get('snsUrl'),
        }));
      }
    } else {
      // FormData가 아닌 경우
      setUserInfo((prevInfo) => ({
        ...prevInfo,
        ...updatedProfile,
      }));
    }
    setIsEditProfileModalOpen(false);
    setRefreshTrigger((prev) => prev + 1);
  };

  const handlePostClick = (post) => {
    navigate(`/feedback/${post.id}`, {
      state: {
        postData: {
          postId: post.id,
          category: post.category,
          title: post.title,
          user: post.username,
          userId: post.userId,
          content: post.content,
          date: new Date(post.createdDate).toLocaleDateString(),
          likes: post.likesNum,
          attachments: post.attachments,
          liked: post.liked,
        },
      },
    });
  };

  const handleEditReviewPost = (postId) => {
    navigate(`/edit-evaluation-post/${postId}`);
  };

  const handleDeleteReviewPost = async (postId) => {
    if (window.confirm('정말로 이 심사 게시글을 삭제하시겠습니까?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/reviewpost/${postId}`, {
          headers: {
            Authorization: `${localStorage.getItem('accessToken')}`,
          },
        });
        setRefreshTrigger((prev) => prev + 1);
      } catch (error) {
        console.error('심사 게시글 삭제 중 오류가 발생했습니다:', error);
      }
    }
  };

  const handleReviewPostClick = (post) => {
    navigate(`/evaluation/${post.id}`);
  };

  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-white">
      <Header isAuthenticated={true} />
      <div className="p-4 pb-16">
        <div className="flex items-center justify-between py-2 mb-6">
          <div className="flex items-center mb-8">
            <img
              src={userInfo.profile || defaultImage}
              alt="프로필 사진"
              className="object-cover w-24 h-24 mr-4 rounded-full"
            />
            <div>
              <div>
                <h1 className="flex items-center mb-1 text-2xl font-GmarketBold">
                  {userInfo.username}
                  {userInfo.expert && (
                    <span className="px-1 py-0.5 ml-2 text-xs text-white bg-[#2EC4B6] rounded-[10px] font-GmarketMedium">
                      고수
                    </span>
                  )}
                </h1>
                <p className="mb-1 text-sm text-gray-600 font-GmarketMedium">{userInfo.email}</p>
                <p className="text-sm text-gray-600 font-GmarketMedium">{userInfo.snsUrl}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleEditProfile}
              className="bg-[#2EC4B6] text-white px-3 py-2 rounded text-sm font-GmarketMedium hover:bg-[#2AB0A3]"
            >
              프로필 수정
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-md font-GmarketBold text-[#2EC4B6]">내 게시글</h2>
          {posts.length > 0 ? (
            <ul className="space-y-2">
              {posts.map((post) => {
                return (
                  <li key={post.id} className="pb-2 border-b">
                    <div className="flex items-center justify-between">
                      <div
                        onClick={() => handlePostClick(post)}
                        className="flex-grow block p-2 rounded cursor-pointer hover:bg-gray-100"
                      >
                        <div className="flex justify-between text-xs text-gray-600 font-GmarketLight mb-[5px]">
                          <span className="text-[#2EC4B6] font-GmarketMedium">{getCategoryKorean(post.category)}</span>
                          <span>{new Date(post.createdDate).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-sm font-GmarketLight">{post.title}</h3>
                      </div>
                      <div className="w-[16%] flex items-center justify-between ml-5">
                        <button
                          onClick={() => handleEdit(post.id)}
                          className="px-2 py-1 text-xs text-[#2EC4B6] border border-[#2EC4B6] rounded hover:bg-[#2EC4B6] hover:text-white active:bg-white active:text-[#2EC4B6] transition-colors duration-200 font-GmarketMedium"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="px-2 py-1 text-xs text-[#FF6B6B] border border-[#FF6B6B] rounded hover:bg-[#FF6B6B] hover:text-white active:bg-white active:text-[#FF6B6B] transition-colors duration-200 font-GmarketMedium"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-600">작성한 게시글이 없습니다.</p>
          )}
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-md font-GmarketBold text-[#2EC4B6]">내 심사 게시글</h2>
          {reviewPosts.length > 0 ? (
            <ul className="space-y-2">
              {reviewPosts.map((post) => {
                return (
                  <li key={post.id} className="pb-2 border-b">
                    <div className="flex items-center justify-between">
                      <div
                        onClick={() => handleReviewPostClick(post)}
                        className="flex-grow block p-2 rounded cursor-pointer hover:bg-gray-100"
                      >
                        <div className="flex justify-between text-xs text-gray-600 font-GmarketLight mb-[5px]">
                          <span className="text-[#2EC4B6] font-GmarketMedium">심사</span>
                          <span>{new Date(post.createdDate).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-sm font-GmarketLight">{post.title}</h3>
                      </div>
                      <div className="w-[16%] flex items-center justify-between ml-5">
                        <button
                          onClick={() => handleEditReviewPost(post.id)}
                          className="px-2 py-1 text-xs text-[#2EC4B6] border border-[#2EC4B6] rounded hover:bg-[#2EC4B6] hover:text-white active:bg-white active:text-[#2EC4B6] transition-colors duration-200 font-GmarketMedium"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDeleteReviewPost(post.id)}
                          className="px-2 py-1 text-xs text-[#FF6B6B] border border-[#FF6B6B] rounded hover:bg-[#FF6B6B] hover:text-white active:bg-white active:text-[#FF6B6B] transition-colors duration-200 font-GmarketMedium"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-600">작성한 심사 게시글이 없습니다.</p>
          )}
        </div>
      </div>
      {!isEditProfileModalOpen && <AppBar />}
      {isEditProfileModalOpen && (
        <EditProfileModal
          userInfo={userInfo}
          onSave={handleSaveProfile}
          onClose={() => setIsEditProfileModalOpen(false)}
          userId={userInfo.id}
          accessToken={localStorage.getItem('accessToken')}
        />
      )}
    </div>
  );
};

export default MyPage;
