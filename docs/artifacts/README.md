# artifacts — 살아있는 시안

청첩장 시안의 작업 파일을 둡니다. 정본 텍스트는 `docs/ontology/`에 있고, 여기는 화면으로 보는 것입니다. 규칙 출처는 `docs/dashboard/discussions/2026-09-06--design-mockups.md` 결정 표(접두 "디자인 결정 N")입니다. 새 세션은 이 문서와 그 논의록의 마지막 T-로그를 읽으면 이어갈 수 있습니다.

## 지금 상태 (2026-09-07)

- 완료: 진입 장면(편지봉투) · Scene1 커버(와이어프레임 2쪽) · Scene2 핵심 정보(3쪽, 레이스 타원 카드) · 떠 있는 바로 가기 메뉴
- Scene3 인사(4쪽)는 쪽지 두 장에 수달(신랑) · 토끼(신부) 스티커 캐릭터가 걸칩니다(T51 예시 · T52 캐릭터). 4쪽(Part 1 신랑)은 사진 종이 자리표시만 있습니다. 아래 "인사 (쪽지)"
- 진입 장면(로딩)은 편지봉투입니다(T35 에셋 · T36~T49 장면). 봉투가 확대돼 있다가 물러나고, 뚜껑이 봉인을 단 채 젖혀지고, 커버가 카드로 빠져나오며 화면을 채웁니다. 아래 "진입 장면 (로딩)"
- 핵심 정보(Scene2)는 레이스 프릴을 두른 타원 카드입니다(T50). 그림 세 장을 겹치고 글은 HTML로 얹습니다. 아래 "핵심 정보 (레이스 타원 카드)"
- 다음: 이산하의 Scene3 판정, 그다음 4쪽(Part 1 신랑. 어릴 적 사진 + 토끼 메모지). 캐릭터 원본은 `../design/character/`에 기본 표정 둘과 다른 포즈 아홉(수달 1~3, 토끼 1~5, 둘이 허그)이 있습니다(T52)
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
| `assets/*.svg` | 질감 에셋의 원본(SVG). 산출 PNG는 쓰는 자리(`public/…`)에 둡니다. 편지봉투 여섯(`envelope-back` · `envelope-front` · `envelope-flap` · `envelope-flap-inside` · `wax-seal` · `wax-seal-back`, T35~T42)과 레이스 셋(`lace-frill` · `oval-card` · `fleuron`, 이산하가 다른 세션에서 만듦, T50), 쪽지 종이(`note-paper`, T51)입니다 | 커밋 |
| `../design/scene1/`, `../design/scene2/`, `../design/character/` | 이산하가 준 원본 이미지. 캐릭터는 스티커(흰 테두리 포함) PNG이고 `*--clean.png`는 가장자리 색 번짐을 지운 것 | 제외 (`docs/design/`) |
| `../design/canvas/*.png` | 캔버스용 축소본(PNG 무손실). 아트보드가 파일명으로 참조합니다 | 제외 |
| `src/app/{layout,page}.tsx`, `src/app/globals.css`, `public/intro/`, `public/scene1/`, `public/lace/`, `public/paper/`, `public/character/` | Next.js 임시 적용(WIW-4). `globals.css`는 조립본에서 생성한 파생물, `page.tsx` 마크업은 조립본과 손으로 맞춥니다 | 커밋 |
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

편지봉투입니다(디자인 논의 T35~T49). 봉투는 뒷판 · 앞판 · 뚜껑 세 장이고, 편지지는 커버(Scene1) 자체를 앞판 뒤에 끼운 것입니다. 봉투가 화면 높이의 2/3로 확대돼 있다가(좌우가 잘림) 물러나 폭이 화면의 92%가 되는 것과 동시에 뚜껑이 봉인을 단 채 위로 180° 젖혀지고(옆면을 지나면 봉인 뒷면이 뚜껑 끝 둘레로 보입니다), 뚜껑이 80% 열렸을 때부터 0.9초 동안 편지지가 제 높이의 35%만큼 올라오는 것과 동시에 봉투가 아래로 내려가 편지지가 거의 다 보이며, 이어서 편지지가 1.1초 동안 화면 전체로 커지는 시작에 봉투가 0.3초 동안 흐려져 사라져 Scene1이 됩니다. 3.7초이고 오른쪽 아래 "넘어가기"나 화면 어디를 탭해도 건너뜁니다. 시작할 때 맨 위로 스크롤합니다(새로고침해도). 움직임 줄이기 설정이거나 앵커로 들어오면 재생하지 않습니다. 매번 재생합니다.

