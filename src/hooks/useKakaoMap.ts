"use client";

import { useEffect, useRef, useState } from "react";
import { KAKAO_JS_KEY, VENUE } from "@/content/site";

export function useKakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapFailed, setMapFailed] = useState(false); // SDK를 못 실었거나(401 = 앱에 도메인 미등록 · 카카오맵 API 미활성) 10초 안에 안 그려짐

  // 카카오맵(디자인 논의 T112 · T113 · T126). 키가 있으면 오시는 길이 가까워질 때 SDK를 한 번 싣고, 대략 중심에 지도와 표식을 놓은 뒤 지오코더가 주소로 바로잡습니다. 지도 컨테이너는 React가 채우지 않는 빈 div라 SDK가 마음대로 그립니다. SDK가 안 실리면(401. 앱의 Web 플랫폼에 도메인이 없거나 카카오맵 API가 꺼져 있음) 아래 지도 앱 링크로 안내합니다
  useEffect(() => {
    const el = mapRef.current;
    if (!KAKAO_JS_KEY || !el) return;
    const init = () => {
      const maps = window.kakao?.maps;
      if (!maps) return;
      maps.load(() => {
        const rough = new maps.LatLng(VENUE.rough.lat, VENUE.rough.lng);
        const map = new maps.Map(el, { center: rough, level: 4 });
        const marker = new maps.Marker({ position: rough, map });
        new maps.services.Geocoder().addressSearch(VENUE.address, (result, status) => {
          if (status !== maps.services.Status.OK || !result[0]) return;
          const pos = new maps.LatLng(Number(result[0].y), Number(result[0].x));
          map.setCenter(pos);
          map.setLevel(3);
          marker.setPosition(pos);
        });
        setMapReady(true);
      });
    };
    // SDK는 오시는 길이 가까워질 때(구획 300px 앞) 싣습니다(디자인 논의 T126). 처음 열 때 바로 받으면 진입 장면과 겹쳐 무겁습니다
    let script: HTMLScriptElement | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const fail = () => setMapFailed(true);
    const load = () => {
      if (window.kakao?.maps) {
        init();
        return;
      }
      const existing = document.querySelector<HTMLScriptElement>("script[data-kakao-map]");
      script = existing ?? document.createElement("script");
      if (!existing) {
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&libraries=services&autoload=false`;
        script.async = true;
        script.dataset.kakaoMap = "1";
        document.head.appendChild(script);
      }
      timer = setTimeout(fail, 10000);
      script.addEventListener("load", init);
      script.addEventListener("error", fail);
    };
    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer?.disconnect();
          observer = null;
          load();
        },
        { rootMargin: "300px 0px" },
      );
      observer.observe(el);
    } else {
      load();
    }
    return () => {
      observer?.disconnect();
      if (timer) clearTimeout(timer);
      script?.removeEventListener("load", init);
      script?.removeEventListener("error", fail);
    };
  }, []);

  return { mapRef, mapReady, mapFailed };
}
