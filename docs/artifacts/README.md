# artifacts — 살아있는 시안

청첩장 시안의 작업 파일을 둡니다. 정본 텍스트는 `docs/ontology/`에 있고, 여기는 화면으로 보는 것입니다. 규칙 출처는 `docs/dashboard/discussions/2026-09-06--design-mockups.md` 결정 표(접두 "디자인 결정 N")입니다. 새 세션은 이 문서와 그 논의록의 마지막 T-로그를 읽으면 이어갈 수 있습니다.

## 지금 상태 (2026-09-06)

- 완료: 진입 장면(편지봉투) · Scene1 커버(와이어프레임 2쪽) · Scene2 핵심 정보(3쪽) · 떠 있는 바로 가기 메뉴
- 진입 장면(로딩)은 편지봉투입니다(T35 에셋 · T36 장면). 봉투가 확대돼 있다가 물러나고, 뚜껑이 봉인을 단 채 젖혀지고, 커버가 카드로 빠져나오며 화면을 채웁니다. 아래 "진입 장면 (로딩)"
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
| `assets/*.svg` | 질감 에셋의 원본(SVG). 산출 PNG는 쓰는 자리(`public/…`)에 둡니다. 지금은 편지봉투 여섯(`envelope-back` · `envelope-front` · `envelope-flap` · `envelope-flap-inside` · `wax-seal` · `wax-seal-back`, T35~T42)입니다 | 커밋 |
| `../design/scene1/`, `../design/scene2/` | 이산하가 준 원본 이미지 | 제외 (`docs/design/`) |
| `../design/canvas/*.png` | 캔버스용 축소본(PNG 무손실). 아트보드가 파일명으로 참조합니다 | 제외 |
| `src/app/{layout,page}.tsx`, `src/app/globals.css`, `public/intro/`, `public/scene1/`, `public/scene2/` | Next.js 임시 적용(WIW-4). `globals.css`는 조립본에서 생성한 파생물, `page.tsx` 마크업은 조립본과 손으로 맞춥니다 | 커밋 |
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

편지봉투입니다(디자인 논의 T35~T45). 봉투는 뒷판 · 앞판 · 뚜껑 세 장이고, 편지지는 커버(Scene1) 자체를 앞판 뒤에 끼운 것입니다. 봉투가 화면 높이의 2/3로 확대돼 있다가(좌우가 잘림) 물러나 폭이 화면의 92%가 되는 것과 동시에 뚜껑이 봉인을 단 채 위로 180° 젖혀지고(옆면을 지나면 봉인 뒷면이 뚜껑 끝 둘레로 보입니다), 뚜껑이 다 열리면 봉투가 0.5초 동안 흐려져 사라지고, 그 끝자락부터 편지지가 1.2초 동안 올라오며 화면 폭으로 커져 최종 자리에 닿습니다. 3.9초이고 오른쪽 아래 "넘어가기"나 화면 어디를 탭해도 건너뜁니다. 시작할 때 맨 위로 스크롤합니다(새로고침해도). 움직임 줄이기 설정이거나 앵커로 들어오면 재생하지 않습니다. 매번 재생합니다.

| 것 | 자리 |
| --- | --- |
| 시간표 · CSS · 스크립트 | `index.html`의 "0. 진입 장면" 구간(`.intro*`, `@keyframes intro-*`)과 스크립트 앞부분. 배율 `--z0`(높이 = 화면) · `--z1`(전체가 보임)과 배율 `--z0`는 높이 = 화면의 2/3, `--z1`은 폭 92%입니다. 카드 값 `--card-*`는 스크립트가 화면 크기에서 계산해 넣습니다 |
| 에셋 원본 | 봉투는 세 장입니다. `assets/envelope-back.svg`(뒷판, 그냥 네모) · `envelope-front.svg`(앞판. 옆 날개 둘 + 아래 날개, 입구는 투명) · `envelope-flap.svg`(뚜껑, 봉인은 따로) · `envelope-flap-inside.svg`(뚜껑 안쪽) · `wax-seal.svg`(봉인 앞면) · `wax-seal-back.svg`(봉인 뒷면, 어두운 밀랍) |
| 산출 PNG | `public/intro/`. 앞판·뚜껑은 3배(확대 시작 장면에 보임), 뒷판은 1.5배(입구로만 보임), 봉인은 6배로 뽑습니다. 아래 명령 |
| Next.js | `src/app/page.tsx`의 `intro*` 마크업과 첫 `useEffect`. 조립본 스크립트와 같은 계산입니다 |

