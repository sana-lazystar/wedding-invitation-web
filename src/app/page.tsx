"use client";

/* eslint-disable @next/next/no-img-element */
// WIW-4 임시 적용. docs/artifacts/index.html의 Scene1 커버 · Scene2 핵심 정보 · 떠 있는 메뉴를 옮긴 것입니다.
// 마크업은 조립본과 같은 구조이고 이미지 경로만 다릅니다(조립본 ../design/… · ../../public/…, 여기 /…).
// 진입 장면(로딩)은 편지봉투입니다(디자인 논의 T36~T41). 세 층(바탕 < 커버 < 봉투 몸 < 뚜껑)이고, 배율과 카드 값은 화면 크기에서 계산해 CSS 변수로 넣고, 봉투 그림이 준비되면 시작합니다. 어디를 탭해도 건너뜁니다.
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Home() {
  const fabRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const introEnvRef = useRef<HTMLDivElement>(null);
  const introFlapRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const cover = coverRef.current;
    const layers = [introRef.current, introEnvRef.current, introFlapRef.current];
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
    const vw = root.clientWidth;
    const vh = window.innerHeight;
    const coverW = cover.clientWidth;
    const coverH = cover.clientHeight;
    const envW = Math.min(vw, 430) * 0.8; // 봉투 폭 = 화면 폭(페이지 폭 430까지)의 80%
    const z1 = envW / 600;
    const z0 = vh / 400;
    const envTop = vh / 2 - 200 * z1; // 전체가 보일 때 봉투 윗변의 화면 y
    const envBottom = envTop + 400 * z1; // 밑변
    const s0 = (envW * 0.92) / coverW; // 카드 폭 = 봉투 폭의 92%
    const ty0 = envTop + 14 * z1; // 카드가 봉투 안에 든 자리(윗변 바로 아래)
    const ty1 = (vh - coverH * s0) / 2; // 올라온 카드의 윗변. 카드가 화면 세로 가운데에 와서 다음 확대가 가운데 기준이 됩니다
    const drop1 = Math.max(0, ty1 + coverH * s0 * 0.65 - envTop); // 봉투가 조금 내려가는 거리(화면 px). 카드가 65% 나오도록
    const drop2 = vh - envTop + 40; // 그다음 화면 아래로 완전히 빠져나가는 거리
    const b0 = coverH - (envBottom - ty0) / s0; // 봉투 밑변 아래로 삐져나온 카드를 가리는 클립(커버 좌표)
    const b1 = coverH - (envBottom + drop1 - ty1) / s0; // 올라오기 끝
    const b2 = coverH - (envBottom + drop2 - ty1) / s0; // 봉투가 빠져나간 뒤(음수 = 클립 없음)
    root.style.setProperty("--z0", String(z0));
    root.style.setProperty("--z1", String(z1));
    root.style.setProperty("--drop1", `${drop1 / z1}px`);
    root.style.setProperty("--drop2", `${drop2 / z1}px`);
    cover.style.setProperty("--card-s0", String(s0));
    cover.style.setProperty("--card-ty0", `${ty0}px`);
    cover.style.setProperty("--card-ty1", `${ty1}px`);
    cover.style.setProperty("--card-b0", `${b0}px`);
    cover.style.setProperty("--card-b1", `${b1}px`);
    cover.style.setProperty("--card-b2", `${b2}px`);
    let started = false;
    let safety: number | undefined;
    const startIntro = () => {
      if (started || finished) return;
      started = true;
      root.classList.add("is-intro-shown");
      safety = window.setTimeout(finishIntro, 6500);
    };
    const imgs = layers.flatMap((el) => Array.from(el!.querySelectorAll("img")));
    Promise.all(imgs.map((im) => (im.decode ? im.decode().catch(() => undefined) : Promise.resolve()))).then(startIntro);
    const fallback = window.setTimeout(startIntro, 2500);
    const onAnimationEnd = (e: AnimationEvent) => {
      if (e.animationName === "intro-card-grow") finishIntro();
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
      root.classList.remove("is-intro", "is-intro-shown");
    };
  }, []);

  // 진입 장면이 끝나면 봉투 층이 빠진 DOM이 그려지기 전에(같은 프레임) 커버의 층 지정을 지웁니다
  useLayoutEffect(() => {
    if (!introDone) return;
    document.documentElement.classList.remove("is-intro", "is-intro-shown");
  }, [introDone]);

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
          <div className="intro" ref={introRef} aria-hidden="true">
            <button type="button" className="intro__skip">
              넘어가기
            </button>
          </div>
          <div className="intro-layer intro-layer--env" ref={introEnvRef} aria-hidden="true">
            <div className="intro__zoom">
              <div className="intro__env">
                <img className="intro__back" src="/intro/envelope-back.png" alt="" />
              </div>
            </div>
          </div>
          <div className="intro-layer intro-layer--flap" ref={introFlapRef} aria-hidden="true">
            <div className="intro__zoom">
              <div className="intro__env">
                <div className="intro__flap">
                  <img className="intro__seal-back" src="/intro/wax-seal-back.png" alt="" />
                  <img className="intro__flap-in" src="/intro/envelope-flap-inside.png" alt="" />
                  <img className="intro__flap-out" src="/intro/envelope-flap.png" alt="" />
                  <img className="intro__seal" src="/intro/wax-seal.png" alt="" />
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
