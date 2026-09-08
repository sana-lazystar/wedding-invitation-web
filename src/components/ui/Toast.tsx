// 복사 알림(디자인 논의 T110). 화면 아래 가운데, 1.6초 뒤 사라집니다

export function Toast({ text, shown }: { text: string; shown: boolean }) {
  return (
    <div className={shown ? "toast is-shown" : "toast"} role="status" aria-live="polite">
      {text}
    </div>
  );
}
