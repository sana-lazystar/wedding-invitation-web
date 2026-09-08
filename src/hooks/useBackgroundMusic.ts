"use client";

import { useEffect, useRef, useState } from "react";
import { fadeInAudio } from "@/lib/audio";

export function useBackgroundMusic() {
  const bgmRef = useRef<HTMLAudioElement>(null);
  const bgmWantedRef = useRef(true);
  const [bgmOn, setBgmOn] = useState(false);

  // 배경 음악(디자인 논의 T137). 열 때 한 번 재생을 시도하고, 폰 브라우저가 막으면(소리 있는 자동재생은 사용자 동작 뒤에만) 첫 동작(터치 · 스크롤 끝 · 키)에서 시작합니다. 끈 것은 이 방문(sessionStorage) 동안 기억합니다. 화면을 벗어나면 멈추고 돌아오면 다시 켭니다
  useEffect(() => {
    const audio = bgmRef.current;
    if (!audio) return;
    let disposed = false;
    let pausedByHide = false;
    try {
      bgmWantedRef.current = sessionStorage.getItem("bgm") !== "off";
    } catch {
      // 저장소를 못 쓰는 브라우저
    }
    const events = ["pointerdown", "touchend", "keydown"] as const;
    const onFirst = (e: Event) => {
      if ((e.target as Element | null)?.closest?.(".bgm")) return; // 스티커 자체의 누름은 토글이 맡습니다
      void tryPlay();
    };
    const disarm = () => events.forEach((t) => document.removeEventListener(t, onFirst, true));
    const arm = () => events.forEach((t) => document.addEventListener(t, onFirst, { capture: true, passive: true }));
    const tryPlay = async () => {
      if (!bgmWantedRef.current || disposed) return false;
      try {
        fadeInAudio(audio);
        await audio.play();
        setBgmOn(true);
        disarm();
        return true;
      } catch {
        return false;
      }
    };
    void tryPlay().then((ok) => {
      if (!ok && bgmWantedRef.current && !disposed) {
        audio.preload = "auto"; // 막혔으면 미리 받아 두어 첫 동작에서 바로 나옵니다
        audio.load();
        arm();
      }
    });
    const onVisibility = () => {
      if (document.hidden) {
        if (!audio.paused) {
          audio.pause();
          pausedByHide = true;
        }
      } else if (pausedByHide) {
        pausedByHide = false;
        audio.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      disposed = true;
      disarm();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const toggleBgm = () => {
    const audio = bgmRef.current;
    if (!audio) return;
    if (bgmWantedRef.current && !audio.paused) {
      audio.pause();
      bgmWantedRef.current = false;
      setBgmOn(false);
      try {
        sessionStorage.setItem("bgm", "off");
      } catch {
        // 저장소를 못 쓰는 브라우저
      }
    } else {
      bgmWantedRef.current = true;
      try {
        sessionStorage.removeItem("bgm");
      } catch {
        // 저장소를 못 쓰는 브라우저
      }
      fadeInAudio(audio);
      audio
        .play()
        .then(() => setBgmOn(true))
        .catch(() => setBgmOn(false));
    }
  };

  return { bgmRef, bgmOn, toggleBgm };
}
