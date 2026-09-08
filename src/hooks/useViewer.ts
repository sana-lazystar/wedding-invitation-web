"use client";

// 만화 · 사진 덮개의 상태와 공통 동작(디자인 논의 T102 · T103). 연 단추를 기억해 닫을 때 초점을 돌려줍니다
import { useEffect, useRef, useState } from "react";

export type Viewer = { kind: "comic" } | { kind: "gallery"; index: number };

export function useViewer() {
  const comicViewerRef = useRef<HTMLDivElement>(null);
  const galleryViewerRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null); // 덮개를 연 버튼. 닫으면 초점을 돌립니다
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0); // 뷰어 장수 표시(슬라이드 밖 고정, 디자인 논의 T122)

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

  const openComic = (opener: HTMLElement) => {
    openerRef.current = opener;
    setViewer({ kind: "comic" });
  };
  const openGallery = (opener: HTMLElement, index: number) => {
    openerRef.current = opener;
    setGalleryIndex(index);
    setViewer({ kind: "gallery", index });
  };
  const closeViewer = () => setViewer(null);

  return { viewer, galleryIndex, setGalleryIndex, openComic, openGallery, closeViewer, comicViewerRef, galleryViewerRef };
}
