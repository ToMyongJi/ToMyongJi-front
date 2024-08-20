import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import AppBar from '../components/AppBar';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [media, setMedia] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef(null);
  const [accessToken, setAccessToken] = useState('');
  const [existingMedia, setExistingMedia] = useState([]);
  const [newMedia, setNewMedia] = useState([]);

  useEffect(() => {
    console.log('Received id:', id);
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { state: { from: `/edit-post/${id}` } });
    } else {
      setAccessToken(token);
      fetchPost();
    }
  }, [navigate, id]);

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const url = `${import.meta.env.VITE_API_BASE_URL}/api/post/${id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      });
      const post = response.data;
      setTitle(post.title);
      setContent(post.content);
      setCategory(post.category);
      setExistingMedia(post.attachments.map((attachment) => attachment.filePath));
      setPreviews(post.attachments.map((attachment) => attachment.filePath));
      setIsLoading(false);
    } catch (error) {
      console.error('게시글 불러오기 중 오류 발생:', error);
      setError('게시글을 불러오는 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  const removeMedia = (index) => {
    if (index < existingMedia.length) {
      setExistingMedia((prev) => prev.filter((_, i) => i !== index));
      setPreviews((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingMedia.length;
      setNewMedia((prev) => prev.filter((_, i) => i !== newIndex));
      setPreviews((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      setError('카테고리를 선택해주세요.');
      return;
    }

    try {
      const formData = new FormData();
      const postObject = {
        id: parseInt(id),
        title,
        content,
        category,
        userId: 0,
        username: '',
        createdDate: new Date().toISOString(),
        attachments: [],
        likesNum: 0,
        liked: false,
      };

      const postBlob = new Blob([JSON.stringify(postObject)], { type: 'application/json' });
      formData.append('post', postBlob, 'post.json');

      // 기존 미디어 파일 처리
      existingMedia.forEach((filePath) => {
        formData.append('existingFiles', filePath);
      });

      // 새로 추가된 미디어 파일 처리
      newMedia.forEach((file) => {
        formData.append('files', file);
      });

      console.log('FormData 내용:', formData);

      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/post/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: accessToken,
        },
      });

      console.log('게시글이 성공적으로 수정되었습니다:', response.data);
      navigate('/my-page');
    } catch (error) {
      console.error('게시글 수정 중 오류 발생:', error);
      setError('게시글 수정 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewMedia((prevMedia) => [...prevMedia, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prevPreviews) => [...prevPreviews, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  if (!accessToken) {
    return null;
  }

  if (isLoading) {
    return <div>게시글을 불러오는 중...</div>;
  }

  return (
    <div className="max-w-[600px] min-h-[100vh] mx-auto p-4 bg-white">
      <Header />
      <div className="flex items-center justify-between mt-8 mb-4">
        <h1 className="text-xl font-GmarketBold">게시글 수정</h1>
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="font-GmarketMedium p-1 text-xs sm:text-sm text-[#2EC4B6] border border-[#2EC4B6] rounded hover:text-white hover:bg-[#2EC4B6] active:text-[#2EC4B6] active:bg-white transition-colors duration-200"
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
          multiple
        />
        {previews.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative">
                <img src={preview} alt={`미리보기 ${index + 1}`} className="h-auto max-w-full rounded" />
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
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setError('');
          }}
          className="w-full p-2 mb-4 border rounded font-GmarketMedium"
          required
        >
          <option value="">카테리 선택</option>
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          className="w-full p-2 mb-4 border rounded font-GmarketMedium"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용"
          className="w-full h-40 p-2 mb-4 border rounded resize-none font-GmarketLight"
          required
        />
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/my-page')}
            className="font-GmarketMedium w-[48%] p-2 text-gray-600 border border-gray-300 rounded hover:bg-[#FF6B6B] hover:text-white transition-colors duration-200"
          >
            취소
          </button>
          <button
            type="submit"
            className="font-GmarketMedium w-[48%] p-2 text-[#2EC4B6] border border-[#2EC4B6] rounded hover:text-white hover:bg-[#2EC4B6] active:text-[#2EC4B6] active:bg-white transition-colors duration-200"
          >
            수정하기
          </button>
        </div>
      </form>
      <AppBar />
    </div>
  );
};

export default EditPost;
