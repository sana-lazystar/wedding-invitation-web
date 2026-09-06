# scripts — 재사용 스크립트

레포 작업에 반복해서 쓰는 스크립트를 둡니다(스택 결정 10). 레포 루트에서 `node docs/scripts/{이름}.mjs`로 실행합니다. 의존성은 레포 루트 `package.json`이 가집니다.

| 스크립트 | 역할 | 상태 |
| --- | --- | --- |
| 이미지 산출 (예정) | `docs/gallery/`의 원본을 폭 3~4단계 WebP로 줄여 `public/gallery/`와 매니페스트를 만듭니다 | Next.js 스캐폴드 뒤 task에서 작성 |

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

상태: 스크립트 미작성(2026-09-06). 구현 task가 끝나면 이 줄을 갱신합니다.

## inline-artifact.mjs — 조립본을 Artifact 발행용으로

조립본 `docs/artifacts/index.html`이 상대 경로로 참조하는 이미지를 data URI로 심고 문서 껍데기를 벗깁니다(디자인 결정 4). Artifact 샌드박스가 외부 이미지를 막기 때문입니다. 이미지는 최대 1080px로 줄이고 작은 것은 키우지 않습니다. macOS `sips`만 쓰고 의존성이 없습니다.

```sh
node docs/scripts/inline-artifact.mjs docs/artifacts/index.html /tmp/preview.html --title "이산하 · 송시야 청첩장 미리보기"
```

## sync-globals.mjs — 조립본 CSS를 Next.js로

조립본 `docs/artifacts/index.html`의 스타일 구간을 `src/app/globals.css`로 옮깁니다(WIW-4). 조립본이 정본이고 globals.css는 파생물입니다. 글꼴 토큰만 next/font 변수로 바꿉니다.

```sh
node docs/scripts/sync-globals.mjs
```

## unmatte.py — 컷아웃 가장자리 색 번짐 제거

투명 배경 PNG의 반투명 가장자리 픽셀 색을 가장 가까운 불투명 픽셀 색으로 바꿉니다. 두 사람 컷아웃의 자홍색 테두리 잔상을 지울 때 썼습니다(디자인 논의 T30). 원본은 건드리지 않고 새 파일로 씁니다. macOS 시스템 python3의 Pillow·numpy를 씁니다.

```sh
python3 docs/scripts/unmatte.py docs/design/scene1/scene1--married-couple.PNG docs/design/scene1/scene1--married-couple--clean.png
```
