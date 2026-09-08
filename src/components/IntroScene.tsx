// 진입 장면(로딩)의 층 넷과 바탕(디자인 논의 T36~T49 · T77~T82 · T124). 봉투가 물러나 멈추고 뚜껑이 그림자를 드리우며 열리며 커버가 카드로 올라옵니다.
// 움직임은 CSS 키프레임이고 배율 · 카드 값은 useIntro가 재서 CSS 변수로 넣습니다. 여기서는 층만 그립니다

export function IntroScene() {
  return (
    <>
      <div className="intro" aria-hidden="true" />
      <button type="button" className="intro__skip">
        넘어가기
      </button>
      <div className="intro-layer intro-layer--back" aria-hidden="true">
        <div className="intro__zoom">
          <div className="intro__env">
            <img className="intro__back" src="/intro/envelope-back.png" alt="" />
          </div>
        </div>
      </div>
      <div className="intro-layer intro-layer--front" aria-hidden="true">
        <div className="intro__zoom">
          <div className="intro__env">
            <div className="intro__floor" />
            <div className="intro__table" />
            <img className="intro__front" src="/intro/envelope-front.png" alt="" />
          </div>
        </div>
      </div>
      <div className="intro-layer intro-layer--cast" aria-hidden="true">
        <div className="intro__zoom">
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
      <div className="intro-layer intro-layer--flap" aria-hidden="true">
        <div className="intro__zoom">
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
    </>
  );
}
