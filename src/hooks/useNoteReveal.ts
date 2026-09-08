"use client";

import { useEffect } from "react";

export function useNoteReveal() {
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
}
