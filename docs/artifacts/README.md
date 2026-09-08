# artifacts — 살아있는 시안

청첩장 시안의 작업 파일을 둡니다. 정본 텍스트는 `docs/ontology/`에 있고, 여기는 화면으로 보는 것입니다. 규칙 출처는 `docs/dashboard/discussions/2026-09-06--design-mockups.md` 결정 표(접두 "디자인 결정 N")입니다. 새 세션은 이 문서와 그 논의록의 마지막 T-로그를 읽으면 이어갈 수 있습니다.

## 지금 상태 (2026-09-07)

- 완료: 진입 장면(편지봉투) · Scene1 커버(와이어프레임 2쪽) · Scene2 핵심 정보(3쪽, 올리브 가지) · 떠 있는 바로 가기 메뉴
- Scene3 인사(4쪽)는 쪽지 두 장에 수달(신랑) · 토끼(신부) 스티커 캐릭터가 걸칩니다(T51 예시 · T52 캐릭터). Scene4 Part 1 신랑(5쪽)은 어릴 적 사진 종이와 토끼 메모지입니다(T53). Scene5 Part 1 신부(6쪽)는 그 좌우 대칭입니다(T58). Scene6 Part 2 신랑(7쪽) · Scene7 Part 2 신부(8쪽) · Scene8 Part 3(9쪽)은 메모지까지 붙였고 웨딩 사진 셋은 빈 종이 자리표시입니다(T65). 종이는 흰색이고 캐릭터 아이콘은 43px입니다. 아래 "인사·이야기 (쪽지·메모지)"
- 진입 장면(로딩)은 레이스 편지봉투입니다(T35 에셋 · T36~T49 장면 · T76 그림자·멈춤 · T77~T82 레이스 봉투). 봉투가 확대돼 있다가 물러나 잠깐 멈추고, 뚜껑이 봉인을 단 채 그림자를 드리우며 젖혀지고, 커버가 카드로 빠져나오며 화면을 채웁니다. 아래 "진입 장면 (로딩)"
- 핵심 정보(Scene2)는 이산하가 준 올리브 가지 그림을 글 위아래에 둔 것입니다(T83. 액자는 T55~T82). 아래 "핵심 정보 (올리브 가지)"
- 다음: Scene9 초대(10쪽, 편지지). 웨딩 사진 셋(신랑 · 신부 · 함께 있는 컷)은 T83에 Scene6~8에 들어갔습니다. 캐릭터 원본은 `../design/character/`에 기본 표정 둘과 다른 포즈 아홉(수달 1~3, 토끼 1~5, 둘이 허그)이 있습니다(T52)
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
| `assets/*.svg` | 질감 에셋의 원본(SVG). 산출 PNG는 쓰는 자리(`public/…`)에 둡니다. 편지봉투 여섯(`lace-envelope-back` · `lace-envelope-front` · `lace-envelope-flap` · `lace-envelope-flap-inside` · `lace-rose-seal` · `lace-rose-seal-back`, T77~T82)과 쪽지 종이(`note-paper`, T51) · 핵심 정보 종이(`info-paper`, T86)입니다. 이전 아마 짜임 봉투(`envelope-*` · `wax-seal*`, T35~T42)는 T82에 지웠고 마지막 모습은 커밋 9929650에 있습니다. 레이스 셋(`lace-frill` · `oval-card` · `fleuron`, 이산하가 다른 세션에서 만듦, T50)은 T55에서 액자로 바뀌어 쓰지 않습니다 | 커밋 |
| `../design/scene1/`, `../design/scene2/`, `../design/scene4/`, `../design/scene5/`, `../design/character/` | 이산하가 준 원본 이미지. 캐릭터는 스티커(흰 테두리 포함) PNG이고 `*--clean.png`는 가장자리 색 번짐을 지운 것 | 제외 (`docs/design/`) |
| `../design/canvas/*.png` | 캔버스용 축소본(PNG 무손실). 아트보드가 파일명으로 참조합니다 | 제외 |
| `src/app/{layout,page}.tsx`, `src/app/globals.css`, `public/intro/`, `public/scene1/`, `public/scene2/`, `public/paper/`, `public/character/`, `public/scene4/`, `public/scene5/` | Next.js 임시 적용(WIW-4). `globals.css`는 조립본에서 생성한 파생물, `page.tsx` 마크업은 조립본과 손으로 맞춥니다 | 커밋 |
| 조립된 발행 파일 | Claude 세션 스크래치패드 | 커밋하지 않음 |
| `src/app/favicon.ico` · `icon1~4.png` · `apple-icon.png` · `manifest.ts`, `public/android-icon-*.png` · `ms-icon-*.png` · `browserconfig.xml` | 사이트 아이콘(T70). 이산하가 생성기로 만든 묶음이고 원본 전체는 `../design/favicon/`(git 제외). Next.js 파일 규약(favicon · icon · apple-icon · manifest)이 `<head>`를 만들고, 타일색·테마색은 `layout.tsx`에 있습니다. 조립본에는 넣지 않습니다 | 커밋 |

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

