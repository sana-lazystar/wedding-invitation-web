// Scene7 Part 2 신부(8쪽, T65 · T87 · T90). 사진 뒤로 겹친 메모지의 아이콘은 틀(.note-wrap)에 둡니다


export function Part2BrideScene() {
  return (
    <section id="part2-bride" className="block story">
      <div className="photo-paper photo-paper--left">
        <img className="photo-paper__photo" src="/scene7/bride.jpg" width={769} height={1100} alt="신부 웨딩 사진" />
      </div>
      <div className="note-wrap note-wrap--right note-wrap--tuck note--w80">
        <div className="note note--right note--memo">
          <p className="note__text">사실 저는 그때 연애 생각이 없었어요. 당분간 일에만 집중하자는 마음이었죠. 그런데 이 사람이 자꾸 제 주변을 맴돌더라고요.</p>
        </div>
        <img className="note__who note-wrap__who" src="/character/otter-1.png" width={240} height={183} alt="" />
      </div>
      <div className="note note--right note--memo note--indent note--who-left">
        <img className="note__who" src="/character/otter-2.png" width={238} height={240} alt="" />
        <p className="note__text">그러다 문득, 쉬는 날에도 시야를 떠올리는 저를 발견했어요. 아, 내가 설레고 있구나.</p>
      </div>
    </section>
  );
}
