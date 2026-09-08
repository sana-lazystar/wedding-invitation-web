// 만화 뷰어(디자인 논의 T102). 어디를 탭해도 닫힙니다(돌린 그림이 화면 전체라 바탕만 골라 탭할 수 없습니다). 그림은 구획의 것과 같은 파일이라 다시 내려받지 않습니다
// 만화 뷰어(디자인 논의 T102). 그림은 같은 파일이라 다시 내려받지 않습니다

export function ComicViewer({ ref, open, onClose }: { ref: React.Ref<HTMLDivElement>; open: boolean; onClose: () => void }) {
  return (
    <div
      className="comic-viewer"
      id="comicViewer"
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="만화 크게 보기"
      hidden={!open}
      onClick={onClose}
    >
      <img className="comic-viewer__img" src="/scene10/comic.jpg" width={1664} height={1087} alt="네 컷 만화. 결혼을 결심한 이야기" />
      <button type="button" className="comic-viewer__close" aria-label="닫기">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M6 6l10 10M16 6L6 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