편지봉투입니다(디자인 논의 T35~T49, 레이스 봉투는 T77~T82). 봉투는 뒷판 · 앞판 · 뚜껑 세 장이고, 편지지는 커버(Scene1) 자체를 앞판 뒤에 끼운 것입니다. 봉투가 화면 높이의 2/3로 확대돼 있다가(좌우가 잘림) 물러나 폭이 화면의 92%가 된 뒤 0.3초 멈추고(T76), 뚜껑이 봉인을 단 채 위로 180° 젖혀지고(옆면을 지나면 봉인 뒷면이 뚜껑 끝 둘레로 보입니다), 뚜껑이 80% 열렸을 때부터 0.9초 동안 편지지가 제 높이의 35%만큼 올라오는 것과 동시에 봉투가 아래로 내려가 편지지가 거의 다 보이며, 이어서 편지지가 1.1초 동안 화면 전체로 커지는 시작에 봉투가 0.3초 동안 흐려져 사라져 Scene1이 됩니다. 5.0초이고 오른쪽 아래 "넘어가기"나 화면 어디를 탭해도 건너뜁니다. 시작할 때 맨 위로 스크롤합니다(새로고침해도). 움직임 줄이기 설정이거나 앵커로 들어오면 재생하지 않습니다. 매번 재생합니다.

| 것 | 자리 |
| --- | --- |
| 시간표 · CSS · 스크립트 | `index.html`의 "0. 진입 장면" 구간(`.intro*`, `@keyframes intro-*`)과 스크립트 앞부분. 배율 `--z0`는 높이 = 화면의 2/3, `--z1`은 폭 92%입니다. 봉투 하강 `--drop1` · 카드 값 `--card-*`는 스크립트가 화면 크기에서 계산해 넣고, 장면 중에 화면 크기가 바뀌면(`resize` · `visualViewport`) 다시 계산합니다(T72. 인앱 브라우저가 열린 직후 툴바를 자리 잡으며 높이를 바꾸면 봉투(화면 가운데 고정)와 편지지가 어긋나 편지지가 위로 튀어 보였습니다) |
| 에셋 원본 | 봉투는 세 장입니다. `assets/lace-envelope-back.svg`(뒷판, 그냥 네모) · `lace-envelope-front.svg`(앞판. 옆 날개 둘 + 아래 날개, 입구는 투명) · `lace-envelope-flap.svg`(뚜껑 + 가장자리 레이스, 봉인은 따로. 상자 640×264) · `lace-envelope-flap-inside.svg`(뚜껑 안쪽) · `lace-rose-seal.svg`(장미 봉인 앞면) · `lace-rose-seal-back.svg`(봉인 뒷면, 납작한 밑면). 아래 레이스 봉투 문단 |
| 산출 PNG | `public/intro/`. 앞판·뚜껑은 3배(확대 시작 장면에 보임), 뒷판은 1.5배(입구로만 보임), 봉인은 6배로 뽑고 256색으로 줄입니다(앞판 329KB · 뚜껑 192KB · 안쪽 176KB · 뒷판 41KB · 봉인 29KB · 뒷면 7KB). 아래 명령 |
| Next.js | `src/app/page.tsx`의 `intro*` 마크업과 첫 `useEffect`. 조립본 스크립트와 같은 계산입니다 |

커버의 그림(홀 사진 · 두 사람 · 그늘)은 폭 기준 고정 크기 무대(`.cover-bg`, 폭 106%, 홀 사진 비율, 커버 아랫변에 붙음)에 있습니다(T75). 카카오톡 인앱 브라우저는 주소창이 사라질 때 창 높이 자체가 바뀌어 `svh`까지 변하므로, 높이 기준이면 그림이 늘었다 줄었다 합니다. 폭 기준이면 크기는 그대로이고 위쪽 커튼이 더 잘리거나 덜 잘릴 뿐입니다. 상단 흐림 띠는 글 자리(커버) 기준이라 무대 밖 형제입니다. 두 사람 값(높이 25.9% · 아래 21.1%)은 390×844에서 전(높이 기준 27% · 22%)과 같은 크기·자리가 되도록 환산한 것입니다.

커버 높이는 처음 잰 화면 높이를 px로 박은 `--vh-fixed`입니다(T83, 스크립트 `fixVh`). 카카오톡 인앱 브라우저는 주소창이 사라질 때 창 높이 자체가 바뀌어 `svh`(T72)까지 변하므로 스크롤 중 커버 높이가 변했습니다. 폭이 바뀌면(회전) 다시 재고, 높이만 바뀌는 것은 첫 터치 전(진입 장면 중. 인앱 브라우저가 열린 직후 툴바를 자리 잡는 때)에만 받습니다. 잠그는 시점은 첫 터치 시작(`touchstart` · `wheel` · `keydown` · `pointerdown`)입니다(T100. 처음엔 스크롤 위치가 0보다 커질 때 잠갔는데, 카카오톡은 손가락을 끄는 순간 주소창부터 접어 그 사이에 높이가 다시 재어져 화면에 꽉 찬 크기로 굳었습니다). 핵심 정보는 내용 높이입니다(T83). 확대는 막습니다(T83. 메타 `maximum-scale=1, user-scalable=no`, `html { touch-action: pan-y }`, iOS는 메타를 무시하므로 `gesturestart`와 두 손가락 `touchmove`를 스크립트로 차단). `dvh`를 쓰면 iOS·인앱 브라우저에서 툴바가 접히고 펴질 때 구획 높이가 변해 스크롤 중 아래 내용이 밀립니다(390px에서 툴바 60px이면 120px). 화자 아이콘·컷아웃·사진 `img`에는 원본 크기(`width` · `height`)를 적어 그림이 내려오기 전에도 비율만큼 자리를 잡습니다.

