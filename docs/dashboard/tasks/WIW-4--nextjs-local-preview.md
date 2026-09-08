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

2026-09-07 01:01:41 · develop · c9ed65a · Scene5 Part 1 신부(Scene4 대칭), Scene2 달력 삭제, `public/scene5/` 추가(디자인 논의 T58). `src/app/page.tsx` `src/app/globals.css` `public/scene5/`.

2026-09-07 01:03:38 · develop · 2303c7b · Scene1 두 사람 컷아웃·그늘 2px 왼쪽으로(디자인 논의 T59). `src/app/globals.css`.

2026-09-07 01:06:45 · develop · 2ce40c9 · Scene5 본문 24px 오른쪽, 신부 컷아웃 216px(디자인 논의 T60). `src/app/page.tsx` `src/app/globals.css`.

2026-09-07 01:12:01 · develop · fb7b621 · 메모지 글 크기만큼, 컷아웃 float + shape-outside(디자인 논의 T61). `src/app/page.tsx` `src/app/globals.css`.

2026-09-07 01:14:30 · develop · 1d7f8c0 · 컷아웃 네모 영역으로 글 비킴(빈 float + clear), 신랑 컷아웃 오른쪽 아래·신부 컷아웃 왼쪽 10px(디자인 논의 T62). `src/app/page.tsx` `src/app/globals.css`.

2026-09-07 01:18:00 · develop · 99cdfd0 · 캐릭터 아이콘 43px, 4px 아래로(디자인 논의 T63). `src/app/globals.css`.

2026-09-07 01:22:49 · develop · 75f718a · 메모지 글꼴 개구(next/font Gaegu · `--font-memo`), 쪽지 폭 글만큼(디자인 논의 T64). `src/app/layout.tsx` `src/app/globals.css`. 이 커밋부터 develop. T50~T63 커밋은 main에 직접 쌓였다가 a9b1fbe로 develop에 병합됨.

2026-09-07 01:27:52 · develop · 1ba6be3 · Scene6~8 Part 2·3(메모지 + 사진 자리표시), 캐릭터 여덟 장 추가(디자인 논의 T65). `src/app/page.tsx` `src/app/globals.css` `public/character/`.

2026-09-07 01:31:46 · develop · 0f2487c · 커버 글 상자 합성 층 승격(iOS 진입 장면 중 글 사라짐)(디자인 논의 T66). `src/app/globals.css`.

2026-09-07 01:36:11 · develop · 07eecea · 컷아웃 음수 여백 제거(마지막 줄 가림), 장면 간격 통일, Scene6·7 둘째 아이콘 반대쪽(디자인 논의 T67~T69). `src/app/page.tsx` `src/app/globals.css`.

2026-09-07 01:41:00 · develop · c903c85 · favicon · 앱 아이콘 · 매니페스트 · 테마색(디자인 논의 T70). `src/app/layout.tsx` `src/app/manifest.ts` `src/app/{favicon.ico,icon1~4.png,apple-icon.png}` `public/{android-icon,ms-icon}-*.png` `public/browserconfig.xml`.

2026-09-07 01:43:00 · develop · 1f1df85 · 페이지 제목·설명 변경(이산하 편집, 디자인 논의 T71). `src/app/layout.tsx`.

2026-09-07 01:57:46 · develop · b33459e · 100svh, 진입 장면 크기 변화 재계산, img 크기 속성(디자인 논의 T72). `src/app/page.tsx` `src/app/globals.css`.

2026-09-07 02:03:00 · develop · ce5c601 · Scene6 관찰 아이콘 왼쪽·독백 아이콘 오른쪽(사진 종이 가림)(디자인 논의 T73). `src/app/page.tsx` `src/app/globals.css`.

2026-09-07 02:05:53 · develop · 87a1a52 · Scene1 두 사람 컷아웃 새 원본으로 교체(디자인 논의 T74). `public/scene1/couple.png`.

2026-09-07 02:15:22 · develop · 369e2d1 · 커버 그림 폭 기준 고정 크기 무대, 흐림 띠 커버 기준(디자인 논의 T75). `src/app/page.tsx` `src/app/globals.css`.

2026-09-08 15:26:27 · develop · 64563b7 · 진입 장면 뚜껑·봉투 그림자(광원 우측 상단 45°) · 물러난 뒤 0.3초 멈춤(디자인 논의 T76). `src/app/page.tsx` `src/app/globals.css`.

2026-09-08 15:59:53 · develop · 48f4ef4 · 진입 장면 봉투를 레이스 봉투로 대체(디자인 논의 T77~T82). `public/intro/*.png` `src/app/page.tsx` `src/app/globals.css`.

2026-09-08 16:15:32 · develop · fd966d6 · 확대 막기 · 커버 높이 고정 · Scene2 올리브 가지 · 두 사람 컷아웃 · Scene4 사진 · 웨딩 사진 셋(디자인 논의 T83). `src/app/layout.tsx` `src/app/page.tsx` `src/app/globals.css` `public/scene1/couple.png` `public/scene2/branch.png` `public/scene4/groom-child.jpg` `public/scene6/groom.jpg` `public/scene7/bride.jpg` `public/scene8/couple.jpg`.

2026-09-08 16:17:00 · develop · 71d701d · Scene2 바탕을 흰 종이로(디자인 논의 T84). `src/app/page.tsx` `src/app/globals.css`.

2026-09-08 16:18:02 · develop · cae2cc5 · Scene2 가지 하나 · 간격 21px · 날짜 글자 18px 짙은 갈색(디자인 논의 T85). `src/app/page.tsx` `src/app/globals.css`.

2026-09-08 16:22:48 · develop · 59aca06 · Scene2 전용 흰 종이 결 · 높이 295px(디자인 논의 T86). `public/paper/info.jpg` `src/app/page.tsx` `src/app/globals.css`.

2026-09-08 16:46:37 · develop · 23b0420 · 메모지 높이는 글 기준 · 컷아웃 걸침 · 사진 위 아이콘 틀 · 4/5 폭 · 장면 간격 1.5배(디자인 논의 T87). `src/app/page.tsx` `src/app/globals.css`.

2026-09-08 16:55:07 · develop · cc3572d · Scene4 · 5 첫 메모지 줄바꿈 지정 · 컷아웃 셀을 글 아래로(디자인 논의 T88). `src/app/page.tsx` `src/app/globals.css`.

2026-09-08 17:04:01 · develop · 33ea4a9 · Scene4 · 5 메모지를 글 높이로 · 컷아웃 1.5배 · 신부 글은 컷아웃 옆 열(디자인 논의 T89). `src/app/page.tsx` `src/app/globals.css`.

2026-09-08 17:07:08 · develop · 9fb07d6 · 컷아웃 가로 눌림 해제 · Scene7 신부 사진 교체(디자인 논의 T90). `public/scene7/bride.jpg` `src/app/page.tsx` `src/app/globals.css`.
