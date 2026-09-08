"use client";

// 진입 장면(디자인 논의 T36~T49 · T72 · T124). 봉투 그림이 준비되면 시작하고, 카드가 다 올라오거나 아무 데나 탭하면 끝납니다.
// 배율 · 카드 값은 화면 크기에서 재어 CSS 변수로 넣습니다. 층 마크업은 IntroScene, 움직임은 CSS 키프레임입니다
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function useIntro() {
  const coverRef = useRef<HTMLElement>(null);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const cover = coverRef.current;
    const layers = Array.from(document.querySelectorAll<HTMLElement>(".intro-layer")); // 봉투 층 넷. 마크업은 IntroScene이 그립니다
    if (!cover || !document.querySelector(".intro") || layers.length !== 4) return;
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
    const imgs = [...layers.flatMap((el) => Array.from(el.querySelectorAll("img"))), ...Array.from(cover.querySelectorAll("img"))]; // 커버(편지지)의 그림도 기다립니다(디자인 논의 T124)
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

  return { introDone, coverRef };
}