카드는 커버 자체입니다(사본이 아닙니다). 봉투 안에서는 봉투 폭의 92%로 있다가 제 높이의 35%만큼 먼저 올라오고, 봉투가 사라진 뒤 화면 전체로 커집니다. 먼저 올라오는 양이 중요합니다. 올라오기 전에 봉투가 사라지면 세로 화면 비율 때문에 아랫변이 화면 밖에 있어 벽처럼 보이고, 확장이 아니라 밀려 올라가는 것으로 보입니다(T46 · T47). 층이 핵심입니다. 바탕(`.intro`, z 25) < 뒷판(`.intro-layer--back`, z 26) < 카드(z 30) < 앞판(`.intro-layer--front`, z 35) < 뚜껑 그림자(`.intro-layer--cast`, z 35. 앞판 뒤에 있어 그 위) < 뚜껑(`.intro-layer--flap`, z 36) < 넘어가기(고정, z 40). 카드는 앞판 뒤, 뒷판 앞에 끼워져 입구(옆 날개 사이 삼각형)로 보이고(T42), 앞판이 카드를 자연히 가리므로 클립이 필요 없습니다. 카드가 봉투 밑변 아래로 삐져나오는 부분은 앞판 층 안의 바탕색 바닥(`.intro__floor`)이 가리고, 바닥은 봉투와 함께 내려가고 흐려지므로 봉투가 내려갈 때는 윗변을 따라, 흐려질 때는 같은 박자로 카드가 드러납니다(T44 · T48). 커버에는 transform만 걸립니다. 뚜껑은 옆면(90°)을 지나는 순간 z 28로 내려가 카드 뒤로 갑니다. 뚜껑 그림자 층은 125°에 z 27로 내려가 뚜껑 뒤로 갑니다(아래 그림자 문단). 뒷판·앞판·뚜껑 층은 같은 확대·하강·흐려짐 애니메이션을 씁니다. Next.js에서 장면이 끝날 때 커버의 층 지정 해제는 봉투 층이 빠지는 렌더와 같은 프레임(useLayoutEffect)에 합니다. 먼저 지우면 바탕이 커버를 덮는 한 프레임이 생겨 깜빡입니다(T41). 커버의 글 상자 둘(`.cover-head` · `.names`)은 `transform: translateZ(0)` · `will-change`로 제 합성 층에 둡니다(T66). iOS Safari는 커버가 변환 애니메이션 중일 때 흐림 층(backdrop-filter)을 앞으로 올려 위쪽 글을 덮었습니다(폰에서 이산하가 봄. 데스크톱 WebKit·Chrome은 재현 안 됨). 다른 곳에 흐림 층 위 글을 둘 때도 같은 규칙입니다. 확대는 카드가 화면 세로 가운데에 선 상태에서 시작하므로 위 가운데 기준 변환이 곧 가운데 확대입니다. 마지막 키프레임은 변환·클립·필터가 없어 커버 정지 화면과 같습니다(프레임 픽셀 비교로 확인). 봉투 상자(600px)는 화면보다 넓을 수 있어 grid 정렬 대신 absolute + 음수 margin으로 가운데를 맞춥니다. 뚜껑은 원근이 있는 봉투 안에서 윗변을 축으로 돌고, 바깥면과 안쪽면 그림을 같은 자리에 겹쳐 90°에서 바꿉니다(3D 두 면을 쓰지 않습니다). 봉인은 뚜껑의 자식이라 함께 젖혀집니다. 앞면은 바깥면 위, 뒷면은 안쪽면 아래에 같은 자리로 두고 90°에서 바꾸므로, 젖혀진 뒤에는 뚜껑 끝보다 큰 봉인의 뒷면이 끝 둘레로 보입니다. 아래 날개와 봉인의 그늘은 PNG에 굽고, 봉투·앞판·뚜껑·카드의 그림자는 CSS입니다(아래 문단).

