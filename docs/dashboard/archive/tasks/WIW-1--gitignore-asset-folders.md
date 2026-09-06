---
id: WIW-1
type: task
status: completed
created: 2026-09-06 17:43:58
updated: 2026-09-06 17:54:34
completed: 2026-09-06 17:51:19
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

승인: 이산하 2026-09-06 "제외 범위 두 폴더만", "WIW-1 실행 승인"(Q6 닫힘, 스택 결정 13). 실행 직전 `[게이트] WIW-1`을 표시합니다. 브랜치는 `feature/WIW-1-gitignore-asset-folders`이고 develop에서 냅니다.

## 완료 기준

- [x] `.gitignore`에 두 줄 추가
- [x] `git status`에 `docs/gallery/`·`docs/design/`가 보이지 않음
- [x] `git check-ignore -v docs/gallery/01.jpg`가 규칙을 출력
- [x] 구현 기록 기입 (브랜치·커밋)

## 구현 기록

- 2026-09-06 17:51:19 · feature/WIW-1-gitignore-asset-folders · 528c02d · `.gitignore`에 `docs/gallery/`·`docs/design/` 추가. 검증: `git status --short`에 두 폴더 미표시, `git check-ignore -v`가 4·5행 규칙을 출력. 브랜치는 origin에 푸시했습니다
- 게이트 표시: `[게이트] WIW-1 | 승인 근거: "제외 범위 - 두 폴더만", "WIW-1 실행 승인"`
- PR 생성·develop 머지는 이산하 몫입니다. 알게 되면 여기에 추기합니다
- 정정 추기 2026-09-06 17:54:34: 완주 기록 커밋 bd3f8e1에 `git add docs`로 원본 사진·디자인 에셋이 딸려 들어가 c8a4f07로 다시 커밋하고 origin/develop을 force-push로 덮어썼습니다. 상세는 스택 논의록 T6 추기 2

## PR 초안

- 제목: `chore: 원본 사진·디자인 에셋 폴더 git 제외 (WIW-1)`
- base `develop` ← compare `feature/WIW-1-gitignore-asset-folders`. 생성 링크: https://github.com/sana-lazystar/wedding-invitation-web/pull/new/feature/WIW-1-gitignore-asset-folders
- 본문:

```
`.gitignore`에 `docs/gallery/`(원본 사진)와 `docs/design/`(디자인 에셋)을 추가합니다.
원본은 git 밖에 둔다는 스택 결정 5·13의 레포 설정 반영입니다. 추적 중이던 파일은 없어 삭제되는 것이 없습니다.

검증: `git check-ignore -v docs/gallery/01.jpg` → `.gitignore:4:docs/gallery/`

작업 문서: docs/dashboard/archive/tasks/WIW-1--gitignore-asset-folders.md

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_013M7tydtaUBR4nNbopbPFcJ
```

