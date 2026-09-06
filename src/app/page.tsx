"use client";

/* eslint-disable @next/next/no-img-element */
// WIW-4 임시 적용. docs/artifacts/index.html의 Scene1 커버 · Scene2 핵심 정보 · 떠 있는 메뉴를 옮긴 것입니다.
// 마크업은 조립본과 같은 구조이고 이미지 경로만 다릅니다(조립본 ../design/…, 여기 /…). 진입 장면(로딩)은 T34에서 걷어냈고 처음부터 다시 만듭니다.
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const fabRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <div className="page">
        <section id="cover" className="block block--fixed">
          <div className="cover-bg">
            <img className="cover-bg__hall" src="/scene1/hall.png" alt="더채플앳청담 커티지홀" />
            <div className="cover-bg__blur cover-bg__blur--soft" />
            <div className="cover-bg__blur cover-bg__blur--strong" />
            <div className="cover-bg__shadow" />
            <img className="cover-bg__couple" src="/scene1/couple.png" alt="이산하와 송시야" />
          </div>
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
        <section id="info" className="block block--fixed">
          <div className="letter-card">
            <img className="letter-card__art" src="/scene2/opened-paper.png" alt="" />
            <div className="letter-card__text">
              <div>2026년 10월 9일 금요일</div>
              <div>오후 6시 30분</div>
              <div className="letter-card__rule" />
              <div className="letter-card__venue">더채플앳청담</div>
              <div>3층 커티지홀</div>
            </div>
          </div>
        </section>
        {/* 3쪽(인사)부터 여기 아래에 이어 붙입니다 */}
      </div>

      <nav className="fab" ref={fabRef} data-open={menuOpen ? "true" : "false"} aria-label="바로 가기">
        <div className="fab__menu" id="fabMenu" hidden={!menuOpen} onClick={() => setMenuOpen(false)}>
          <a href="#directions">오시는 길</a>
          <a href="#contact">연락처</a>
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
