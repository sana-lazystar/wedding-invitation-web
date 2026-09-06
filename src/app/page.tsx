"use client";

/* eslint-disable @next/next/no-img-element */
// WIW-4 임시 적용. docs/artifacts/index.html의 Scene1 커버 · Scene2 핵심 정보 · 팝업북 진입 장면 · 떠 있는 메뉴를 옮긴 것입니다.
import { useEffect, useRef, useState } from "react";

const INTRO_STEPS = { shown: 60, open: 600, rising: 1450, diving: 2750, done: 3950 };

export default function Home() {
  const introRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLElement>(null);
  const finishRef = useRef<() => void>(() => {});
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const intro = introRef.current;
    if (!intro) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      intro.hidden = true;
      return;
    }
    // 커버의 애니메이션(홀 사진 물러남 · 표제 · 이름 떠오름)은 진입 장면 동안 첫 프레임에서 멈춰 있다가 장면이 걷힐 때 시작한다
    const animated = document.querySelectorAll<HTMLElement>(".cover-bg__hall, .cover-head, .names");
    const restart = () => {
      animated.forEach((el) => {
        el.style.animation = "none";
        void el.offsetWidth;
        el.style.animation = "";
      });
    };
    const timers: number[] = [];
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      timers.forEach(clearTimeout);
      root.classList.remove("is-intro");
      intro.classList.add("is-done");
      timers.push(window.setTimeout(() => { intro.hidden = true; }, 400));
    };
    finishRef.current = finish;

    // 순서: 닫힌 책 등장 → 표지 젖힘(책이 가운데로) → 홀 조각·두 사람이 일어섬 → 시점이 내려오며 무대가 화면을 채움(조각이 커버 자리에 겹침) → 걷힘
    window.scrollTo(0, 0);
    intro.hidden = false;
    intro.className = "is-reset";
    root.classList.add("is-intro");
    restart();
    void intro.offsetWidth;
    intro.className = "";
    timers.push(window.setTimeout(() => intro.classList.add("is-shown"), INTRO_STEPS.shown));
    timers.push(window.setTimeout(() => intro.classList.add("is-open"), INTRO_STEPS.open));
    timers.push(window.setTimeout(() => intro.classList.add("is-rising"), INTRO_STEPS.rising));
    timers.push(window.setTimeout(() => intro.classList.add("is-diving"), INTRO_STEPS.diving));
    timers.push(window.setTimeout(finish, INTRO_STEPS.done));

    return () => {
      timers.forEach(clearTimeout);
      root.classList.remove("is-intro");
    };
  }, []);

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

      <div id="intro" ref={introRef} aria-hidden="true">
        <div className="stage">
          <div className="book">
            <div className="world">
              <div className="floor">
                <div className="leaf leaf--right">
                  <img className="leaf__art" src="/intro/page.png" alt="" />
                  <div className="leaf__shade" />
                </div>
                <div className="leaf leaf--cover">
                  <div className="leaf__face leaf__inner">
                    <img className="leaf__art" src="/intro/page.png" alt="" />
                    <div className="leaf__shade" />
                  </div>
                  <div className="leaf__face leaf__outer">
                    <img className="leaf__art" src="/intro/book-cover.png" alt="" />
                    <div className="eyebrow">Wedding Invitation</div>
                    <div className="leaf__rule" />
                    <p className="leaf__tagline">
                      우리의 삶을 함께
                      <br />
                      써 주신 당신께
                    </p>
                    <div className="leaf__note">Thanks to everyone.</div>
                  </div>
                </div>
                <div className="floor__wall" />
                <div className="floor__feet" />
                <div className="pop pop--hall">
                  <div className="pop__face pop__back">
                    <img className="leaf__art" src="/intro/page.png" alt="" />
                  </div>
                  <div className="pop__face pop__front">
                    <img src="/scene1/hall.png" alt="" />
                    <div className="cover-bg__blur cover-bg__blur--soft" />
                    <div className="cover-bg__blur cover-bg__blur--strong" />
                  </div>
                </div>
                <div className="pop pop--couple">
                  <div className="pop__face pop__back">
                    <img src="/scene1/couple.png" alt="" />
                  </div>
                  <div className="pop__face pop__front">
                    <img src="/scene1/couple.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="button" className="intro-skip" onClick={() => finishRef.current()}>
          건너뛰기
        </button>
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
