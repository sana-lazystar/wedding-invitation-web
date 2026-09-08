import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Gaegu, Gowun_Batang, Nanum_Pen_Script, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

// WIW-4 임시 적용. 정식 이식은 시안 확정 뒤 story 아래 task에서 다시 합니다.
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});
const gowunBatang = Gowun_Batang({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-gowun-batang",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});
const nanumPen = Nanum_Pen_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-nanum-pen",
  display: "swap",
});
// 쪽지·메모지 글꼴(디자인 논의 T64). 조립본 토큰 --font-memo가 sync-globals에서 이 변수로 바뀝니다
const gaegu = Gaegu({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-gaegu",
  display: "swap",
});

export const metadata: Metadata = {
  title: "이산하 ♥ 송시야 결혼합니다.",
  description: "2026년 10월 9일 금요일 오후 6시 30분",
  robots: { index: false, follow: false },
  // 아이콘(디자인 논의 T70). favicon.ico · icon1~4.png · apple-icon.png은 app/ 파일 규약으로 자동 연결되고, 매니페스트는 manifest.ts입니다. 아래는 규약이 없는 것만
  appleWebApp: { title: "이산하 · 송시야 청첩장" },
  other: {
    "msapplication-TileColor": "#F3ECDF",
    "msapplication-TileImage": "/ms-icon-144x144.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // 확대 막기(디자인 논의 T83). iOS는 무시하므로 page.tsx가 제스처도 막습니다
  viewportFit: "cover",
  themeColor: "#F3ECDF",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} ${gowunBatang.variable} ${nanumPen.variable} ${cormorant.variable} ${gaegu.variable}`}>
      <body>{children}</body>
    </html>
  );
}