광원은 봉투 기준 우측 상단 45°, 높이 45°입니다(T76). 그림자는 왼쪽 아래로 지고, 높이 1당 옆으로 1만큼 밀립니다. 봉투가 탁자에 드리우는 그림자는 앞판 층의 상자 `.intro__table`(봉투 크기, `box-shadow` 왼쪽 아래 13px)입니다. 앞판의 `drop-shadow`로 두면 바닥(`.intro__floor`)이 봉투 아랫변 아래를 덮어 그쪽 그림자가 안 보이므로 바닥 뒤·앞판 앞에 따로 둡니다. 앞판 자체는 카드에 닿는 1.5px 그림자만 둡니다. 뚜껑 그림자는 뚜껑과 봉인 PNG의 어두운 실루엣(`.intro__cast`, 층 `.intro-layer--cast`)입니다. 실루엣이 뚜껑과 같은 곡선·시각으로 `rotateX`하고, 같은 transform 목록 앞의 `matrix3d`가 그 3D 결과를 광원 방향으로 봉투 면에 투영합니다(z를 x로 -0.7071, y로 +0.7071 옮기고 z는 0.001로 눌러 평평하게). 그래서 뚜껑이 설수록 그림자가 왼쪽 아래로 길어지고, 125°에서 선으로 접힌 뒤 윗변 위 탁자로 넘어갑니다. 그림자 층은 앞판 뒤에 있어 앞판·카드 위, 뚜껑 아래에 그려지고, 125°(2.75초)에 z 27로 내려가 젖혀진 뚜껑 뒤로 갑니다. 그 순간 그림자가 선이라 자리 바뀜이 보이지 않습니다. 투영과 회전은 한 요소의 transform 목록에 둡니다. 바깥 요소(`preserve-3d`)에 투영을 두고 안쪽 요소에서 회전하면 WebKit이 투영을 무시해 실루엣이 뚜껑 자리에 그대로 그려집니다(T76 실험. Chromium은 됩니다). 실루엣은 선명한 것(흐림 2.5px)과 흐린 것(10px) 두 벌을 겹쳐, 뚜껑이 높이 설수록 흐린 쪽이 보이도록 불투명도만 움직입니다(합성기에서 처리). 뚜껑은 종이 두께 4px만큼 떠 있어 닫혀 있을 때도 왼쪽 아래로 얇은 그림자가 납니다.

레이스 봉투(T77~T82. T82에 적용). 이산하가 준 참고 이미지(펠트 종이 · 뚜껑 가장자리 레이스 · 작은 장미 봉인)를 SVG 필터로 옮긴 것입니다. 원본은 `assets/lace-envelope-back.svg` · `lace-envelope-front.svg` · `lace-envelope-flap.svg` · `lace-envelope-flap-inside.svg` · `lace-rose-seal.svg` · `lace-rose-seal-back.svg`이고, 기하는 이전 아마 짜임 봉투(T35~T42)와 같습니다. 종이는 펠트 질감(잔 노이즈 + 가는 섬유 + 넓은 구름의 약한 요철에 빛, 옅은 얼룩과 흰 섬유 한 겹)의 밝은 베이지 `#FBF6EC`(질감을 거치면 약 239·234·225. 바탕 `#E9E1D2`보다 밝습니다. 처음엔 그레이지 `#ECE7DF`, T78 오프화이트 `#FAF8F4`, T79 연핑크 `#FBF2F1`을 거쳐 T81에 베이지)이고 빛은 오른쪽 위입니다(T76). 뒷판·안쪽면은 `#F2EBDF`. 레이스 실은 `#FFFDF8`, 장미 밀랍은 `#E8DFCF`로 종이보다 한 단계 밝고 짙습니다. 레이스는 한 칸(34px)에 머리띠(구멍 셋)와 부채꼴(반지름 15. 그물 채움 + 살 + 테두리 두 줄 + 피코) 하나를 그린 `pattern`을 가장자리 각도로 돌린 띠에 채운 것이고, 왼쪽 띠를 좌우 대칭으로 복사해 오른쪽 띠를 만듭니다. 모서리 20px 구간은 반지름 6의 작은 부채꼴 하나이고 레이스 전체를 봉투 영역(x 20~620)으로 잘라, 봉투 밖으로 나가는 부분이 없습니다(T80). 장미는 둥근 잎(가운데가 낮고 테두리에서 말린 띠)을 나선으로 겹쳐 그린 높이 지도에 빛을 비춘 무광 밀랍이고 지름은 약 62입니다. 참고 이미지의 'Exclusive' 양각 글자는 굽지 않았습니다(글자는 HTML). 레이스가 뚜껑 밖으로 16px 드리워 뚜껑 상자가 640×264(좌우 20px씩 넓힘)이므로 `.intro__flap` · `.intro__cast`는 `left: -20px; width: 640px; height: 264px`, 봉인 상자(`.intro__seal` · `.intro__seal-back` · `.intro__cast-img--seal`)는 `left: 278px; top: 184px; width: 84px; height: 84px`(가운데 = 뚜껑 끝 (320,226))입니다(T82). 시안 미리보기(`preview.png` 조립, `compare.png` 참고 이미지와 나란히, `frames.png` 진입 장면 프레임, `inside.png` 안쪽면, `corner.png` 모서리)는 `docs/design/intro-lace/`(git 제외)에 있습니다. 렌더 명령은 아래(산출 PNG)와 같습니다.

