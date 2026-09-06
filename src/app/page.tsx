"use client";

/* eslint-disable @next/next/no-img-element */
// WIW-4 임시 적용. docs/artifacts/index.html의 Scene1 커버 · Scene2 핵심 정보(액자, 디자인 논의 T55·T58) · Scene3 인사(쪽지 + 수달·토끼 캐릭터, T51~T52) · Scene4 Part 1 신랑(사진 종이 + 토끼 메모지, T53) · Scene5 Part 1 신부(대칭, T58) · Scene6~8 Part 2·3(사진 자리표시 + 메모지, T65) · 떠 있는 메뉴를 옮긴 것입니다.
// 마크업은 조립본과 같은 구조이고 이미지 경로만 다릅니다(조립본 ../design/… · ../../public/…, 여기 /…).
// 진입 장면(로딩)은 편지봉투입니다(디자인 논의 T36~T49). 편지지는 커버 자체이고, 봉투 안에서 봉투 폭의 92%로 있다가 봉투가 내려가는 것과 동시에 올라오고, 이어서 화면 전체로 커집니다. 층(바탕 < 뒷판 < 커버 < 앞판 < 뚜껑)이고, 배율과 카드 값은 화면 크기에서 계산해 CSS 변수로 넣고, 봉투 그림이 준비되면 시작합니다. 어디를 탭해도 건너뜁니다.
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Home() {
  const fabRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const introBackRef = useRef<HTMLDivElement>(null);
  const introFrontRef = useRef<HTMLDivElement>(null);
  const introFlapRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const cover = coverRef.current;
    const layers = [introRef.current, introBackRef.current, introFrontRef.current, introFlapRef.current];
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
      safety = window.setTimeout(finishIntro, 6500);
    };
    const imgs = layers.flatMap((el) => Array.from(el!.querySelectorAll("img")));
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

  // 쪽지는 화면에 들어올 때 한 번 내려앉으며 나타납니다(디자인 논의 T51). 움직임 줄이기면 CSS가 바로 보이게 합니다
  useEffect(() => {
    const notes = Array.from(document.querySelectorAll<HTMLElement>(".note"));
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
                <img className="intro__front" src="/intro/envelope-front.png" alt="" />
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
          <div className="frame">
            <img className="frame__art" src="/scene2/frame.png" alt="" />
            <div className="frame__text">
              <div className="frame__big">2026년 10월 9일</div>
              <div className="frame__big">금요일 오후 6시 30분</div>
              <div className="frame__gap" />
              <div className="frame__small">더채플앳청담 3층 커티지홀</div>
              <div className="frame__small">강남구 선릉로 757</div>
            </div>
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
            <img className="photo-paper__photo" src="/scene4/groom-child.jpg" width={650} height={900} alt="신랑 어릴 적 사진" />
          </div>
          <div className="note note--left note--memo note--tuck">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <img className="note__who" src="/character/rabbit-1.png" width={240} height={164} alt="" />
            <p className="note__text">
              <span className="note__push" />
              <img className="note__stamp" src="/scene4/groom-child-ride.png" width={401} height={324} alt="" />
              제 신랑은 어릴 때 시를 써서 상도 받던 문학소년이었대요. 무협지를 좋아해서 작가를 꿈꾸기도 했고요. 그랬던 아이는 커서 냉철하고 이성적인
              개발자가 됐어요!
            </p>
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
              <span className="note__push note__push--left" />
              <img className="note__stamp note__stamp--left" src="/scene5/bride-child-cutout.png" width={130} height={324} alt="" />
              제 신부는 다섯 살 때 빗소리가 좋다며 혼자 우산 쓰고 동네를 걷던 아이였대요. 글 쓰는 걸 좋아해서 수첩과 펜을 늘 들고 다녔고요. 그랬던 아이는
              커서 상황을 분석하고 길을 찾는 사업전략가가 됐어요. 그래도 여전히 꿈을 꾸는 사람이고요.
            </p>
          </div>
        </section>
        <section id="part2-groom" className="block story">
          <div className="note note--right note--memo">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <img className="note__who" src="/character/otter-basic.png" width={240} height={194} alt="" />
            <img className="note__who note__who--inner" src="/character/rabbit-2.png" width={240} height={198} alt="" />
            <p className="note__text">저희는 같은 회사에서 만났어요!</p>
          </div>
          <div className="photo-paper photo-paper--right">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <div className="photo-paper__blank">
              <span>신랑 웨딩 사진</span>
            </div>
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
            <div className="photo-paper__blank">
              <span>신부 웨딩 사진</span>
            </div>
          </div>
          <div className="note note--right note--memo note--tuck">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <img className="note__who" src="/character/otter-1.png" width={240} height={183} alt="" />
            <p className="note__text">사실 저는 그때 연애 생각이 없었어요. 당분간 일에만 집중하자는 마음이었죠. 그런데 이 사람이 자꾸 제 주변을 맴돌더라고요.</p>
          </div>
          <div className="note note--right note--memo note--indent note--who-left">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <img className="note__who" src="/character/otter-2.png" width={238} height={240} alt="" />
            <p className="note__text">그러다 문득, 쉬는 날에도 시야를 떠올리는 저를 발견했어요. 아, 내가 설레고 있구나.</p>
          </div>
        </section>
        <section id="part3" className="block story">
          <div className="photo-paper photo-paper--center">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <div className="photo-paper__blank">
              <span>함께 있는 컷</span>
            </div>
          </div>
          <div className="note note--right note--memo note--tuck note--indent">
            <img className="note__paper" src="/paper/note.png" alt="" />
            <img className="note__who" src="/character/otter-3.png" width={223} height={240} alt="" />
            <p className="note__text">어른이 되고는 꿈을 꾸지 않던 제가, 이 사람을 만나 다시 꿈꾸게 됐어요. 사랑도 많아졌고요.</p>
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
        {/* 9쪽(초대)부터 여기 아래에 이어 붙입니다 */}
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
