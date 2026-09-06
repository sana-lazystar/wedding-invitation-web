# artifacts — 살아있는 시안

청첩장 시안의 작업 파일을 둡니다. 정본 텍스트는 `docs/ontology/`에 있고, 여기는 화면으로 보는 것입니다. 규칙 출처는 `docs/dashboard/discussions/2026-09-06--design-mockups.md` 결정 표(접두 "디자인 결정 N")입니다.

## 무엇이 어디에 있는가

| 것 | 자리 | git |
| --- | --- | --- |
| `canvas/Main.dc.html` | Claude Design 캔버스의 아트보드. 청첩장 한 페이지를 위에서부터 이어 붙입니다(디자인 결정 7). 2026-09-06 현재 Scene1 커버 + Scene2 핵심 정보 | 커밋 |
| `canvas/FloatingMenu.dc.html` | 떠 있는 바로 가기 버튼의 열린 상태. 정적 아트보드라 동작은 조립본에서 확인합니다 | 커밋 |
| `canvas/canvas.json` | 아트보드 배치와 메모 | 커밋 |
| `../design/canvas/*.png`, `*.jpg` | 캔버스용 축소 이미지. 아트보드가 파일명으로 참조합니다 | 제외 (`docs/design/`) |
| `index.html` | 조립본. URL `/` 미러(디자인 결정 3). Scene1부터 캔버스와 나란히 유지하고, 브라우저에서 파일로 열어 글꼴·스크롤을 확인합니다(디자인 결정 10). 오른쪽 위 글꼴 확인 패널은 확정 후 지웁니다 | 커밋 |
| 조립된 발행 파일 | Claude 세션 스크래치패드 | 커밋하지 않음 |
| 조립본 미리보기 Artifact | `node docs/scripts/inline-artifact.mjs docs/artifacts/index.html <출력> --title "이산하 · 송시야 청첩장 미리보기"`로 만든 사본을 발행합니다(디자인 결정 4). 링크는 논의록 T10 | 커밋하지 않음 |

## 캔버스를 다시 여는 법

Claude 세션에서 `/design`을 불러 이 디렉토리의 아트보드와 `docs/design/canvas/`의 이미지로 캔버스를 조립하고, 같은 Artifact URL에 다시 발행하세요. URL은 논의록 T4에 있습니다. 이산하가 캔버스에서 직접 고쳐 저장했으면, 다음 작업 전에 Claude가 그 저장본을 읽어 와 작업 파일에 반영합니다(디자인 결정 8).

## 이미지 축소

원본은 `docs/design/scene1/` 같은 원본 폴더에 있습니다. 축소는 macOS `sips`로 합니다.

```sh
sips -s format jpeg -s formatOptions 72 -Z 780 원본.PNG --out docs/design/canvas/hall.jpg
sips -s format png -Z 400 원본.PNG --out docs/design/canvas/couple.png
```

투명 배경이 필요한 컷아웃은 PNG, 그 밖은 JPEG로 둡니다. 파일당 70KB 안팎이 권장이고, 2MB를 넘는 파일은 캔버스가 받지 않습니다.