```sh
node docs/scripts/render-asset.mjs docs/artifacts/assets/lace-envelope-back.svg public/intro/envelope-back.png 1.5 && python3 docs/scripts/quantize-png.py public/intro/envelope-back.png
node docs/scripts/render-asset.mjs docs/artifacts/assets/lace-envelope-front.svg public/intro/envelope-front.png 3 && python3 docs/scripts/quantize-png.py public/intro/envelope-front.png
node docs/scripts/render-asset.mjs docs/artifacts/assets/lace-envelope-flap.svg public/intro/envelope-flap.png 3 && python3 docs/scripts/quantize-png.py public/intro/envelope-flap.png
node docs/scripts/render-asset.mjs docs/artifacts/assets/lace-envelope-flap-inside.svg public/intro/envelope-flap-inside.png 3 && python3 docs/scripts/quantize-png.py public/intro/envelope-flap-inside.png
node docs/scripts/render-asset.mjs docs/artifacts/assets/lace-rose-seal.svg public/intro/rose-seal.png 6 && python3 docs/scripts/quantize-png.py public/intro/rose-seal.png
node docs/scripts/render-asset.mjs docs/artifacts/assets/lace-rose-seal-back.svg public/intro/rose-seal-back.png 6 && python3 docs/scripts/quantize-png.py public/intro/rose-seal-back.png
```

걷어낸 첫 판(팝업북 · 붉은 가죽 고서)을 다시 볼 때는 커밋 1f1a819의 `docs/artifacts/index.html`과 논의록 T31~T33을 봅니다. 그때 배운 것은 지금 판에도 적용합니다. 3D 컨테이너(`transform-style: preserve-3d`)에는 clip-path · overflow · opacity를 걸지 않습니다(평면화됩니다). 3D 변환 안에서는 CSS mask · SVG mask를 쓰지 않고 그림 파일로 둡니다. 클래스 이름은 페이지 구획(`.block`)과 겹치지 않게 짓습니다. 장면의 마지막 프레임은 커버와 픽셀 단위로 겹치게 하고, 걷힐 때 아무것도 움직이지 않게 합니다.

## 핵심 정보 (올리브 가지)

Scene2입니다(디자인 논의 T83). 이산하가 준 올리브 가지 그림(`../design/scene2/2_핵심정보 에셋 2.png`, 1230×1278, 가지는 그중 636×362) 하나를 글 위에 둡니다(처음엔 같은 그림을 180° 돌려 글 아래에도 두었다가 T85에 뺐습니다). 높이는 내용 높이 236px의 5/4인 295px(`min-height`, 내용은 세로 가운데)입니다(T86. 액자가 없어져 화면을 채울 필요가 없습니다. 처음 만든 190px 가지와 72px 여백은 너무 커서 1/6과 반으로 줄였습니다). 앞서 쓴 액자 선화(T55~T82, `2_핵심정보 에셋.png`)와 레이스 타원 카드(T50~T51)는 걷어냈습니다. 액자의 마지막 모습은 커밋 c7c8199에 있습니다.

| 것 | 자리 |
| --- | --- |
| CSS · 마크업 | `index.html`의 "2. 핵심 정보" 구간(`#info`, `.info__*`). 세로 flex, 가지와 글 사이 21px(T85. 14px의 1.5배), 위아래 여백 36px. 가지 폭 32px. 바탕은 흰 종이입니다(T84 · T86. `background: #FFFFFF` 위에 전용 종이 결 그림 `public/paper/info.jpg`(원본 `assets/info-paper.svg`)을 `.info__paper`로 깔고, 가지와 글은 그 위. 쪽지 종이는 결이 1px 단위라 구획 크기로 늘리면 뭉개져 따로 만들었고, 세기는 첫 판의 1/8쯤입니다. 첫 판은 회색 회벽처럼 보여 1/4로, 다시 반으로 내렸습니다) |
| 산출 PNG | `public/scene2/branch.png`(알파 경계 상자에 6px 여백을 두고 잘라 폭 240, 256색, 5KB) · 종이 `public/paper/info.jpg`(1.5배 1350×780. 투명도가 없고 결이 온통 노이즈라 PNG는 1.7MB가 되어 JPEG 82, 211KB) |
| Next.js | `src/app/page.tsx`의 `#info` 마크업. 경로만 `/scene2/…`입니다 |

글은 네 줄, 크기는 둘입니다(T51). 큰 글자(18px, 700, 아주 짙은 갈색 `#2A1A0E`. T85에 작은 글자보다 3px 크게) "2026년 10월 9일" · "금요일 오후 6시 30분", 16px 띄고 작은 글자(15px) "더채플앳청담 3층 커티지홀" · "강남구 선릉로 757". 고정 px입니다.

달력 카드는 T57에 넣었다가 T58에서 걷어냈습니다(커밋 4a75ca4에 있습니다).

```sh
python3 -c "from PIL import Image; import numpy as np; im=Image.open('docs/design/scene2/2_핵심정보 에셋 2.png').convert('RGBA'); a=np.array(im)[:,:,3]; ys,xs=np.where(a>=8); c=im.crop((xs.min()-6,ys.min()-6,xs.max()+7,ys.max()+7)); c.resize((240, round(c.height*240/c.width)), Image.LANCZOS).save('public/scene2/branch.png')" && python3 docs/scripts/quantize-png.py public/scene2/branch.png
node docs/scripts/render-asset.mjs docs/artifacts/assets/info-paper.svg /tmp/info-paper.png 1.5 && sips -s format jpeg -s formatOptions 82 /tmp/info-paper.png --out public/paper/info.jpg
```

## 인사·이야기 (쪽지·메모지)

