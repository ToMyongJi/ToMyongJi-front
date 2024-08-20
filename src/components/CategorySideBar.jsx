import React from 'react';
import { Link } from 'react-router-dom';

const feedbackCategories = [
  { ko: '등', en: 'back' },
  { ko: '가슴', en: 'chest' },
  { ko: '어깨', en: 'shoulder' },
  { ko: '팔', en: 'arm' },
  { ko: '하체', en: 'leg' },
  { ko: '복근', en: 'abs' },
];

const routineNutritionCategories = [
  { ko: '루틴', en: 'routine' },
  { ko: '영양', en: 'nutrition' },
];

const CategorySidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center p-4 bg-[#2EC4B6]">
        <h2 className="text-sm text-white font-GmarketBold">카테고리</h2>
        <button className="text-white hover:text-gray-200" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <nav className="p-4">
        <Link to="/feedback" className="block mb-3" onClick={onClose}>
          <h3 className="text-sm font-GmarketMedium hover:text-[#2EC4B6]">피드백</h3>
        </Link>
        <ul className="mb-6">
          {feedbackCategories.map((category) => (
            <li key={category.ko} className="mb-2">
              <Link
                to={`/feedback/category/${category.en}`}
                className="block px-4 py-2 text-sm text-gray-700 rounded hover:bg-gray-100 font-GmarketLight"
                onClick={onClose}
              >
                {category.ko}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/evaluation" className="block mb-3" onClick={onClose}>
          <h3 className="text-sm font-GmarketMedium hover:text-[#2EC4B6]">심사</h3>
        </Link>
        <Link to="/routine-nutrition" className="block mb-3" onClick={onClose}>
          <h3 className="text-sm font-GmarketMedium hover:text-[#2EC4B6]">루틴/영양</h3>
        </Link>
        <ul>
          {routineNutritionCategories.map((category) => (
            <li key={category.ko} className="mb-2">
              <Link
                to={`/routine-nutrition/${category.en}`}
                className="block px-4 py-2 text-sm text-gray-700 rounded hover:bg-gray-100 font-GmarketLight"
                onClick={onClose}
              >
                {category.ko}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default CategorySidebar;
