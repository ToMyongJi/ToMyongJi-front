import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import AppBar from '../components/AppBar';

const WritePost = () => {
  const [postData, setPostData] = useState({
    category: '',
    title: '',
    content: '',
    image: [],
  });
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!accessToken) {
        navigate('/login', { state: { from: '/write-post' } });
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/my`, {
          headers: {
            Authorization: `${accessToken}`,
          },
        });

        setUserData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('사용자 정보 조회 중 오류 발생:', error);
        navigate('/login', { state: { from: '/write-post' } });
      }
    };

    fetchUserData();
  }, [accessToken, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postData.category) {
      setError('카테고리를 선택해주세요.');
      return;
    }

    if (!userData) {
      setError('사용자 정보를 불러오는 중 오류가 발생했습니다.');
      return;
    }

    try {
      const formData = new FormData();
      const postObject = {
        id: 0,
        title: postData.title,
        content: postData.content,
        category: postData.category,
        userId: userData.id,
        username: userData.username,
        createdDate: new Date().toISOString(),
        attachments: [],
        likesNum: 0,
        liked: false,
      };

      // post 객체를 JSON Blob으로 변환하여 FormData에 추가
      const postBlob = new Blob([JSON.stringify(postObject)], { type: 'application/json' });
      formData.append('post', postBlob, 'post.json');

      // 파일 추가
      postData.image.forEach((file, index) => {
        formData.append(`files`, file);
      });

      console.log('FormData 내용:', formData);

      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/post/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${accessToken}`,
        },
      });

      console.log('서버 응답:', response.data);
      console.log('게시글이 성공적으로 저장되었습니다.');
      navigate('/feedback');
    } catch (error) {
      console.error('게시글 제출 중 오류 발생:', error);
      setError('게시글 제출 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setPostData((prevData) => ({
        ...prevData,
        image: [...prevData.image, file],
      }));
    }
  };

  const removeMedia = (index) => {
    setPostData((prevData) => ({
      ...prevData,
      image: prevData.image.filter((_, i) => i !== index),
    }));
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="max-w-[600px] min-h-[100vh] mx-auto p-4 bg-white">
      <Header />
      <div className="flex items-center justify-between mt-8 mb-4">
        <h1 className="text-xl font-GmarketBold">새 게시글 작성</h1>
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="p-1 text-xs sm:text-sm text-[#2EC4B6] border border-[#2EC4B6] rounded hover:text-white hover:bg-[#2EC4B6] active:text-[#2EC4B6] active:bg-white transition-colors duration-200"
        >
          파일 첨부
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*, video/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
        {postData.image.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {postData.image.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`미리보기 ${index + 1}`}
                  className="h-auto max-w-full rounded"
                />
                <button
                  type="button"
                  onClick={() => removeMedia(index)}
                  className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-white bg-red-500 rounded-full"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <select
          value={postData.category}
          onChange={(e) => {
            setPostData((prevData) => ({ ...prevData, category: e.target.value }));
            setError('');
          }}
          className="w-full p-2 mb-4 border rounded"
          required
        >
          <option value="">카테고리 선택</option>
          <option value="복근">복근</option>
          <option value="팔">팔</option>
          <option value="등">등</option>
          <option value="가슴">가슴</option>
          <option value="하체">하체</option>
          <option value="어깨">어깨</option>
          <option value="심사">심사</option>
          <option value="루틴">루틴</option>
          <option value="영양">영양</option>
        </select>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <input
          type="text"
          value={postData.title}
          onChange={(e) => setPostData((prevData) => ({ ...prevData, title: e.target.value }))}
          placeholder="제목"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <textarea
          value={postData.content}
          onChange={(e) => setPostData((prevData) => ({ ...prevData, content: e.target.value }))}
          placeholder="내용"
          className="w-full h-40 p-2 mb-4 border rounded resize-none"
          required
        />
        <button
          type="submit"
          className="w-full p-2 text-[#2EC4B6] border border-[#2EC4B6] rounded hover:text-white hover:bg-[#2EC4B6] active:text-[#2EC4B6] active:bg-white transition-colors duration-200"
        >
          게시하기
        </button>
      </form>
      <AppBar />
    </div>
  );
};

export default WritePost;
