"use client";

import { useEffect, useRef } from "react";

export function useClosingScene() {
  const closingRef = useRef<HTMLElement>(null);

  // 마지막 장면(디자인 논의 T121 · T123). 봉투 · 편지지 치수를 구획 크기에서 계산해 --c-* 변수에 넣고, 구획이 60% 보이면 한 번 재생합니다(is-closing). 움직임 줄이기면 편지지만
  useEffect(() => {
    const closing = closingRef.current;
    if (!closing) return;
    const apply = () => {
      const w = closing.clientWidth;
      const h = closing.clientHeight;
      const envW = Math.min(w, 430) * 0.92; // 봉투 폭 = 화면 폭(페이지 폭 430까지)의 92%
      const z1 = envW / 600;
      const envTop = h / 2 - 200 * z1; // 가운데 선 봉투 윗변
      const lw = envW * 0.92; // 편지지 = 봉투 폭의 92% × 봉투 좌표 440
      const lh = 440 * z1;
      const tys = h / 2 - lh / 2; // 처음 자리(구획 가운데)
      const ty0 = envTop + 14 * z1; // 주머니 안(봉투 윗변 바로 아래)
      const ty1 = ty0 - lh * 0.62; // 다시 열었을 때(제 높이의 62%만큼 위로)
      const drop1 = Math.max(0, tys + lh - 70 - envTop); // 봉투가 나타나는 자리까지 내려간 거리
      closing.style.setProperty("--c-z1", String(z1));
      closing.style.setProperty("--c-drop1", `${drop1 / z1}px`);
      closing.style.setProperty("--c-lw", `${lw}px`);
      closing.style.setProperty("--c-lh", `${lh}px`);
      closing.style.setProperty("--c-tys", `${tys}px`);
      closing.style.setProperty("--c-ty0", `${ty0}px`);
      closing.style.setProperty("--c-ty1", `${ty1}px`);
    };
    apply();
    window.addEventListener("resize", apply);
    let observer: IntersectionObserver | null = null;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              closing.classList.add("is-closing");
              observer?.disconnect();
            }
          });
        },
        { threshold: 0.6 },
      );
      observer.observe(closing);
    }
    // 다시 열고 닫기(디자인 논의 T122). 첫 재생이 끝나면(뚜껑 닫힘 애니메이션 끝) is-settled를 붙이고, 그 뒤 구획이 보이는 동안 스크롤을 올리면 is-open, 내리면 뗍니다. 페이지 끝의 튕김(iOS)은 scrollY가 최대를 넘었다 돌아오는 것이라 최대 근처 값은 무시합니다
    let settled = false;
    let lastY = window.scrollY;
    const onAnimationEnd = (e: AnimationEvent) => {
      if (e.animationName !== "closing-flap") return;
      settled = true;
      closing.classList.add("is-settled");
    };
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (!settled) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (y < 0 || y >= max - 1) return;
      const r = closing.getBoundingClientRect();
      const vh = window.innerHeight;
      const seen = (Math.min(r.bottom, vh) - Math.max(r.top, 0)) / vh; // 구획이 화면을 차지하는 비율
      if (dy < -1 && seen >= 0.3) closing.classList.add("is-open");
      else if (dy > 1 && seen >= 0.85) closing.classList.remove("is-open"); // 닫힘은 거의 다 내려왔을 때(디자인 논의 T125)
    };
    closing.addEventListener("animationend", onAnimationEnd);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", apply);
      window.removeEventListener("scroll", onScroll);
      closing.removeEventListener("animationend", onAnimationEnd);
      observer?.disconnect();
    };
  }, []);

  return closingRef;
}
