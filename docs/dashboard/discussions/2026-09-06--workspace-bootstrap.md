---
type: discussion
status: in-progress
created: 2026-09-06 16:26:49
updated: 2026-09-06 16:40:38
completed:
participants: 이산하, Claude
related: []
jira:
---

# 작업환경 부트스트랩 — medistream-chat-hub 체계 계승

## 발단

결혼식 모바일 청첩장 웹을 만들 레포를 새로 엽니다. 이산하가 `~/medistream-chat-hub`의 `dashboard/`·`ontology/` 구조를 파악해서 같은 방식으로 작업환경을 만들자고 했습니다. 참고 레포와 달리 이 레포는 코드를 함께 둡니다. 도메인(청첩장에 무엇이 들어가는가)은 환경을 세운 뒤에 논의합니다.

## 로그

### 2026-09-06 16:26 이전 · 이산하 (T1)

- 이 디렉토리에서 청첩장 웹을 작업한다. `docs/`는 만들어 뒀고 git 저장소는 아직 아니다.
- `~/medistream-chat-hub`의 `dashboard`·`ontology`를 읽고 무슨 역할을 했는지 파악해 달라.

### 2026-09-06 16:26 이전 · Claude (T1)

- 참고 레포 전수 파악. 3축(dashboard 작업 · cooperation 사람 · ontology 규격) + 루트 라우터 CLAUDE.md + 문체 기준 WRITER.md. 12커밋, 도구 8개. `~/session-registration-system`은 이 머신에 없어 실질 원본은 medistream-chat-hub다.
- 청첩장과 다른 점 둘. 참고 레포는 코드를 다른 레포에 두는 전제라 외부 반영 게이트·크로스레포 규칙이 그대로는 맞지 않는다. ontology의 실측 도구(AWS 가드·좌표 검사)와 도메인 서랍 대부분은 운영 중 시스템 조사용이라 필요 없다.

### 2026-09-06 16:26 이전 · 이산하 (T2~T5)

- dashboard부터 잡자. `state.json`은 `activeWorks`라는 이름으로 활성 작업을 관리한다. 평탄 목록과 계층 key-value 중 무엇이 나은가.
- Claude가 ID 키 객체에 title·parent·path를 넣자고 제안하자, 그 필드들은 관리 부담이라고 지적했다. `state.json`의 목적은 지금 진행 중인 것을 파악하는 것이다. title 대신 파일명 `WIW-1--{slug}`을 그대로 쓰면 된다.

### 2026-09-06 16:26 이전 · Claude (T2~T5)

- 처음 제안(ID 키 객체 + title·parent·path)은 참고 레포 항목 형태를 답습한 것이었다. 전부 frontmatter와 파일명에서 파생 가능하고, 참고 레포도 "frontmatter↔state.json 정합" 검사를 후보로 적어 둘 만큼 중복 비용을 겪었다.
- 정정 결과: `activeWorks`는 `status: in-progress`인 문서의 파일명 목록만 담는다. 갱신은 착수·종결 두 시점. adr은 서브에이전트가 클레임하는 문서라 넣지 않고 보드가 frontmatter로 보여준다.

### 2026-09-06 16:26 이전 · 이산하 (T6)

- 참고 레포의 `dashboard/README.md`·`WRITER.md`·`state.json`을 `docs/`로 옮겼다(MCH→WIW 치환). 이 레포에서는 `docs/`가 medistream-chat-hub의 역할을 한다. 코드와 작업 문서가 한 레포에 있는 셈이다.
- 이에 맞춰 수정할 부분을 점검하고, 작업을 진행하기 위해 옮겨야 할 것들을 같은 구조로 잡아 달라.

### 2026-09-06 16:34:57 · Claude (T6)

