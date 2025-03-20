import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-[600px] min-h-screen ml-auto mr-auto bg-white">
      <Header />
      <div className="flex flex-col items-center justify-center p-10">
        <div className="w-full sm:w-[90%]">
          <h1 className="mb-4 text-[22px] sm:text-[24px] text-[#061E5B] font-GmarketBold">서비스 이용약관</h1>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            ToMyongJi(이하 "회사"라 합니다)가 제공하는 학생회 회계 관리 서비스의 이용조건 및 절차, 회사와 회원 간의
            권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.
          </p>

          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">1. 용어의 정의</h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            <br />- "서비스"란 회사가 제공하는 학생회 회계 관리 플랫폼을 의미합니다.
            <br />- "회원"이란 서비스에 접속하여 이 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를
            이용하는 고객을 말합니다.
            <br />- "아이디(ID)"란 회원의 식별과 서비스 이용을 위하여 회원이 정하고 회사가 승인하는 문자와 숫자의 조합을
            말합니다.
            <br />- "비밀번호"란 회원이 부여받은 아이디와 일치되는 회원임을 확인하고 회원의 개인정보를 보호하기 위해
            회원이 정한 문자와 숫자의 조합을 말합니다.
          </p>

          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">2. 서비스의 제공</h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            회사는 다음과 같은 서비스를 제공합니다:
            <br />- 학생회비 관리 서비스
            <br />- 영수증 등록 및 관리 서비스
            <br />- 회계 보고서 생성 서비스
            <br />- 기타 회사가 정하는 서비스
          </p>

          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">3. 서비스 이용 시간</h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            <br />- 서비스 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간 운영을 원칙으로
            합니다.
            <br />- 회사는 서비스를 일정범위로 분할하여 각 범위별로 이용가능 시간을 별도로 정할 수 있습니다.
          </p>

          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">4. 회원의 의무</h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            회원은 다음 각 호의 행위를 하여서는 안 됩니다:
            <br />- 다른 회원의 아이디를 부정 사용하는 행위
            <br />- 서비스에서 얻은 정보를 회사의 사전 승인 없이 복제하거나 출판 및 방송 등에 사용하거나 제3자에게
            제공하는 행위
            <br />- 회사의 저작권, 제3자의 저작권 등 기타 권리를 침해하는 행위
            <br />- 공공질서 및 미풍양속에 위반되는 내용의 정보 등을 타인에게 유포하는 행위
            <br />- 기타 불법적이거나 부당한 행위
          </p>

          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">5. 서비스 제공의 중지</h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            회사는 다음 각 호에 해당하는 경우 서비스 제공을 중지할 수 있습니다:
            <br />- 서비스용 설비의 보수 등 공사로 인한 부득이한 경우
            <br />- 전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지했을 경우
            <br />- 기타 불가항력적 사유가 있는 경우
          </p>

          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">6. 게시물의 관리</h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            회사는 다음 각 호에 해당하는 게시물이나 자료를 사전통지 없이 삭제하거나 이동 또는 등록 거부를 할 수
            있습니다:
            <br />- 다른 회원 또는 제3자에게 심한 모욕을 주거나 명예를 손상시키는 내용인 경우
            <br />- 공공질서 및 미풍양속에 위반되는 내용을 유포하거나 링크시키는 경우
            <br />- 불법복제 또는 해킹을 조장하는 내용인 경우
            <br />- 영리를 목적으로 하는 광고일 경우
            <br />- 범죄와 결부된다고 객관적으로 인정되는 내용일 경우
          </p>

          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">
            7. 저작권의 귀속 및 이용제한
          </h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            <br />- 회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.
            <br />- 회원은 서비스를 이용함으로써 얻은 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타
            방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.
          </p>

          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">8. 손해배상</h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            회사는 서비스 이용과 관련하여 회원에게 발생한 어떠한 손해에 관하여도 책임을 지지 않습니다. 다만, 회사의
            중대한 과실이나 고의로 인한 손해의 경우는 제외합니다.
          </p>

          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">9. 분쟁해결</h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            <br />- 회사는 회원으로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다.
            <br />- 본 약관에 명시되지 않은 사항이 관계법령에 규정되어 있을 경우에는 그 규정에 따릅니다.
          </p>

          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">10. 시행일자</h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            본 약관은 2024년 3월 1일부터 시행합니다.
          </p>

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
            방침은 2024년 3월 1일부터 시행됩니다.
          </p>

          <h1 className="mb-4 text-[22px] sm:text-[24px] text-[#061E5B] font-GmarketBold">
            학생회 정보 수집 및 이용 동의
          </h1>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            ToMyongJi(이하 '회사')가 제공하는 학생회 회계 관리 서비스에서 학생회 정보의 수집 및 이용에 관한 사항을
            규정함을 목적으로 합니다.
          </p>

          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">1. 수집하는 학생회 정보</h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            회사는 서비스 제공을 위해 다음과 같은 학생회 정보를 수집합니다:
            <br />
            <br />
            1. 기본 정보
            <br />- 학생회명
            <br />- 소속 대학/학과
            <br />- 학생회 대표자 정보
            <br />- 회계 담당자 정보
            <br />
            <br />
            2. 회계 관련 정보
            <br />- 학생회비 내역
            <br />- 예산 계획 및 집행 내역
            <br />- 영수증 및 증빙 서류
            <br />- 회계 보고서
            <br />- 정산 내역
          </p>

          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">
            2. 정보 수집 및 이용 목적
          </h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            수집된 정보는 다음과 같은 목적으로 이용됩니다:
            <br />- 학생회비 관리의 투명성 확보
            <br />- 효율적인 예산 집행 및 관리
            <br />- 회계 자료의 디지털화 및 보관
            <br />- 회계 감사 지원
            <br />- 통계 작성 및 학술 연구
          </p>

          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">3. 정보의 보관 및 파기</h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            <br />
            1. 보관 기간
            <br />- 학생회 임기 중: 실시간 정보 갱신
            <br />- 임기 종료 후: 5년간 보관
            <br />- 법령에 따른 보관 의무가 있는 경우: 해당 기간 동안 보관
            <br />
            <br />
            2. 파기 절차
            <br />- 보관 기간 경과 후 즉시 파기
            <br />- 디지털 자료: 복구 불가능한 방법으로 삭제
            <br />- 물리적 자료: 파쇄 또는 소각
          </p>

          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">4. 정보의 제3자 제공</h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            학생회 정보는 다음의 경우에 한하여 제3자에게 제공될 수 있습니다:
            <br />- 감사 기관의 감사 목적
            <br />- 법령에 의한 요청이 있는 경우
            <br />- 통계 작성 및 학술 연구 목적(개인정보는 제외)
          </p>

          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">5. 정보 보호 조치</h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            회사는 학생회 정보 보호를 위해 다음과 같은 조치를 취합니다:
            <br />- 접근 권한 관리
            <br />- 정보 암호화
            <br />- 보안 시스템 구축
            <br />- 정기적인 보안 점검
          </p>

          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">6. 정보 열람 및 정정</h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            <br />- 학생회는 보관된 정보에 대해 열람을 요청할 수 있습니다.
            <br />- 잘못된 정보에 대해 정정을 요청할 수 있습니다.
            <br />- 열람 및 정정 요청은 서면 또는 전자적 방식으로 가능합니다.
          </p>

          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">7. 약관의 변경</h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            <br />- 본 약관의 내용은 법령의 변경 또는 서비스의 변경에 따라 수정될 수 있습니다.
            <br />- 약관이 변경될 경우 회사는 변경 내용을 서비스 내에 공지합니다.
          </p>

          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">8. 면책조항</h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            <br />- 회사는 학생회가 제공한 정보의 진실성에 대해 책임지지 않습니다.
            <br />- 법령에 따른 정보 제공으로 인한 학생회의 손해에 대해 회사는 책임지지 않습니다.
          </p>

          <h2 className="mb-4 text-[12px] sm:text-[18px] text-[#061E5B] font-GmarketMedium">9. 시행일자</h2>
          <p className="mb-12 text-[10px] sm:text-[12px] text-[#061E5B] font-GmarketLight">
            본 약관은 2024년 3월 1일부터 시행됩니다.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
