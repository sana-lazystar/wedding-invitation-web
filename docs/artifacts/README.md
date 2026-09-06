# artifacts — 살아있는 시안

청첩장 시안의 작업 파일을 둡니다. 정본 텍스트는 `docs/ontology/`에 있고, 여기는 화면으로 보는 것입니다. 규칙 출처는 `docs/dashboard/discussions/2026-09-06--design-mockups.md` 결정 표(접두 "디자인 결정 N")입니다. 새 세션은 이 문서와 그 논의록의 마지막 T-로그를 읽으면 이어갈 수 있습니다.

## 지금 상태 (2026-09-06)

- 완료: Scene1 커버(와이어프레임 2쪽) · Scene2 핵심 정보(3쪽) · 팝업북 진입 장면(붉은 가죽 고서, 두께 있는 두 뭉치, 뒤집힌 종이 뒷면, 커버와 끊김 없이 이어짐) · 떠 있는 바로 가기 메뉴
- 다음: Scene3 인사(4쪽). 이 쪽부터 토끼(신부)·수달(신랑) 캐릭터 그림이 필요합니다. 이산하가 재료를 줍니다(Q11)
- 콘셉트: 팝업북. 책은 서양 고서(앤티크)이고 붉은 가죽에 금박입니다. 질감 에셋은 CSS로 흉내 내지 않고 SVG → PNG로 만듭니다(디자인 결정 11, 아래 "질감 에셋 만들기")
- Next.js 임시 적용(WIW-4)은 develop에 커밋돼 있습니다. develop → main PR과 배포는 이산하가 합니다

## 보는 곳

| 것 | 자리 | 갱신 방법 |
| --- | --- | --- |
| 로컬 Next.js (동작 확인의 정본) | http://localhost:3000/ (`npm run dev`) | 코드 저장 시 자동 |
| 조립본 파일 | `docs/artifacts/index.html`을 브라우저에서 파일로 엽니다. 오른쪽 위 글꼴 패널에 "진입 장면 다시" 버튼이 있습니다 | 저장 시 |
| Claude의 검수 | Playwright로 두 곳의 프레임을 찍어 봅니다(스크래치패드, 커밋하지 않음) | 매 수정 |

