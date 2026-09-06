"use client";

// WIW-4 임시 적용. docs/artifacts/index.html의 Scene1 커버 · Scene2 핵심 정보 · 진입 장면 · 떠 있는 메뉴를 옮긴 것입니다.
import { useEffect, useRef, useState } from "react";

const INTRO_STEPS = { shown: 60, open: 500, rising: 1300, settling: 1950, text: 2050, expanding: 2950, done: 3850 };

export default function Home() {
  const introRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const coverHeadRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLElement>(null);
  const finishRef = useRef<() => void>(() => {});
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const intro = introRef.current;
    const letter = letterRef.current;
    const text = introTextRef.current;
    const head = coverHeadRef.current;
    if (!intro || !letter || !text || !head) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      intro.hidden = true;
      return;
    }
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

    window.scrollTo(0, 0);
    intro.hidden = false;
    intro.className = "";
    letter.style.removeProperty("--letter-scale");
    text.style.removeProperty("--text-dx");
    text.style.removeProperty("--text-dy");
    root.classList.add("is-intro");
    void intro.offsetWidth;
    timers.push(window.setTimeout(() => intro.classList.add("is-shown"), INTRO_STEPS.shown));
    timers.push(window.setTimeout(() => intro.classList.add("is-open"), INTRO_STEPS.open));
    timers.push(window.setTimeout(() => intro.classList.add("is-rising"), INTRO_STEPS.rising));
    timers.push(window.setTimeout(() => intro.classList.add("is-settling"), INTRO_STEPS.settling));
    timers.push(window.setTimeout(() => intro.classList.add("is-text"), INTRO_STEPS.text));
    timers.push(
      window.setTimeout(() => {
        const r = letter.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const scale =
          Math.max((2 * Math.max(cx, window.innerWidth - cx)) / r.width, (2 * Math.max(cy, window.innerHeight - cy)) / r.height) * 1.06;
        letter.style.setProperty("--letter-scale", scale.toFixed(3));
        const from = text.getBoundingClientRect();
        const to = head.getBoundingClientRect();
        const dx = to.left + to.width / 2 - (from.left + from.width / 2);
        const dy = to.top + to.height / 2 - (from.top + from.height / 2);
        // 무대가 -15도 기울어 있으므로 화면 이동량을 무대 좌표계로 돌린다
        const rad = (15 * Math.PI) / 180;
        const cs = Math.cos(rad);
        const sn = Math.sin(rad);
        text.style.setProperty("--text-dx", `${(dx * cs - dy * sn).toFixed(1)}px`);
        text.style.setProperty("--text-dy", `${(dx * sn + dy * cs).toFixed(1)}px`);
        intro.classList.add("is-expanding");
      }, INTRO_STEPS.expanding),
    );
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="cover-bg__hall" src="/scene1/hall.png" alt="더채플앳청담 커티지홀" />
            <div className="cover-bg__shadow" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="cover-bg__couple" src="/scene1/couple.png" alt="이산하와 송시야" />
          </div>
          <div className="cover-head" ref={coverHeadRef}>
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
          <div className="env__back" />
          <div className="env__letter" ref={letterRef} />
          <div className="env__front" />
          <div className="env__note">Thanks to everyone.</div>
          <div className="env__flap" />
          <div className="intro-text" ref={introTextRef}>
            <div className="eyebrow">Wedding Invitation</div>
            <p className="tagline">우리의 삶을 함께 써 주신 당신께</p>
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
