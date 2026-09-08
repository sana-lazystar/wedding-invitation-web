# wedding-invitation-web

결혼식 모바일 청첩장 웹입니다. 코드와 작업 문서를 한 레포에 둡니다.

- 작업 · 규격 문서는 `docs/`에 있고, 시작점은 `CLAUDE.md`입니다.
- 시안의 정본은 `docs/artifacts/index.html`(CSS · 마크업)입니다. `src/app/globals.css`는 `node docs/scripts/sync-globals.mjs`가 그 파일에서 만드는 파생물이라 직접 고치지 않습니다.
- 화면 구조와 고치는 자리는 `docs/artifacts/README.md`에 정리돼 있습니다.

## 띄우기

```bash
npm install
npm run dev     # http://localhost:3000
```

지도(카카오맵)와 카카오톡 공유를 켜려면 `.env.local`에 앱 키가 필요합니다. 키가 없어도 나머지는 그대로 돕니다.

```
NEXT_PUBLIC_KAKAO_MAP_KEY={Kakao Developers 앱의 JavaScript 키}
```

## 게이트

```bash
npx tsc --noEmit -p .
npx eslint src
npm run build
```

문서를 고쳤으면 `node docs/ontology/tools/check-refs.mjs`와 `node docs/ontology/tools/check-doc-style.mjs`도 지나야 합니다. pre-commit 훅이 두 검사를 겁니다(설치는 `sh docs/ontology/tools/install-hook.sh` 1회).

## 코드 구조 (`src/`)

| 자리 | 무엇 |
| --- | --- |
| `app/page.tsx` | 조립만 합니다. 훅을 부르는 순서가 곧 효과 순서입니다 |
| `app/layout.tsx` · `app/manifest.ts` | 메타(제목 · 설명 · OG · 아이콘)와 웹 앱 매니페스트 |
| `components/scenes/` | 와이어프레임 한 쪽 = 파일 하나. 마크업은 조립본과 1:1입니다 |
| `components/viewers/` | 만화 · 사진 덮개 |
| `components/ui/` | 늘 떠 있는 것(알림 · 바로 가기 메뉴 · 음악)과 작은 부품 |
| `hooks/` | 화면 높이 고정 · 진입 장면 · 쪽지 나타나기 · 덮개 · 지도 · 마지막 장면 · 음악 · 메뉴 · 알림 |
| `lib/` | 바깥 것을 다루는 도구(클립보드 · 소리 · 카카오 SDK) |
| `content/` | 값(제목 · 설명 · 예식장 · 계좌 · 사진첩 매니페스트) |