| 것 | 자리 |
| --- | --- |
| 시간표 · CSS · 스크립트 | `index.html`의 "0. 진입 장면" 구간(`.intro*`, `@keyframes intro-*`)과 스크립트 앞부분. 배율 `--z0`는 높이 = 화면의 2/3, `--z1`은 폭 92%입니다. 봉투 하강 `--drop1` · 카드 값 `--card-*`는 스크립트가 화면 크기에서 계산해 넣습니다 |
| 에셋 원본 | 봉투는 세 장입니다. `assets/envelope-back.svg`(뒷판, 그냥 네모) · `envelope-front.svg`(앞판. 옆 날개 둘 + 아래 날개, 입구는 투명) · `envelope-flap.svg`(뚜껑, 봉인은 따로) · `envelope-flap-inside.svg`(뚜껑 안쪽) · `wax-seal.svg`(봉인 앞면) · `wax-seal-back.svg`(봉인 뒷면, 어두운 밀랍) |
| 산출 PNG | `public/intro/`. 앞판·뚜껑은 3배(확대 시작 장면에 보임), 뒷판은 1.5배(입구로만 보임), 봉인은 6배로 뽑습니다. 아래 명령 |
| Next.js | `src/app/page.tsx`의 `intro*` 마크업과 첫 `useEffect`. 조립본 스크립트와 같은 계산입니다 |

카드는 커버 자체입니다(사본이 아닙니다). 봉투 안에서는 봉투 폭의 92%로 있다가 제 높이의 35%만큼 먼저 올라오고, 봉투가 사라진 뒤 화면 전체로 커집니다. 먼저 올라오는 양이 중요합니다. 올라오기 전에 봉투가 사라지면 세로 화면 비율 때문에 아랫변이 화면 밖에 있어 벽처럼 보이고, 확장이 아니라 밀려 올라가는 것으로 보입니다(T46 · T47). 층이 핵심입니다. 바탕(`.intro`, z 25) < 뒷판(`.intro-layer--back`, z 26) < 카드(z 30) < 앞판(`.intro-layer--front`, z 35) < 뚜껑(`.intro-layer--flap`, z 36) < 넘어가기(고정, z 40). 카드는 앞판 뒤, 뒷판 앞에 끼워져 입구(옆 날개 사이 삼각형)로 보이고(T42), 앞판이 카드를 자연히 가리므로 클립이 필요 없습니다. 카드가 봉투 밑변 아래로 삐져나오는 부분은 앞판 층 안의 바탕색 바닥(`.intro__floor`)이 가리고, 바닥은 봉투와 함께 내려가고 흐려지므로 봉투가 내려갈 때는 윗변을 따라, 흐려질 때는 같은 박자로 카드가 드러납니다(T44 · T48). 커버에는 transform만 걸립니다. 뚜껑은 옆면(90°)을 지나는 순간 z 28로 내려가 카드 뒤로 갑니다. 뒷판·앞판·뚜껑 층은 같은 확대·하강·흐려짐 애니메이션을 씁니다. Next.js에서 장면이 끝날 때 커버의 층 지정 해제는 봉투 층이 빠지는 렌더와 같은 프레임(useLayoutEffect)에 합니다. 먼저 지우면 바탕이 커버를 덮는 한 프레임이 생겨 깜빡입니다(T41). 확대는 카드가 화면 세로 가운데에 선 상태에서 시작하므로 위 가운데 기준 변환이 곧 가운데 확대입니다. 마지막 키프레임은 변환·클립·필터가 없어 커버 정지 화면과 같습니다(프레임 픽셀 비교로 확인). 봉투 상자(600px)는 화면보다 넓을 수 있어 grid 정렬 대신 absolute + 음수 margin으로 가운데를 맞춥니다. 뚜껑은 원근이 있는 봉투 안에서 윗변을 축으로 돌고, 바깥면과 안쪽면 그림을 같은 자리에 겹쳐 90°에서 바꿉니다(3D 두 면을 쓰지 않습니다). 봉인은 뚜껑의 자식이라 함께 젖혀집니다. 앞면은 바깥면 위, 뒷면은 안쪽면 아래에 같은 자리로 두고 90°에서 바꾸므로, 젖혀진 뒤에는 뚜껑 끝보다 큰 봉인의 뒷면이 끝 둘레로 보입니다. 아래 날개와 봉인의 그늘은 PNG에 굽고, 위 날개와 봉투와 카드의 그늘은 CSS drop-shadow입니다.