Scene3 인사(디자인 논의 T50 제안 · T51 예시 · T52 캐릭터), Scene4 Part 1 신랑(T53), Scene5 Part 1 신부(T58), Scene6~8 Part 2·3(T65)입니다. 이야기 구간(3~8쪽)은 전부 같은 부품입니다. 말풍선 대신 쪽지입니다. 한 줄 인사를 종이 쪽지에 쓰고, 화자 캐릭터가 쪽지의 위 모서리 하나에 스티커(흰 테두리는 그림에 있고 그늘은 CSS)로 걸칩니다. 신랑(수달) 쪽지는 오른쪽 정렬에 오른쪽 위 모서리, 신부(토끼) 쪽지는 왼쪽 정렬에 왼쪽 위 모서리입니다. 쪽지·메모지 글은 개구(Gaegu) 18px · 줄 간격 1.6입니다(글꼴 토큰 `--font-memo`, T64. 앞으로의 메모지도 이 토큰). 쪽지 폭은 글만큼(`fit-content`)입니다. 캐릭터 아이콘(`.note__who`)은 높이 43px이고(T53 36px의 1.2배, T63. 앞으로의 캐릭터 아이콘도 이 크기) 쪽지 위로 23px 올라가 아래가 쪽지 안 20px까지 옵니다. 첫 줄 글자는 위 여백 20px에 반행간 5px을 더한 자리에서 시작해 겹치지 않습니다. 붙인 스티커처럼 6° · -5° 기울입니다. 종이는 흰색입니다(T53. 크림색 바탕 위에서 도드라집니다).

Scene4는 사진 종이(`.photo-paper`. 흰 테두리 4px에 사진을 붙인 것, 폭의 3/4에 오른쪽 정렬, -0.7° 기울임. T56)가 위, 토끼 메모지(`.note--memo`. 쪽지와 같은 부품, 왼쪽 위에 토끼 1)가 아래입니다. 메모지는 글 크기만큼입니다(T61. `width: fit-content` · 여백 20/16. 사진 종이 뒤로 26px 들어가 겹치므로 위만 44px이고 첫 줄은 사진 아래 18px에서 시작합니다). 어릴 적 사진 컷아웃(헬리콥터, `.note__stamp`, 높이 160px. T89에 240으로 키웠다가 T91에 2/3로)은 글 아래 칸(`.note__row`)의 높이 0인 셀(`.note__stamp-cell`, 폭 138)에 절대 위치로 붙습니다(위 -20px, 오른쪽 60px 밖. 컷아웃 치수는 전부 화면 폭 비례입니다. T100. 단위 `--u = min(1vw, 4.3px)`로 390px 화면에서 이 px 값이 되고 페이지 최대 폭 430 이상에서는 430 크기로 고정됩니다. 셀 · 걸침 · 메모지 아래 여백도 같은 단위라 어느 폭에서든 메모지와의 비율이 같습니다. T91 · T92 · T95 · T98에 오른쪽으로 10 · 10 · 16 · 4px, T92 · T95 · T97에 위로 10px씩. 마지막 줄 끝 위로 20px 올라오지만 그 자리는 그림의 투명한 모서리라 확대 캡처로 확인해도 글자와 닿지 않습니다. 컷아웃에는 `max-width: none`이 필요합니다. Next.js 기본 스타일 `img { max-width: 100% }`가 셀 폭에 가로를 잡아 T87~T89에서 컷아웃이 가로로 눌려 있었습니다, T90). 글은 이산하가 정한 줄바꿈(`<br>`, 넉 줄, T88) 그대로 전체 폭이라 컷아웃이 설 옆 열이 없고, 메모지 높이는 글만큼(390px에서 184)입니다. 컷아웃은 종이의 아래 여백과만 겹치고 약 123px가 종이 밖이라, 그 메모지에 아래 여백 116px을 주어 다음 장면 사진과 41px 떨어집니다. T87에서는 마지막 문장이 셀 옆 열에서 흘렀고(네모 영역, T62), T88에서는 셀(96px)이 글 아래 있어 메모지가 그만큼 컸습니다. 전에는 본문 안의 float라 메모지가 컷아웃 높이까지 커졌고(T61 · T62 · T67), 메모지가 flex 항목이라 float를 늘 품으므로 float로는 걸치게 할 수 없었습니다. 글과 컷아웃 사이는 8px입니다(16의 반, T87). 신부(Scene5, T89)는 앞 두 줄(정한 줄바꿈)이 전체 폭이고, 나머지 글은 왼쪽 셀(`.note__row--left`, 80×150, 사이 16px) 옆 열에서 흐릅니다(네모 영역, T62). 컷아웃(243px. T89 1.5배 324 뒤 T93에 3/4)은 셀 왼쪽 아래에 붙어 왼쪽 18px · 아래 101px 삐져나옵니다(종이 아래 81px). 셀 150 + 101 = 251 = 243 + 8이라 컷아웃 윗변이 칸 윗변 8px 아래에 있어 -4° 회전해도 앞 줄과 닿지 않고, 글이 셀보다 길면 셀이 칸 아래에 붙어 컷아웃이 내려갑니다. 메모지 높이는 글만큼(390px에서 약 300)이고 아래 여백 40px으로 다음 장면 첫 메모지와 16px 떨어집니다. 본문 24px 들여쓰기(T60)는 T88에 뺐습니다.