- 경로 규칙: 모든 경로는 레포 루트 기준(`docs/…`)으로 씁니다. 도구 스크립트의 ROOT는 레포 루트, 문서 루트는 `docs/`입니다.
- 산출물:
  - 루트: `CLAUDE.md`(라우터. 2축 + 코드 동거) · `.gitignore`
  - `docs/dashboard/`: `templates/` 6종(MCH→WIW, `docs/` 경로, 참고 레포의 지시 출처 문구 제거) · `.ids/` · 타입 디렉토리 5종 · `archive/` 미러(`.gitkeep`) · 이 논의록
  - `docs/dashboard/README.md` 수정 15곳: bugfix ID 오기(`WIW`→`WIW-{N}`) · §진행 중 작업 전면 교체(activeWorks 파일명 목록) · §논의·§git 규약의 `docs/` 경로 · §경계 코드 소유 문구 · §외부 반영 게이트 "이 레포 밖"→"`docs/` 밖" · §브랜치 마지막 항목 · §git 규약 원격 미정 문구 · 검사 후보의 state.json 정합 항목
  - `docs/ontology/`: `README.md`(서랍 정의. 예정 서랍은 디렉토리만 있음) · 원장 5종 빈 골격 · `tools/` 4개(`check-refs.mjs` ROOT·NS 표 수정, `check-doc-style.mjs` 경로 수정, `board.mjs` frontmatter 기반으로 재작성 + activeWorks 정합 경고, `install-hook.sh` `docs/` 경로)
- 계승하지 않은 것: `cooperation/`(외부 협업 기록이 생기면 그때) · `aws-guard.mjs`·`aws-ro`·`check-coords.mjs`·`repos.json`(운영 시스템 실측용) · `board-html.mjs`(폰 보드) · `.claude/settings.json`(AWS 훅)
- 하지 않은 것: git 초기화 · 훅 설치(git 필요) · 단일 레포 단순화(README §쪼개기·§병렬·§브랜치의 크로스레포 규칙과 템플릿의 `repos`·`deploy-order` 필드는 그대로 두고 결정 대기)
- 검증: `node docs/ontology/tools/check-refs.mjs` íµê³¼(ì¤ìº 16íì¼ Â· ì¸ì© 3ê±´ í´ì Â· ìì¸ 1í ì í©) Â· `node docs/ontology/tools/check-doc-style.mjs` íµê³¼(ì¤ìº 5íì¼, ëìÂ·ë³¼ë 0) Â· `board.mjs` ë¹ ë³´ë ë ë ì ì. ìì ë¬¸ì 5ê°(storyÂ·epicÂ·taskÂ·adrÂ·bugfix)ì ì´ê¸ë activeWorksë¡ ì¤ëª¨í¬ í ìë³µ. í¸ë¦¬ ë ëì ì´ê¸ë¨ ê²½ê³ (in-progress ëë½ 2ê±´ Â· ì ë ¹ í­ëª© 1ê±´) íì¸

### 2026-09-06 16:40:10 이전 · 이산하 (T7)

- CLAUDE.md는 잡다한 내용이 많아 직접 수정하겠다. 그 전에 이 디렉토리를 GitHub 저장소로 만들자. 원격은 SSH 기준 `git@github.com:sana-lazystar/wedding-invitation-web.git`에 만들어 뒀다.
- git user는 `sana-lazystar`여야 한다. 커밋 전에 반드시 확인하고, 다른 계정이 쓰이면 알려 달라.

### 2026-09-06 16:40:10 · Claude (T7)

