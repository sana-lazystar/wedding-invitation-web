---
id: WIW-4
type: task
status: in-progress
created: 2026-09-06 19:14:53
updated: 2026-09-06 21:53:16
completed:
epic:
jira:
repos: [wedding-invitation-web]
design-refs: [docs/artifacts/index.html, docs/dashboard/discussions/2026-09-06--design-mockups.md]
code-refs: []
related: []
---

# WIW-4 — 조립본을 Next.js에 임시 적용해 로컬로 확인

## 목적

시안 조립본 `docs/artifacts/index.html`(Scene1 커버 · 편지지 진입 장면 · 떠 있는 메뉴)을 Next.js 앱에 임시로 옮겨 `next dev`로 띄웁니다. 이산하가 브라우저에서 실제 앱으로 동작을 확인하기 위한 것입니다.

## 작업내용

- `src/app/layout.tsx`에 글꼴(Noto Sans KR · 고운바탕 · Cormorant Garamond)을 `next/font/google`로 싣고 `lang="ko"`, 제목, noindex를 둡니다.
- `src/app/page.tsx`를 클라이언트 컴포넌트로 바꿔 커버 마크업, 진입 장면, 떠 있는 메뉴를 React로 옮깁니다. 글꼴 확인 패널은 옮기지 않습니다(조립본 전용).
- `src/app/globals.css`는 조립본에서 `node docs/scripts/sync-globals.mjs`로 만듭니다(조립본이 정본).
- 이미지는 `docs/design/canvas/`의 축소본을 `public/scene1/`로 복사해 씁니다.
- 로컬 `next dev`로 띄워 이산하가 확인합니다.

처음에는 코드를 커밋하지 않는 로컬 확인용이었습니다. 2026-09-06 이산하가 배포해 보겠다며 "커밋 안 된 것만 넣어 달라"고 지시해(디자인 논의 T28) 범위를 넓혔습니다. 임시 적용 코드와 이미지를 develop에 커밋하고, develop → main PR과 배포는 이산하가 합니다. 정식 이식은 시안이 확정된 뒤 story 아래 task로 다시 합니다. Vercel 설정을 건드리지 않습니다. 이미지 파이프라인(`docs/scripts/images.mjs`)을 만들지 않습니다.

## 주의할 점

이미지는 원본 그대로라 최적화 전입니다(커버 PNG 1.9MB). 이미지 파이프라인은 정식 이식 때 만듭니다. `next dev`가 `AGENTS.md`의 규칙 블록을 다시 쓸 수 있습니다. 조립본이 바뀌면 같은 방식으로 다시 옮깁니다.

## 완료 기준

- [x] `next dev`로 띄운 `http://localhost:3000`에서 커버·진입 장면·떠 있는 메뉴가 조립본과 같이 동작함 (HTTP 200, 이미지 200, tsc·eslint 통과)
- [ ] 이산하가 로컬에서 확인함
- [x] 구현 기록 기입 (임시 적용 커밋 해시)

## 구현 기록

2026-09-06 19:22:14 · 브랜치 develop 작업 트리(커밋 없음) · 변경 파일 `src/app/layout.tsx` `src/app/page.tsx` `src/app/globals.css` `public/scene1/hall.jpg` `public/scene1/couple.png` · 이산하의 `next dev`(포트 3000)에 반영 확인

2026-09-06 20:10:21 · develop · d8b24d7 · 배포 확인용 임시 적용 코드 커밋(이산하 지시 T28)

2026-09-06 21:03:10 · develop · 64eba75 · 팝업북 진입 장면(디자인 논의 T31) 반영. `src/app/page.tsx` 진입 장면 마크업·타이머, `src/app/globals.css`(sync-globals), `public/intro/book-cover.png` `public/intro/page.png`(빈티지 질감 에셋), `package.json`에 `playwright-core` devDependency. localhost:3000에서 Playwright 프레임으로 조립본과 같은 동작 확인, tsc · eslint 통과.

2026-09-06 21:28:32 · develop · 92801be · 진입 장면 손질(디자인 논의 T32): 붉은 가죽 표지, 두께 있는 두 뭉치, 뒤집힌 종이 뒷면, 표제·이름·통로 사본으로 끊김 없는 이어짐. `src/app/page.tsx` `src/app/globals.css` `public/intro/{book-cover,page-edges,couple-back}.png`.

2026-09-06 21:46:15 · develop · 1f1a819 · Scene1 정지(디자인 논의 T33): 홀 물러남 삭제, 표제를 홀 조각에 찍음, 메뉴 버튼은 걷힘과 함께, 조각 들뜸 0으로. `src/app/page.tsx` `src/app/globals.css`.

2026-09-06 21:53:16 · develop · c708b98 · 진입 장면 전부 삭제(디자인 논의 T34). `src/app/page.tsx` `src/app/layout.tsx` `src/app/globals.css`, `public/intro/` 삭제.

2026-09-06 22:32:11 · develop · c761db5 · 진입 장면 편지봉투(디자인 논의 T36): 확대 → 물러남 → 뚜껑 젖힘 → 커버가 카드로 빠져나옴. `src/app/page.tsx` `src/app/globals.css` `public/intro/{envelope-back,envelope-flap,envelope-flap-inside,wax-seal}.png`. localhost:3000 프레임으로 조립본과 같은 동작 확인, 마지막 프레임 = 커버 정지 화면, tsc · eslint 통과.

