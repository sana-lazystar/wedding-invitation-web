# artifacts — 살아있는 시안

청첩장 시안의 작업 파일을 둡니다. 정본 텍스트는 `docs/ontology/`에 있고, 여기는 화면으로 보는 것입니다. 규칙 출처는 `docs/dashboard/discussions/2026-09-06--design-mockups.md` 결정 표(접두 "디자인 결정 N")입니다. 새 세션은 이 문서와 그 논의록의 마지막 T-로그를 읽으면 이어갈 수 있습니다.

## 지금 상태 (2026-09-06)

- 완료: Scene1 커버(와이어프레임 2쪽) · Scene2 핵심 정보(3쪽) · 봉투 진입 장면 · 떠 있는 바로 가기 메뉴
- 다음: Scene3 인사(4쪽). 이 쪽부터 토끼(신부)·수달(신랑) 캐릭터 그림이 필요합니다. 이산하가 재료를 줍니다(Q11)
- Next.js 임시 적용(WIW-4)은 develop에 커밋돼 있습니다. develop → main PR과 배포는 이산하가 합니다

## 링크

| 것 | 링크 | 갱신 방법 |
| --- | --- | --- |
| 캔버스 (Claude Design, 정적. Scene1 + Scene2 한 아트보드) | https://claude.ai/code/artifact/4d3deaa1-1a8a-4818-a815-792618cfea36 | 아래 "캔버스 다시 올리기" |
| 미리보기 (조립본 발행본, 진입 장면·메뉴 동작. 폰 확인용) | https://claude.ai/code/artifact/566bd2ff-595f-434b-8a0b-e1d06dd7799e | 아래 "미리보기 다시 올리기" |
| 로컬 Next.js | http://localhost:3000/ (`npm run dev`) | 코드 저장 시 자동 |

## 무엇이 어디에 있는가

| 것 | 자리 | git |
| --- | --- | --- |
| `index.html` | 조립본. URL `/` 미러(디자인 결정 3). CSS·마크업의 정본입니다. 오른쪽 위 글꼴 확인 패널은 확정 후 지웁니다 | 커밋 |
| `canvas/Main.dc.html` | Claude Design 캔버스의 아트보드. 청첩장 한 페이지를 위에서부터 이어 붙입니다(디자인 결정 7). 인라인 스타일이라 조립본과 손으로 맞춥니다 | 커밋 |
| `canvas/FloatingMenu.dc.html` | 떠 있는 바로 가기 버튼의 열린 상태 | 커밋 |
| `canvas/canvas.json` | 아트보드 배치와 메모 | 커밋 |
| `../design/scene1/`, `../design/scene2/` | 이산하가 준 원본 이미지 | 제외 (`docs/design/`) |
| `../design/canvas/*.png` | 캔버스용 축소본(PNG 무손실). 아트보드가 파일명으로 참조합니다 | 제외 |
| `src/app/{layout,page}.tsx`, `src/app/globals.css`, `public/scene1/`, `public/scene2/` | Next.js 임시 적용(WIW-4). `globals.css`는 조립본에서 생성한 파생물, `page.tsx` 마크업은 조립본과 손으로 맞춥니다 | 커밋 |
| 조립된 발행 파일 | Claude 세션 스크래치패드 | 커밋하지 않음 |

## 고치는 순서

1. `index.html`을 고칩니다(CSS와 마크업의 정본).
2. `node docs/scripts/sync-globals.mjs`로 `src/app/globals.css`를 다시 만듭니다. 조립본 CSS에는 `-webkit-backdrop-filter` 같은 접두사 중복을 두지 않습니다(스크립트가 걷어내고 Tailwind 처리기가 붙입니다). 마크업이 바뀌었으면 `src/app/page.tsx`도 같은 구조로 고칩니다. `npx tsc --noEmit -p tsconfig.json`과 `npx eslint src/app`을 돌립니다.
3. `canvas/Main.dc.html`을 같은 모양으로 고칩니다(정적, 진입 장면 없음).
4. 미리보기와 캔버스를 다시 올립니다(아래).
5. 논의록에 T-로그를 적고 커밋합니다. `git add`는 경로를 명시합니다.

## 미리보기 다시 올리기

```sh
node docs/scripts/inline-artifact.mjs docs/artifacts/index.html <스크래치패드>/invitation-preview.html --title "이산하 · 송시야 청첩장 미리보기"
```

그 파일을 Artifact 도구로 위 미리보기 링크(`url`)에 발행합니다. 즐겨찾기 아이콘은 📜입니다. 새 세션에서는 같은 링크를 먼저 `read`한 뒤 `url`을 지정해 발행해야 같은 링크가 유지됩니다(캔버스도 같습니다).

## 캔버스 다시 올리기

Claude 세션에서 `/design`을 불러 `canvas/Main.dc.html`·`canvas/FloatingMenu.dc.html`·`canvas/canvas.json`과 `docs/design/canvas/`의 `couple.png`·`hall.png`·`opened-paper.png`로 캔버스를 조립하고, 제목 "이산하 · 송시야 청첩장"으로 위 캔버스 링크에 다시 발행합니다. 즐겨찾기 아이콘은 💌, 런타임 판은 캔버스가 요구하는 값을 그대로 씁니다. 이산하는 캔버스에서 직접 고치지 않습니다(디자인 결정 8).

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
