---
description: 작업 관리 체계
---

# Dashboard - 작업 관리 체계

## 타입

| 타입 | 단위 | ID | 위치 | 템플릿 | status |
| --- | --- | --- | --- | --- | --- |
| story | 이야기. 인수·범위 단위 (하위 epic 1개 이상. 어디까지 만들지를 먼저 정합니다) | `WIW-{N}` | `stories/` | `templates/story.md` | backlog → in-progress → completed \| dropped |
| epic | 완주. 작업 흐름 묶음 (하위 task 1개 이상, 레포 수 무관) | `WIW-{N}` | `epics/` | `templates/epic.md` | backlog → in-progress → completed \| dropped |
| task | 기능 (레포 1개) | `WIW-{N}` | `tasks/` | `templates/task.md` | todo → in-progress → completed \| dropped |
| bugfix | 완주된 작업의 결함 1건 | `WIW-{N}` | `bugfixes/` | `templates/bugfix.md` | todo → in-progress → completed \| dropped |
| adr | 실행 (병렬 1단위) | `WIW-{N}--ADR-{M}` | `adr/` | `templates/adr.md` | todo → in-progress → completed \| failed |
| discussion | 논의록 (append-only) | 없음 | `discussions/` | `templates/discussion.md` | in-progress → completed \| dropped |

## ID · 시간

- `WIW-{N}` 발급: `ls .ids/` 최대 +1 → `.ids/WIW-{N}` 빈 파일 생성 → 문서 작성. 재사용 금지
- `ADR-{M}` 발급: `ls adr/WIW-{N}--ADR-*` 최대 +1. 마커 없음
- 파일명: `WIW-{N}--{slug}.md` (kebab 2~4단어). discussion은 `YYYY-MM-DD--{slug}.md`
- 시간 필드: `YYYY-MM-DD HH:mm:ss`. `date '+%Y-%m-%d %H:%M:%S'` 실측값만 씁니다. 추측 기입 금지

## 생성 시점

| 문서 | 시점 | 채우는 것 |
| --- | --- | --- |
| discussion | 논의 시작 즉시 | 턴마다 로그 append |
| story | 목록 확정(논의 결정) 직후 일괄 | 전체 |
| epic | discussion 설계 확정 직후 | 전체 |
| task | epic 적재와 동시 일괄 (잔일은 단독 즉시) | 전체 |
| adr | task·bugfix 분해 시 스텁 (todo) | 목적·touches만. 명세는 착수 세션이 코드 연 뒤 작성 |
| bugfix | 발견 즉시 | 증상·재현만으로 적재 가능 |

## 쪼개기

- story = 이야기·인수 단위. 하위 epic 1개 이상. epic은 원칙적으로 story 산하. 스토리 밖 잔일 = 단독 task, 크로스레포 잔일 = 단독 epic
- 레포 2개 이상 → 무조건 epic으로 승격, 레포별 task 분해. `repos` 복수 task 금지
- 역은 참이 아닙니다. epic은 레포 수와 무관한 **작업 흐름(목적) 묶음**입니다. 같은 레포라도 한 목적에서 task가 2개 이상 파생되면 epic으로 묶습니다. 위 승격 규칙은 "멀티레포면 epic 의무"일 뿐 "epic이면 멀티레포"가 아닙니다
- task = 레포 1개 · 완료 기준을 검증 가능한 문장으로 쓸 수 있는 크기
- adr = 병렬 실행 1단위. touches 겹침 금지. ADR 0개 task 허용
- 진행 중 task의 결함 → 그 task 내부 처리. bugfix는 archive된 작업·배포 코드의 결함만

## 완주

```
adr   completed = 테스트 설계 통과 + 실행 기록 (커밋 해시)
task  completed = 하위 adr 전부 종결 + 레포 게이트 통과 + 구현 기록 (브랜치·커밋)
epic  completed = 하위 task 전부 종결 + epic→story 머지 (구현 기록 추기)
story completed = 하위 epic 전부 종결 + story 브랜치 인수(이산하 확인) + 본문 ## PR 초안 기록
```

