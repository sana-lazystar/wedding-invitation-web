// Scene2 핵심 정보(3쪽, T83~T86). 흰 종이 위 올리브 가지와 글 두 크기

export function InfoScene() {
  return (
    <section id="info" className="block">
      <img className="info__branch" src="/scene2/branch.png" width={240} height={139} alt="" />
      <div className="info__text">
        <div className="info__big">2026년 10월 9일</div>
        <div className="info__big">금요일 오후 6시 30분</div>
        <div className="info__gap" />
        <div className="info__small">더채플앳청담 3층 커티지홀</div>
        <div className="info__small">강남구 선릉로 757</div>
      </div>
    </section>
  );
}
