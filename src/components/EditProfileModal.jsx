import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import defaultImage from '../assets/images/default.png';

const EditProfileModal = ({ userInfo, onSave, onClose, userId, accessToken }) => {
  const [username, setUsername] = useState(userInfo.username);
  const [snsUrl, setSnsUrl] = useState(userInfo.snsUrl);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(userInfo.profile);
  const [ad, setAd] = useState(userInfo.ad); // New state added
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPreviewImage(userInfo.profile);
  }, [userInfo.profile]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    const userObject = {
      id: userId,
      username: username,
      email: userInfo.email,
      snsUrl: snsUrl,
      ad: ad,
      expert: userInfo.expert,
    };

    const userBlob = new Blob([JSON.stringify(userObject)], { type: 'application/json' });
    formData.append('user', userBlob, 'user.json');

    if (profileImage) {
      formData.append('profile', profileImage);
    }

    try {
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: accessToken,
        },
      });
      onSave(response.data);
    } catch (error) {
      console.error('프로필 업데이트 중 오류 발생:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg">
        <h2 className="mb-4 text-xl font-GmarketBold">프로필 수정</h2>
        <div className="mb-4 text-center">
          <img
            src={previewImage || defaultImage}
            alt="프로필 미리보기"
            className="object-cover w-32 h-32 mx-auto mb-2 rounded-full"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="px-4 py-2 text-sm text-[#2EC4B6] border border-[#2EC4B6] rounded hover:bg-[#2EC4B6] hover:text-white transition-colors duration-200"
          >
            이미지 변경
          </button>
          <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" ref={fileInputRef} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 font-GmarketMedium">
              이름
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 text-sm border rounded font-GmarketLight"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-GmarketMedium">
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={userInfo.email}
              className="w-full p-2 text-sm bg-gray-100 border rounded font-GmarketLight"
              disabled
            />
          </div>
          <div className="mb-4">
            <label htmlFor="snsUrl" className="block mb-2 font-GmarketMedium">
              SNS
            </label>
            <input
              type="text"
              id="snsUrl"
              value={snsUrl}
              onChange={(e) => setSnsUrl(e.target.value)}
              className="w-full p-2 text-sm border rounded font-GmarketLight"
            />
          </div>
          {/* New toggle switch added */}
          <div className="flex items-center mb-4">
            <label htmlFor="adToggle" className="mr-2 font-GmarketMedium">
              고수 홍보
            </label>
            <div
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
                ad ? 'bg-[#2EC4B6]' : 'bg-gray-300'
              }`}
              onClick={() => setAd(!ad)}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                  ad ? 'translate-x-6' : ''
                }`}
              ></div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
            >
              취소
            </button>
            <button type="submit" className="px-4 py-2 text-white bg-[#2EC4B6] rounded hover:bg-[#2AB0A3]">
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