Scene6~8(`#part2-groom` · `#part2-bride` · `#part3`, T65)은 사진 종이와 메모지의 조합만 다릅니다. 이야기 구획(`.story`)은 항목 사이 22px, 장면 사이 60px(T87. 전 40px의 1.5배. 인사 아래 여백도 21px. Scene6 위는 40px 더, T94 · T96)이고, 사진 종이 바로 다음 메모지에는 `.note--tuck`(사진 뒤로 26px 겹침)을, 와이어프레임에서 들여 놓은 독백 메모지에는 `.note--indent`(왼쪽 20px)를 겁니다. 합창 메모지는 화자 아이콘 둘이 오른쪽 위에 나란히(`.note__who--inner`가 안쪽)입니다. 아이콘을 메모지 정렬과 반대쪽에 두려면 `.note--who-right` · `.note--who-left`입니다(T69 · T73. Scene6 독백 = 오른쪽, Scene7 독백 = 왼쪽). 사진 종이 뒤로 겹치는 메모지의 아이콘은 사진과 반대쪽에 둡니다. 같은 쪽이면 사진(앞 층)에 가려집니다(T73). 웨딩 사진 셋은 아직 없어 같은 크기(폭 3/4, 세로 3:4)의 빈 종이(`.photo-paper__blank`)에 이름표만 두었고, 사진이 오면 `.photo-paper__photo`로 바꿉니다. 아이콘 배정(이산하 T65). Scene6 합창 = 수달 기본 + 토끼 2, 관찰 = 토끼 3, 독백 = 토끼 4. Scene7 = 수달 1, 수달 2. Scene8 = 수달 3, 토끼 5, 합창 = 둘이 허그. 장면 사이 간격은 구획 위아래 여백 20px씩, 40px로 같습니다(T67). 컷아웃에는 흰 테두리가 없어 `docs/scripts/sticker-border.py`로 구웠습니다. 인사 블록이 0.3화면이라 사진 종이가 인사와 같은 화면에 걸쳐 보입니다. 쪽지는 화면에 들어올 때 한 번 8px 내려앉으며 나타납니다(0.45초, IntersectionObserver). 움직임 줄이기면 바로 보입니다. 블록 높이는 약 0.3화면(390×844에서 233px)이라 다음 블록의 사진 종이가 같은 화면에 걸쳐 보입니다.

사진 뒤로 겹친 메모지의 화자 아이콘이 폭 9/10 사진(Scene7 · 8)에 가려져, 그 두 메모지는 틀(`.note-wrap`)에 넣고 아이콘을 메모지 밖 틀에 둡니다(T87). 메모지는 기울기(transform) 때문에 제 쌓임 맥락이라 안의 아이콘이 사진(z 1) 위로 못 나오기 때문입니다. 틀이 정렬(`--right` · `--left`) · 겹침(`--tuck`) · 들여쓰기 · 폭을 맡고 안의 메모지는 틀을 채우며, 아이콘(`.note-wrap__who`)은 z 2입니다(Scene8 것은 4px 아래, T99). 나타나기(`is-in`)는 틀에도 따로 걸어 아이콘이 함께 나타납니다. 폭 변형은 `.note--w68`(Scene6 첫 메모지. 글만큼의 4/5, 왼쪽 정렬에 아이콘 둘은 오른쪽 `.note--who-right`) · `.note--w80`(Scene7 첫 메모지. 전체의 4/5, 오른쪽)입니다. 인사 구획 위 여백은 48px입니다(T87. 40에서 8 더).

| 것 | 자리 |
| --- | --- |
| CSS · 마크업 | `index.html`의 "3. 인사"(`.greeting` · `.note*`) · "4. Part 1 신랑"(`.story` · `.photo-paper` · `.note--memo` · `.note__stamp`) · "5. Part 1 신부"(`--left` 변형 둘) 구간과 스크립트의 쪽지 등장 부분 |
| 에셋 원본 | `assets/note-paper.svg`(흰 종이 + 결 + 옅은 얼룩. 720×480. 그늘·모서리는 CSS). 캐릭터는 `../design/character/0_수달_기본.png` · `0_토끼_기본.png` · `0_토끼 1.PNG`(이산하, T52~T53). Scene4 사진은 `../design/scene4/3_산하 1.jpg`(대표) · `3_산하 2.png`(컷아웃), Scene5는 `../design/scene5/3_시야 1.jpeg` · `3_시야 2.png`(파일명이 NFD라 셸에서 어긋나면 `bride-child.jpeg` · `bride-child-cutout.png` 사본을 씁니다) |
| 산출 PNG | `public/paper/note.png`(1배, 214KB). 쪽지마다 `object-fit: cover`로 깔리므로 크기가 달라도 결이 늘어나지 않습니다. 4~8쪽의 메모지도 같은 그림을 씁니다. 캐릭터는 `public/character/{otter,rabbit}-{basic,1,2,…}.png` · `hug.png`(열한 장, 높이 240px, 52~83KB). Scene4는 `public/scene4/groom-child.jpg`(폭 900, 269KB) · `groom-child-ride.png`(높이 300 + 테두리, 25KB), Scene5는 `public/scene5/bride-child.jpg`(144KB) · `bride-child-cutout.png`(10KB). 아래 "이미지 축소" |
| Next.js | `src/app/page.tsx`의 `#greeting` · `#part1-groom` · `#part1-bride` 마크업과 쪽지 등장 `useEffect`. 메모지도 `.note`라 같이 나타납니다 |

