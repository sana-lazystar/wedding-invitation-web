// Scene6 Part 2 신랑(7쪽, T65 · T83 · T87). 합창 메모지 · 웨딩 사진 · 관찰 · 독백

import { NotePaper } from "@/components/ui/NotePaper";

export function Part2GroomScene() {
  return (
    <section id="part2-groom" className="block story">
      <div className="note note--left note--memo note--who-right note--w68">
        <NotePaper />
        <img className="note__who" src="/character/otter-basic.png" width={240} height={194} alt="" />
        <img className="note__who note__who--inner" src="/character/rabbit-2.png" width={240} height={198} alt="" />
        <p className="note__text">저희는 같은 회사에서 만났어요!</p>
      </div>
      <div className="photo-paper photo-paper--right">
        <NotePaper />
        <img className="photo-paper__photo" src="/scene6/groom.jpg" width={688} height={900} alt="신랑 웨딩 사진" />
      </div>
      <div className="note note--left note--memo note--tuck">
        <NotePaper />
        <img className="note__who" src="/character/rabbit-3.png" width={240} height={151} alt="" />
        <p className="note__text">신랑은 새벽에 퇴근하더라도 다음 날 꼭 정장에 머리까지 하고 나왔어요. 처음엔 차가워 보이는 데다 저와 너무 다른 사람 같아서 거리를 뒀는데, 알면 알수록 보석 같은 사람이더라고요!</p>
      </div>
      <div className="note note--left note--memo note--indent note--who-right">
        <NotePaper />
        <img className="note__who" src="/character/rabbit-4.png" width={240} height={159} alt="" />
        <p className="note__text">&apos;이 사람 놓치면 안 되겠다, 남 주기 너무 아깝다! 아니, 싫다!&apos; 싶어서 콱 잡았죠.</p>
      </div>
    </section>
  );
}
