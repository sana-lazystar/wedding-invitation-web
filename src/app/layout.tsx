import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Gaegu, Gowun_Batang, Nanum_Pen_Script, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

// WIW-4 임시 적용. 정식 이식은 시안 확정 뒤 story 아래 task에서 다시 합니다.
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
  title: "이산하 · 송시야 청첩장",
  description: "2026년 10월 9일 금요일 오후 6시 30분, 더채플앳청담 3층 커티지홀",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} ${gowunBatang.variable} ${nanumPen.variable} ${cormorant.variable} ${gaegu.variable}`}>
      <body>{children}</body>
    </html>
  );
}
