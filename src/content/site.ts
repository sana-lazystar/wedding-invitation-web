// 청첩장의 값(디자인 논의 T112 · T127 · T132). 제목 · 설명은 layout.tsx의 메타와 카카오톡 공유 메시지가 같이 씁니다.
// 예식 정보 문구는 화면에 그대로 쓰이는 마크업이라 각 장면 컴포넌트에 둡니다. 여기에는 여러 곳이 함께 쓰는 값만 둡니다.

export const SITE_TITLE = "이산하 ♥ 송시야 결혼합니다.";
export const SITE_NAME = "이산하 · 송시야 청첩장";
// 줄바꿈은 카카오톡 공유 메시지에서 두 줄로 보입니다. URL 미리보기(OG 스크랩)에서 지켜지는지는 앱마다 다릅니다(T132)
export const SITE_DESCRIPTION = "26년 10월 9일 금요일 오후 6시 30분\n더채플앳청담";
export const THEME_COLOR = "#F3ECDF";

// 공유 미리보기 그림(T132). 1600×800(2:1)이고 카카오톡이 800×400으로 자릅니다. 카카오톡 공유 메시지도 같은 파일을 씁니다
export const OG_IMAGE = { url: "/og/share.jpg", width: 1600, height: 800, alt: "이산하와 송시야" };

export const VENUE = {
  name: "더채플앳청담 3층 커티지홀",
  address: "서울 강남구 선릉로 757",
  search: encodeURIComponent("더채플앳청담"),
  // 지도 중심은 대략값으로 시작하고 SDK의 지오코더가 주소로 바로잡습니다(T112)
  rough: { lat: 37.5205, lng: 127.041 },
};

// 지도와 카카오톡 공유가 같이 쓰는 Kakao Developers 앱의 JavaScript 키(T112 · T132).
// 로컬은 .env.local, 배포는 Vercel 환경 변수(Config)입니다. 앱의 Web 플랫폼에 localhost:3000과 배포 도메인을 등록해야 합니다.
// 키가 없으면 지도는 자리표시만 보이고 공유는 기기 공유 창으로 내려갑니다
export const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
