---
type: discussion           # ID 없음 — 논의는 작업이 아니므로 WIW 번호를 소비하지 않는다
status: in-progress        # in-progress → completed | dropped
created: YYYY-MM-DD HH:mm:ss
updated:                   # 마지막 수정 시각
completed:                 # completed | dropped 전이 시각
participants:              # 사람, AI
related: []                # 참조하는 WIW-{N} ID (옵션)
jira:                      # 옵션
---

# 주제

파일명은 `YYYY-MM-DD--slug.md`로 만듭니다. 본문은 append-only입니다 — 이미 적은 내용은 지우지 않고 정정을 덧붙입니다.

## 발단

왜 이 논의가 시작됐는지 씁니다.

## 로그

AI와의 논의는 턴 단위로 그 자리에서 기록합니다. 논의가 끝날 때 몰아서 정리하지 않습니다.
기록 수위는 턴별 요지입니다(전문 아님). 결정의 정본은 아래 결정 표입니다.

### YYYY-MM-DD HH:mm:ss · 화자 (T1)

- 요지를 씁니다. 시각은 `date '+%Y-%m-%d %H:%M:%S'` 실측값을 씁니다.

## 결정

행의 내용은 불변입니다. 상태 칸만 갱신할 수 있습니다.
결정이 뒤집히면 행을 고치지 않고 새 행으로 대체한 뒤, 옛 행 상태에 "폐기 — 결정 N으로 대체"를 적습니다.

| # | 결정 | 결정자 | 상태 |
| --- | --- | --- | --- |

## 정본 반영 점검 (완결 전)

점검 대상 목록의 정본 = `docs/dashboard/README.md` §논의 "완결 전 정본 반영 점검 대상" (정책·DB·API·IA + open-questions 열린 액션·requirements·risks·glossary·artifacts). 같은 커밋에서 대조합니다. 다른 논의록의 결정을 뒤집었으면 그 표의 상태 칸에 "폐기 — {이 파일}:결정 N으로 대체"를 적습니다.

## 적재

이 논의에서 생성된 epic·task·bugfix ID를 분해 승인 후 적습니다.
