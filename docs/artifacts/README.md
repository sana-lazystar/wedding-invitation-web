# artifacts — 살아있는 시안

청첩장 시안의 작업 파일을 둡니다. 정본 텍스트는 `docs/ontology/`에 있고, 여기는 화면으로 보는 것입니다. 규칙 출처는 `docs/dashboard/discussions/2026-09-06--design-mockups.md` 결정 표(접두 "디자인 결정 N")입니다. 새 세션은 이 문서와 그 논의록의 마지막 T-로그를 읽으면 이어갈 수 있습니다.

## 지금 상태 (2026-09-06)

- 완료: Scene1 커버(와이어프레임 2쪽) · Scene2 핵심 정보(3쪽) · 떠 있는 바로 가기 메뉴
- 진입 장면(로딩)은 T34에서 전부 걷어냈고 처음부터 다시 만듭니다. T35부터 편지봉투 에셋(아마 결 종이 · 접힌 날개 · 밀랍 봉인)을 만드는 중이고, 이산하가 마음에 들면 로딩 화면에 씁니다. 걷어낸 판(팝업북 · 붉은 가죽 고서)은 커밋 1f1a819의 조립본과 6d7dc2e의 에셋에 있습니다
- 다음: Scene3 인사(4쪽). 이 쪽부터 토끼(신부)·수달(신랑) 캐릭터 그림이 필요합니다. 이산하가 재료를 줍니다(Q11)
- 콘셉트: 팝업북. 책은 서양 고서(앤티크)이고 붉은 가죽에 금박입니다. 질감 에셋은 CSS로 흉내 내지 않고 SVG → PNG로 만듭니다(디자인 결정 11, 아래 "질감 에셋 만들기")
- Next.js 임시 적용(WIW-4)은 develop에 커밋돼 있습니다. develop → main PR과 배포는 이산하가 합니다

## 보는 곳

| 것 | 자리 | 갱신 방법 |
| --- | --- | --- |
| 로컬 Next.js (동작 확인의 정본) | http://localhost:3000/ (`npm run dev`) | 코드 저장 시 자동 |
| 조립본 파일 | `docs/artifacts/index.html`을 브라우저에서 파일로 엽니다 | 저장 시 |
| Claude의 검수 | Playwright로 두 곳의 프레임을 찍어 봅니다(스크래치패드, 커밋하지 않음) | 매 수정 |

