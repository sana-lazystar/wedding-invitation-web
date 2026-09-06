# wedding-invitation-web

결혼식 모바일 청첩장 웹입니다. 코드와 작업 문서를 한 레포에 둡니다. 코드는 레포 루트, 작업·규격 문서는 `docs/`에 있습니다.

이 파일은 라우터입니다. 규칙·규격 본문을 여기에 복제하지 않습니다. `docs/`는 2축입니다. **작업(`docs/dashboard`) · 규격(`docs/ontology`)**. 문체 기준은 `docs/WRITER.md`입니다.
체계는 `~/medistream-chat-hub`의 3축 구조와 규칙을 계승했습니다(부트스트랩 결정 4). 계승 범위와 이 레포 고유 결정은 `docs/dashboard/discussions/2026-09-06--workspace-bootstrap.md` 결정 표에 있습니다.

# 1. 작업 — 어떻게 작업이 일어나는가 (`docs/dashboard/`)

- 규칙 원장(SSOT): `docs/dashboard/README.md`. 문서 타입 6종 · ID·시간 · 쪼개기 · 완주 · 병렬 · 모델 할당 · 외부 반영 게이트 · 브랜치 워크플로가 전부 여기 있습니다
- 진행 중 작업: `docs/dashboard/state.json`의 `activeWorks`. 세션을 시작하면 이 파일을 먼저 읽습니다. 터미널 보드 = `node docs/ontology/tools/board.mjs --watch`(읽기 전용)
- 신규 문서 정본: `docs/dashboard/templates/`
- 체계 설계·구조 결정 이력: `docs/dashboard/discussions/` 각 논의록의 결정 표
- **지금 = 디자인 시안 진행 중 · Scene1·2 완료, 다음 Scene3 (2026-09-06)**: 스택·인프라는 `docs/dashboard/discussions/2026-09-06--tech-stack-and-infra.md` 결정 표(15건)로 완결됐습니다. 시안은 Claude가 조립본 `docs/artifacts/index.html`과 Next.js 로컬 적용으로 만들고, 와이어프레임을 한 쪽씩 이산하와 논의해 이어 붙입니다(디자인 결정 11. Artifact·캔버스 발행은 중단). 콘셉트는 팝업북이고 질감 에셋은 SVG → PNG로 만듭니다. 진입 장면(로딩)은 T34에서 걷어냈고 처음부터 다시 만듭니다. 진행 상태·보는 곳·고치는 순서는 `docs/artifacts/README.md`, 턴별 기록은 `docs/dashboard/discussions/2026-09-06--design-mockups.md`입니다. Next.js 임시 적용(WIW-4, `src/app/`)은 develop에 커밋돼 있고 배포는 이산하가 합니다. 다음 쪽은 Scene3 인사(와이어프레임 4쪽)이고 캐릭터 그림이 필요합니다. 요구 원장(REQ)은 시안 확정 뒤 채우고, 그때 첫 story를 적재합니다

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
