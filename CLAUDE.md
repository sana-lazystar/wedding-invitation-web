# wedding-invitation-web

결혼식 모바일 청첩장 웹입니다. 코드와 작업 문서를 한 레포에 둡니다. 코드는 레포 루트, 작업·규격 문서는 `docs/`에 있습니다.

이 파일은 라우터입니다. 규칙·규격 본문을 여기에 복제하지 않습니다. `docs/`는 2축입니다. **작업(`docs/dashboard`) · 규격(`docs/ontology`)**. 문체 기준은 `docs/WRITER.md`입니다.
체계는 `~/medistream-chat-hub`의 3축 구조와 규칙을 계승했습니다(부트스트랩 결정 4). 계승 범위와 이 레포 고유 결정은 `docs/dashboard/discussions/2026-09-06--workspace-bootstrap.md` 결정 표에 있습니다.

# 1. 작업 — 어떻게 작업이 일어나는가 (`docs/dashboard/`)

- 규칙 원장(SSOT): `docs/dashboard/README.md`. 문서 타입 6종 · ID·시간 · 쪼개기 · 완주 · 병렬 · 모델 할당 · 외부 반영 게이트 · 브랜치 워크플로가 전부 여기 있습니다
- 진행 중 작업: `docs/dashboard/state.json`의 `activeWorks`. 세션을 시작하면 이 파일을 먼저 읽습니다. 터미널 보드 = `node docs/ontology/tools/board.mjs --watch`(읽기 전용)
- 신규 문서 정본: `docs/dashboard/templates/`
- 체계 설계·구조 결정 이력: `docs/dashboard/discussions/` 각 논의록의 결정 표
- **지금 = 디자인 시안 진행 중 · Scene1~14 조립 완료 · 떠 있는 메뉴 · 카카오톡 공유 · OG 적용 (2026-09-09)**: 스택·인프라는 `docs/dashboard/discussions/2026-09-06--tech-stack-and-infra.md` 결정 표(15건)로 완결됐습니다. 시안은 Claude가 조립본 `docs/artifacts/index.html`과 Next.js 로컬 적용으로 만들고, 와이어프레임을 한 쪽씩 이산하와 논의해 이어 붙입니다(디자인 결정 11. Artifact·캔버스 발행은 중단). 콘셉트는 팝업북이고 질감 에셋은 SVG → PNG로 만듭니다. 진입 장면(로딩)은 레이스 편지봉투입니다(T35 에셋 · T36~T49 장면 · T76 그림자·멈춤 · T77~T82 레이스 봉투 `docs/artifacts/assets/lace-*.svg`. 봉투가 물러나 잠깐 멈추고, 뚜껑이 그림자를 드리우며 열리고, 커버가 카드로 올라오며 봉투는 내려갑니다). 진행 상태·보는 곳·고치는 순서는 `docs/artifacts/README.md`, 턴별 기록은 `docs/dashboard/discussions/2026-09-06--design-mockups.md`입니다. Next.js 임시 적용(WIW-4, `src/app/`)은 develop에 커밋돼 있고 배포는 이산하가 합니다. Scene3 인사(와이어프레임 4쪽)는 쪽지 + 수달·토끼 스티커 캐릭터, Scene4 Part 1 신랑(5쪽)은 어릴 적 사진 종이 + 토끼 메모지, Scene5 Part 1 신부(6쪽)는 그 좌우 대칭, Scene6~8 Part 2·3(7~9쪽)은 메모지와 웨딩 사진 셋까지 붙었습니다(T51~T65 · T83). Scene9 초대(10쪽)는 크림 바탕에 글만 가운데 정렬하고 백합 한 송이 · 꽃잎 둘 스티커가 모서리에 걸칩니다(T128. 참고 그림과 원본은 `docs/design/scene9/`). 떠 있는 메뉴는 테이프로 붙인 쪽지(오시는 길 · 사진첩 · 마음 전하는 곳 · 공유하기)이고, 공유하기는 카카오톡 공유 JS SDK, OG 미리보기는 `layout.tsx`의 metadata와 `public/og/share.jpg`입니다(T132). 배경 음악(`public/audio/bgm.mp3`)은 첫 동작에서 시작하고 오른쪽 위 음표(재생 중엔 원 안을 지나가고 바탕에 따라 색이 반전)로 끕니다(T137 · T138 · T140). Scene10(11쪽)은 추신 + 만화(마스킹테이프 쪽지와 네 컷 만화 종이. 누르면 90° 돌린 뷰어, T102)와 사진첩(흰 바탕에 고운바탕 가운데 제목과 3×3 타일. 누르면 Swiper 뷰어에 흰 테두리 인화지 + 테이프 + 사진 아래 장수, T103~T107. 나무 틀은 T107에 지움. 사진은 `docs/scripts/gallery-jpeg.py` 잠정 산출, 순서는 `src/content/gallery.json`)입니다. Scene11 오시는 길 · Scene12 하객 안내 · Scene13 마음 전하는 곳(12~14쪽)은 크림색 바탕 위 종이 한 장씩(`.sheet`. 봉투의 장미 봉인 · 고운바탕 제목)이고 계좌 행은 누르면 번호가 복사됩니다(T110~T120. 지도는 카카오맵 JS SDK라 키 `NEXT_PUBLIC_KAKAO_MAP_KEY`가 필요합니다. 계좌 · 성함은 실값입니다). Scene14 마지막(15쪽)은 봉투 크기의 편지지 카드가 진입 장면을 거꾸로 돌려 봉투에 담기고 봉인되며, 그 뒤 스크롤을 올리면 열려 글이 보이고 내리면 닫힙니다(T121~T123). 사진첩 원본은 `docs/gallery/1.jpg`~`44.jpg`이고 `docs/scripts/gallery-jpeg.py`로 산출합니다. 핵심 정보(Scene2)는 올리브 가지 그림 위아래에 글이고, 커버 높이는 처음 잰 화면 높이로 고정하며 확대는 막습니다(T83). 종이는 흰색, 캐릭터 아이콘은 43px입니다. 캐릭터 원본은 `docs/design/character/`(git 제외)에 있습니다. 요구 원장(REQ)은 시안 확정 뒤 채우고, 그때 첫 story를 적재합니다

