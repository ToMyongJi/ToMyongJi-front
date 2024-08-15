import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';

import logo from '../assets/images/logo.png';
import buttonBackground from '../assets/images/buttonBackground.png';

const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showICTSubMenu, setShowICTSubMenu] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleOnClick = useCallback(
    (path) => {
      return () => navigate(path);
    },
    [navigate]
  );

  const groups = [
    { name: '총학생회', id: 1 },
    { name: '인문대학', id: 2 },
    { name: '사회과학대학', id: 3 },
    { name: '경영대학', id: 4 },
    { name: '법과대학', id: 5 },
    {
      name: 'ICT융합대학',
      id: 6,
      subGroups: [
        { name: 'ICT융합대학 학생회', id: 61 },
        { name: '융합소프트웨어학부 학생회', id: 62 },
        { name: '디지털콘텐츠디자인전공 학생회', id: 63 },
      ],
    },
    { name: '자연과학대학', id: 7 },
    { name: '공과대학', id: 8 },
    { name: '예술체육대학', id: 9 },
    { name: '건축대학', id: 10 },
    { name: '방목기초대학', id: 11 },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-[10px]">
      {/* 로고 */}
      <button className="w-60 sm:w-80" onClick={handleOnClick('/')}>
        <img src={logo} alt="투명지 로고 이미지" />
      </button>
      {/* 로그인 버튼 */}
      <div className="w-[100%] flex justify-end items-center p-[10px] mb-4">
        <button
          className="w-[104px] sm:w-[110px] h-[35px] sm:h-[40px] bg-no-repeat bg-cover flex items-center justify-center relative"
          style={{ backgroundImage: `url(${buttonBackground})` }}
          onClick={handleOnClick('/login')}
        >
          <span className="hover:text-[#CED3FF] transition duration-300 z-10 text-[#002e72] font-GmarketLight text-[11px] sm:text-xs">
            로그인
          </span>
        </button>
      </div>
      {/* 네비바 */}
      <div className="text-sm sm:text-[16px] text-[#002D72] flex items-center justify-evenly font-GmarketLight w-[100%] border-t border-[#4E67EC] border-b py-3">
        <div className="relative">
          <button
            className="px-3 py-2 rounded-md hover:text-[#CED3FF] transition duration-300"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            조회
          </button>
          {showDropdown && (
            <div className="px-3 py-2 text-[7.5px] sm:text-[13px] absolute left-0 mt-2 sm:w-[450px] w-[300px] bg-[#F5F8FF] rounded-md shadow-lg z-50 flex">
              <ul className="w-1/2">
                {groups.map((group) => (
                  <li
                    key={group.id}
                    className={`px-4 py-2 cursor-pointer text-[#002D72] font-GmarketLight transition duration-300 ${
                      selectedGroup === group.id
                        ? 'bg-[#CED3FF] font-GmarketMedium'
                        : 'hover:bg-[#CED3FF] hover:font-GmarketMedium'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedGroup(group.id);
                      if (group.id === 6) {
                        setShowICTSubMenu(!showICTSubMenu);
                      } else {
                        navigate(`/receipts-list/${group.id}`);
                        setShowDropdown(false);
                      }
                    }}
                  >
                    {group.name}
                  </li>
                ))}
              </ul>
              <div className="w-px bg-[#A0B0FF] my-2"></div>
              {showICTSubMenu && (
                <ul className="w-1/2">
                  {groups
                    .find((g) => g.id === 6)
                    .subGroups.map((subGroup) => (
                      <li
                        key={subGroup.id}
                        className={`px-4 py-2 cursor-pointer text-[#002D72] font-GmarketLight transition duration-300 ${
                          selectedGroup === subGroup.id
                            ? 'bg-[#CED3FF] font-GmarketMedium'
                            : 'hover:bg-[#CED3FF] hover:font-GmarketMedium'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedGroup(subGroup.id);
                          navigate(`/receipts-list/${subGroup.id}`);
                          setShowDropdown(false);
                          setShowICTSubMenu(false);
                        }}
                      >
                        {subGroup.name}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <button
          className="px-3 py-2 rounded-md hover:text-[#CED3FF] transition duration-300"
          onClick={handleOnClick('/create-receipt')}
        >
          작성
        </button>
        <button
          className="px-3 py-2 rounded-md hover:text-[#CED3FF] transition duration-300"
          onClick={handleOnClick('/my-page')}
        >
          마이
        </button>
      </div>
    </div>
  );
};

export default Header;
