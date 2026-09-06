---
id: WIW-0--ADR-1
type: adr
status: todo               # todo → in-progress → completed | failed. 착수 전 계획 폐기는 todo → dropped
created: YYYY-MM-DD HH:mm:ss
updated:                   # 마지막 수정 시각 — 수정할 때마다 갱신
completed:                 # completed | failed | dropped 전이 시각
parent: WIW-0              # 부모 task 또는 bugfix ID
touches: []                # 이 ADR이 건드릴 파일·디렉토리 — 병렬 ADR끼리 겹치면 안 된다
code-refs: []              # 참조할 코드 좌표 — '레포명: 파일의 심볼명' (라인 번호 금지)
related: []                # WIW-{N} ID만
---

# WIW-0--ADR-1 — 제목

스텁 단계(부모 분해 시)에는 frontmatter와 목적까지만 채웁니다. 아래 절들은 착수한 세션이
todo → in-progress 전이(= 클레임) 후, 대상 코드를 실제로 연 상태에서 작성합니다.
서술 절(목적·실행 기록)은 `docs/WRITER.md` 문체로 씁니다. touches·code-refs·테스트 케이스·실행 명세의
좌표는 표·목록 형태를 유지합니다. 실행 서브에이전트가 그대로 읽기 때문입니다.

## 목적

부모 작업의 어느 조각을 맡는지 한두 줄로 씁니다.
선행 ADR이 있으면 `대기: WIW-0--ADR-1` 형식으로 여기에 씁니다.

## 테스트 설계

완료 판정 기준입니다. 구현보다 먼저 씁니다(TDD).
로직 중심 케이스를 나열합니다. 컴포넌트 단위의 e2e는 지양합니다.
테스트로 잡을 로직이 없으면(마크업 등) 이 절을 지우고, 실행 기록에 수동 확인 방법과 결과를 남깁니다.

- 케이스:

## 실행 명세

어떻게 실행하는지 씁니다. 파일 좌표와 순서와 구체 변경 내용을 적습니다.

1.

## 실행 기록

append-only. 실행하며 그 자리에서 추기합니다. 예상과 달랐던 것, 우회한 문제, 완료 시 커밋 해시를 남깁니다.
완료 커밋은 부모 task 브랜치에 올리고, 커밋 제목에 `(WIW-0--ADR-1)`을 병기합니다.
접근이 무효로 판명되면 이 문서를 고쳐 쓰지 않고 failed로 닫은 뒤 새 순번을 발급합니다.
