// Scene14 마지막(15쪽, T121~T125 · T133). 봉투 크기 편지지가 봉투에 담기고 뚜껑이 닫힙니다. 봉투 부품은 진입 장면 것을 그대로 씁니다


export function ClosingScene({ ref }: { ref: React.Ref<HTMLElement> }) {
  return (
    <section id="closing" className="block block--fixed closing" ref={ref}>
      <div className="closing__letter">
        <div className="closing__text">
          <p className="closing__big">고마움을 봉해 보냅니다.</p>
          <p className="closing__date">2026. 10. 09</p>
        </div>
      </div>
      <div className="closing__layer closing__layer--back" aria-hidden="true">
        <div className="closing__zoom">
          <div className="intro__env">
            <img className="intro__back" src="/intro/envelope-back.png" alt="" />
          </div>
        </div>
      </div>
      <div className="closing__layer closing__layer--front" aria-hidden="true">
        <div className="closing__zoom">
          <div className="intro__env">
            <div className="closing__floor" />
            <div className="intro__table" />
            <img className="intro__front" src="/intro/envelope-front.png" alt="" />
          </div>
        </div>
      </div>
      <div className="closing__layer closing__layer--cast" aria-hidden="true">
        <div className="closing__zoom">
          <div className="intro__env">
            <div className="intro__cast">
              <img className="intro__cast-img" src="/intro/envelope-flap.png" alt="" />
              <img className="intro__cast-img intro__cast-img--seal" src="/intro/rose-seal.png" alt="" />
              <img className="intro__cast-img intro__cast-img--soft" src="/intro/envelope-flap.png" alt="" />
              <img className="intro__cast-img intro__cast-img--seal intro__cast-img--soft" src="/intro/rose-seal.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="closing__layer closing__layer--flap" aria-hidden="true">
        <div className="closing__zoom">
          <div className="intro__env">
            <div className="intro__flap">
              <img className="intro__seal-back" src="/intro/rose-seal-back.png" alt="" />
              <img className="intro__flap-in" src="/intro/envelope-flap-inside.png" alt="" />
              <img className="intro__flap-out" src="/intro/envelope-flap.png" alt="" />
              <img className="intro__seal" src="/intro/rose-seal.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <p className="closing__credit">
        Designed &amp; Created by Sanha &amp; Siya
        <br />© 2026. All rights reserved.
      </p>
    </section>
  );
}
