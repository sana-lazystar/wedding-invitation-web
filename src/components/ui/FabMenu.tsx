// 떠 있는 바로 가기(디자인 논의 T132 · T134 · T135 · T141). 테이프로 붙인 작은 쪽지(··· / ×)를 누르면 그 위로 쪽지 한 장이 뜹니다.
// 공유하기는 카카오톡 공유(JS SDK)이고, 키가 없거나 SDK를 못 실으면 기기 공유 창 · 주소 복사로 내려갑니다
"use client";

import { KAKAO_JS_KEY } from "@/content/site";
import { useFabMenu } from "@/hooks/useFabMenu";
import { loadKakaoSdk, shareInvitation } from "@/lib/kakao";

export function FabMenu({ onCopy }: { onCopy: (text: string, message: string) => void }) {
  const { fabRef, menuOpen, setMenuOpen } = useFabMenu();
  // 공유하기(T132). SDK가 이미 실려 있으면 기다리지 않아 사용자 동작 안에서 카카오톡 창이 열립니다
  const share = async () => {
    setMenuOpen(false);
    await shareInvitation(onCopy);
  };
  return (
    <nav className="fab" ref={fabRef} data-open={menuOpen ? "true" : "false"} aria-label="바로 가기">
      <div className="fab__menu" id="fabMenu" hidden={!menuOpen}>
        <a className="fab__item" href="#directions" onClick={() => setMenuOpen(false)}>
          오시는 길
        </a>
        <a className="fab__item" href="#gallery" onClick={() => setMenuOpen(false)}>
          사진첩
        </a>
        <a className="fab__item" href="#gift" onClick={() => setMenuOpen(false)}>
          마음 전하는 곳
        </a>
        <button type="button" className="fab__item" onClick={share}>
          공유하기
        </button>
      </div>
      <button
        type="button"
        className="fab__button"
        aria-expanded={menuOpen}
        aria-controls="fabMenu"
        aria-label={menuOpen ? "메뉴 닫기" : "바로 가기 메뉴"}
        onClick={() => {
          setMenuOpen((open) => !open);
          if (KAKAO_JS_KEY) loadKakaoSdk().catch(() => {}); // 공유하기를 누르기 전에 미리 싣습니다
        }}
      >
        <img className="fab__tape" src="/paper/tape-short.png" alt="" />
        <span className="fab__label">{menuOpen ? "×" : "···"}</span>
      </button>
    </nav>
  );
}
