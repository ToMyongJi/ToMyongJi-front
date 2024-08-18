import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { signUpUser, checkUserIdDuplicate, sendEmailVerification, verifyEmailCode } from '../../utils/authApi';
import { fetchAllColleges, fetchCollegeClubs } from '../../utils/receiptApi';
import useCollegeStore from '../../store/collegeStore';

const SignUp = () => {
  const navigate = useNavigate();
  const { colleges, setColleges } = useCollegeStore();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentNum, setStudentNum] = useState('');
  const [college, setCollege] = useState('');
  const [role, setRole] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState('');

  useEffect(() => {
    const loadColleges = async () => {
      try {
        const collegeData = await fetchAllColleges();
        setColleges(collegeData);
      } catch (error) {
        console.error('대학 정보를 불러오는 데 실패했습니다:', error);
      }
    };
    if (colleges.length === 0) {
      loadColleges();
    }
  }, [colleges.length, setColleges]);

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return regex.test(password);
  };

  const handleCheckDuplicate = async () => {
    if (!userId) {
      alert('아이디를 입력해주세요.');
      return;
    }
    try {
      const result = await checkUserIdDuplicate(userId);
      if (result.isDuplicate === false) {
        alert('사용 가능한 아이디입니다.');
      } else {
        alert('이미 사용 중인 아이디입니다.');
      }
    } catch (error) {
      console.error('아이디 중복 확인 실패:', error);
      alert('아이디 중복 확인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleSendVerification = async () => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }
    try {
      setIsCodeSent(true);
      await sendEmailVerification(email);
      alert('인증코드가 발송되었습니다. 이메일을 확인해주세요.');
    } catch (error) {
      alert('인증코드 발송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleVerifyCode = async () => {
    if (!email || !verificationCode) {
      alert('이메일과 인증코드를 모두 입력해주세요.');
      return;
    }
    try {
      await verifyEmailCode(email, verificationCode);
      setIsEmailVerified(true);
      alert('이메일 인증이 성공적으로 인증되었습니다.');
    } catch (error) {
      alert('인증코드가 올바르지 않습니다. 다시 확인해주세요.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!isEmailVerified) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }
    if (!validatePassword(password)) {
      alert('비밀번호는 영문 대,소문자와 숫자, 특수기호가 적어도 1개 이상씩 포함된 8자 ~ 20자여야 합니다.');
      return;
    }
    try {
      const userData = {
        userId,
        password,
        name,
        email,
        studentNum,
        college,
        role,
      };
      const response = await signUpUser(userData);
      console.log('회원가입 성공:', response);
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('입력하지 않거나, 잘못입력한 정보가 있는지 확인해주세요.');
    }
  };

  const handleCollegeChange = async (e) => {
    const selectedCollegeId = e.target.value;
    setCollege(selectedCollegeId);
    if (selectedCollegeId) {
      try {
        const clubsData = await fetchCollegeClubs(selectedCollegeId);
        setClubs(clubsData);
      } catch (error) {
        console.error('학생회 정보를 불러오는 데 실패했습니다:', error);
      }
    } else {
      setClubs([]);
    }
    setSelectedClub('');
  };

  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-white flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center px-4 sm:px-20 py-10 mt-3 font-GmarketLight text-[10px] sm:text-[12px]">
        <div className="w-full p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF]">
          <h2 className="font-GmarketMedium text-[#002e72] text-[15px] sm:text-[18px] mb-4">회원가입</h2>
          <form onSubmit={handleSignUp} className="flex flex-col p-2 space-y-6">
            {/* 아이디/비밀번호 파트 */}
            <div className="py-3 space-y-7">
              {/* 아이디 */}
              <div className="flex flex-wrap items-center">
                <label className="w-full sm:w-[65px] text-[#002e72] mb-2 sm:mb-0">아이디</label>
                <div className="w-full sm:w-[calc(100%-65px)] flex flex-col sm:flex-row">
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF] mb-2 sm:mb-0 sm:mr-2"
                  />
                  <button
                    type="button"
                    onClick={handleCheckDuplicate}
                    className="w-full sm:w-auto px-4 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border border-[#CED3FF] cursor-pointer transition duration-300 whitespace-nowrap"
                  >
                    중복확인
                  </button>
                </div>
              </div>
              {/* 비밀번호 */}
              <div className="flex flex-wrap items-center">
                <label className="w-full sm:w-[65px] text-[#002e72] mb-2 sm:mb-0">비밀번호</label>
                <div className="w-full sm:w-[calc(100%-65px)] flex flex-col">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                  />
                  <p className="w-full mt-1 text-xs text-gray-500">
                    비밀번호는 영문 대,소문자와 숫자, 특수기호가 적어도 1개 이상씩 포함된 8자 ~ 20자여야 합니다.
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-t border-[#eeeffe]" />

            {/* 이름/이메일/인증코드  */}
            <div className="py-3 space-y-7">
              {/* 이름 */}
              <div className="flex flex-wrap items-center">
                <label className="w-full sm:w-[65px] text-[#002e72] mb-2 sm:mb-0">이름</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full sm:w-[calc(100%-65px)] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                />
              </div>
              {/* 이메일 */}
              <div className="flex flex-wrap items-center">
                <label className="w-full sm:w-[65px] text-[#002e72] mb-2 sm:mb-0">이메일</label>
                <div className="w-full sm:w-[calc(100%-65px)] flex flex-col">
                  <div className="flex flex-col sm:flex-row">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF] mb-2 sm:mb-0 sm:mr-2"
                    />
                    <button
                      type="button"
                      onClick={handleSendVerification}
                      className="w-full sm:w-auto px-4 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border border-[#CED3FF] cursor-pointer transition duration-300 whitespace-nowrap"
                    >
                      인증코드 발송
                    </button>
                  </div>
                  {isCodeSent && <p className="text-[#4CAF50] text-[9px] sm:text-xs mt-1">인증코드 전송 완료</p>}
                </div>
              </div>
              {/* 인증코드 */}
              <div className="flex flex-wrap items-center">
                <label className="w-full sm:w-[65px] text-[#002e72] mb-2 sm:mb-0">인증코드</label>
                <div className="w-full sm:w-[calc(100%-65px)] flex flex-col">
                  <div className="flex flex-col sm:flex-row">
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF] mb-2 sm:mb-0 sm:mr-2"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyCode}
                      className="w-full sm:w-auto px-4 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border border-[#CED3FF] cursor-pointer transition duration-300 whitespace-nowrap"
                    >
                      인증하기
                    </button>
                  </div>
                  {isEmailVerified && <p className="text-[#4CAF50] text-[9px] sm:text-xs mt-1">인증 완료</p>}
                </div>
              </div>
            </div>

            <hr className="border-t border-[#eeeffe]" />

            {/* 학번/대학/학과/자격 파트 */}
            <div className="py-4 space-y-7">
              {/* 학번 */}
              <div className="flex flex-wrap items-center">
                <label className="w-full sm:w-[65px] text-[#002e72] mb-2 sm:mb-0">학번</label>
                <input
                  type="text"
                  value={studentNum}
                  onChange={(e) => setStudentNum(e.target.value)}
                  className="w-full sm:w-[calc(100%-65px)] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                />
              </div>
              {/* 대학 */}
              <div className="flex flex-wrap items-center">
                <label className="w-full sm:w-[65px] text-[#002e72] mb-2 sm:mb-0">대학</label>
                <select
                  value={college}
                  onChange={handleCollegeChange}
                  className="w-full sm:w-[calc(100%-65px)] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                >
                  <option value="">대학을 선택해주세요.</option>
                  {colleges.map((college) => (
                    <option key={college.id} value={college.id}>
                      {college.collegeName}
                    </option>
                  ))}
                </select>
              </div>
              {/* 자격 */}
              <div className="flex flex-wrap items-center">
                <label className="w-full sm:w-[65px] text-[#002e72] mb-2 sm:mb-0">자격</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full sm:w-[calc(100%-65px)] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                >
                  <option value="">자격을 선택해주세요.</option>
                  <option value="STU">학생회 소속원</option>
                  <option value="PRESIDENT">학생회 회장</option>
                </select>
              </div>
            </div>
            {/* 소속 이름 */}
            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[65px] text-[#002e72] mb-2 sm:mb-0">소속 이름</label>
              <div className="w-full sm:w-[calc(100%-65px)] flex flex-col sm:flex-row">
                <select
                  value={selectedClub}
                  onChange={(e) => setSelectedClub(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF] mb-4 sm:mb-0 sm:mr-2"
                >
                  <option value="">소속을 선택해주세요.</option>
                  {clubs.map((club) => (
                    <option key={club.id} value={club.id}>
                      {club.studentClubName}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => {
                    /* 소속 인증 로직 */
                  }}
                  className="w-full sm:w-auto px-4 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border border-[#CED3FF] cursor-pointer transition duration-300 whitespace-nowrap"
                >
                  소속 인증하기
                </button>
              </div>
            </div>

            <hr className="sm:hidden border-t border-[#eeeffe]" />

            {/* 가입하기 버튼 */}
            <button
              type="submit"
              className="w-full px-3 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border border-[#CED3FF] cursor-pointer transition duration-300"
            >
              가입하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