- PR 생성 = 사람 직접. 머지·배포는 status 추적 밖 (알게 되면 구현 기록에 추기)
- 단독 task·bugfix·단독 epic = 상위 층 겸임 → 완주 시 PR 초안까지
- completed | dropped | failed → `archive/{타입}/` 이동. adr은 `WIW-{N}--ADR-*` glob으로 부모와 함께
- 반려·재작업 → in-progress 복귀. 머지 전 산출물 변경 → archive 문서에 정정 추기
- adr 접근 무효 → failed 마감 + 새 순번 발급 (고쳐 쓰기 금지)

## 병렬 작업

- 레포가 다른 task → 자유 병렬
- 같은 task 내 adr → touches 안 겹칠 때만. 겹치면 뒤 adr 목적에 `대기: WIW-{N}--ADR-{M}`
- 클레임 = adr todo → in-progress 전이

## 모델 할당

- 일반 원칙: 기계 작업(전수 추출·일괄 치환·반복 수정·빌드)은 Sonnet 서브에이전트 위임 + 독립 작업 병렬 spawn. 판단·설계·판정은 메인 스레드(Fable/Opus). 메인 스레드가 판정을 지시서로 굳혀 위임하고, 산출물을 게이트 + 표본 대조로 검수한 뒤에만 커밋합니다. 서브에이전트는 커밋하지 않습니다
- 설계·분해 = 메인 스레드(Fable/Opus). 논의, story·epic·task·bugfix 분해, adr 스텁 생성
- adr 실행 = Sonnet 서브에이전트. 부모 세션이 spawn합니다. 입력은 adr 문서(+ touches 코드)만이므로 스텁은 그것만 받고 착수 가능하게 자기완결로 씁니다(목적·touches·code-refs). 클레임 → 테스트 설계·실행 명세 작성 → 구현·실행 기록까지 수행
- 완료 검증 = 부모 세션. 서브에이전트 종료 후 문제 지점(테스트 실효성·touches 준수·가드레일·완료 기준)을 검증하고 통과 시에만 completed 전이. 반려면 사유를 실행 기록에 추기하고 재실행
- 실행 중 설계 판단이 필요해지면(접근 무효, touches 재조정, 완료 기준 변경) 서브에이전트를 멈추고 부모가 판단합니다. failed 마감·새 순번 발급도 부모 소관
- 참고 레포의 실행 3층 분업(구현 = Opus+Ultracode 세션 · epic 검증 = Fable 세션 · story 인수 = 이산하)과 세션 프롬프트 2종은 계승 후보입니다. 구현 착수 논의에서 채택 여부를 정하고, 채택하면 `prompts/`를 그때 만듭니다

## 논의

- append-only. 턴 단위 기록: `### YYYY-MM-DD HH:mm:ss · 화자 (T{n})` + 요지
- 결정 표: 행 내용 불변 · 상태 칸만 갱신 · 뒤집기 = 새 행 대체 + 옛 행에 "폐기 — 결정 N으로 대체". 다른 논의록이 대체하면 파일명 필수: "폐기 — {논의록 파일}:결정 N으로 대체" (부분 대체는 "부분 대체 — …, 존치 항목 명시")
- 결정 번호공간: 무접두 "결정 N" = **문서 머리에 선언한 홈 논의록**의 번호. 그 밖은 접두 필수. 접두 어휘는 `docs/ontology/decisions.md` §논의록 결정 색인이 정본이고, `docs/ontology/tools/check-refs.mjs`의 NS 표를 함께 고칩니다. 논의록 항목 번호도 같은 규칙
- 완결 전 "정본 반영" 점검 대상 고정: 정책·DB·API·IA(있으면) + `open-questions.md` 열린 액션 · `requirements.md` 남은 결정 칸 · `risks.md` 대응 칸 · `glossary.md` · `artifacts/`(있으면, 살아있는 데모 동반 갱신 + 시점 파일 대체 표기). 템플릿 `templates/discussion.md`는 이 목록을 링크합니다
- 정본 반영을 패스로 나눠 커밋할 때, 각 패스의 T-로그에 커밋 해시 + 변경 파일 목록(`git show --stat`) + 실행한 검증 명령·결과를 적습니다. 선언과 산출물 사이를 비우지 않습니다