# 2. 규격 — 무엇이 현재 참인가 (`docs/ontology/`)

| 주제 | 보는 곳 |
| --- | --- |
| 서랍 정의 · 원장 규칙 · 예정 서랍의 생성 조건 · 코드가 SSOT인 것 | `docs/ontology/README.md` |
| 요구 원장 (REQ-*) | `docs/ontology/requirements.md` |
| 결정 원장 (D-*) + 논의록 결정 색인 | `docs/ontology/decisions.md` |
| 미결 원장 (Q-* · U-* · 열린 액션) | `docs/ontology/open-questions.md` |
| 위험 원장 (R-*) | `docs/ontology/risks.md` |
| 용어 | `docs/ontology/glossary.md` |
| ID 참조 무결성 검사 (`node docs/ontology/tools/check-refs.mjs`) | `docs/ontology/README.md` §기계 검증 |
| 작업 문서 문체 게이트 (`node docs/ontology/tools/check-doc-style.mjs`) | `docs/dashboard/README.md` §git 규약 |
| 공개 문서 문체 기준 | `docs/WRITER.md` |
| 물리 구성 (호스팅·도메인·빌드·배포 경로·한도·이전 경로) | `docs/ontology/topology/system-context.md` |
| 시점 기록 동결본 (조사·시안 스냅샷, 정본 아님) | `docs/ontology/references/` |

예정 서랍(`policy/` `database/` `api/` `ia/`)은 디렉토리만 있고 비어 있습니다. 첫 콘텐츠가 생길 때 채우고 이 표에 행을 더합니다. 생성 조건은 `docs/ontology/README.md` §서랍 정의에 있습니다.

# 규약

- **모델 분업**: 전수 추출·일괄 치환·반복 수정·빌드 같은 기계 작업은 Sonnet 서브에이전트에 위임합니다. 독립 작업이면 병렬 spawn. 판단·설계·판정·기준 수립은 메인 스레드(Fable/Opus)가 합니다. 메인 스레드는 위임 전에 판정을 끝내 지시서를 기계적으로 만들고, 산출물을 게이트 실행 + 표본 대조로 검수한 뒤에만 커밋합니다. 서브에이전트는 커밋하지 않습니다
- 이 레포의 작업은 `docs/dashboard/` 체계로만 관리합니다. WIW ID 없이 코드에 착수하지 않습니다
- **외부 반영 게이트**: 정본 = `docs/dashboard/README.md` §외부 반영 게이트. `docs/` 밖(코드·설정) 커밋·푸시·호스팅 변경은 ① 결정 행·task 문서 선행 커밋 ② 행위 특정 명시 승인 ③ 실행 직전 `[게이트] WIW-N | 승인 근거: "인용"` 표시, 셋 다 갖춘 뒤에만 합니다
- **브랜치 워크플로**: 정본 = `docs/dashboard/README.md` §브랜치 워크플로. 4층 `develop ← story ← epic ← feature`, ADR은 task 브랜치 위 커밋
- 착수 전 해당 WIW 문서의 design-refs와 ontology 해당 문서를 대조합니다
- `docs/dashboard/discussions/` = AI 작업 논의. 외부 사람과의 협업 기록이 필요해지면 `docs/cooperation/`을 그때 만듭니다
- ontology에는 살아있는 정본만 둡니다. 시점 기록은 `docs/ontology/references/`에 동결(무편집 + 상태 헤더)
- **문체**: Claude가 작성·수정하는 모든 문서(md 파일 등)는 `docs/WRITER.md`를 토대로 씁니다. 논의록·원장·서랍 문서·동결본 헤더·이 파일도 예외가 아닙니다. pre-commit 훅이 ID 참조 무결성과 작업 문서 문체 게이트를 겁니다. 클론·재설정 시 `sh docs/ontology/tools/install-hook.sh` 1회
- 재사용 스크립트(이미지 산출 등)는 `docs/scripts/`에 둡니다(스택 결정 10). 원본 사진은 `docs/gallery/`, 디자인 에셋은 `docs/design/`이고 둘은 git 제외 대상입니다(WIW-1). 사진 추가·순서 변경 절차는 `docs/scripts/README.md`
- 시간 기입은 `date '+%Y-%m-%d %H:%M:%S'` 실측값
- Next.js 코드 지침은 `AGENTS.md`입니다(create-next-app 생성, `next dev`가 규칙 블록을 다시 씁니다). 아래 임포트 줄로 자동 포함되며, 이 줄은 create-next-app이 만든 `CLAUDE.md`의 유일한 내용을 옮긴 것입니다(스택 결정 15)

@AGENTS.md
