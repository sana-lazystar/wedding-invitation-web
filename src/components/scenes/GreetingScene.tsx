// Scene3 인사(4쪽, T51 · T52). 쪽지 두 장에 수달(신랑) · 토끼(신부) 스티커


export function GreetingScene() {
  return (
    <section id="greeting" className="block greeting">
      <div className="note note--right">
        <img className="note__who" src="/character/otter-basic.png" width={240} height={194} alt="" />
        <p className="note__text">안녕하세요. 10월의 신랑, 이산하</p>
      </div>
      <div className="note note--left">
        <img className="note__who" src="/character/rabbit-basic.png" width={240} height={158} alt="" />
        <p className="note__text">
          신부 송시야입니다!
          <br />
          잠깐 저희에 대해 얘기해 드릴게요!
        </p>
      </div>
    </section>
  );
}
