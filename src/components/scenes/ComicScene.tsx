// Scene10 추신 + 만화(11쪽 위 절반, T102). 만화 종이는 단추이고 누르면 90° 돌린 뷰어가 열립니다
// 10. 추신 + 만화(와이어프레임 11쪽 위 절반, 디자인 논의 T102). 사진첩(같은 쪽 아래 절반)은 다음 구획입니다(T103)


export function ComicScene({ onOpen }: { onOpen: (opener: HTMLElement) => void }) {
  return (
    <section id="comic" className="block story comic">
      <div className="note note--left note--memo note--ps">
        <img className="note__tape" src="/paper/tape.png" alt="" />
        <p className="note__text">P.S. 저희가 결혼을 언제 결심했냐면요!</p>
      </div>
      <button
        type="button"
        className="photo-paper comic__paper"
        id="comicOpen"
        aria-haspopup="dialog"
        aria-controls="comicViewer"
        aria-label="만화 크게 보기"
        onClick={(e) => onOpen(e.currentTarget)}
      >
        <img className="photo-paper__photo" src="/scene10/comic.jpg" width={1664} height={1087} alt="네 컷 만화. 결혼을 결심한 이야기" loading="lazy" />
        <span className="comic__hint" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M7.5 1.5h3v3M4.5 10.5h-3v-3M10.5 1.5L7 5M1.5 10.5L5 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          크게 보기
        </span>
      </button>
    </section>
  );
}
