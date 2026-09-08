// Scene4 Part 1 신랑(5쪽, T53 · T89 · T91). 어릴 적 사진 종이와 토끼 메모지, 오른쪽 아래 컷아웃 스티커

import { NotePaper } from "@/components/ui/NotePaper";

export function Part1GroomScene() {
  return (
    <section id="part1-groom" className="block story">
      <div className="photo-paper">
        <NotePaper />
        <img className="photo-paper__photo" src="/scene4/groom-child.jpg" width={641} height={900} alt="신랑 어릴 적 사진" />
      </div>
      <div className="note note--left note--memo note--tuck">
        <NotePaper />
        <img className="note__who" src="/character/rabbit-1.png" width={240} height={164} alt="" />
        <p className="note__text">
          제 신랑은 어릴 때 시를 써서 상도 받던<br />문학소년이었대요. 무협지를 좋아해서 작가를<br />꿈꾸기도 했고요. 그랬던 아이는 커서<br />냉철하고 이성적인 개발자가 됐어요!
        </p>
        <div className="note__row">
          <div className="note__stamp-cell">
            <img className="note__stamp" src="/scene4/groom-child-ride.png" width={401} height={324} alt="" />
          </div>
        </div>
        </div>
    </section>
  );
}
