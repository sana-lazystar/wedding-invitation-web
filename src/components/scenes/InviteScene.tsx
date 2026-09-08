// Scene9 초대(10쪽, T128). 크림 바탕에 글만 가운데 정렬, 모서리에 백합 · 꽃잎 스티커
// 9. 초대(와이어프레임 10쪽, 디자인 논의 T127). 참고 그림 docs/design/scene9/scene-9-reference.png를 옮긴 것. 백합 · 꽃잎은 이산하가 준 그림

export function InviteScene() {
  return (
    <section id="invite" className="block invite">
      <img className="invite__sticker invite__lily" src="/scene9/lily.png" width={577} height={900} alt="" />
      <div className="invite__text">
        <p className="invite__strong">서로에게 사랑을 덧입히며<br />두 마음을 하나로 엮어 왔습니다.</p>
        <p className="invite__light">혼자였다면 오지 못했을 자리에<br />둘이라서 도착했고, 그 매듭에는<br />여러분이 함께 계셨습니다.</p>
        <p className="invite__verse"><strong>사랑은 온전하게 연결하는 띠입니다.</strong><span>골로새서 3장 14절</span></p>
        <p className="invite__light">훗날 이날의 사진첩을 꺼내볼 때,<br />그 안에 저희와 함께 웃고 있는<br />여러분이 계셨으면 좋겠습니다.</p>
        <p className="invite__names">이종노 · 이은경<span className="invite__role">의 아들</span>이산하<br />송영봉 · 임인화<span className="invite__role">의 딸</span>송시야</p>
        <p className="invite__from">올림</p>
      </div>
      <img className="invite__sticker invite__petal--2" src="/scene9/petal-2.png" width={395} height={450} alt="" />
      <img className="invite__sticker invite__petal--1" src="/scene9/petal-1.png" width={358} height={450} alt="" />
    </section>
  );
}
