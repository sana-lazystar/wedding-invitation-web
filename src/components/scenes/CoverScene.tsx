// Scene1 커버(와이어프레임 2쪽, 디자인 논의 T50 · T75 · T83). 종이 무대 위의 두 사람. 높이는 처음 잰 화면 높이로 고정합니다(.block--fixed)

export function CoverScene({ ref }: { ref: React.Ref<HTMLElement> }) {
  return (
    <section id="cover" className="block block--fixed" ref={ref}>
      <div className="cover-bg">
        <img className="cover-bg__hall" src="/scene1/hall.png" alt="더채플앳청담 커티지홀" />
        <div className="cover-bg__shadow" />
        <img className="cover-bg__couple" src="/scene1/couple.png" alt="이산하와 송시야" />
      </div>
      <div className="cover-bg__blur cover-bg__blur--soft" />
      <div className="cover-bg__blur cover-bg__blur--strong" />
      <div className="cover-head">
        <div className="eyebrow">Wedding Invitation</div>
        <p className="tagline">우리의 삶을 함께 써 주신 당신께</p>
      </div>
      <div className="names">
        <div className="names__name">이산하</div>
        <div className="names__and">그리고</div>
        <div className="names__name">송시야</div>
      </div>
    </section>
  );
}
