// Scene8 Part 3(9쪽, T65 · T83 · T128). 가로 웨딩 사진과 메모지 셋

import { NotePaper } from "@/components/ui/NotePaper";

export function Part3Scene() {
  return (
    <section id="part3" className="block story">
      <div className="photo-paper photo-paper--center photo-paper--wide">
        <NotePaper />
        <img className="photo-paper__photo" src="/scene8/couple.jpg" width={1100} height={733} alt="이산하와 송시야" />
      </div>
      <div className="note-wrap note-wrap--right note-wrap--tuck note--indent">
        <div className="note note--right note--memo">
          <NotePaper />
          <p className="note__text">어른이 되고는 꿈을 꾸지 않던 제가, 이 사람을 만나 다시 꿈꾸게 됐어요. 사랑도 많아졌고요.</p>
        </div>
        <img className="note__who note-wrap__who" src="/character/otter-4.png" width={240} height={207} alt="" />
      </div>
      <div className="note note--left note--memo">
        <NotePaper />
        <img className="note__who" src="/character/rabbit-6.png" width={240} height={177} alt="" />
        <p className="note__text">마음이 여렸던 저는 이 사람 덕분에 많이 단단해졌어요! 누군가에게 기대는 법도 배웠고요!</p>
      </div>
      <div className="note note--right note--memo">
        <NotePaper />
        <img className="note__who" src="/character/hug.png" width={240} height={189} alt="" />
        <p className="note__text">그런 저희가 이제 하나가 됩니다.</p>
      </div>
    </section>
  );
}
