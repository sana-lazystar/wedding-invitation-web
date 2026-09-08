// 카카오 SDK 둘(디자인 논의 T112 · T132). 지도는 dapi의 지도 SDK, 공유는 t1의 JavaScript SDK이고 앱 키는 같습니다.
// 창(window)에 붙는 전역 이름도 여기서 선언합니다
import { KAKAO_JS_KEY, OG_IMAGE, SITE_DESCRIPTION, SITE_TITLE } from "@/content/site";

// ── 지도 SDK가 창에 붙이는 것 중 쓰는 것만 적은 타입
type KakaoLatLng = { getLat: () => number; getLng: () => number };
export type KakaoMaps = {
  load: (cb: () => void) => void;
  LatLng: new (lat: number, lng: number) => KakaoLatLng;
  Map: new (el: HTMLElement, opts: { center: KakaoLatLng; level: number }) => { setCenter: (c: KakaoLatLng) => void; setLevel: (l: number) => void };
  Marker: new (opts: { position: KakaoLatLng; map: unknown }) => { setPosition: (c: KakaoLatLng) => void };
  services: {
    Geocoder: new () => { addressSearch: (address: string, cb: (result: { x: string; y: string }[], status: string) => void) => void };
    Status: { OK: string };
  };
};

type KakaoSdk = { isInitialized: () => boolean; init: (key: string) => void; Share: { sendDefault: (settings: Record<string, unknown>) => void } };

declare global {
  interface Window {
    kakao?: { maps: KakaoMaps };
    Kakao?: KakaoSdk;
  }
}

const KAKAO_SDK_URL = "https://t1.kakaocdn.net/kakao_js_sdk/2.8.3/kakao.min.js";
const KAKAO_SDK_INTEGRITY = "sha384-oroumrnFVE0xtgqyDZJARgERibXg2C28380uaUZz2kHDS5CR7tu20eGiOU6GkTpy"; // 2.8.3 파일에서 잰 값(2026-09-09)

let kakaoSdkPromise: Promise<KakaoSdk> | null = null;

// 공유 SDK. 떠 있는 메뉴를 열 때 미리 싣고, 공유하기를 누를 때는 기다리지 않아 사용자 동작 안에서 카카오톡 창이 열립니다
export function loadKakaoSdk(): Promise<KakaoSdk> {
  if (window.Kakao) return Promise.resolve(window.Kakao);
  if (!kakaoSdkPromise) {
    kakaoSdkPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = KAKAO_SDK_URL;
      script.integrity = KAKAO_SDK_INTEGRITY;
      script.crossOrigin = "anonymous";
      script.async = true;
      script.onload = () => (window.Kakao ? resolve(window.Kakao) : reject(new Error("Kakao SDK missing")));
      script.onerror = () => {
        kakaoSdkPromise = null;
        reject(new Error("Kakao SDK load failed"));
      };
      document.head.appendChild(script);
    });
  }
  return kakaoSdkPromise;
}

// 공유하기(T132). 피드 템플릿(사진 · 제목 · 날짜 · 단추 둘)으로 보냅니다. 단추 · 이미지 URL은 앱에 등록한 도메인이어야 하므로 현재 origin을 씁니다.
// 키가 없거나 SDK를 못 실으면 기기 공유 창, 그것도 없으면 주소 복사입니다
export async function shareInvitation(copyFallback: (text: string, message: string) => void) {
  const url = `${window.location.origin}/`;
  if (KAKAO_JS_KEY) {
    try {
      const Kakao = window.Kakao ?? (await loadKakaoSdk());
      if (!Kakao.isInitialized()) Kakao.init(KAKAO_JS_KEY);
      Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: SITE_TITLE,
          description: SITE_DESCRIPTION,
          imageUrl: `${window.location.origin}${OG_IMAGE.url}`,
          imageWidth: OG_IMAGE.width,
          imageHeight: OG_IMAGE.height,
          link: { mobileWebUrl: url, webUrl: url },
        },
        buttons: [
          { title: "청첩장 보기", link: { mobileWebUrl: url, webUrl: url } },
          { title: "위치 보기", link: { mobileWebUrl: `${url}#directions`, webUrl: `${url}#directions` } },
        ],
      });
      return;
    } catch {
      // SDK를 못 실었거나 도메인이 등록되지 않았을 때. 아래 기기 공유로
    }
  }
  if (navigator.share) {
    try {
      await navigator.share({ title: SITE_TITLE, text: SITE_DESCRIPTION, url });
    } catch {
      // 사용자가 공유 창을 닫음
    }
    return;
  }
  copyFallback(url, "주소를 복사했습니다");
}
