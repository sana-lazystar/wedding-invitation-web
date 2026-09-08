import type { MetadataRoute } from "next";
import { SITE_NAME, THEME_COLOR } from "@/content/site";

// 웹 앱 매니페스트(디자인 논의 T70 · T136). 아이콘은 이산하가 생성기로 만든 장미 인장(원본 docs/design/favicon/generated/, git 제외)이고 public/에 둡니다.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "청첩장",
    start_url: "/",
    display: "browser",
    background_color: THEME_COLOR,
    theme_color: THEME_COLOR,
    icons: [36, 48, 72, 96, 144, 192].map((size) => ({
      src: `/android-icon-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
    })),
  };
}