## 경계

- 공수·담당자·우선순위·severity = JIRA 소유. `jira:` = 단방향 포인터
- 코딩 컨벤션·게이트 명령(lint·test·build) = 레포 루트의 코드 설정 소유. 문서는 명령을 복제하지 않고 가리킵니다
- 브랜치: JIRA 키 있으면 그 레포 관례(`feature/{JIRA키}`), 없으면 `feature/WIW-{N}-{slug}`
- status에 blocked 없음 → 주의할 점에 `대기: {무엇}`

## 진행 중 작업

- 인덱스 = `state.json`. 목적은 "지금 무엇을 하고 있는가"를 파일 하나로 파악하는 것입니다. README에 표를 두지 않습니다
- SSOT는 각 문서 frontmatter와 디렉토리 배치(archive 안팎)입니다. `state.json`은 그 중 `status: in-progress`인 문서만 가리키는 파생 인덱스입니다
- 형태: `{ "updatedAt": "YYYY-MM-DD HH:mm:ss", "activeWorks": ["WIW-{N}--{slug}", …] }`. 항목은 파일명(확장자 없이)이고 그 밖의 필드는 두지 않습니다. 제목·소속·경로는 파일명과 frontmatter에서 나옵니다. 파일은 `docs/dashboard/*/WIW-{N}--*.md` glob으로 찾습니다
- 대상은 story·epic·task·bugfix입니다. adr은 넣지 않습니다. 서브에이전트가 클레임하는 문서라 `state.json`을 건드리지 않게 하고, 보드가 frontmatter로 보여줍니다
- 갱신 시점: 착수(→ in-progress)에 추가, 종결(→ completed·dropped)에 제거. 둘 다 `updatedAt` 실측. 문서 생성·backlog·todo에서는 손대지 않습니다
- 보드 뷰어 = `node docs/ontology/tools/board.mjs --watch`. 작업 문서와 archive의 frontmatter를 story→epic→task→adr 트리로 렌더하고, in-progress 집합과 `activeWorks`가 어긋나면 경고합니다. 읽기 전용(쓰기 없음), 별도 터미널 창용

## 외부 반영 게이트

AI가 **`docs/` 밖**에 반영하는 모든 행위(코드·설정 커밋·푸시, 호스팅·클라우드 자원 생성·변경·삭제)는 다음 두 조건을 모두 갖춘 뒤에만 합니다.

1. **문서 선행**: 해당 결정 행과 작업 문서(WIW, 범위에 맞는 타입)가 먼저 커밋돼 있습니다. 외부 행위의 선행 문서는 언제나 task(단독이든 소속이든)입니다. 소속 작업은 상위 문서(story·epic)가 먼저 서고 그 아래 task가 섭니다. story·epic만 있고 task 없이 코드에 손대지 않습니다. 결함 1건은 bugfix. 새 발의 = 새 WIW 문서(타입은 쪼개기 규칙. 레포 2개 이상이면 epic으로 승격). 기존 문서에 스코프를 덧대지 않습니다(스코프 확장은 결정자만 지시할 수 있고, 지시 근거를 문서에 기입)
2. **행위 특정 승인**: 이산하가 그 행위를 특정해 명시 승인했습니다. 질문·논평·일반 동의("좋아 보인다" 류)는 승인이 아닙니다

실행 예고 프로토콜: 외부 행위 직전, 대화에 반드시 `[게이트] WIW-{N} | 승인 근거: "<이산하 발언 인용>"`을 먼저 표시합니다. 인용할 승인이 없으면 실행하지 않습니다. 위반은 그 자리에서 가시화됩니다.

포괄 승인: story 착수의 명시 승인은 그 story 산하 문서화된 task·adr 범위 내 코드 작업(브랜치 생성·커밋·푸시·task→epic·epic→story 머지)을 포괄 승인합니다. 개별 승인 유지 = story→develop 머지(이산하 PR 전용 불변) · 클라우드 자원 변경 · 문서 범위 밖 작업(스코프 덧대기 금지 불변). `[게이트]` 표시의 승인 근거 = story 착수 지시 인용.