Artifact 발행은 2026-09-06 T31에 중단했습니다(디자인 결정 11). 캔버스(https://claude.ai/code/artifact/4d3deaa1-1a8a-4818-a815-792618cfea36)와 미리보기(https://claude.ai/code/artifact/566bd2ff-595f-434b-8a0b-e1d06dd7799e)는 그 시점 상태로 동결돼 있고 더 올리지 않습니다. `canvas/`의 작업 파일도 그대로 두되 고치지 않습니다.

## 무엇이 어디에 있는가

| 것 | 자리 | git |
| --- | --- | --- |
| `index.html` | 조립본. URL `/` 미러(디자인 결정 3). CSS·마크업의 정본입니다. 오른쪽 위 글꼴 확인 패널은 확정 후 지웁니다 | 커밋 |
| `canvas/Main.dc.html` | Claude Design 캔버스의 아트보드(동결. 결정 11 뒤로 고치지 않습니다) | 커밋 |
| `canvas/FloatingMenu.dc.html` | 떠 있는 바로 가기 버튼의 열린 상태 | 커밋 |
| `canvas/canvas.json` | 아트보드 배치와 메모 | 커밋 |
| `assets/*.svg` | 질감 에셋의 원본(가죽 표지 `book-cover.svg`, 속지 `page.svg`, 책배 `page-edges.svg`). 필터로 가죽 결·종이 결·얼룩·금박 자국을 냅니다 | 커밋 |
| `../../public/intro/*.png` | 위 SVG를 `docs/scripts/render-asset.mjs`로 뽑고 `quantize-png.py`로 줄인 산출물과, `paper-back.py`가 만든 두 사람 뒷면 `couple-back.png`. 조립본과 Next.js가 같이 씁니다 | 커밋 |
| `../design/scene1/`, `../design/scene2/` | 이산하가 준 원본 이미지 | 제외 (`docs/design/`) |
| `../design/canvas/*.png` | 캔버스용 축소본(PNG 무손실). 아트보드가 파일명으로 참조합니다 | 제외 |
| `src/app/{layout,page}.tsx`, `src/app/globals.css`, `public/scene1/`, `public/scene2/` | Next.js 임시 적용(WIW-4). `globals.css`는 조립본에서 생성한 파생물, `page.tsx` 마크업은 조립본과 손으로 맞춥니다 | 커밋 |
| 조립된 발행 파일 | Claude 세션 스크래치패드 | 커밋하지 않음 |

## 고치는 순서

1. `index.html`을 고칩니다(CSS와 마크업의 정본).
2. `node docs/scripts/sync-globals.mjs`로 `src/app/globals.css`를 다시 만듭니다. 조립본 CSS에는 `-webkit-backdrop-filter` 같은 접두사 중복을 두지 않고(스크립트가 걷어내고 Tailwind 처리기가 붙입니다), 개별 변환 속성 `translate` · `rotate` · `scale`도 쓰지 않습니다(처리기가 떨어뜨립니다. transform 함수로 씁니다. 스크립트가 막습니다). 마크업이 바뀌었으면 `src/app/page.tsx`도 같은 구조로 고칩니다. 이미지 경로만 다릅니다(조립본 `../design/…` · `../../public/…`, Next.js `/…`). `npx tsc --noEmit -p tsconfig.json`과 `npx eslint src/app`을 돌립니다.
3. 로컬 Next.js와 조립본 파일에서 확인합니다. 진입 장면처럼 시간이 있는 것은 Playwright로 프레임을 찍어 봅니다.
4. 논의록에 T-로그를 적고 커밋합니다. `git add`는 경로를 명시합니다.

## 질감 에셋 만들기

빈티지 표지·속지처럼 결과 얼룩이 있는 것은 CSS로 흉내 내지 않습니다(디자인 결정 11). SVG로 그려 PNG로 뽑습니다. 원본은 `assets/`, 산출물은 쓰는 자리(`public/intro/`)에 둡니다.

```sh
node docs/scripts/render-asset.mjs docs/artifacts/assets/book-cover.svg public/intro/book-cover.png 1.5
python3 docs/scripts/quantize-png.py public/intro/book-cover.png
```

SVG 루트에 `width` · `height`(px)가 있어야 합니다. 배율 1.5에 256색이면 표지 48KB, 속지 18KB입니다. 글자는 PNG에 굽지 않고 HTML로 얹습니다(글꼴 결정을 따라가도록).

## 진입 장면 (팝업북)

무대는 커버와 같은 크기(`--W × --H`)이고 바닥선은 커버에서 두 사람의 발 위치(아래 22%)입니다. 책의 종이 면이 바닥선에 놓이고 두 뭉치(표지 판 `--Tc` + 종이 `--Tp`)는 그 아래로 내려갑니다. 앞쪽 반은 책등을 축으로 통째로 젖혀집니다. 조각은 종이 면에 앞면을 대고 접혀 있다가(뒷면 = 종이 결, 두 사람은 `couple-back.png`) 일어섭니다. 홀 조각은 커버 홀 사진의 위 78%를 같은 배율로 담고, 통로(아래 22%)·발밑 그림자·표제·이름의 사본이 무대 안 같은 자리에서 시점이 내려올 때 떠오릅니다. 그래서 걷힐 때 아무것도 움직이지 않습니다(픽셀 비교로 확인. 남는 차이는 홀 사진의 16초 물러남과 메뉴 버튼 떠오름뿐). 순서와 시간은 `index.html`의 진입 장면 주석과 논의록 T31 · T32에 있습니다.

지키는 것. 3D 컨테이너(`transform-style: preserve-3d`)에는 clip-path · overflow · opacity를 걸지 않습니다(평면화됩니다). 3D 변환 안에서는 CSS mask · SVG mask를 쓰지 않고 그림 파일로 둡니다. 클래스 이름은 페이지 구획(`.block`)과 겹치지 않게 짓습니다.

## Artifact 발행 (중단)

결정 11로 중단했습니다. 스크립트 `docs/scripts/inline-artifact.mjs`는 남겨 두지만 쓰지 않습니다. 다시 하게 되면 새 세션에서 같은 링크를 먼저 `read`한 뒤 `url`을 지정해 발행해야 링크가 유지됩니다.

## 이미지 축소

원본은 `docs/design/scene*/`에 있습니다. 색을 바꾸지 않도록 PNG 무손실 축소만 합니다. JPEG로 바꾸지 않습니다(디자인 논의 T24). 파일당 2MB를 넘으면 캔버스가 받지 않습니다.

```sh
sips -s format png -Z 900 원본.PNG --out docs/design/canvas/hall.png
python3 docs/scripts/unmatte.py docs/design/scene1/scene1--married-couple.PNG docs/design/scene1/scene1--married-couple--clean.png
sips -s format png -Z 400 docs/design/scene1/scene1--married-couple--clean.png --out docs/design/canvas/couple.png
sips -s format png -Z 700 docs/design/scene1/scene1--married-couple--clean.png --out public/scene1/couple.png
sips -s format png -Z 720 원본.PNG --out docs/design/canvas/opened-paper.png
```

Next.js에는 원본을 `public/scene*/`로 복사합니다(최적화 전. 발송본은 이미지 파이프라인을 거칩니다).
