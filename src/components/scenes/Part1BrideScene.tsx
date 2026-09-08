// Scene5 Part 1 신부(6쪽, T58 · T62 · T93). Scene4의 좌우 대칭. 컷아웃은 글 옆 칸에 붙습니다

import { NotePaper } from "@/components/ui/NotePaper";

export function Part1BrideScene() {
  return (
    <section id="part1-bride" className="block story">
      <div className="photo-paper photo-paper--left">
        <NotePaper />
        <img className="photo-paper__photo" src="/scene5/bride-child.jpg" width={625} height={900} alt="신부 어릴 적 사진" />
      </div>
      <div className="note note--right note--memo note--tuck note--bride">
        <NotePaper />
        <img className="note__who" src="/character/otter-basic.png" width={240} height={194} alt="" />
        <p className="note__text">
          제 신부는 다섯 살 때 빗소리가 좋다며 혼자<br />우산 쓰고 동네를 걷던 아이였대요.
        </p>
        <div className="note__row note__row--left">
          <div className="note__stamp-cell note__stamp-cell--left">
            <img className="note__stamp note__stamp--left" src="/scene5/bride-child-cutout.png" width={130} height={324} alt="" />
          </div>
          <p className="note__text">글 쓰는 걸 좋아해서 수첩과 펜을 늘 들고 다녔고요. 그랬던 아이는 커서 상황을 분석하고 길을 찾는 사업전략가가 됐어요. 여전히 꿈을 꾸는 사람이고요.</p>
        </div>
      </div>
    </section>
  );
}
