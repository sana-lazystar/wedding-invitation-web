// 배경 음악 페이드인(디자인 논의 T137 · T139). iOS는 media 요소의 volume을 못 바꾸므로 되는 브라우저에서만 걸립니다.
// rAF가 주는 시각이 start보다 앞설 수 있어 0 아래를 막고(음수 volume은 예외가 납니다), 겹쳐 시작하면 앞 것을 취소합니다

let fadeRaf = 0;

export function fadeInAudio(audio: HTMLAudioElement) {
  cancelAnimationFrame(fadeRaf);
  try {
    audio.volume = 0;
  } catch {
    return;
  }
  if (audio.volume !== 0) return;
  const start = performance.now();
  const step = (t: number) => {
    const k = Math.min(1, Math.max(0, (t - start) / 1200));
    audio.volume = k;
    if (k < 1) fadeRaf = requestAnimationFrame(step);
  };
  fadeRaf = requestAnimationFrame(step);
}
