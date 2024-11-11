import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-[600px] min-h-screen ml-auto mr-auto bg-white">
      <Header />
      <div className="flex flex-col items-center justify-center p-10">
        <div className="w-full sm:w-[90%]">
          <h1 className="mb-4 text-[22px] sm:text-[24px] text-[#061E5B] font-GmarketBold">개인정보처리방침</h1>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            ToMyongJi(이하 '회사'는) 고객님의 개인정보를 중요시하며, "정보통신망 이용촉진 및 정보보호"에 관한 법률을
            준수하고 있습니다. 회사는 개인정보처리방침을 통하여 고객님께서 제공하시는 개인정보가 어떠한 용도와 방식으로
            이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
          </p>

          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">
            1. 수집하는 개인정보 항목
          </h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            회사는 회원가입 및 서비스 이용을 위해 아래와 같은 개인정보를 수집하고 있습니다:
            <br />- 필수항목: 이름, 로그인ID, 비밀번호, 이메일, 학번, 대학, 자격, 소속이름
            <br />- 서비스 이용 과정에서 자동으로 생성되어 수집되는 정보: 서비스 이용기록, 접속 로그, 접속 IP 정보
          </p>

          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">
            2. 개인정보의 수집 및 이용목적
          </h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다:
            <br />- 회원 가입 및 관리
            <br />- 학생회비 정보 게시 및 조회 서비스 제공
            <br />- 불량회원의 부정 이용 방지와 비인가 사용 방지
            <br />- 고지사항 전달, 불만처리 등 민원처리
          </p>

          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">
            3. 개인정보의 보유 및 이용기간
          </h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            회원의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 단, 관계법령의
            규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를
            보관합니다.
            <br />
            <br />- 학생회 정보: 학생회 정보 변동 시 즉시 파기
          </p>
          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">
            4. 개인정보의 제3자 제공
          </h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            회사는 이용자의 동의 없이는 원칙적으로 개인정보를 외부에 제공하지 않습니다. 다만, 법령에 의해 요구되거나
            서비스 제공을 위해 불가피하게 필요한 경우에 한해 제공할 수 있습니다.
          </p>
          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">5. 이용자의 권리</h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            이용자는 언제든지 자신의 개인정보에 대해 열람, 수정, 삭제를 요청할 수 있습니다. 또한, 개인정보 처리에 대한
            동의를 철회할 수 있으며, 이와 관련한 문의는 회사의 개인정보 보호책임자에게 연락해 주시기 바랍니다.
          </p>
          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">
            6. 개인정보의 파기 절차 및 방법
          </h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            회사는 개인정보 보유 기간이 경과하거나 처리 목적이 달성된 경우, 해당 정보를 지체 없이 파기합니다. 파기 절차
            및 방법은 다음과 같습니다:
            <br />
            <br />- 파기 절차: 회원님이 회원가입 등을 위해 입력하신 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의
            경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간
            저장된 후 파기되어집니다. 별도 DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 보유되어지는 이외의 다른
            목적으로 이용되지 않습니다.
            <br />
            <br />- 파기 방법: 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여
            삭제합니다.
          </p>
          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">
            7. 개인정보 보호를 위한 기술적/관리적 대책
          </h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            회사는 개인정보를 안전하게 보호하기 위해 다음과 같은 조치를 취하고 있습니다:
            <br />
            <br />- 암호화: 민감한 데이터는 암호화하여 데이터베이스에 저장 및 전송
            <br />- 접근 통제: 개인정보 접근 권한 관리 및 접근 기록 보관
            <br />- 웹 취약성 검사: 정기적인 웹 취약성 검사를 통해 잠재적인 웹 공격에 대비
            <br />- 네트워크 보안: SSL 인증서를 적용하여 네트워크 상의 데이터를 보호
          </p>
          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">
            8. 개인정보에 관한 민원서비스
          </h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            회사는 고객의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및
            개인정보보호책임자를 지정하고 있습니다:
            <br />- 개인정보보호책임자 성명: 이준규
            <br />- 전화번호: 010-6540-3642
            <br />- 이메일: tomyongji2024@gmail.com
          </p>
          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">
            9. 개인정보 처리방침 변경
          </h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            이 개인정보 처리방침은 법령 및 방침에 따라 변경될 수 있으며, 변경 시 웹사이트를 통하여 공지하겠습니다. 이
            방침은 [시행일자]부터 시행됩니다.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
