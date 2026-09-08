# scripts — 재사용 스크립트

레포 작업에 반복해서 쓰는 스크립트를 둡니다(스택 결정 10). 레포 루트에서 `node docs/scripts/{이름}.mjs`로 실행합니다. 의존성은 레포 루트 `package.json`이 가집니다.

| 스크립트 | 역할 | 상태 |
| --- | --- | --- |
| 이미지 산출 (예정) | `docs/gallery/`의 원본을 폭 3~4단계 WebP로 줄여 `public/gallery/`와 매니페스트를 만듭니다 | Next.js 스캐폴드 뒤 task에서 작성 |
| `render-asset.mjs` | SVG(또는 HTML)를 Chrome으로 그려 투명 PNG로 뽑습니다. 질감 에셋용 | 있음 (디자인 논의 T31) |
| `quantize-png.py` | PNG를 256색 팔레트로 줄입니다 | 있음 (디자인 논의 T31) |
| `paper-back.py` | 컷아웃의 뒷면(종이 결을 윤곽으로 오려 뒤집은 것)을 만듭니다 | 있음 (디자인 논의 T32) |
| `sync-globals.mjs` | 조립본 CSS를 Next.js `globals.css`로 옮깁니다 | 있음 |
| `inline-artifact.mjs` | 조립본을 Artifact 발행용으로 인라인합니다 | 있음. 디자인 결정 11로 쓰지 않음 |
| `unmatte.py` | 컷아웃 가장자리 색 번짐을 지웁니다 | 있음 |
| `sticker-border.py` | 컷아웃 PNG에 흰 스티커 테두리를 굽습니다. 사진 컷아웃을 캐릭터 스티커와 같은 문법으로 맞출 때 | 있음 (디자인 논의 T53) |
| `gallery-jpeg.py` | 갤러리 사진의 잠정 산출. `docs/gallery/N.jpg`(번호 1~3자리, jpg · JPG) → `public/gallery/NN.jpg`(두 자리 id, 긴 변 1600, JPEG 80) + `NN-thumb.jpg`(정사각 480), 매니페스트 `src/content/gallery.json`에 없는 번호를 숫자 순으로 끝에 보탬. 사진을 통째로 바꾸면 산출과 매니페스트를 지우고 다시 돌립니다 | 있음 (디자인 논의 T103 · T121). 정식 파이프라인이 생기면 대체 |
| `gen-lace-frill.py` | 레이스 프릴 SVG(`docs/artifacts/assets/lace-frill.svg`)를 만듭니다. 타원 둘레를 호 길이로 균등 분할해 주름잎을 놓습니다 | 있음. 쓰지 않음 (이산하가 다른 세션에서 작성. 디자인 논의 T50. Scene2가 T55에서 액자로 바뀜) |

## 사진 추가·순서 변경 절차

스크립트를 만들기 전에 정한 계약입니다. 스크립트를 만드는 task가 이 절차를 그대로 구현하고, 구현이 달라지면 이 문서를 먼저 고칩니다. 새 세션에서 "사진 순서를 바꾸고 싶다"고 물으면 Claude는 이 절을 읽고 답합니다.

### 파일과 규칙

- 원본은 `docs/gallery/NN.jpg`에 둡니다. git 제외 폴더입니다(WIW-1). 번호는 촬영 시각 순 두 자리이고, 새 사진은 마지막 번호 다음을 받습니다(스택 결정 12). 번호는 ID일 뿐 표시 순서가 아닙니다. 원래 파일명과의 대조표는 `docs/gallery/RENAMES.txt`입니다.
- 산출물은 `public/gallery/NN-{폭}.webp`입니다. 폭은 480·768·1080·1440으로 잠정합니다. 산출물은 커밋합니다.
- 매니페스트는 코드 쪽 파일 하나입니다. 경로는 스캐폴드 때 확정하고, 잠정 위치는 `src/content/gallery.json`입니다. 항목 순서가 곧 화면 표시 순서입니다.
- 매니페스트는 사람이 순서를 정합니다. 스크립트는 새 사진 항목을 끝에 보태고 파생 값(가로세로 비율, 블러 placeholder)을 갱신할 뿐, 순서를 바꾸거나 항목을 지우지 않습니다.

### 절차

1. 사진 추가. 원본을 다음 번호로 `docs/gallery/`에 넣습니다. 레포 루트에서 `node docs/scripts/images.mjs`를 실행합니다. 매니페스트 끝에 새 항목이 생기면 원하는 위치로 옮깁니다. `public/gallery/`와 매니페스트를 커밋합니다.
2. 순서 변경. 매니페스트의 항목 순서만 바꿔 커밋합니다. 스크립트를 다시 돌리지 않습니다.
3. 사진 제외. 매니페스트에서 항목을 지웁니다. 원본과 산출물은 남겨도 됩니다.
4. 사진 교체. 같은 번호로 원본을 덮어쓰고 스크립트를 돌립니다. 스크립트는 원본이 바뀐 사진만 다시 만듭니다(잠정).