Artifact 발행은 2026-09-06 T31에 중단했습니다(디자인 결정 11). 캔버스(https://claude.ai/code/artifact/4d3deaa1-1a8a-4818-a815-792618cfea36)와 미리보기(https://claude.ai/code/artifact/566bd2ff-595f-434b-8a0b-e1d06dd7799e)는 그 시점 상태로 동결돼 있고 더 올리지 않습니다. `canvas/`의 작업 파일도 그대로 두되 고치지 않습니다.

## 무엇이 어디에 있는가

| 것 | 자리 | git |
| --- | --- | --- |
| `index.html` | 조립본. URL `/` 미러(디자인 결정 3). CSS·마크업의 정본입니다. 오른쪽 위 글꼴 확인 패널은 확정 후 지웁니다 | 커밋 |
| `canvas/Main.dc.html` | Claude Design 캔버스의 아트보드(동결. 결정 11 뒤로 고치지 않습니다) | 커밋 |
| `canvas/FloatingMenu.dc.html` | 떠 있는 바로 가기 버튼의 열린 상태 | 커밋 |
| `canvas/canvas.json` | 아트보드 배치와 메모 | 커밋 |
| `assets/*.svg` | 질감 에셋의 원본(SVG). 산출 PNG는 쓰는 자리(`public/…`)에 둡니다. 지금은 편지봉투 셋(`envelope-back` · `envelope-flap` · `wax-seal`, T35)입니다 | 커밋 |
| `../design/scene1/`, `../design/scene2/` | 이산하가 준 원본 이미지 | 제외 (`docs/design/`) |
| `../design/canvas/*.png` | 캔버스용 축소본(PNG 무손실). 아트보드가 파일명으로 참조합니다 | 제외 |
| `src/app/{layout,page}.tsx`, `src/app/globals.css`, `public/scene1/`, `public/scene2/` | Next.js 임시 적용(WIW-4). `globals.css`는 조립본에서 생성한 파생물, `page.tsx` 마크업은 조립본과 손으로 맞춥니다 | 커밋 |
| 조립된 발행 파일 | Claude 세션 스크래치패드 | 커밋하지 않음 |

## 고치는 순서

1. `index.html`을 고칩니다(CSS와 마크업의 정본).
2. `node docs/scripts/sync-globals.mjs`로 `src/app/globals.css`를 다시 만듭니다. 조립본 CSS에는 `-webkit-backdrop-filter` 같은 접두사 중복을 두지 않고(스크립트가 걷어내고 Tailwind 처리기가 붙입니다), 개별 변환 속성 `translate` · `rotate` · `scale`도 쓰지 않습니다(처리기가 떨어뜨립니다. transform 함수로 씁니다. 스크립트가 막습니다). 마크업이 바뀌었으면 `src/app/page.tsx`도 같은 구조로 고칩니다. 이미지 경로만 다릅니다(조립본 `../design/…` · `../../public/…`, Next.js `/…`). `npx tsc --noEmit -p tsconfig.json`과 `npx eslint src/app`을 돌립니다.
3. 로컬 Next.js와 조립본 파일에서 확인합니다. 시간이 있는 것(애니메이션)은 Playwright로 프레임을 찍어 봅니다.
4. 논의록에 T-로그를 적고 커밋합니다. `git add`는 경로를 명시합니다.

## 질감 에셋 만들기

가죽·종이처럼 결과 얼룩이 있는 것은 CSS로 흉내 내지 않습니다(디자인 결정 11). SVG로 그려 PNG로 뽑습니다. 원본은 `assets/`, 산출물은 쓰는 자리(`public/…`)에 둡니다.

```sh
node docs/scripts/render-asset.mjs docs/artifacts/assets/{이름}.svg public/{자리}/{이름}.png 1.5
python3 docs/scripts/quantize-png.py public/{자리}/{이름}.png
```

SVG 루트에 `width` · `height`(px)가 있어야 합니다. 배율 1.5에 256색이면 손바닥만 한 질감 한 장이 20~80KB입니다. 글자는 PNG에 굽지 않고 HTML로 얹습니다(글꼴 결정을 따라가도록). 앞서 만든 예(붉은 가죽 표지 `book-cover.svg`, 속지 `page.svg`, 책배 `page-edges.svg`)는 커밋 6d7dc2e에 있습니다.

## 진입 장면 (로딩)

T34에서 전부 걷어냈습니다. 처음부터 다시 만듭니다. 걷어낸 판을 다시 볼 때는 커밋 1f1a819의 `docs/artifacts/index.html`(팝업북 · 붉은 가죽 고서 · 두께 있는 두 뭉치 · 뒤집힌 종이 뒷면 · 커버와 끊김 없는 이어짐)과 논의록 T31~T33을 봅니다. 그때 배운 것은 남깁니다. 3D 컨테이너(`transform-style: preserve-3d`)에는 clip-path · overflow · opacity를 걸지 않습니다(평면화됩니다). 3D 변환 안에서는 CSS mask · SVG mask를 쓰지 않고 그림 파일로 둡니다. 클래스 이름은 페이지 구획(`.block`)과 겹치지 않게 짓습니다. 장면의 마지막 프레임은 커버와 픽셀 단위로 겹치게 하고, 걷힐 때 아무것도 움직이지 않게 합니다.

편지봉투 에셋(T35). 600×400 비율의 보통 봉투를 세 장으로 나눠 그립니다. 뒷면 `envelope-back.svg`(옆 날개 두 장과 접혀 올라온 아래 날개), 위 날개 `envelope-flap.svg`(600×236, 뒷면의 (0,0)에 얹습니다), 밀랍 봉인 `wax-seal.svg`(140×140, 봉투의 (300,205)에 가운데를 맞춥니다). 따로 뽑는 이유는 날개만 들어 올리거나 봉인만 떼는 움직임을 만들기 위해서입니다. 아래 날개와 봉인의 그늘은 PNG에 굽고, 위 날개의 그늘은 CSS drop-shadow로 얹습니다(들릴 때 따라 움직이도록). 봉인의 글자는 도장 자국이라 PNG에 굽습니다. 산출물은 `public/intro/`에 두고, 확인은 `public/intro/preview.html`(임시, 커밋하지 않음)을 http://localhost:3000/intro/preview.html 로 엽니다.

```sh
node docs/scripts/render-asset.mjs docs/artifacts/assets/envelope-back.svg public/intro/envelope-back.png 1.5 && python3 docs/scripts/quantize-png.py public/intro/envelope-back.png
node docs/scripts/render-asset.mjs docs/artifacts/assets/envelope-flap.svg public/intro/envelope-flap.png 1.5 && python3 docs/scripts/quantize-png.py public/intro/envelope-flap.png
node docs/scripts/render-asset.mjs docs/artifacts/assets/wax-seal.svg public/intro/wax-seal.png 3 && python3 docs/scripts/quantize-png.py public/intro/wax-seal.png
```

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