```sh
node docs/scripts/render-asset.mjs docs/artifacts/assets/envelope-back.svg public/intro/envelope-back.png 1.5 && python3 docs/scripts/quantize-png.py public/intro/envelope-back.png
node docs/scripts/render-asset.mjs docs/artifacts/assets/envelope-front.svg public/intro/envelope-front.png 3 && python3 docs/scripts/quantize-png.py public/intro/envelope-front.png
node docs/scripts/render-asset.mjs docs/artifacts/assets/envelope-flap.svg public/intro/envelope-flap.png 3 && python3 docs/scripts/quantize-png.py public/intro/envelope-flap.png
node docs/scripts/render-asset.mjs docs/artifacts/assets/envelope-flap-inside.svg public/intro/envelope-flap-inside.png 3 && python3 docs/scripts/quantize-png.py public/intro/envelope-flap-inside.png
node docs/scripts/render-asset.mjs docs/artifacts/assets/wax-seal.svg public/intro/wax-seal.png 6 && python3 docs/scripts/quantize-png.py public/intro/wax-seal.png
node docs/scripts/render-asset.mjs docs/artifacts/assets/wax-seal-back.svg public/intro/wax-seal-back.png 6 && python3 docs/scripts/quantize-png.py public/intro/wax-seal-back.png
```

걷어낸 첫 판(팝업북 · 붉은 가죽 고서)을 다시 볼 때는 커밋 1f1a819의 `docs/artifacts/index.html`과 논의록 T31~T33을 봅니다. 그때 배운 것은 지금 판에도 적용합니다. 3D 컨테이너(`transform-style: preserve-3d`)에는 clip-path · overflow · opacity를 걸지 않습니다(평면화됩니다). 3D 변환 안에서는 CSS mask · SVG mask를 쓰지 않고 그림 파일로 둡니다. 클래스 이름은 페이지 구획(`.block`)과 겹치지 않게 짓습니다. 장면의 마지막 프레임은 커버와 픽셀 단위로 겹치게 하고, 걷힐 때 아무것도 움직이지 않게 합니다.

## 핵심 정보 (레이스 타원 카드)

Scene2입니다(디자인 논의 T50). 이산하가 다른 세션에서 만든 그림 세 장을 같은 상자에 겹칩니다. 셋 다 840×1110 화폭이라 같은 자리에 놓으면 맞습니다. 글은 PNG에 굽지 않고 HTML로 얹습니다.

| 것 | 자리 |
| --- | --- |
| CSS · 마크업 | `index.html`의 "2. 핵심 정보" 구간(`.lace*`). 판(`.lace`)은 좌우 12px 여백 안에서 폭을 다 쓰고 화면 높이에도 맞춥니다. 글 상자는 안쪽 인쇄 테두리(가로 28~72%, 세로 22.6~77.4%) 안에 세로 가운데로 쌓습니다 |
| 에셋 원본 | `assets/lace-frill.svg`(프릴. `docs/scripts/gen-lace-frill.py`가 만듭니다. 손으로 고치지 않습니다) · `assets/oval-card.svg`(타원 카드. 결 있는 종이 + 인쇄 테두리 두 겹) · `assets/fleuron.svg`(이름·날짜 위아래 장식) |
| 산출 PNG | `public/lace/frill.png`(1.6배) · `card.png`(2배) · `fleuron.png`(3배). 아래 명령. `public/lace/preview.html`은 이산하의 확인용 조합 예시이고 커밋하지 않습니다 |
| Next.js | `src/app/page.tsx`의 `.lace` 마크업. 경로만 `/lace/…`입니다 |

글은 네 줄, 크기는 둘입니다(T51). 큰 글자(4.6cqw, 700) "2026년 10월 9일" · "금요일 오후 6시 30분", 한 줄 띄고 작은 글자(3.5cqw) "더채플앳청담 3층 커티지홀" · "강남구 선릉로 757". 장식(플러런·선)은 없습니다. 크기를 판 폭(cqw)으로 잡는 이유는 타원 안쪽 폭이 판 폭에 비례하기 때문입니다. 가장 넓은 곳이 판 폭의 44%(390px 화면에서 161px)이고 가장 긴 줄이 12em이라 작은 글자는 3.5cqw(390px에서 12.8px)까지입니다. 390px에서 큰 글자는 16.8px입니다.

