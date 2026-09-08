// Scene12 하객 안내(13쪽, T110 · T111). 종이 한 장에 격식체 두 문단


export function GuideScene() {
  return (
    <section id="guide" className="block story">
      <div className="sheet">
        <div className="sheet__head">
          <img className="sheet__mark" src="/intro/rose-seal.png" width={84} height={84} alt="" />
          <h2 className="sheet__title">하객 안내</h2>
        </div>
        <div className="sheet__body">
          <p className="sheet__text sheet__text--center">신부대기실은 6시 10분경 정리될 예정입니다. 신부와 사진을 남기고 싶으신 분들께서는 참고해 주시면 감사하겠습니다.</p>
          <hr className="sheet__rule" />
          <p className="sheet__text sheet__text--center sheet__text--light">축하 화환은 정중히 사양합니다. 오셔서 축복해 주시는 것만으로 충분히 감사합니다.</p>
        </div>
      </div>
    </section>
  );
}
