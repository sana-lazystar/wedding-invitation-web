---
id: WIW-0
type: epic
status: backlog            # backlog → in-progress → completed | dropped
created: YYYY-MM-DD HH:mm:ss
updated:                   # 마지막 수정 시각 — 수정할 때마다 갱신
completed:                 # completed | dropped 전이 시각
story:                     # 소속 story ID. 스토리 밖 크로스레포 잔일이면 비워둔다 — 단독 epic
jira:                      # 옵션 — 조직 보고용 티켓 키
repos: []                  # 필수 — 이 epic이 닿는 레포 전부
deploy-order: ''           # repos 2개 이상일 때만 — '순서 (🔴|🟡|🟢 — 어기면 증상)'
related: []                # WIW-{N} ID만 적는다
---

# WIW-0 — 제목

본문은 `docs/WRITER.md` 문체로 씁니다.

## 목적

이 작업으로 이루고자 하는 것을 씁니다. 근거가 된 논의(discussion·미팅록)를 경로로 참조합니다.

## 설명

하고자 하는 작업 내용을 씁니다. 무엇이 포함되고 무엇이 빠지는지 경계가 드러나게 씁니다.
하위 task 목록은 여기에 베끼지 않습니다. `grep 'epic: WIW-0' tasks/`가 원본입니다.

## 주의할 점

작업 시 유의할 점을 씁니다. 없으면 이 절을 지웁니다.

## PR 초안

story 소속 epic은 이 절을 지웁니다. epic→story 머지는 무배포라서 브랜치에서 바로 하기 때문입니다.
단독 epic만 완주 시점에 레포별 PR 초안(제목·본문)을 남깁니다. PR 생성은 사람이 직접 합니다.
초안 본문에는 형제 PR 안내와 배포 순서(deploy-order의 결합 세기·미배포 증상)를 포함합니다.
