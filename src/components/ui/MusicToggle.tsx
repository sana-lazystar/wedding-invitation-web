// 배경 음악과 오른쪽 위 음표(디자인 논의 T137~T140). 재생 중엔 음표 셋이 원 안을 지나가고 끄면 음표 하나에 짧은 빗금입니다.
// 색은 difference 블렌드라 바탕 밝기에 따라 저절로 뒤집힙니다(CSS)
"use client";

import { useBackgroundMusic } from "@/hooks/useBackgroundMusic";

export function MusicToggle() {
  const { bgmRef, bgmOn, toggleBgm } = useBackgroundMusic();
  return (
      <>
    {/* 배경 음악(디자인 논의 T137). 음원은 이산하가 준 것(원본 docs/design/audio/, git 제외) */}
    <audio ref={bgmRef} src="/audio/bgm.mp3" loop preload="none" />
    <button type="button" className={bgmOn ? "bgm is-on" : "bgm"} aria-pressed={bgmOn} aria-label={bgmOn ? "배경 음악 끄기" : "배경 음악 켜기"} onClick={toggleBgm}>
      <span className="bgm__notes" aria-hidden="true">
        <span className="bgm__note bgm__note--1">♪</span>
        <span className="bgm__note bgm__note--2">♫</span>
        <span className="bgm__note bgm__note--3">♩</span>
      </span>
      <span className="bgm__off" aria-hidden="true">
        ♪
      </span>
    </button>
      </>
  );
}
