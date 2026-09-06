---
id: WIW-0
type: task
status: todo               # todo → in-progress → completed | dropped
created: YYYY-MM-DD HH:mm:ss
updated:                   # 마지막 수정 시각 — 수정할 때마다 갱신
completed:                 # completed | dropped 전이 시각 — 하위 ADR 전부 완료 + 완료 기준 충족 시점
epic:                      # 소속 epic ID. 단독 task면 비워둔다
jira:                      # 옵션 — 없으면 브랜치는 feature/WIW-{N}-{slug} 폴백
repos: []                  # 항상 1개 — 레포 2개 이상을 건드리게 되면 epic으로 승격
design-refs: []            # 근거 문서·디자인 — 이 레포 경로 또는 '라벨: URL'
code-refs: []              # 타 레포 코드 좌표 — '레포명: 파일의 심볼명' (라인 번호 금지)
related: []                # WIW-{N} ID만 적는다
---

# WIW-0 — 제목

본문은 `docs/WRITER.md` 문체로 씁니다.

## 목적

이 작업으로 이루고자 하는 것을 씁니다.

## 작업내용

하고자 하는 작업 내용을 씁니다. 스코프 경계(하지 않는 것)도 여기에 씁니다.
덩어리가 크거나 병렬로 나눌 수 있으면 하위 ADR로 쪼갭니다. 쪼갠 ADR은 완료 기준의 작업 항목이 됩니다.

## 주의할 점

작업 시 유의할 점을 씁니다. 선행조건 대기는 `대기: {무엇}` 형식으로 여기에 적습니다(status에 blocked는 없습니다). 없으면 이 절을 지웁니다.

## 완료 기준

- [ ] 작업 항목. 하위 ADR이 있으면 `WIW-0--ADR-1` 단위로 나열합니다
- [ ] 대상 레포 게이트 통과 (lint·test. 명령은 그 레포가 소유)
- [ ] 구현 기록 기입 (브랜치·커밋)

단독 task(epic 없음)는 epic 역할을 겸하므로 PR 초안 전달까지가 완주입니다. 초안은 이 파일 말미에 `## PR 초안` 절로 남깁니다.

## 구현 기록

작업이 실린 브랜치와 커밋 해시, 완료 시각을 남깁니다. PR·머지·배포는 알게 되는 시점에 추기합니다(선택).
예: `2026-08-30 14:02:11 · feature/WIW-12-apply-form · abc1234`
