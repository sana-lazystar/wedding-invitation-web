---
id: WIW-3
type: task
status: todo
created: 2026-09-06 17:56:12
updated: 2026-09-06 17:56:12
completed:
epic:
jira:
repos: [wedding-invitation-web]
design-refs: [docs/ontology/topology/system-context.md]
code-refs: []
related: [WIW-2]
---

# WIW-3 — Vercel 프로젝트 연동

## 목적

GitHub 레포를 Vercel Hobby 프로젝트에 연결해 `main` → production, 그 밖의 브랜치 → preview 배포가 돌게 합니다(스택 결정 3·9).

## 작업내용

이산하가 Vercel 대시보드에서 `docs/ontology/topology/system-context.md` §11 절차를 따라 프로젝트를 만듭니다. Claude는 대시보드에 접근하지 않습니다. 연결 뒤 Claude가 production URL을 읽기 전용으로 확인하고, 프로젝트 이름·URL·리전을 topology §2에, 배포 매핑을 `docs/dashboard/README.md` §브랜치 워크플로에 적습니다.

하지 않는 것은 다음과 같습니다. 커스텀 도메인을 붙이지 않습니다(스택 결정 7). 환경 변수·연동 서비스를 추가하지 않습니다.

## 주의할 점

대기: WIW-2가 `main`에 반영됨(develop→main PR). 그 전에 import하면 레포 루트가 정적 사이트로 배포됩니다. 호스팅 자원 생성은 외부 반영 게이트 대상이며 이산하가 직접 수행합니다.

## 완료 기준

- [ ] production URL에서 스캐폴드 페이지가 열림
- [ ] develop 또는 feature 브랜치 push가 preview 배포를 만듦
- [ ] topology §2 프로비저닝 후 확정 칸과 README §브랜치 워크플로 배포 매핑 기입
- [ ] 구현 기록 기입

## 구현 기록

없음.
