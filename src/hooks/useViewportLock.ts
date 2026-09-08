"use client";

import { useEffect, useRef } from "react";

export function useViewportLock() {
  const locked = useRef(false);
  // 화면 높이 고정 · 확대 막기(디자인 논의 T83). 카카오톡 인앱 브라우저는 스크롤로 주소창이 사라질 때 창 높이 자체가 바뀌어 svh까지 변하므로, 처음 잰 높이를 --vh-fixed(px)로 박습니다. 폭이 바뀌면(회전 · 창 크기 조절) 다시 재고 높이만 바뀌는 것(툴바)은 무시합니다. 인앱 브라우저는 열린 직후 툴바를 자리 잡으며 높이가 한 번 더 바뀌므로, 첫 터치 전(진입 장면 중)에는 높이 변화도 받습니다. iOS는 메타의 user-scalable=no를 무시하므로 손가락 두 개 움직임과 제스처 이벤트도 막습니다
  useEffect(() => {
    const root = document.documentElement;
    let width = 0;
    const fix = () => {
      width = window.innerWidth;
      root.style.setProperty("--vh-fixed", `${window.innerHeight}px`);
    };
    const onResize = () => {
      if (window.innerWidth !== width || !locked.current) fix();
    };
    // 잠그는 시점은 첫 터치가 시작되는 순간(디자인 논의 T100). 스크롤 위치로 잠그면 카카오톡이 손가락을 끄는 순간 주소창부터 접어 그 사이 높이가 다시 재어졌습니다
    const lock = () => {
      locked.current = true;
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
}