상태: 정식 스크립트(`images.mjs`, WebP 여러 폭)는 미작성(2026-09-06). 시안 단계의 잠정 산출은 `gallery-jpeg.py`(2026-09-08, 디자인 논의 T103)이고 절차 1(추가 = 끝에 보태기) · 2(순서 = 매니페스트만) · 3(제외 = 항목 삭제)은 같습니다. 구현 task가 끝나면 이 줄을 갱신합니다.

## inline-artifact.mjs — 조립본을 Artifact 발행용으로

조립본 `docs/artifacts/index.html`이 상대 경로로 참조하는 이미지를 data URI로 심고 문서 껍데기를 벗깁니다(디자인 결정 4). Artifact 샌드박스가 외부 이미지를 막기 때문입니다. 이미지는 최대 1080px로 줄이고 작은 것은 키우지 않습니다. macOS `sips`만 쓰고 의존성이 없습니다.

```sh
node docs/scripts/inline-artifact.mjs docs/artifacts/index.html /tmp/preview.html --title "이산하 · 송시야 청첩장 미리보기"
```

## render-asset.mjs — SVG를 PNG로

SVG(또는 `id="a"` 요소가 있는 HTML)를 설치된 Google Chrome으로 그려 투명 배경 PNG로 뽑습니다. 빈티지 표지·속지 같은 질감 에셋을 CSS로 흉내 내지 않고 그림 파일로 만들기 위한 것입니다(디자인 결정 11). SVG 필터(feTurbulence 종이 결, feDisplacementMap 찢은 가장자리, 잉크 번짐)를 그대로 씁니다. `playwright-core`(devDependency)를 쓰고 브라우저를 내려받지 않습니다. SVG 루트에 `width` · `height`(px 숫자)가 있어야 합니다.

```sh
node docs/scripts/render-asset.mjs docs/artifacts/assets/{이름}.svg public/{자리}/{이름}.png 1.5
```

## quantize-png.py — PNG를 256색으로

질감 PNG는 무손실이면 수백 KB라서 256색 팔레트로 줄입니다. 제자리에서 덮어쓰고, 투명도가 있으면 유지합니다. macOS 시스템 python3의 Pillow를 씁니다.

```sh
python3 docs/scripts/quantize-png.py public/{자리}/{이름}.png
```

## paper-back.py — 컷아웃의 종이 뒷면

투명 배경 컷아웃의 윤곽으로 종이 결 이미지를 오리고 위아래를 뒤집어, 접혀 있는 팝업 조각의 뒷면으로 씁니다(디자인 논의 T32). 브라우저 마스크는 3D 변환 안에서 그려지지 않거나 file://에서 막혀 그림 파일로 둡니다. 투명도를 유지한 256색 PNG로 저장합니다. `--no-flip`이면 뒤집지 않습니다.

```sh
python3 docs/scripts/paper-back.py docs/design/canvas/couple.png {종이결.png} public/{자리}/couple-back.png
```

## sync-globals.mjs — 조립본 CSS를 Next.js로

조립본 `docs/artifacts/index.html`의 스타일 구간을 `src/app/globals.css`로 옮깁니다(WIW-4). 조립본이 정본이고 globals.css는 파생물입니다. 글꼴 토큰 5개(이름·본문·안내·라틴·메모지)만 next/font 변수로 바꿉니다. `-webkit-` 접두사 중복(backdrop-filter · mask-image · backface-visibility)은 걷어내고, 개별 변환 속성(`translate` · `rotate` · `scale`)이 있으면 실패합니다(Tailwind v4의 처리기가 떨어뜨리므로 transform 함수로 씁니다).

```sh
node docs/scripts/sync-globals.mjs
```

## sticker-border.py — 컷아웃에 흰 스티커 테두리

캐릭터 그림에는 흰 테두리가 이미 있으므로, 사진 컷아웃(어릴 적 사진 등)을 같은 문법으로 맞출 때 씁니다(디자인 논의 T53). 알파의 경계 상자로 자르고 높이를 맞춘 뒤, 알파를 넓혀 흰 층을 깔고 원본을 위에 얹습니다. 원본이 화폭 변에서 잘려 있으면 그 변에서는 테두리를 끊습니다. `unmatte.py` 뒤, `quantize-png.py` 앞에 씁니다.

```sh
python3 docs/scripts/sticker-border.py docs/design/scene4/groom-child-ride--clean.png public/scene4/groom-child-ride.png 300 7
```

## unmatte.py — 컷아웃 가장자리 색 번짐 제거

투명 배경 PNG의 반투명 가장자리 픽셀 색을 가장 가까운 불투명 픽셀 색으로 바꿉니다. 두 사람 컷아웃의 자홍색 테두리 잔상을 지울 때 썼습니다(디자인 논의 T30). 원본은 건드리지 않고 새 파일로 씁니다. macOS 시스템 python3의 Pillow·numpy를 씁니다.

```sh
python3 docs/scripts/unmatte.py docs/design/scene1/scene1--married-couple.png docs/design/scene1/scene1--married-couple--clean.png
```
