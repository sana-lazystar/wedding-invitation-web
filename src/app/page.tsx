"use client";

/* eslint-disable @next/next/no-img-element */
// WIW-4 임시 적용. docs/artifacts/index.html의 Scene1 커버 · Scene2 핵심 정보(액자, 디자인 논의 T55·T58) · Scene3 인사(쪽지 + 수달·토끼 캐릭터, T51~T52) · Scene4 Part 1 신랑(사진 종이 + 토끼 메모지, T53) · Scene5 Part 1 신부(대칭, T58) · Scene6~8 Part 2·3(사진 자리표시 + 메모지, T65) · 떠 있는 메뉴를 옮긴 것입니다.
// 마크업은 조립본과 같은 구조이고 이미지 경로만 다릅니다(조립본 ../design/… · ../../public/…, 여기 /…).
// 진입 장면(로딩)은 편지봉투입니다(디자인 논의 T36~T49). 편지지는 커버 자체이고, 봉투 안에서 봉투 폭의 92%로 있다가 봉투가 내려가는 것과 동시에 올라오고, 이어서 화면 전체로 커집니다. 층(바탕 < 뒷판 < 커버 < 앞판 < 뚜껑)이고, 배율과 카드 값은 화면 크기에서 계산해 CSS 변수로 넣고, 봉투 그림이 준비되면 시작합니다. 어디를 탭해도 건너뜁니다.
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import gallery from "@/content/gallery.json";

// 사진첩(디자인 논의 T103 · T104). 매니페스트 순서가 표시 순서이고 앞 8장이 타일, 9번째 타일은 나머지 장수(+N개)입니다. 사진은 docs/scripts/gallery-jpeg.py의 잠정 산출이고 어느 8장을 보일지는 이산하가 나중에 고릅니다
const GALLERY_PREVIEW = 8;
const galleryMore = gallery.length - GALLERY_PREVIEW;
type Viewer = { kind: "comic" } | { kind: "gallery"; index: number };

// 마음 전하는 곳(디자인 논의 T110 · T112 · T120). 성함 · 계좌번호는 이산하가 준 실값. 표시는 하이픈, 복사는 숫자만. 관계를 이름 앞에 씁니다
const ACCOUNTS: { side: string; rows: { who: string; bank: string; num: string }[] }[] = [
  {
    side: "신랑 측",
    rows: [
      { who: "아버지 · 이종노", bank: "하나", num: "468-910199-62707" },
      { who: "어머니 · 이은경", bank: "국민", num: "879602-01-133871" },
      { who: "신랑 · 이산하", bank: "토스뱅크", num: "1001-6105-5173" },
    ],
  },
  {
    side: "신부 측",
    rows: [
      { who: "아버지 · 송영봉", bank: "삼성증권", num: "7084-1174-8301" },
      { who: "어머니 · 임인화", bank: "삼성증권", num: "7082-4708-9301" },
      { who: "신부 · 송시야", bank: "국민", num: "879201-00-010006" },
    ],
  },
];
const VENUE_ADDRESS = "서울 강남구 선릉로 757";
const VENUE_SEARCH = encodeURIComponent("더채플앳청담");

// 카카오맵(디자인 논의 T112. 스택 논의의 외부 의존 메모대로 JS SDK, 무료). 키는 Kakao Developers 앱의 JavaScript 키를 NEXT_PUBLIC_KAKAO_MAP_KEY에 두고, 앱의 Web 플랫폼에 localhost:3000과 배포 도메인을 등록합니다. 키가 없으면 자리표시만 보입니다.
// 중심은 대략값으로 시작하고 SDK의 지오코더가 주소로 바로잡습니다
const KAKAO_MAP_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
const VENUE_ROUGH = { lat: 37.5205, lng: 127.041 };
type KakaoLatLng = { getLat: () => number; getLng: () => number };
type KakaoMaps = {
  load: (cb: () => void) => void;
  LatLng: new (lat: number, lng: number) => KakaoLatLng;
  Map: new (el: HTMLElement, opts: { center: KakaoLatLng; level: number }) => { setCenter: (c: KakaoLatLng) => void; setLevel: (l: number) => void };
  Marker: new (opts: { position: KakaoLatLng; map: unknown }) => { setPosition: (c: KakaoLatLng) => void };
  services: {
    Geocoder: new () => { addressSearch: (address: string, cb: (result: { x: string; y: string }[], status: string) => void) => void };
    Status: { OK: string };
  };
};
declare global {
  interface Window {
    kakao?: { maps: KakaoMaps };
  }
}