```sh
node docs/scripts/render-asset.mjs docs/artifacts/assets/note-paper.svg public/paper/note.png 1 && python3 docs/scripts/quantize-png.py public/paper/note.png
```

## Artifact 발행 (중단)

결정 11로 중단했습니다. 스크립트 `docs/scripts/inline-artifact.mjs`는 남겨 두지만 쓰지 않습니다. 다시 하게 되면 새 세션에서 같은 링크를 먼저 `read`한 뒤 `url`을 지정해 발행해야 링크가 유지됩니다.

## 이미지 축소

원본은 `docs/design/scene*/`에 있습니다. 색을 바꾸지 않도록 PNG 무손실 축소만 합니다. JPEG로 바꾸지 않습니다(디자인 논의 T24). 파일당 2MB를 넘으면 캔버스가 받지 않습니다.

```sh
sips -s format png -Z 900 원본.PNG --out docs/design/canvas/hall.png
python3 docs/scripts/unmatte.py docs/design/scene1/scene--1-married-couple.png docs/design/scene1/scene--1-married-couple--clean.png
# 원본에 투명 여백이 있으면 알파 경계 상자로 잘라 꽉 찬 컷아웃으로 만듭니다(T74. CSS가 그림 상자 높이를 27%로 잡으므로 여백이 있으면 사람이 작아집니다)
python3 -c "from PIL import Image; import numpy as np; p='docs/design/scene1/scene--1-married-couple--clean.png'; im=Image.open(p).convert('RGBA'); a=np.array(im)[:,:,3]; ys,xs=np.where(a>=8); im.crop((xs.min(),ys.min(),xs.max()+1,ys.max()+1)).save(p)"
sips -s format png -Z 400 docs/design/scene1/scene--1-married-couple--clean.png --out docs/design/canvas/couple.png
sips -s format png -Z 700 docs/design/scene1/scene--1-married-couple--clean.png --out public/scene1/couple.png
python3 docs/scripts/unmatte.py "docs/design/character/0_수달_기본.png" docs/design/character/otter-basic--clean.png
sips -s format png -Z 240 docs/design/character/otter-basic--clean.png --out public/character/otter-basic.png
```

캐릭터 스티커도 두 사람 컷아웃처럼 반투명 가장자리에 자홍색 번짐이 있어 `unmatte.py`를 먼저 거칩니다(T52). 화면에서 43px 높이로 쓰므로 240px이면 넉넉합니다. 토끼(`0_토끼_기본.png` → `rabbit-basic`, `0_토끼 1.PNG` → `rabbit-1`)도 같은 두 줄입니다. 파일 이름은 `{otter,rabbit}-{basic,1,2,…}`로 이산하의 번호를 따릅니다.

사진(JPEG)은 JPEG 그대로 폭 900으로 줄이고, 사진 컷아웃은 번짐을 지운 뒤 흰 스티커 테두리를 굽습니다(T53). Scene5(`bride-child*`)도 같은 세 줄입니다.

```sh
sips -s format jpeg -s formatOptions 82 -Z 900 "docs/design/scene4/3_산하 1.jpg" --out public/scene4/groom-child.jpg
python3 docs/scripts/unmatte.py "docs/design/scene4/3_산하 2.png" docs/design/scene4/groom-child-ride--clean.png
python3 docs/scripts/sticker-border.py docs/design/scene4/groom-child-ride--clean.png public/scene4/groom-child-ride.png 300 7 && python3 docs/scripts/quantize-png.py public/scene4/groom-child-ride.png
sips -s format jpeg -s formatOptions 82 -Z 900 "docs/design/scene6/4_산하.jpg" --out public/scene6/groom.jpg
sips -s format jpeg -s formatOptions 82 -Z 1100 "docs/design/scene7/4_시야 2.jpg" --out public/scene7/bride.jpg
sips -s format jpeg -s formatOptions 82 -Z 1100 "docs/design/scene8/5_산하시야.jpg" --out public/scene8/couple.jpg
```

웨딩 사진 셋(T83)은 세로(Scene6)는 최대 900, 가로(Scene8)는 사진 종이가 폭 9/10(`.photo-paper--wide`)이라 최대 1100입니다. Scene7은 T90에 세로 사진(`4_시야 2.jpg`, 769×1100)으로 바뀌어 폭 3/4입니다.

Next.js에는 원본을 `public/scene*/`로 복사합니다(최적화 전. 발송본은 이미지 파이프라인을 거칩니다). Scene2는 T50에서 열린 봉투 일러스트가 레이스 타원 카드로, T55에서 다시 액자 선화로, T83에 올리브 가지로 바뀌었습니다.