- 확인 결과 전역 git 계정은 `cto-tripperkorea`(`cto@tripperkorea.com`)이고 SSH 기본 키도 같은 계정으로 인증됐다. 이산하의 기존 관례는 `~/.gitconfig`의 includeIf(`~/sana-lazystar/` 아래면 `sana-lazystar` 계정)와 `~/.ssh/config`의 `github.com-lazystar` 별칭이다. 이 레포는 그 디렉토리 밖이라 규칙이 걸리지 않았다.
- 조치: `git init -b main` → 레포 로컬 config에 `user.name=sana-lazystar`, `user.email=sana.lazystar@gmail.com` 고정 → 원격 `origin`을 별칭 URL `git@github.com-lazystar:sana-lazystar/wedding-invitation-web.git`로 등록 → `ssh -T git@github.com-lazystar`가 "Hi sana-lazystar!"로 응답하는 것 확인 → `git ls-remote`로 원격이 비어 있음 확인 → `sh docs/ontology/tools/install-hook.sh`로 훅 설치.
- main에서 첫 커밋을 시도하자 사용자 훅 `~/.claude/hooks/jarfis-safety.sh`가 "Direct commit to main is blocked"로 차단했다(패치·커밋 모두 미실행). 우회하지 않고 `docs/bootstrap` 브랜치를 만들어 거기에 커밋하고 푸시한다. 원격이 비어 있어 이 브랜치가 GitHub 기본 브랜치가 되므로, main은 이산하가 GitHub에서 만들거나 PR로 반영한다.
- README §git 규약에 원격·기본 브랜치·계정 확인 규칙·main 직접 커밋 금지를 추기했다. 첫 커밋의 해시는 다음 커밋에서 추기한다.
- 첫 커밋 `4e01e22` (2026-09-06 16:40:38 추기, 파일 33개). `docs/bootstrap` 브랜치, 작성자 `sana-lazystar <sana.lazystar@gmail.com>`, pre-commit 훅이 게이트 2종을 실행해 통과했다.

## 결정

행의 내용은 불변입니다. 상태 칸만 갱신할 수 있습니다.
결정이 뒤집히면 행을 고치지 않고 새 행으로 대체한 뒤, 옛 행 상태에 "폐기 — 결정 N으로 대체"를 적습니다.

| # | 결정 | 결정자 | 상태 |
| --- | --- | --- | --- |
| 1 | 작업 ID는 `WIW-{N}` 단일 카운터입니다. adr은 `WIW-{N}--ADR-{M}`입니다 | 이산하 | 확정 |
| 2 | 이 레포는 코드와 작업 문서를 함께 둡니다. `docs/`가 참고 레포의 역할(작업 `dashboard` · 규격 `ontology` · 문체 `WRITER.md`)을 맡고, 코드는 레포 루트에 둡니다. 경로는 레포 루트 기준 `docs/…`로 씁니다 | 이산하 | 확정 |
| 3 | `state.json`은 진행 중 파악 전용입니다. `activeWorks`에 `status: in-progress`인 story·epic·task·bugfix의 파일명(확장자 없이)만 담고, title·parent·path는 두지 않습니다. 갱신은 착수와 종결 두 시점입니다 | 이산하 (Claude 제안 정정) | 확정 |
| 4 | 체계는 `~/medistream-chat-hub`의 dashboard 규칙·템플릿 6종·게이트 2종·터미널 보드·ontology 원장 5종을 계승합니다. 그 레포의 결정 번호는 옮기지 않습니다. cooperation 축, AWS 가드, 좌표 검사, 폰 보드는 계승하지 않습니다 | Claude 제안 | 잠정 (이산하 확인 대기) |
| 5 | 원격은 GitHub `sana-lazystar/wedding-invitation-web`(SSH 별칭 `github.com-lazystar`)이고 커밋 계정은 `sana-lazystar`입니다. 전역 계정이 달라 레포 로컬 config로 고정합니다. 기본 브랜치는 `main`이고 직접 커밋하지 않습니다(사용자 훅). 문서 커밋도 브랜치에서 하고 main 반영은 이산하 PR입니다. develop 유무는 미정입니다 | 이산하 (원격·계정·훅), Claude (로컬 config·브랜치 규칙) | 확정 |

## 정본 반영 점검 (완결 전)

점검 대상 목록의 정본 = `docs/dashboard/README.md` §논의 "완결 전 정본 반영 점검 대상". 이 논의는 체계 자체를 세우는 논의라 도메인 정본(정책·DB·API·IA)은 대상이 없습니다. `docs/ontology/decisions.md` 논의록 결정 색인에 이 논의록을 등재했습니다.

## 적재

없음. 작업 문서는 요구 정의 논의 뒤에 적재합니다.