카드는 커버 자체입니다(사본이 아닙니다). 봉투 안에서는 봉투 폭의 92%(화면의 약 85%)로 있다가 올라오며 1:1이 됩니다. 층이 핵심입니다. 바탕(`.intro`, z 25) < 뒷판(`.intro-layer--back`, z 26) < 카드(z 30) < 앞판(`.intro-layer--front`, z 35) < 뚜껑(`.intro-layer--flap`, z 36) < 넘어가기(고정, z 40). 카드는 앞판 뒤, 뒷판 앞에 끼워져 입구(옆 날개 사이 삼각형)로 보이고(T42), 앞판이 카드를 자연히 가리므로 클립이 필요 없습니다. 카드가 봉투 밑변 아래로 삐져나오는 부분은 앞판 층 안의 바탕색 바닥(`.intro__floor`)이 가리고, 바닥은 봉투와 함께 흐려지므로 봉투가 흐려질 때 카드 아랫부분이 같은 박자로 드러납니다(T44 · T45). 커버에는 transform만 걸립니다. 뚜껑은 옆면(90°)을 지나는 순간 z 28로 내려가 카드 뒤로 갑니다. 뒷판·앞판·뚜껑 층은 같은 확대·흐려짐 애니메이션을 씁니다. 마지막 키프레임은 변환이 없어 커버 정지 화면과 같습니다(프레임 픽셀 비교로 확인). 봉투 상자(600px)는 화면보다 넓을 수 있어 grid 정렬 대신 absolute + 음수 margin으로 가운데를 맞춥니다. 뚜껑은 원근이 있는 봉투 안에서 윗변을 축으로 돌고, 바깥면과 안쪽면 그림을 같은 자리에 겹쳐 90°에서 바꿉니다(3D 두 면을 쓰지 않습니다). 봉인은 뚜껑의 자식이라 함께 젖혀집니다. 앞면은 바깥면 위, 뒷면은 안쪽면 아래에 같은 자리로 두고 90°에서 바꾸므로, 젖혀진 뒤에는 뚜껑 끝보다 큰 봉인의 뒷면이 끝 둘레로 보입니다. 아래 날개와 봉인의 그늘은 PNG에 굽고, 위 날개와 봉투의 그늘은 CSS drop-shadow입니다. Next.js에서 장면이 끝날 때 커버의 층 지정 해제는 봉투 층이 빠지는 렌더와 같은 프레임(useLayoutEffect)에 합니다. 먼저 지우면 바탕이 커버를 덮는 한 프레임이 생겨 깜빡입니다(T41). 확대는 카드가 화면 세로 가운데에 선 상태에서 시작하므로 위 가운데 기준 변환이 곧 가운데 확대입니다. 마지막 키프레임은 변환·클립·필터가 없어 커버 정지 화면과 같습니다(프레임 픽셀 비교로 확인). 봉투 상자(600px)는 화면보다 넓을 수 있어 grid 정렬 대신 absolute + 음수 margin으로 가운데를 맞춥니다. 뚜껑은 원근이 있는 봉투 안에서 윗변을 축으로 돌고, 바깥면과 안쪽면 그림을 같은 자리에 겹쳐 90°에서 바꿉니다(3D 두 면을 쓰지 않습니다). 봉인은 뚜껑의 자식이라 함께 젖혀집니다. 앞면은 바깥면 위, 뒷면은 안쪽면 아래에 같은 자리로 두고 90°에서 바꾸므로, 젖혀진 뒤에는 뚜껑 끝보다 큰 봉인의 뒷면이 끝 둘레로 보입니다. 아래 날개와 봉인의 그늘은 PNG에 굽고, 위 날개와 봉투와 카드의 그늘은 CSS drop-shadow입니다.

```sh
node docs/scripts/render-asset.mjs docs/artifacts/assets/envelope-back.svg public/intro/envelope-back.png 1.5 && python3 docs/scripts/quantize-png.py public/intro/envelope-back.png
node docs/scripts/render-asset.mjs docs/artifacts/assets/envelope-front.svg public/intro/envelope-front.png 3 && python3 docs/scripts/quantize-png.py public/intro/envelope-front.png
node docs/scripts/render-asset.mjs docs/artifacts/assets/envelope-flap.svg public/intro/envelope-flap.png 3 && python3 docs/scripts/quantize-png.py public/intro/envelope-flap.png
node docs/scripts/render-asset.mjs docs/artifacts/assets/envelope-flap-inside.svg public/intro/envelope-flap-inside.png 3 && python3 docs/scripts/quantize-png.py public/intro/envelope-flap-inside.png
node docs/scripts/render-asset.mjs docs/artifacts/assets/wax-seal.svg public/intro/wax-seal.png 6 && python3 docs/scripts/quantize-png.py public/intro/wax-seal.png
node docs/scripts/render-asset.mjs docs/artifacts/assets/wax-seal-back.svg public/intro/wax-seal-back.png 6 && python3 docs/scripts/quantize-png.py public/intro/wax-seal-back.png
```

걷어낸 첫 판(팝업북 · 붉은 가죽 고서)을 다시 볼 때는 커밋 1f1a819의 `docs/artifacts/index.html`과 논의록 T31~T33을 봅니다. 그때 배운 것은 지금 판에도 적용합니다. 3D 컨테이너(`transform-style: preserve-3d`)에는 clip-path · overflow · opacity를 걸지 않습니다(평면화됩니다). 3D 변환 안에서는 CSS mask · SVG mask를 쓰지 않고 그림 파일로 둡니다. 클래스 이름은 페이지 구획(`.block`)과 겹치지 않게 짓습니다. 장면의 마지막 프레임은 커버와 픽셀 단위로 겹치게 하고, 걷힐 때 아무것도 움직이지 않게 합니다.

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