// 복사(디자인 논의 T110). clipboard API가 없으면(http · 옛 브라우저) 숨긴 textarea로 복사합니다
async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  ta.remove();
  if (!ok) throw new Error("copy");
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="4.5" y="4.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9.5 4.5V3a1.5 1.5 0 0 0-1.5-1.5H3A1.5 1.5 0 0 0 1.5 3v5A1.5 1.5 0 0 0 3 9.5h1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export default function Home() {
  const fabRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const introBackRef = useRef<HTMLDivElement>(null);
  const introFrontRef = useRef<HTMLDivElement>(null);
  const introCastRef = useRef<HTMLDivElement>(null);
  const introFlapRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const vhLockedRef = useRef(false);
  const comicViewerRef = useRef<HTMLDivElement>(null);
  const galleryViewerRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);   // 덮개를 연 버튼. 닫으면 초점을 돌립니다
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);   // 뷰어 장수 표시(슬라이드 밖 고정, 디자인 논의 T122)
  const mapRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLElement>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapFailed, setMapFailed] = useState(false);   // SDK를 못 실었거나(401 = 앱에 도메인 미등록 · 카카오맵 API 미활성) 10초 안에 안 그려짐
  const [toast, setToast] = useState("");
  const [toastShown, setToastShown] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showToast = (text: string) => {
    setToast(text);
    setToastShown(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastShown(false), 1600);
  };
  const copy = (text: string, message: string) => {
    copyText(text).then(
      () => showToast(message),
      () => showToast("복사하지 못했습니다. 길게 눌러 복사해 주세요"),
    );
  };

  // 화면 높이 고정 · 확대 막기(디자인 논의 T83). 카카오톡 인앱 브라우저는 스크롤로 주소창이 사라질 때 창 높이 자체가 바뀌어 svh까지 변하므로, 처음 잰 높이를 --vh-fixed(px)로 박습니다. 폭이 바뀌면(회전 · 창 크기 조절) 다시 재고 높이만 바뀌는 것(툴바)은 무시합니다. 인앱 브라우저는 열린 직후 툴바를 자리 잡으며 높이가 한 번 더 바뀌므로, 첫 터치 전(진입 장면 중)에는 높이 변화도 받습니다. iOS는 메타의 user-scalable=no를 무시하므로 손가락 두 개 움직임과 제스처 이벤트도 막습니다
  useEffect(() => {
    const root = document.documentElement;
    let width = 0;
    const fix = () => {
      width = window.innerWidth;
      root.style.setProperty("--vh-fixed", `${window.innerHeight}px`);
    };
    const onResize = () => {
      if (window.innerWidth !== width || !vhLockedRef.current) fix();
    };
    // 잠그는 시점은 첫 터치가 시작되는 순간(디자인 논의 T100). 스크롤 위치로 잠그면 카카오톡이 손가락을 끄는 순간 주소창부터 접어 그 사이 높이가 다시 재어졌습니다
    const lock = () => {
      vhLockedRef.current = true;
    };
    const onScroll = () => {
      if (window.scrollY > 0) lock();
    };
    const lockEvents = ["touchstart", "wheel", "keydown", "pointerdown"];
    const onGesture = (e: Event) => e.preventDefault();
    const onPinch = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };
    fix();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    lockEvents.forEach((t) => window.addEventListener(t, lock, { passive: true, once: true }));
    document.addEventListener("gesturestart", onGesture);
    document.addEventListener("touchmove", onPinch, { passive: false });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      lockEvents.forEach((t) => window.removeEventListener(t, lock));
      document.removeEventListener("gesturestart", onGesture);
      document.removeEventListener("touchmove", onPinch);
      root.style.removeProperty("--vh-fixed");
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const cover = coverRef.current;
    const layers = [introRef.current, introBackRef.current, introFrontRef.current, introCastRef.current, introFlapRef.current];
    if (!cover || layers.some((el) => !el)) return;
    let finished = false;
    const onIntroTouchMove = (e: TouchEvent) => e.preventDefault();
    // 층 지정(is-intro)은 여기서 지우지 않습니다. 봉투 층이 사라지는 렌더와 같은 프레임에 지워야 바탕이 커버를 덮는 한 프레임(깜빡임)이 없습니다. 아래 useLayoutEffect
    const finishIntro = () => {
      if (finished) return;
      finished = true;
      document.removeEventListener("click", finishIntro);
      document.removeEventListener("touchmove", onIntroTouchMove);
      setIntroDone(true);
    };
    // 새로고침해도 맨 위에서 시작합니다(스크롤 복원 끔). 움직임 줄이기 설정이거나 앵커(#…)로 들어오면 바로 커버입니다. 매번 재생합니다
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || location.hash) {
      finishIntro();
      return;
    }
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    root.classList.add("is-intro");
    // 화면 크기에서 배율과 카드 값을 계산합니다. 인앱 브라우저는 열린 직후 툴바가 자리 잡으며 화면 높이를 바꾸므로, 장면 중에 크기가 바뀌면 다시 계산해 봉투(화면 가운데 고정)와 편지지가 어긋나지 않게 합니다(디자인 논의 T72)
    const applyIntroMetrics = () => {
      const vw = root.clientWidth;
      const vh = window.innerHeight;
      const envW = Math.min(vw, 430) * 0.92; // 봉투 폭 = 화면 폭(페이지 폭 430까지)의 92%
      const z1 = envW / 600;
      const z0 = (vh * 2) / 3 / 400; // 시작 배율. 봉투 높이 = 화면 높이의 2/3
      const envTop = vh / 2 - 200 * z1; // 물러난 뒤 봉투 윗변의 화면 y
      const ty0 = envTop + 14 * z1; // 편지지가 봉투 안에 든 자리(윗변 바로 아래). 올라오면 0(최종 자리)
      const s0 = (envW * 0.92) / cover.clientWidth; // 봉투 안에서의 배율. 편지지 폭 = 봉투 폭의 92%. 커지면 1
      const ty1 = ty0 - cover.clientHeight * s0 * 0.35; // 조금 올라온 자리(제 높이의 35%). 이만큼 올라와야 봉투가 사라질 때 아랫변이 화면 안에 있습니다
      const drop1 = Math.max(0, ty1 + cover.clientHeight * s0 - 70 - envTop); // 봉투가 내려가는 거리(화면 px). 윗변이 편지지 아랫변 70px 위까지 와서 편지지가 거의 다 보입니다
      root.style.setProperty("--z0", String(z0));
      root.style.setProperty("--z1", String(z1));
      root.style.setProperty("--drop1", `${drop1 / z1}px`);
      cover.style.setProperty("--card-ty0", `${ty0}px`);
      cover.style.setProperty("--card-ty1", `${ty1}px`);
      cover.style.setProperty("--card-s0", String(s0));
    };
    applyIntroMetrics();
    window.addEventListener("resize", applyIntroMetrics);
    window.visualViewport?.addEventListener("resize", applyIntroMetrics);
    let started = false;
    let safety: number | undefined;
    const startIntro = () => {
      if (started || finished) return;
      started = true;
      root.classList.add("is-intro-shown");
      safety = window.setTimeout(finishIntro, 7800);
    };
    const imgs = [...layers.flatMap((el) => Array.from(el!.querySelectorAll("img"))), ...Array.from(cover.querySelectorAll("img"))]; // 커버(편지지)의 그림도 기다립니다(디자인 논의 T124)
    Promise.all(imgs.map((im) => (im.decode ? im.decode().catch(() => undefined) : Promise.resolve()))).then(startIntro);
    const fallback = window.setTimeout(startIntro, 2500);
    const onAnimationEnd = (e: AnimationEvent) => {
      if (e.animationName === "intro-card-rise") finishIntro();
    };
    cover.addEventListener("animationend", onAnimationEnd);
    document.addEventListener("click", finishIntro);
    document.addEventListener("touchmove", onIntroTouchMove, { passive: false });
    return () => {
      window.clearTimeout(fallback);
      window.clearTimeout(safety);
      cover.removeEventListener("animationend", onAnimationEnd);
      document.removeEventListener("click", finishIntro);
      document.removeEventListener("touchmove", onIntroTouchMove);
      window.removeEventListener("resize", applyIntroMetrics);
      window.visualViewport?.removeEventListener("resize", applyIntroMetrics);
      root.classList.remove("is-intro", "is-intro-shown");
    };
  }, []);

  // 진입 장면이 끝나면 봉투 층이 빠진 DOM이 그려지기 전에(같은 프레임) 커버의 층 지정을 지웁니다
  useLayoutEffect(() => {
    if (!introDone) return;
    document.documentElement.classList.remove("is-intro", "is-intro-shown");
  }, [introDone]);

  // 카카오맵(디자인 논의 T112 · T113 · T126). 키가 있으면 오시는 길이 가까워질 때 SDK를 한 번 싣고, 대략 중심에 지도와 표식을 놓은 뒤 지오코더가 주소로 바로잡습니다. 지도 컨테이너는 React가 채우지 않는 빈 div라 SDK가 마음대로 그립니다. SDK가 안 실리면(401. 앱의 Web 플랫폼에 도메인이 없거나 카카오맵 API가 꺼져 있음) 아래 지도 앱 링크로 안내합니다
  useEffect(() => {
    const el = mapRef.current;
    if (!KAKAO_MAP_KEY || !el) return;
    const init = () => {
      const maps = window.kakao?.maps;
      if (!maps) return;
      maps.load(() => {
        const rough = new maps.LatLng(VENUE_ROUGH.lat, VENUE_ROUGH.lng);
        const map = new maps.Map(el, { center: rough, level: 4 });
        const marker = new maps.Marker({ position: rough, map });
        new maps.services.Geocoder().addressSearch(VENUE_ADDRESS, (result, status) => {
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
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&libraries=services&autoload=false`;
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

  // 쪽지는 화면에 들어올 때 한 번 내려앉으며 나타납니다(디자인 논의 T51). 움직임 줄이기면 CSS가 바로 보이게 합니다
  useEffect(() => {
    const notes = Array.from(document.querySelectorAll<HTMLElement>(".note, .note-wrap"));
    if (!("IntersectionObserver" in window)) {
      notes.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    notes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 덮개(뷰어) 공통(디자인 논의 T102 · T103). 열면 뒤 페이지 스크롤을 막고(html.is-viewer + 덮개 안 touchmove 막음) Esc로 닫으며, 닫으면 연 버튼으로 초점을 돌립니다. 덮개의 실제 높이 · 폭을 --viewer-h · --viewer-w로 넣어 만화(90° 회전 상자)와 인화지 크기 계산에 씁니다(인앱 브라우저는 vh가 툴바에 따라 다릅니다). 만화 뷰어는 어디를 탭해도 닫히고(돌린 그림 상자가 화면 전체라 바탕만 골라 탭할 수 없습니다), 사진 뷰어는 × · Esc로만 닫힙니다(탭은 넘기기)
  useEffect(() => {
    const el = viewer?.kind === "comic" ? comicViewerRef.current : viewer?.kind === "gallery" ? galleryViewerRef.current : null;
    if (!viewer || !el) return;
    const root = document.documentElement;
    const opener = openerRef.current;
    const size = () => {
      el.style.setProperty("--viewer-w", `${el.clientWidth}px`);
      el.style.setProperty("--viewer-h", `${el.clientHeight}px`);
    };
    const onMove = (e: TouchEvent) => e.preventDefault();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewer(null);
    };
    size();
    root.classList.add("is-viewer");
    window.addEventListener("resize", size);
    el.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("keydown", onKeyDown);
    el.querySelector<HTMLButtonElement>(".comic-viewer__close, .gallery-viewer__close")?.focus({ preventScroll: true });
    return () => {
      root.classList.remove("is-viewer");
      window.removeEventListener("resize", size);
      el.removeEventListener("touchmove", onMove);
      document.removeEventListener("keydown", onKeyDown);
      opener?.focus({ preventScroll: true });
    };
  }, [viewer]);

  useEffect(() => {
    const onDocumentClick = (e: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onDocumentClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <>
      {!introDone && (
        <>
          <div className="intro" ref={introRef} aria-hidden="true" />
          <button type="button" className="intro__skip">
            넘어가기
          </button>
          <div className="intro-layer intro-layer--back" ref={introBackRef} aria-hidden="true">
            <div className="intro__zoom">
              <div className="intro__env">
                <img className="intro__back" src="/intro/envelope-back.png" alt="" />
              </div>
            </div>
          </div>
          <div className="intro-layer intro-layer--front" ref={introFrontRef} aria-hidden="true">
            <div className="intro__zoom">
              <div className="intro__env">
                <div className="intro__floor" />
                <div className="intro__table" />
                <img className="intro__front" src="/intro/envelope-front.png" alt="" />
              </div>
            </div>
          </div>
          <div className="intro-layer intro-layer--cast" ref={introCastRef} aria-hidden="true">
            <div className="intro__zoom">
              <div className="intro__env">
                <div className="intro__cast">
                  <img className="intro__cast-img" src="/intro/envelope-flap.png" alt="" />
                  <img className="intro__cast-img intro__cast-img--seal" src="/intro/rose-seal.png" alt="" />
                  <img className="intro__cast-img intro__cast-img--soft" src="/intro/envelope-flap.png" alt="" />
                  <img className="intro__cast-img intro__cast-img--seal intro__cast-img--soft" src="/intro/rose-seal.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="intro-layer intro-layer--flap" ref={introFlapRef} aria-hidden="true">
            <div className="intro__zoom">
              <div className="intro__env">
                <div className="intro__flap">
                  <img className="intro__seal-back" src="/intro/rose-seal-back.png" alt="" />
                  <img className="intro__flap-in" src="/intro/envelope-flap-inside.png" alt="" />
                  <img className="intro__flap-out" src="/intro/envelope-flap.png" alt="" />
                  <img className="intro__seal" src="/intro/rose-seal.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="page">
        <section id="cover" className="block block--fixed" ref={coverRef}>
          <div className="cover-bg">
            <img className="cover-bg__hall" src="/scene1/hall.png" alt="더채플앳청담 커티지홀" />
            <div className="cover-bg__shadow" />
            <img className="cover-bg__couple" src="/scene1/couple.png" alt="이산하와 송시야" />
          </div>
          <div className="cover-bg__blur cover-bg__blur--soft" />
          <div className="cover-bg__blur cover-bg__blur--strong" />
          <div className="cover-head">
            <div className="eyebrow">Wedding Invitation</div>
            <p className="tagline">우리의 삶을 함께 써 주신 당신께</p>
          </div>
          <div className="names">
            <div className="names__name">이산하</div>
            <div className="names__and">그리고</div>
            <div className="names__name">송시야</div>
          </div>
        </section>
        <section id="info" className="block">
          <img className="info__paper" src="/paper/info.jpg" alt="" />
          <img className="info__branch" src="/scene2/branch.png" width={240} height={139} alt="" />
          <div className="info__text">
            <div className="info__big">2026년 10월 9일</div>
            <div className="info__big">금요일 오후 6시 30분</div>
            <div className="info__gap" />
            <div className="info__small">더채플앳청담 3층 커티지홀</div>
            <div className="info__small">강남구 선릉로 757</div>
          </div>
        </section>
        <section id="greeting" className="block greeting">
          <div className="note note--right">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <img className="note__who" src="/character/otter-basic.png" width={240} height={194} alt="" />
            <p className="note__text">안녕하세요. 10월의 신랑, 이산하</p>
          </div>
          <div className="note note--left">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <img className="note__who" src="/character/rabbit-basic.png" width={240} height={158} alt="" />
            <p className="note__text">
              신부 송시야입니다!
              <br />
              잠깐 저희에 대해 얘기해 드릴게요!
            </p>
          </div>
        </section>
        <section id="part1-groom" className="block story">
          <div className="photo-paper">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <img className="photo-paper__photo" src="/scene4/groom-child.jpg" width={641} height={900} alt="신랑 어릴 적 사진" />
          </div>
          <div className="note note--left note--memo note--tuck">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <img className="note__who" src="/character/rabbit-1.png" width={240} height={164} alt="" />
            <p className="note__text">
              제 신랑은 어릴 때 시를 써서 상도 받던<br />문학소년이었대요. 무협지를 좋아해서 작가를<br />꿈꾸기도 했고요. 그랬던 아이는 커서<br />냉철하고 이성적인 개발자가 됐어요!
            </p>
            <div className="note__row">
              <div className="note__stamp-cell">
                <img className="note__stamp" src="/scene4/groom-child-ride.png" width={401} height={324} alt="" />
              </div>
            </div>
            </div>
        </section>
        <section id="part1-bride" className="block story">
          <div className="photo-paper photo-paper--left">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <img className="photo-paper__photo" src="/scene5/bride-child.jpg" width={625} height={900} alt="신부 어릴 적 사진" />
          </div>
          <div className="note note--right note--memo note--tuck note--bride">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <img className="note__who" src="/character/otter-basic.png" width={240} height={194} alt="" />
            <p className="note__text">
              제 신부는 다섯 살 때 빗소리가 좋다며 혼자<br />우산 쓰고 동네를 걷던 아이였대요.
            </p>
            <div className="note__row note__row--left">
              <div className="note__stamp-cell note__stamp-cell--left">
                <img className="note__stamp note__stamp--left" src="/scene5/bride-child-cutout.png" width={130} height={324} alt="" />
              </div>
              <p className="note__text">글 쓰는 걸 좋아해서 수첩과 펜을 늘 들고 다녔고요. 그랬던 아이는 커서 상황을 분석하고 길을 찾는 사업전략가가 됐어요. 여전히 꿈을 꾸는 사람이고요.</p>
            </div>
          </div>
        </section>
        <section id="part2-groom" className="block story">
          <div className="note note--left note--memo note--who-right note--w68">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <img className="note__who" src="/character/otter-basic.png" width={240} height={194} alt="" />
            <img className="note__who note__who--inner" src="/character/rabbit-2.png" width={240} height={198} alt="" />
            <p className="note__text">저희는 같은 회사에서 만났어요!</p>
          </div>
          <div className="photo-paper photo-paper--right">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <img className="photo-paper__photo" src="/scene6/groom.jpg" width={688} height={900} alt="신랑 웨딩 사진" />
          </div>
          <div className="note note--left note--memo note--tuck">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <img className="note__who" src="/character/rabbit-3.png" width={240} height={151} alt="" />
            <p className="note__text">신랑은 새벽에 퇴근하더라도 다음 날 꼭 정장에 머리까지 하고 나왔어요. 처음엔 차가워 보이는 데다 저와 너무 다른 사람 같아서 거리를 뒀는데, 알면 알수록 보석 같은 사람이더라고요!</p>
          </div>
          <div className="note note--left note--memo note--indent note--who-right">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <img className="note__who" src="/character/rabbit-4.png" width={240} height={159} alt="" />
            <p className="note__text">&apos;이 사람 놓치면 안 되겠다, 남 주기 너무 아깝다! 아니, 싫다!&apos; 싶어서 콱 잡았죠.</p>
          </div>
        </section>
        <section id="part2-bride" className="block story">
          <div className="photo-paper photo-paper--left">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <img className="photo-paper__photo" src="/scene7/bride.jpg" width={769} height={1100} alt="신부 웨딩 사진" />
          </div>
          <div className="note-wrap note-wrap--right note-wrap--tuck note--w80">
            <div className="note note--right note--memo">
              <img className="note__paper" src="/paper/note.png" alt="" />
              <p className="note__text">사실 저는 그때 연애 생각이 없었어요. 당분간 일에만 집중하자는 마음이었죠. 그런데 이 사람이 자꾸 제 주변을 맴돌더라고요.</p>
            </div>
            <img className="note__who note-wrap__who" src="/character/otter-1.png" width={240} height={183} alt="" />
          </div>
          <div className="note note--right note--memo note--indent note--who-left">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <img className="note__who" src="/character/otter-2.png" width={238} height={240} alt="" />
            <p className="note__text">그러다 문득, 쉬는 날에도 시야를 떠올리는 저를 발견했어요. 아, 내가 설레고 있구나.</p>
          </div>
        </section>
        <section id="part3" className="block story">
          <div className="photo-paper photo-paper--center photo-paper--wide">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <img className="photo-paper__photo" src="/scene8/couple.jpg" width={1100} height={733} alt="이산하와 송시야" />
          </div>
          <div className="note-wrap note-wrap--right note-wrap--tuck note--indent">
            <div className="note note--right note--memo">
              <img className="note__paper" src="/paper/note.png" alt="" />
              <p className="note__text">어른이 되고는 꿈을 꾸지 않던 제가, 이 사람을 만나 다시 꿈꾸게 됐어요. 사랑도 많아졌고요.</p>
            </div>
            <img className="note__who note-wrap__who" src="/character/otter-3.png" width={223} height={240} alt="" />
          </div>
          <div className="note note--left note--memo">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <img className="note__who" src="/character/rabbit-5.png" width={240} height={184} alt="" />
            <p className="note__text">마음이 여렸던 저는 이 사람 덕분에 많이 단단해졌어요! 누군가에게 기대는 법도 배웠고요!</p>
          </div>
          <div className="note note--right note--memo">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <img className="note__who" src="/character/hug.png" width={240} height={189} alt="" />
            <p className="note__text">MBTI 궁합이 &apos;파국&apos;으로 나올 만큼 성향이 다르지만, 달랐기에 서로의 빈틈을 채우고, 장점은 더 빛낼 수 있었어요.</p>
          </div>
        </section>
        {/* 9쪽 초대(Scene9)는 수정 사항이 있어 뒤로 미루고, 나중에 이 자리(Scene8과 Scene10 사이)에 끼웁니다(디자인 논의 T102) */}
        {/* 10. 추신 + 만화(와이어프레임 11쪽 위 절반, 디자인 논의 T102). 사진첩(같은 쪽 아래 절반)은 다음 구획입니다(T103) */}
        <section id="comic" className="block story comic">
          <div className="note note--left note--memo note--ps">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <img className="note__tape" src="/paper/tape.png" alt="" />
            <p className="note__text">P.S. 저희가 결혼을 언제 결심했냐면요!</p>
          </div>
          <button
            type="button"
            className="photo-paper comic__paper"
            id="comicOpen"
            aria-haspopup="dialog"
            aria-controls="comicViewer"
            aria-label="만화 크게 보기"
            onClick={(e) => {
              openerRef.current = e.currentTarget;
              setViewer({ kind: "comic" });
            }}
          >
            <img className="note__paper" src="/paper/note.png" alt="" />
            <img className="photo-paper__photo" src="/scene10/comic.jpg" width={1664} height={1087} alt="네 컷 만화. 결혼을 결심한 이야기" loading="lazy" />
            <span className="comic__hint" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M7.5 1.5h3v3M4.5 10.5h-3v-3M10.5 1.5L7 5M1.5 10.5L5 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              크게 보기
            </span>
          </button>
        </section>
        {/* 사진첩(와이어프레임 11쪽 아래 절반, 디자인 논의 T103~T107). 가운데 제목 "사진첩", 3×3 타일. 앞 8장은 미리보기, 9번째 타일은 흐린 사진 위에 나머지 장수. 나무 틀 · 표지판(T104~T106)은 T107에 지웠습니다 */}
        <section id="gallery" className="block story plain">
          <h2 className="plain__title">사진첩</h2>
          <ul className="gallery__grid" id="galleryGrid">
            {gallery.slice(0, GALLERY_PREVIEW + 1).map((item, i) => {
              const more = i === GALLERY_PREVIEW;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={more ? "gallery__tile gallery__tile--more" : "gallery__tile"}
                    data-index={i}
                    aria-label={more ? `사진 ${i + 1}부터 크게 보기. ${galleryMore}장 더` : `사진 ${i + 1} 크게 보기`}
                    onClick={(e) => {
                      openerRef.current = e.currentTarget;
                      setGalleryIndex(i);
                      setViewer({ kind: "gallery", index: i });
                    }}
                  >
                    <img className="gallery__thumb" src={`/gallery/${item.id}-thumb.jpg`} width={480} height={480} alt="" loading="lazy" />
                    {more && (
                      <span className="gallery__more" aria-hidden="true">
                        +{galleryMore}개
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
        {/* 11. 오시는 길(와이어프레임 12쪽, 디자인 논의 T110~T112 · T119). 크림색 바탕 위 종이 한 장(.sheet. 머리는 봉투의 장미 봉인). 지도는 카카오맵 JS SDK(키가 있을 때). 지도 링크는 식장 이름 검색이라 좌표가 없어도 됩니다 */}
        <section id="directions" className="block story">
          <div className="sheet">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <div className="sheet__head">
              <img className="sheet__mark" src="/intro/rose-seal.png" width={84} height={84} alt="" />
              <h2 className="sheet__title">오시는 길</h2>
            </div>
            <div className="sheet__body">
              <div className="venue">
                <p className="venue__name">더채플앳청담 3층 커티지홀</p>
                <p className="venue__addr">{VENUE_ADDRESS}</p>
              </div>
              <div className="map-paper">
                <div className="map-paper__inner">
                  <div className="map-paper__map" ref={mapRef} role="img" aria-label="더채플앳청담 지도" aria-hidden={!mapReady} />
                  {!mapReady && (
                    <span className="map-paper__note">
                      {!KAKAO_MAP_KEY ? "지도 (카카오맵 키를 등록하면 표시)" : mapFailed ? "지도를 불러오지 못했습니다. 아래 지도 앱으로 열어 주세요" : "지도를 불러오는 중"}
                    </span>
                  )}
                </div>
              </div>
              <div className="chips">
                <a className="chip" href={`https://map.naver.com/p/search/${VENUE_SEARCH}`} target="_blank" rel="noopener">
                  네이버 지도
                </a>
                <a className="chip" href={`https://map.kakao.com/link/search/${VENUE_SEARCH}`} target="_blank" rel="noopener">
                  카카오맵
                </a>
                <button type="button" className="chip" onClick={() => copy(VENUE_ADDRESS, "주소를 복사했습니다")}>
                  주소 복사
                </button>
              </div>
              <div className="route">
                <h3 className="sheet__label">주차</h3>
                <p className="route__text">주차는 웨딩홀 앞으로 오셔서 주차 직원의 안내를 받으신 후 이동해 주시기 바랍니다. 1시간 30분 무료 주차가 가능합니다.</p>
              </div>
              <div className="route">
                <h3 className="sheet__label">지하철</h3>
                <p className="route__text">
                  <span className="line line--7">7호선</span>
                  <span className="line line--bundang">수인분당선</span>강남구청역 3번 출구
                  <br />
                  <span className="line line--bundang">수인분당선</span>압구정로데오역 5번 출구
                  <br />
                  강남구청역에서 셔틀버스 10분 간격
                </p>
              </div>
              <div className="route">
                <h3 className="sheet__label">버스</h3>
                <p className="route__text">
                  <span className="line line--trunk">간선</span>301, 342, 472
                  <br />
                  <span className="line line--branch">지선</span>3011, 4412
                  <br />
                  영동고교 앞 정류장 하차
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 12. 하객 안내(와이어프레임 13쪽, 디자인 논의 T110 · T111). 종이 한 장에 격식체. 신부대기실 시각은 추정(U-5) */}
        <section id="guide" className="block story">
          <div className="sheet">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <div className="sheet__head">
              <img className="sheet__mark" src="/intro/rose-seal.png" width={84} height={84} alt="" />
              <h2 className="sheet__title">하객 안내</h2>
            </div>
            <div className="sheet__body">
              <p className="sheet__text sheet__text--center">신부대기실은 6시 10분경 정리될 예정입니다. 신부와 사진을 남기고 싶으신 분들께서는 참고해 주시면 감사하겠습니다.</p>
              <hr className="sheet__rule" />
              <p className="sheet__text sheet__text--center sheet__text--light">축하 화환은 정중히 사양합니다. 오셔서 축복해 주시는 것만으로 충분히 감사합니다.</p>
            </div>
          </div>
        </section>

        {/* 13. 마음 전하는 곳(와이어프레임 14쪽, 디자인 논의 T110 · T111 · T119 · T120). 종이 한 장. 행을 누르면 계좌번호(숫자만)가 복사됩니다 */}
        <section id="gift" className="block story">
          <div className="sheet">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <div className="sheet__head">
              <img className="sheet__mark" src="/intro/rose-seal.png" width={84} height={84} alt="" />
              <h2 className="sheet__title">마음 전하는 곳</h2>
            </div>
            <div className="sheet__body">
              <p className="sheet__text sheet__text--center">참석이 어려우신 분들을 위해 안내드립니다.</p>
              {ACCOUNTS.map((group) => (
                <div className="gift__group" key={group.side}>
                  <h3 className="sheet__label">{group.side}</h3>
                  {group.rows.map((row) => (
                    <button
                      type="button"
                      className="account"
                      key={row.who}
                      aria-label={`${row.who} ${row.bank} ${row.num} 복사`}
                      onClick={() => copy(row.num.replace(/-/g, ""), "계좌번호를 복사했습니다")}
                    >
                      <span className="account__text">
                        <span className="account__who">{row.who}</span>
                        <span className="account__num">
                          {row.bank} {row.num}
                        </span>
                      </span>
                      <span className="account__copy" aria-hidden="true">
                        <CopyIcon />
                        복사
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* 14. 마지막(와이어프레임 15쪽, 디자인 논의 T121 · T123). 봉투 크기의 편지지 카드에 "고마움을 봉해 보냅니다." 구획이 보이면 진입 장면을 거꾸로: 봉투가 올라와 편지지를 담고 뚜껑이 닫힙니다. 봉투 그림은 진입 장면 것 */}
        <section id="closing" className="block block--fixed closing" ref={closingRef}>
          <div className="closing__letter">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <div className="closing__text">
              <p className="closing__big">고마움을 봉해 보냅니다.</p>
              <p className="closing__date">2026. 10. 09</p>
            </div>
          </div>
          <div className="closing__layer closing__layer--back" aria-hidden="true">
            <div className="closing__zoom">
              <div className="intro__env">
                <img className="intro__back" src="/intro/envelope-back.png" alt="" />
              </div>
            </div>
          </div>
          <div className="closing__layer closing__layer--front" aria-hidden="true">
            <div className="closing__zoom">
              <div className="intro__env">
                <div className="closing__floor" />
                <div className="intro__table" />
                <img className="intro__front" src="/intro/envelope-front.png" alt="" />
              </div>
            </div>
          </div>
          <div className="closing__layer closing__layer--cast" aria-hidden="true">
            <div className="closing__zoom">
              <div className="intro__env">
                <div className="intro__cast">
                  <img className="intro__cast-img" src="/intro/envelope-flap.png" alt="" />
                  <img className="intro__cast-img intro__cast-img--seal" src="/intro/rose-seal.png" alt="" />
                  <img className="intro__cast-img intro__cast-img--soft" src="/intro/envelope-flap.png" alt="" />
                  <img className="intro__cast-img intro__cast-img--seal intro__cast-img--soft" src="/intro/rose-seal.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="closing__layer closing__layer--flap" aria-hidden="true">
            <div className="closing__zoom">
              <div className="intro__env">
                <div className="intro__flap">
                  <img className="intro__seal-back" src="/intro/rose-seal-back.png" alt="" />
                  <img className="intro__flap-in" src="/intro/envelope-flap-inside.png" alt="" />
                  <img className="intro__flap-out" src="/intro/envelope-flap.png" alt="" />
                  <img className="intro__seal" src="/intro/rose-seal.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 10쪽 초대(Scene9)는 Scene8과 Scene10 사이에 끼웁니다 */}
      </div>

      {/* 만화 뷰어(디자인 논의 T102). 그림은 같은 파일이라 다시 내려받지 않습니다 */}
      <div
        className="comic-viewer"
        id="comicViewer"
        ref={comicViewerRef}
        role="dialog"
        aria-modal="true"
        aria-label="만화 크게 보기"
        hidden={viewer?.kind !== "comic"}
        onClick={() => setViewer(null)}
      >
        <img className="comic-viewer__img" src="/scene10/comic.jpg" width={1664} height={1087} alt="네 컷 만화. 결혼을 결심한 이야기" />
        <button type="button" className="comic-viewer__close" aria-label="닫기">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M6 6l10 10M16 6L6 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* 사진 뷰어(디자인 논의 T103~T105). 타일을 누르면 그 사진부터 Swiper로 봅니다. Swiper는 열려 있을 때만 그려 initialSlide가 먹게 합니다. 사진은 흰 테두리 인화지에 위 가운데 테이프, 장수는 아래 가운데 고정(T122), 화살표는 우리 단추(×와 같은 크기, 반투명)를 Swiper에 넘깁니다 */}
      <div className="gallery-viewer" id="galleryViewer" ref={galleryViewerRef} role="dialog" aria-modal="true" aria-label="사진첩" hidden={viewer?.kind !== "gallery"}>
        {viewer?.kind === "gallery" && (
          <Swiper
            className="gallery-viewer__swiper"
            modules={[Navigation, Keyboard]}
            navigation={{ prevEl: "#galleryPrev", nextEl: "#galleryNext" }}
            keyboard={{ enabled: true }}
            initialSlide={viewer.index}
            lazyPreloadPrevNext={2}
            onSlideChange={(s) => setGalleryIndex(s.activeIndex)}
          >
            {gallery.map((item, i) => (
              <SwiperSlide key={item.id}>
                <figure className="gallery-viewer__print" style={{ "--ar": `${item.width} / ${item.height}` } as React.CSSProperties}>
                  <img className="gallery-viewer__img" src={`/gallery/${item.id}.jpg`} width={item.width} height={item.height} alt={`사진 ${i + 1}`} loading="lazy" />
                  <img className="gallery-viewer__tape" src="/paper/tape-short.png" alt="" />
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <div className="gallery-viewer__count" aria-live="polite">
          {galleryIndex + 1} / {gallery.length}
        </div>
        <button type="button" className="gallery-viewer__nav gallery-viewer__nav--prev" id="galleryPrev" aria-label="이전 사진">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M13.5 5.5L8 11l5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className="gallery-viewer__nav gallery-viewer__nav--next" id="galleryNext" aria-label="다음 사진">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M8.5 5.5L14 11l-5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className="gallery-viewer__close" aria-label="닫기" onClick={() => setViewer(null)}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M6 6l10 10M16 6L6 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className={toastShown ? "toast is-shown" : "toast"} role="status" aria-live="polite">
        {toast}
      </div>

      <nav className="fab" ref={fabRef} data-open={menuOpen ? "true" : "false"} aria-label="바로 가기">
        <div className="fab__menu" id="fabMenu" hidden={!menuOpen} onClick={() => setMenuOpen(false)}>
          <a href="#directions">오시는 길</a>
          <a href="#gift">마음 전하는 곳</a>
        </div>
        <button
          type="button"
          className="fab__button"
          aria-expanded={menuOpen}
          aria-controls="fabMenu"
          aria-label={menuOpen ? "메뉴 닫기" : "바로 가기 메뉴"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M6 6l10 10M16 6L6 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M4 6.5h14M4 11h14M4 15.5h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>
    </>
  );
}