2026-09-06 22:48:58 · develop · 635c02d · 진입 장면 손질(디자인 논의 T37): 가운데 맞춤, 봉인은 뚜껑에 붙은 채, 카드 올라오며 봉투 내려감, 넘어가기, 새로고침 시 맨 위. `src/app/page.tsx` `src/app/globals.css`. 여러 화면 폭에서 가운데 확인, 마지막 프레임 = 커버 정지 화면.

2026-09-06 22:52:04 · develop · b1b9138 · 봉인은 뚜껑이 옆면을 지날 때 뚜껑 뒤로 숨음, 면 교체 2.42초(디자인 논의 T38). `src/app/globals.css`.

2026-09-06 22:56:03 · develop · 50afd26 · 봉인 뒷면이 젖혀진 뚜껑 끝 둘레로 보임, 카드는 2.9초부터(디자인 논의 T39). `src/app/page.tsx` `src/app/globals.css` `public/intro/wax-seal-back.png`.

2026-09-06 23:08:04 · develop · a49d92c · 진입 장면 세 층 구조, 줌아웃과 뚜껑 동시, 봉투 흐려짐, 2.6초(디자인 논의 T40). `src/app/page.tsx` `src/app/globals.css`.

2026-09-06 23:13:34 · develop · 8492a14 · 진입 장면 3.9초, 카드 폭 92%, 봉투 아래로 빠져나감, 끝날 때 깜빡임 제거(디자인 논의 T41). `src/app/page.tsx` `src/app/globals.css`.

2026-09-06 23:19:31 · develop · 933743a · 봉투 뒷판·앞판 층, 카드가 앞판 뒤에 끼워져 입구로 보임(디자인 논의 T42). `src/app/page.tsx` `src/app/globals.css` `public/intro/envelope-back.png` `public/intro/envelope-front.png`.

2026-09-06 23:36:16 · develop · 1f24fae · 편지지 1:1, 봉투 폭 108%, 시작 높이 2/3, 확대 없이 봉투가 내려가며 끝, 4.3초(디자인 논의 T43). `src/app/page.tsx` `src/app/globals.css`.

2026-09-06 23:45:32 · develop · 6c00072 · 편지지 연속 상승과 봉투 하강·흐려짐 동시, 봉투 폭 92%, 바닥으로 가림, 넘어가기 맨 위 층, 3.6초(디자인 논의 T44). `src/app/page.tsx` `src/app/globals.css`.

2026-09-06 23:47:37 · develop · 5a0839e · 봉투 열린 뒤 바로 흐려짐, 편지지 올라오며 확대, 3.9초(디자인 논의 T45). `src/app/page.tsx` `src/app/globals.css`.

2026-09-06 23:53:46 · develop · ad321d7 · 편지지 봉투 폭의 55%, 뚜껑 80%부터 조금 올라오고 봉투가 사라진 뒤 화면 전체로 커짐, 4.0초(디자인 논의 T46). `src/app/page.tsx` `src/app/globals.css`.

2026-09-06 23:56:52 · develop · b267628 · 봉투 흐려짐 0.3초, 확대 2.7초부터, 편지지 92%로 복귀, 3.8초(디자인 논의 T47). `src/app/page.tsx` `src/app/globals.css`.

2026-09-07 00:00:26 · develop · a445667 · 봉투 하강 뒤 확대와 함께 0.3초 흐려짐, 4.0초(디자인 논의 T48). `src/app/page.tsx` `src/app/globals.css`.

2026-09-07 00:02:33 · develop · a730c51 · 봉투 하강을 편지지 올라옴과 동시에, 3.7초(디자인 논의 T49). `src/app/page.tsx` `src/app/globals.css`.

2026-09-07 00:15:21 · develop · ce00bc8 · Scene1 글자 크기·굵기·아래 여백 48px, Scene2 레이스 타원 카드로 교체(열린 봉투 그림 삭제, `public/lace/` 추가)(디자인 논의 T50). `src/app/page.tsx` `src/app/globals.css` `public/lace/` `public/scene2/`.

2026-09-07 00:33:39 · develop · eaecfce · Scene2 글 네 줄·크기 둘, Scene3 인사 예시(쪽지 + 회색 원)와 4쪽 자리표시, `public/paper/note.png` 추가(디자인 논의 T51). `src/app/page.tsx` `src/app/globals.css` `public/paper/`.

2026-09-07 00:40:07 · develop · cb68363 · Scene3 화자 자리에 수달·토끼 캐릭터 그림, `public/character/` 추가(디자인 논의 T52). `src/app/page.tsx` `src/app/globals.css` `public/character/`.

2026-09-07 00:46:03 · develop · 48c3f36 · Scene4 Part 1 신랑(사진 종이 + 토끼 메모지 + 컷아웃 스티커), 종이 흰색, 캐릭터 아이콘 36px, `public/scene4/` 추가(디자인 논의 T53). `src/app/page.tsx` `src/app/globals.css` `public/paper/` `public/character/` `public/scene4/`.

2026-09-07 00:50:45 · develop · e3c7f96 · Scene4 사진 종이 절반·가운데, 컷아웃 스티커 144px(디자인 논의 T54). `src/app/globals.css`.

2026-09-07 00:54:36 · develop · edd4fd7 · Scene2 액자 선화(`public/scene2/frame.png`), `public/lace/` 삭제, Scene4 사진 3/4 오른쪽·메모지 겹침(디자인 논의 T55·T56). `src/app/page.tsx` `src/app/globals.css` `public/scene2/` `public/lace/`.

2026-09-07 00:57:06 · develop · 4a75ca4 · Scene2 액자 안 달력 카드(디자인 논의 T57). `src/app/page.tsx` `src/app/globals.css`.