```sh
python3 docs/scripts/gen-lace-frill.py
node docs/scripts/render-asset.mjs docs/artifacts/assets/lace-frill.svg public/lace/frill.png 1.6 && python3 docs/scripts/quantize-png.py public/lace/frill.png
node docs/scripts/render-asset.mjs docs/artifacts/assets/oval-card.svg public/lace/card.png 2 && python3 docs/scripts/quantize-png.py public/lace/card.png
node docs/scripts/render-asset.mjs docs/artifacts/assets/fleuron.svg public/lace/fleuron.png 3 && python3 docs/scripts/quantize-png.py public/lace/fleuron.png
```

## 인사 (쪽지)

Scene3입니다(디자인 논의 T50 제안 · T51 예시 · T52 캐릭터). 말풍선 대신 쪽지입니다. 한 줄 인사를 종이 쪽지에 쓰고, 화자 캐릭터가 쪽지의 위 모서리 하나에 스티커(흰 테두리는 그림에 있고 그늘은 CSS)로 걸칩니다. 신랑(수달) 쪽지는 오른쪽 정렬에 오른쪽 위 모서리, 신부(토끼) 쪽지는 왼쪽 정렬에 왼쪽 위 모서리입니다. 캐릭터(`.note__who`)는 높이 72px이고 쪽지 위로 54px 올라가 아래가 쪽지 안 18px까지 옵니다. 첫 줄은 위 여백 22px 아래라 겹치지 않습니다. 붙인 스티커처럼 6° · -5° 기울입니다. 쪽지는 화면에 들어올 때 한 번 8px 내려앉으며 나타납니다(0.45초, IntersectionObserver). 움직임 줄이기면 바로 보입니다. 블록 높이는 약 0.3화면(390×844에서 233px)이라 다음 블록의 사진 종이가 같은 화면에 걸쳐 보입니다. 그것을 확인하려고 4쪽 자리표시(`#part1-groom`, 사진 종이 한 장)를 두었고 4쪽을 만들 때 걷어냅니다.

| 것 | 자리 |
| --- | --- |
| CSS · 마크업 | `index.html`의 "3. 인사" 구간(`.greeting` · `.note*` · `.story` · `.photo-paper`)과 스크립트의 쪽지 등장 부분 |
| 에셋 원본 | `assets/note-paper.svg`(결 있는 종이 + 얼룩. 720×480. 그늘·모서리는 CSS). 캐릭터는 `../design/character/0_수달_기본.png` · `0_토끼_기본.png`(이산하, T52) |
| 산출 PNG | `public/paper/note.png`(1배, 214KB). 쪽지마다 `object-fit: cover`로 깔리므로 크기가 달라도 결이 늘어나지 않습니다. 4~8쪽의 메모지도 같은 그림을 씁니다. 캐릭터는 `public/character/otter-basic.png` · `rabbit-basic.png`(높이 240px, 69KB · 58KB. 아래 "이미지 축소") |
| Next.js | `src/app/page.tsx`의 `#greeting` · `#part1-groom` 마크업과 쪽지 등장 `useEffect` |

```sh
node docs/scripts/render-asset.mjs docs/artifacts/assets/note-paper.svg public/paper/note.png 1 && python3 docs/scripts/quantize-png.py public/paper/note.png
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
python3 docs/scripts/unmatte.py "docs/design/character/0_수달_기본.png" docs/design/character/otter-basic--clean.png
sips -s format png -Z 240 docs/design/character/otter-basic--clean.png --out public/character/otter-basic.png
```

캐릭터 스티커도 두 사람 컷아웃처럼 반투명 가장자리에 자홍색 번짐이 있어 `unmatte.py`를 먼저 거칩니다(T52). 화면에서 72px 높이로 쓰므로 240px이면 3배 화면까지 충분합니다. 토끼(`0_토끼_기본.png` → `rabbit-basic`)도 같은 두 줄입니다.

Next.js에는 원본을 `public/scene*/`로 복사합니다(최적화 전. 발송본은 이미지 파이프라인을 거칩니다). 열린 봉투 일러스트(`scene2--opened-paper.png`)는 T50에서 레이스 타원 카드로 바뀌어 더 쓰지 않습니다. 원본은 `docs/design/scene2/`에 그대로 있습니다.
