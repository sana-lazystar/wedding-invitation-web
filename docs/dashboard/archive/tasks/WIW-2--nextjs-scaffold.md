---
id: WIW-2
type: task
status: completed
created: 2026-09-06 17:56:12
updated: 2026-09-06 18:06:57
completed: 2026-09-06 18:03:20
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

WIW-1은 2026-09-06 머지됐습니다(daa9e63). 승인: 이산하 2026-09-06 "위에거 답변 되면 나머지 동의"(스택 논의록 T8). develop에서 `feature/WIW-2-nextjs-scaffold`를 냅니다. `git add`는 경로를 명시합니다. Node 22.22가 설치돼 있습니다. 실행 직전 `[게이트] WIW-2`를 표시합니다.

## 완료 기준

- [x] 레포 루트에 `package.json`·`next.config.ts`·`tsconfig.json`·`src/app/`·`AGENTS.md`가 있고 스캐폴드 `CLAUDE.md`는 없음
- [x] `.gitignore`에 스캐폴드 항목과 기존 항목이 모두 있음
- [x] `npm run lint`·`npm run build` 통과
- [x] `docs/ontology/README.md` §코드가 SSOT인 것들 표에 `next.config.ts`·`package.json` 등록
- [x] 구현 기록 기입 (브랜치·커밋)

## 구현 기록

- 2026-09-06 18:03:20 · feature/WIW-2-nextjs-scaffold · 8a48f39 · create-next-app@latest 16.3.4(npm, 템플릿 app-tw-empty)를 임시 디렉토리에 생성해 레포 루트로 이동. `.gitignore`·`README.md`·`CLAUDE.md` 병합, package.json 이름 `wedding-invitation-web`. `npm install`(365 패키지) · `npm run lint` 통과 · `npm run build` 통과(라우트 `/`·`/_not-found` 정적). 브랜치는 origin에 푸시했습니다
- 게이트 표시: `[게이트] WIW-2 | 승인 근거: "위에거 답변 되면 나머지 동의"`
- 참고: `npm install` 중 `eslint@9.39.5` 지원 종료 경고가 났습니다. 스캐폴드가 고정한 버전이며 동작에는 문제가 없습니다. 올릴지는 다음 task에서 판단합니다
- PR 생성·develop 머지·develop→main PR은 이산하 몫입니다. 알게 되면 여기에 추기합니다
- 추기 2026-09-06 18:06:57: PR #2를 develop에(cfbb1ba), PR #3으로 develop을 main에(8397e14) 이산하가 머지했습니다(2026-09-06). main에 빌드되는 앱이 있으므로 WIW-3의 대기 조건이 풀렸습니다

## PR 초안

- 제목: `chore: Next.js 16 기본 스캐폴드 (WIW-2)`
- base `develop` ← compare `feature/WIW-2-nextjs-scaffold`. 생성 링크: https://github.com/sana-lazystar/wedding-invitation-web/pull/new/feature/WIW-2-nextjs-scaffold
- 본문:

```
create-next-app@latest(npm, Next.js 16.3.4)로 만든 기본 스캐폴드입니다. TypeScript · App Router · src/ · Tailwind CSS 4 · ESLint · Turbopack · alias @/* · --empty(빈 페이지).

- .gitignore: 스캐폴드 항목 + 프로젝트 고유 항목(docs/gallery, docs/design, .playwright-mcp) 병합
- CLAUDE.md: create-next-app이 만든 CLAUDE.md의 유일한 내용인 `@AGENTS.md`를 라우터에 합쳤습니다(스택 결정 15)
- AGENTS.md: Next.js 규칙 블록. `next dev`가 다시 써 넣으므로 커밋합니다
- 검증: npm run lint, npm run build 통과

작업 문서: docs/dashboard/archive/tasks/WIW-2--nextjs-scaffold.md

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_013M7tydtaUBR4nNbopbPFcJ
```

