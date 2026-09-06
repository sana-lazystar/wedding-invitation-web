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
