---
id: WIW-1
type: task
status: todo
created: 2026-09-06 17:43:58
updated: 2026-09-06 17:44:52
completed:
epic:
jira:
repos: [wedding-invitation-web]
design-refs: [docs/dashboard/discussions/2026-09-06--tech-stack-and-infra.md, docs/ontology/topology/system-context.md]
code-refs: []
related: []
---

# WIW-1 — 원본·에셋 폴더 git 제외

## 목적

원본 사진과 디자인 에셋이 커밋에 딸려 들어가지 않게 합니다. 원본은 git 밖에 둔다는 스택 결정 5를 레포 설정으로 굳힙니다.

## 작업내용

레포 루트 `.gitignore`에 두 줄을 더합니다.

```
docs/gallery/
docs/design/
```

하지 않는 것은 다음과 같습니다. `docs/` 전체를 제외하지 않습니다(Q6). 이미 추적 중인 파일을 지우지 않습니다. 두 폴더 안에 추적 중인 파일은 없습니다.

## 주의할 점

대기: Q6(제외 범위) 답과 이산하의 착수 승인. 실행 직전 `[게이트] WIW-1`을 표시합니다. 브랜치는 `feature/WIW-1-gitignore-asset-folders`이고 develop에서 냅니다.

## 완료 기준

- [ ] `.gitignore`에 두 줄 추가
- [ ] `git status`에 `docs/gallery/`·`docs/design/`가 보이지 않음
- [ ] `git check-ignore -v docs/gallery/01.jpg`가 규칙을 출력
- [ ] 구현 기록 기입 (브랜치·커밋)

## 구현 기록

없음.
