---
id: WIW-2
type: task
status: todo
created: 2026-09-06 17:56:12
updated: 2026-09-06 17:56:12
completed:
epic:
jira:
repos: [wedding-invitation-web]
design-refs: [docs/dashboard/discussions/2026-09-06--tech-stack-and-infra.md, docs/ontology/topology/system-context.md]
code-refs: []
related: [WIW-1, WIW-3]
---

# WIW-2 — Next.js 기본 스캐폴드

## 목적

레포 루트에 빌드되는 Next.js 앱을 세웁니다. Vercel 연동(WIW-3)의 선행 조건입니다. 화면 내용은 만들지 않습니다.

## 작업내용

공식 CLI `create-next-app@latest`를 npm으로 씁니다(스택 결정 15). 레포 루트에는 `CLAUDE.md`·`docs/`가 있어 임시 디렉토리에 만든 뒤 레포 루트로 옮깁니다.

```
npx create-next-app@latest <임시 디렉토리> --ts --app --src-dir --tailwind --eslint --turbopack --import-alias "@/*" --use-npm --empty --disable-git --skip-install
```

옮길 때 셋을 병합합니다. `.gitignore`는 스캐폴드 항목(`.next/`·`.vercel`·`.env*`·`next-env.d.ts` 등)과 기존 항목(`docs/gallery/`·`docs/design/`·`.playwright-mcp/`)을 합칩니다. 스캐폴드가 만든 `CLAUDE.md`는 버리고 라우터 `CLAUDE.md`에 `AGENTS.md` 포인터 한 줄을 더합니다. `README.md`는 스캐폴드 것을 두되 제목을 프로젝트명으로 바꿉니다. 그 뒤 레포 루트에서 `npm install`로 `package-lock.json`을 만듭니다.

하지 않는 것은 다음과 같습니다. 페이지·컴포넌트·이미지 스크립트를 만들지 않습니다. `vercel.json`을 만들지 않습니다. 의존성을 추가하지 않습니다.

## 주의할 점

대기: WIW-1의 develop 머지. 그 뒤 develop에서 `feature/WIW-2-nextjs-scaffold`를 냅니다. `git add`는 경로를 명시합니다. Node 22.22가 설치돼 있습니다. 실행 직전 `[게이트] WIW-2`를 표시합니다.

## 완료 기준

- [ ] 레포 루트에 `package.json`·`next.config.ts`·`tsconfig.json`·`src/app/`·`AGENTS.md`가 있고 스캐폴드 `CLAUDE.md`는 없음
- [ ] `.gitignore`에 스캐폴드 항목과 기존 항목이 모두 있음
- [ ] `npm run lint`·`npm run build` 통과
- [ ] `docs/ontology/README.md` §코드가 SSOT인 것들 표에 `next.config.ts`·`package.json` 등록
- [ ] 구현 기록 기입 (브랜치·커밋)

## 구현 기록

없음.