예외 없음(시급해 보여도 상신 먼저). 읽기 전용 조회(실측)는 게이트 대상이 아닙니다.

## 브랜치 워크플로

- 계층 4층: `develop ← story/WIW-{N}-{slug} ← epic/WIW-{M}-{slug} ← feature/WIW-{K}-{slug}` + ADR = task 브랜치 위 커밋. story는 develop에서, epic은 story 브랜치에서, task는 epic 브랜치에서 분기합니다
- 머지: task→epic·epic→story = Claude(무배포, --no-ff). **story→develop 머지 = 이산하 PR 전용**. 실배포 개시점입니다. story/\*·epic/\*는 파이프라인 비대상
- 인수: story 완료 = 이산하가 story 브랜치를 로컬에서 먼저 확인 → develop PR에서 한 번 더 확인 후 머지. 중간에 dev 실물 확인이 필요하면 story 브랜치 대상 태그(명시 행위. 외부 반영 게이트 준수)
- 드리프트: 장기 브랜치는 주기적으로 상위에서 당겨옵니다. develop→story→epic 순, 충돌은 하위 브랜치에서 해소
- 크로스레포 story·epic은 레포마다 브랜치 1개, 최종 머지 순서 = `deploy-order`. 단독 task는 develop 직분기
- ADR은 별도 브랜치 없음. 브랜치 계층은 epic→task 2단까지. ADR = task 브랜치 위의 커밋 단위(작업→커밋 반복, 커밋 제목에 `(WIW-{N}--ADR-{M})` 병기가 ADR completed의 증거). 병렬 ADR(touches 불겹침)은 서브에이전트 위임하되 산출물은 메인 스레드가 검수 후 task 브랜치에 ADR 단위로 순차 커밋
- 이 레포의 기본 브랜치·develop 유무·배포 매핑은 git 초기화와 호스팅 확정 시 이 절에 추기합니다

## git 규약

- 원격 = `origin` → `git@github.com-lazystar:sana-lazystar/wedding-invitation-web.git`. GitHub 계정 `sana-lazystar` 전용 SSH 별칭(`~/.ssh/config`의 `github.com-lazystar`)을 씁니다. 기본 브랜치는 `main`. develop 유무와 호스팅은 미정
- `main`에는 직접 커밋하지 않습니다. 사용자 훅(`~/.claude/hooks/jarfis-safety.sh`)이 막습니다. 문서 커밋도 브랜치(`docs/{slug}`)에서 하고, main 반영은 이산하의 PR로 합니다. 부트스트랩은 `docs/bootstrap` 브랜치입니다
- 커밋 계정은 `sana-lazystar`(`sana.lazystar@gmail.com`)입니다. 전역 git 계정이 다르므로 이 레포의 로컬 config로 고정했습니다(2026-09-06). 커밋 전에 `git config user.name`이 `sana-lazystar`인지 반드시 확인하고, 다르면 커밋하지 않고 이산하에게 알립니다
- 문서 커밋 메시지: `docs: <요지>`. 작업 문서 커밋은 `docs: <요지> (WIW-N)`
- 코드 커밋 제목 `(WIW-N)` 병기, ADR 단위 커밋은 `(WIW-{N}--ADR-{M})`. 커밋·푸시는 위 외부 반영 게이트를 통과한 뒤에만
- pre-commit 훅 = ID 참조 무결성(`check-refs.mjs`) + 작업 문서 문체 게이트(`check-doc-style.mjs`). 설치는 `sh docs/ontology/tools/install-hook.sh`
- 검사 스크립트(후보): `WIW-0` 잔존 · status↔archive 위치 불일치 · 병렬 adr touches 겹침 · in-progress 집합↔`state.json` activeWorks 정합(보드가 경고) · frontmatter 중복 키(상태 전이 시 템플릿 빈 줄은 채우고 새 줄을 추가하지 않습니다)
