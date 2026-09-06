import type { MetadataRoute } from "next";

// 웹 앱 매니페스트(디자인 논의 T70). 아이콘은 이산하가 생성기로 만든 것(원본 docs/design/favicon/, git 제외)이고 public/에 둡니다.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "이산하 · 송시야 청첩장",
    short_name: "청첩장",
    start_url: "/",
    display: "browser",
    background_color: "#F3ECDF",
    theme_color: "#F3ECDF",
    icons: [36, 48, 72, 96, 144, 192].map((size) => ({
      src: `/android-icon-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
    })),
  };
}
