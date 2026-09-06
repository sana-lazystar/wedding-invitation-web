> **동결본 (기준 = 각 서비스 공식 문서·가격 페이지 조회 · 2026-09-06)**. 본문은 편집하지 않습니다. 조사 Sonnet 3 병렬(①Vercel Hobby ②대안 호스팅 ③스토리지·DB) → 메인 스레드가 추천에 직접 걸리는 사실 1건(Vercel Fair Use 기부 조항) 원문 대조 → 조립은 메인 스레드. 현행 정본은 `docs/ontology/topology/`(호스팅 확정 후)·`risks.md`·`open-questions.md`입니다. 값은 조회 시점의 사실이며 설계·구현 시 재검증합니다. 재조사 시 새 날짜 문서를 만들고 이 헤더에 대체 포인터를 답니다.
> 조사 전제: 모바일 청첩장, 비상업 개인용, 열람 총 1천~5천 회(수개월, 피크 1일), 고정 갤러리 30~60장(원본 2~8MB), 방명록·참석 여부·하객 업로드는 "있을 수도 있음".

# 무료 티어 조사 (2026-09-06)

## 1. Vercel Hobby 플랜

### 사실 표

| # | 항목 | 값 | 출처 URL | 비고 |
|---|---|---|---|---|
| 1 | Hobby 이용 자격(개인/비상업적 사용 제한) | Hobby 팀은 **non-commercial personal use**로 제한. 상업적 사용 정의: 제작에 관여한 "누구든"(유급 직원·컨설턴트 포함)이 금전적 이익을 목적으로 하는 배포. 결제 요청/처리, 상품·서비스 광고, 사이트 제작/운영 대가 수령, 어필리에이트 링크가 주목적, 광고(Google AdSense 등) 게재가 해당. **"기부금 요청(Asking for Donations)"도 상업적 사용에 해당한다고 명시.** | https://vercel.com/docs/limits/fair-use-guidelines (last_updated 2026-07-29) | 사진·인사말·오시는 길·RSVP만 있는 순수 청첩장은 통상 허용 범위. 다만 **계좌번호 등 축의금(마음 전하실 곳) 안내가 있으면 "기부 요청"으로 해석될 여지**가 있어 100% 명확하지 않음(문서도 "불확실하면 Support에 문의"라고 안내). 메인 스레드 원문 대조 2026-09-06: 본문 노트에 "Asking for Donations fall under commercial usage." 문구 실재 |
| 2 | Fast Data Transfer / Fast Origin Transfer | Fast Data Transfer **100GB/월** 포함, Fast Origin Transfer **10GB/월** 포함 | https://vercel.com/docs/limits/fair-use-guidelines, https://vercel.com/pricing | "월간 사용량 가이드라인"(fair use guideline)이며 하드 캡이 아니라는 뉘앙스지만 실질적으로 Hobby included usage로 취급됨 |
| 3 | Edge Requests / Function Invocations / Active CPU / Provisioned Memory / 최대 함수 실행시간 | Edge Requests **1M/월**, Function Invocations **1M/월**, Active CPU **4시간/월**, Provisioned Memory **360 GB-hrs/월**, 최대 함수 실행시간(duration) **300초(5분)** (Hobby는 이 값 고정, Pro는 기본 300초·최대 800초 설정 가능·베타로 1800초까지) | https://vercel.com/docs/functions/usage-and-pricing (2026-06-16), https://vercel.com/docs/plans/hobby (2026-08-31) | — |
| 4 | Image Optimization (Hobby) | Image Transformations **5K/월**, Image Cache Reads **300K/월**, Image Cache Writes **100K/월** 포함. 초과 시: **새 이미지만 최적화 실패**(402 상태코드 반환 → Next.js `onError` 콜백 트리거, `alt` 텍스트 노출), 이미 캐시된 이미지는 계속 정상 작동, 초과 과금 없음. 프로젝트/이미지별로 Image Optimization을 꺼서 계속 Hobby 사용 가능 | https://vercel.com/docs/image-optimization/limits-and-pricing (2026-08-11) | 관련 changelog "Exceeding included Image Optimization usage no longer pauses deployments" — **과거엔 초과 시 배포 자체가 pause 됐으나 현재는 완화**되어 사이트 전체는 안 죽음 |
| 5 | Vercel Blob (Hobby) | Storage **1GB/월**, Simple Operations **10K/월**, Advanced Operations **2K/월**, Data Transfer **10GB/월** 포함. Store 개수 한도 **100개**, 작업 속도제한 Simple 1,200/min·Advanced 900/min. **Blob은 여전히 Vercel 네이티브 제품**(마켓플레이스 아님, Global Config와 함께 네이티브로 남음) | https://vercel.com/docs/vercel-blob/usage-and-pricing (2026-08-11), https://vercel.com/pricing | 초과 시 추가 과금은 없으나 **Blob 접근 자체가 차단**되고 30일 경과 후 재사용 가능 |
| 6 | Vercel Postgres / KV (2026 상태) | **Vercel Postgres·KV는 네이티브 제품에서 폐지**되어 Marketplace 통합(Neon=Postgres, Upstash=Redis/KV, Supabase 등)으로 완전 이관됨. `vercel install neon` 등으로 프로비저닝. Neon 무료 플랜은 **신용카드 불필요**(0.5GB 스토리지·10 브랜치·100 compute-hours, 프로젝트 100개) | https://vercel.com/docs/storage (2026-09-03, Vercel 공식) / Neon·서드파티 블로그(폐지 시점: Postgres 2025년 상반기, KV 2024년 12월경) | **폐지 정확한 날짜와 Upstash 무료 티어의 신용카드 요구 여부는 Vercel 공식 문서로 확인 안 됨 → 미확인**(서드파티 소스만 존재) |
| 7 | Cron Jobs (Hobby) | 프로젝트당 최대 **100개** cron job(모든 플랜 공통). Hobby는 **하루 1회 초과 실행 불가**(시간당/분당 표현식은 배포 자체가 실패). 스케줄링 정밀도 **±59분**(예: 새벽 1시 설정 시 1:00~1:59 사이 랜덤 실행) | https://vercel.com/docs/cron-jobs/usage-and-pricing (2026-07-15) | Cron 실행은 Function 사용량(Active CPU, Invocations)에 포함되어 별도 무료 |
| 8 | 빌드 제한 (Hobby) | Hobby는 항상 **Basic 빌드머신**(2 vCPU, 8GB 메모리, 32GB 디스크) 고정 사용(Elastic 빌드머신은 유료 플랜 전용). **동시 빌드 1개**로 제한, 초과분은 순차 실행(큐잉). 배포(deployment) 횟수 **하루 100회**(Pro는 6,000회), 프로젝트 수 **200개** | https://vercel.com/docs/builds/managing-builds (2026-09-03), https://vercel.com/docs/plans/hobby (2026-08-31) | Hobby에는 "월간 총 빌드 분(minute)" 상한이 별도 문서화되어 있지 않음(빌드 자체는 무료·과금 대상 아님). 단, 관련 KB 문서 제목에 "빌드 스텝 45분 초과 시 실패" 언급이 있으나 본문 확인은 못 함 → **미확인** |
| 9 | Web Analytics / Speed Insights (Hobby) | Web Analytics: **50,000 이벤트/월**(팀 전체 공유), 데이터 보존 1개월. 초과 시 3일 유예 후 수집 일시중단, **7일 후 재개** 또는 Pro 업그레이드. Speed Insights: 최근 30일 기준 **10,000 이벤트**(팀 전체 공유), 초과 시 **14일간** 수집 일시중단. Speed Insights 자체는 모든 플랜 무료 | https://vercel.com/docs/analytics/limits-and-pricing (2026-08-25), https://vercel.com/docs/speed-insights/limits-and-pricing (2026-09-01) | 둘 다 "수집만 중단"이며 **사이트 자체는 계속 서빙됨** |
| 10 | 커스텀 도메인 (Hobby) | Hobby에서 **커스텀 도메인 연결 가능**, 프로젝트당 최대 **50개** 도메인. 모든 배포에 **`*.vercel.app` 주소 무료 기본 제공**. "Free first-year 커스텀 도메인" 프로모션은 **유료 Pro 팀 전용**(Hobby 해당 없음) | https://vercel.com/docs/domains/working-with-domains/add-a-domain (2026-08-28), https://vercel.com/docs/plans/hobby (2026-08-31) | — |
| 11 | 팀 멤버 (Hobby) | 공식 문서: "Collaborating with other members on projects is available on the **Pro and Enterprise** plans." Hobby는 **팀 협업 기능 자체가 없음**(개발자 시트 1인, Viewer/Billing 시트 불가) | https://vercel.com/docs/accounts (2026-08-28), https://vercel.com/docs/plans/hobby (2026-08-31) | 사실상 1인 전용. Git 저장소 협업(커밋 권한)과는 별개 개념 |
| 12 | 2025-2026 유료 전환/사용량 초과 시 동작 | (a) **Vercel Postgres·KV 네이티브 제품 폐지**가 대표적인 "무료 네이티브 → 유료/서드파티 마켓플레이스" 전환 사례. (b) 대부분의 개별 리소스(이미지 최적화, Blob, Web/Speed Analytics) 초과 시엔 **해당 기능만 멈추고 사이트 자체는 안 죽음**. (c) 사이트 전체가 완전히 죽는 `503 DEPLOYMENT_PAUSED`는 주로 **정책 위반(상업적 사용 등) 계정/배포 차단**, 또는 Pro의 **Spend Management** 지출 한도 초과 시 발생하는 것으로 보임 | https://vercel.com/kb/guide/why-is-my-account-deployment-blocked (2026-08-03), 각 리소스별 limits-and-pricing 문서 | **Hobby 핵심 리소스(Fast Data Transfer, Edge Requests, Active CPU 등) 자체를 초과했을 때 정확히 어떤 동작이 벌어지는지는 공식 문서에 명시적으로 나오지 않음 → 미확인.** 다만 Hobby plan 문서의 일반 원칙은 "대부분 30일 경과 후 재사용 가능"이라고 명시 |

### 특이하거나 청첩장 사이트 운영에 참고할 만한 사항

- **축의금 계좌 안내 = 상업적 사용 소지**: Vercel의 Fair Use Guidelines는 "Asking for Donations"를 명시적으로 상업적 사용(commercial usage)으로 규정합니다. 한국식 청첩장에 흔한 "마음 전하실 곳"(계좌번호) 섹션이 이 조항에 걸리는지는 문서상 완전히 명확하지 않으며, 문서 자체도 애매하면 Support에 문의하라고 권고합니다. 이 부분은 판단이 필요한 지점입니다.
- 1,000~5,000명 규모 방문자라면 Fast Data Transfer 100GB, Function Invocations 1M, Edge Requests 1M 등 핵심 리소스는 여유 있게 남을 가능성이 높습니다. 다만 신랑신부 사진/영상이 많고 이미지 최적화를 쓴다면 Image Transformations 5K/월 한도가 상대적으로 빠듯할 수 있습니다(단, 초과해도 사이트가 죽지 않고 새 이미지 최적화만 실패).
- Cron은 하루 1회+시간 정밀도 ±59분 제한이 있어, "특정 날짜/시각에 자동으로 문 닫기" 같은 정밀 타이밍이 필요한 기능에는 부적합합니다.
- Vercel Postgres/KV가 완전히 없어졌으므로, RSVP 응답을 저장하려면 Vercel Blob(파일 기반) 또는 Marketplace의 Neon(Postgres, 신용카드 불필요 확인됨)/Upstash 등을 별도로 붙여야 합니다.
- Hobby 계정은 협업 기능이 없는 1인 전용 계정입니다. 배우자와 공동 작업하려면 계정을 공유하거나 Pro로 가야 합니다.
- `*.vercel.app` 무료 서브도메인만으로도 운영 가능하며, 커스텀 도메인을 붙이더라도 Hobby에서 비용 없이 가능합니다(프로젝트당 50개까지).

## 2. 대안 호스팅 (Cloudflare · Netlify · GitHub Pages · 기타)

### 2-1. Cloudflare Workers + `@opennextjs/cloudflare` (풀스택 배포)

| 항목 | 값 | 출처 URL |
| --- | --- | --- |
| 요청 한도 | 100,000 요청/일 (Free) | https://developers.cloudflare.com/workers/platform/pricing/ |
| CPU 시간 | 요청당 10ms CPU 시간 (Free) | https://developers.cloudflare.com/workers/platform/pricing/ , https://developers.cloudflare.com/workers/platform/limits/ |
| Worker 번들 크기 | **2026-09-04 변경**: 압축(gzip) 기준 3MiB(Free)/10MiB(Paid) 제한 폐지, 이제 모든 플랜 공통 **비압축 64MiB** 한도로 통일 | https://developers.cloudflare.com/changelog/post/2026-09-04-increased-worker-size-limit/ |
| OpenNext 어댑터 문서상 한도 | `opennext.js.org` 트러블슈팅 문서는 아직 구 기준(Free 3MiB / Paid 10MiB 압축)을 기술 — 위 changelog(9/4)가 매우 최근이라 미반영 가능성. 실제 배포 시 어느 쪽이 적용되는지 표본 배포로 재확인 권장 | https://opennext.js.org/cloudflare/troubleshooting |
| OpenNext 어댑터 지원 Next.js 버전 | Next.js 16 전 버전, 14/15 최신 마이너 지원(14 지원은 2026 Q1 종료 예정 언급) | https://opennext.js.org/cloudflare |
| OpenNext 지원 기능 | App/Pages Router, Route Handlers, SSG/SSR, Middleware, next/image(Cloudflare Images 연동 설정 시), PPR, ISR, Server Actions(Node.js 런타임 경유), Turbopack | https://opennext.js.org/cloudflare |
| OpenNext 미지원/제약 | Next.js 15.2+ "Node Middleware"는 미지원. Node.js 런타임 기반이라 Edge 런타임 전용 기능과는 다름 | https://opennext.js.org/cloudflare |
| 2026년 신규 변수: `vinext` | Cloudflare가 2026년 하반기부터 Next.js 배포 기본 권장을 OpenNext에서 **vinext**(Vite 기반 Next.js API 재구현, Cloudflare 자체 프로젝트)로 전환. Cloudflare 공식 문서: "Cloudflare recommends vinext as the default way to run Next.js applications on Cloudflare Workers" | https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/ , https://github.com/cloudflare/vinext |
| vinext 성숙도 | Cloudflare 스스로 **experimental**, "not battle-tested at scale"이라 명시, 프로덕션 신중 권고. Next.js 16.x만 타깃, 구버전 API 미지원. next/image는 "partially supported (요청 시점만)" | https://vinext.dev/ , https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/ |
| 콜드스타트 | V8 isolate 구조상 사실상 콜드스타트 없음(수 ms 이하로 보고). 공식 가격 페이지에는 콜드스타트 관련 언급 없음(3자 벤치마크 자료 기반) | https://blog.cloudflare.com/eliminating-cold-starts-with-cloudflare-workers/ (일반 배경자료, 공식 가격 문서엔 미언급) |
| 커스텀 도메인(무료 플랜) | 도메인이 Cloudflare에 연결(Free Zone으로 충분)돼 있으면 Workers Free 플랜에서도 커스텀 도메인 연결 가능. 단, 과거 커뮤니티에 "Free 플랜에 커스텀 도메인 허용 요청" 스레드가 존재해 완전한 확정은 아님 | https://community.cloudflare.com/t/request-enable-custom-domains-for-worker-free-plan/793541 , https://developers.cloudflare.com/workers/configuration/routing/custom-domains/ |
| 신용카드 필요 여부 | 불필요. Cloudflare 공식: "Start building for free — no credit card required" | https://www.cloudflare.com/plans/free/ |

### 2-2. Cloudflare Pages (참고용 — 현재는 비권장 경로)

| 항목 | 값 | 출처 URL |
| --- | --- | --- |
| 빌드 | 월 500회, 동시 빌드 1개, 빌드 타임아웃 20분 | https://developers.cloudflare.com/pages/platform/limits/ |
| 파일 한도 | 사이트당 최대 20,000 파일, 파일당 최대 25MiB | https://developers.cloudflare.com/pages/platform/limits/ |
| Next.js 서버 기능 | Pages는 Next.js server 모드(SSR 등)를 어댑터 없이 네이티브 지원하지 않음(2026-04 기준). Cloudflare 공식적으로 풀스택 Next.js는 **Workers**(OpenNext 또는 vinext)를 권장, Pages는 사실상 레거시 경로로 취급 | https://developers.cloudflare.com/pages/framework-guides/nextjs/ , https://thomasdesmond.me/posts/nextjs-pages-cloudflare-pages/ (3자 논평, 방향성은 공식 문서와 일치) |

### 2-3. Cloudflare Images / Image Transformations 무료 한도

| 항목 | 값 | 출처 URL |
| --- | --- | --- |
| 무료 변환 한도 | 월 5,000 "unique transformations" 무료. unique = (원본 이미지, 변환 파라미터) 조합 기준, 월 단위 | https://developers.cloudflare.com/images/pricing/ |
| 초과 시 동작 | 기존 캐시된 변환본은 계속 서빙, 신규 변환 요청은 9422 에러 반환. 초과분 과금 없음(Free 플랜에서는 그냥 막힘) | https://developers.cloudflare.com/images/pricing/ |
| R2 저장 이미지에도 적용 | 가능(R2 등 외부 저장 이미지도 Transformations로 최적화 가능) | https://developers.cloudflare.com/images/pricing/ |
| 신용카드 필요 여부 | 공식 가격 페이지에 명시 없음(계정 자체는 카드 불요이므로 Images 무료 티어도 불요로 추정되나, 문서상 직접 확인은 안 됨) — **미확인** | https://developers.cloudflare.com/images/pricing/ |

### 2-4. Cloudflare R2 무료 한도 (이미지 원본 저장용)

| 항목 | 값 | 출처 URL |
| --- | --- | --- |
| 스토리지 | 10 GB-month/월 (Standard storage만 해당, Infrequent Access 제외) | https://developers.cloudflare.com/r2/pricing/ |
| Class A ops (쓰기/업로드/리스트) | 100만 건/월 | https://developers.cloudflare.com/r2/pricing/ |
| Class B ops (읽기/다운로드) | 1,000만 건/월 | https://developers.cloudflare.com/r2/pricing/ |
| 이그레스(다운로드 대역폭) | 완전 무료(egress 과금 자체가 없음, 한도 개념 없음) | https://developers.cloudflare.com/r2/pricing/ |
| 신용카드 필요 여부 | 문서에 명시 없음 — **미확인**(계정 자체는 무카드 가능하나 R2 활성화 시 결제수단 요구 여부는 별도 확인 필요) | https://developers.cloudflare.com/r2/pricing/ |

### 2-5. Netlify 무료 플랜

| 항목 | 값 | 출처 URL |
| --- | --- | --- |
| 과금 체계 | **2025-09-04부로 신규 가입자는 크레딧 기반 과금으로 전환**(레거시 100GB 대역폭 고정형은 그 이전 계정만 유지) | https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/billing-faq-for-credit-based-plans/ |
| Free 플랜 크레딧 | 월 300크레딧, 하드 캡(초과 시 오토차지/오버리지 없이 다음 달까지 대기, 사이트 일시 중단) | https://www.netlify.com/pricing/ (직접 크레딧 수치는 3자 자료 다수 교차 확인: 300크레딧) |
| 크레딧 환산 | 대역폭 20크레딧/GB(≈15GB 상당), 프로덕션 배포 15크레딧/회, 웹 요청 2크레딧/1만건, 함수 컴퓨트 10크레딧/GB-시간, 폼 제출 무료 | https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/billing-faq-for-credit-based-plans/ |
| "빌드 분(build minutes)" | 신 크레딧제에서는 별도 지표로 존재하지 않음 — 배포당 15크레딧에 빌드 자체가 포함, Deploy Preview/브랜치 배포는 0크레딧 | https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/billing-faq-for-credit-based-plans/ |
| Next.js 지원(어댑터) | 오픈소스 OpenNext 기반 자체 어댑터로 App Router, SSR, ISR(시간/온디맨드), SSG, RSC, Server Actions, Middleware(Edge Functions로), Route Handlers, next/image(Netlify Image CDN 기본 사용) 대부분 지원. 13.5+ 전 버전 대상 자동 업데이트 | https://docs.netlify.com/frameworks/next-js/overview/ |
| Next.js 제약사항 | Edge 런타임 SSR이 실제로는 Functions 리전(Node.js)에서 실행, `public` 폴더 정적 파일로의 rewrite 불가, Node.js Middleware에서 C++ addon/파일시스템 API 미지원 | https://docs.netlify.com/frameworks/next-js/overview/ |
| Image CDN | 별도 무료 할당량 없이 전체 대역폭 크레딧(300크레딧=대역폭 20크레딧/GB)에 통합 소진. Image CDN 자체에 특별 레이트리밋은 없고 일반 CDN 레이트리밋 적용 | https://answers.netlify.com/t/does-image-cdn-have-rate-limits/130803 (커뮤니티, 공식 확인 필요) |
| 신용카드 필요 여부 | 불필요 | https://www.netlify.com/blog/introducing-netlify-free-plan/ (원 발표 취지), 다수 3자 소스 교차 확인 |

### 2-6. GitHub Pages (정적 전용)

| 항목 | 값 | 출처 URL |
| --- | --- | --- |
| 저장소/사이트 크기 | 소스 저장소 권장 한도 1GB, 게시된 사이트 최대 1GB | https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits |
| 대역폭 | 소프트 리밋 월 100GB | https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits |
| 빌드 빈도 | 소프트 리밋 시간당 10회(단, 커스텀 GitHub Actions 워크플로로 빌드/배포 시 이 제한 미적용) | https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits |
| 배포 타임아웃 | 10분 | https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits |
| 서버 기능 | 정적 파일만 서빙. 서버리스/엣지 함수 미지원 → Next.js Route Handlers, Server Actions, ISR, Middleware 등 서버 의존 기능 전부 사용 불가 | (정적 호스팅 서비스 정의 자체에서 도출, GitHub 공식 개요) https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages |
| `output: 'export'` 사용 시 포기하는 것 | `next/image` 기본 로더(서버 기반 온디맨드 최적화) 사용 불가 → `images: { unoptimized: true }` 또는 `loader: 'custom'` 필요. Route Handlers/Server Actions/Middleware/ISR 전부 미지원 | https://nextjs.org/docs/app/guides/static-exports |
| 이미지 최적화 우회책 | 빌드타임에 sharp 기반으로 미리 리사이즈/WebP 변환하는 커뮤니티 패키지 사용이 일반적: `next-image-export-optimizer`(정적 익스포트 후 이미지 추가 최적화 단계, sharp 사용, WebP 변환 + blur placeholder 자동 생성), 대안으로 `next-export-optimize-images` | https://github.com/Niels-IO/next-image-export-optimizer , https://github.com/dc7290/next-export-optimize-images |

### 2-7. 기타 플랫폼 (간단 확인)

| 플랫폼 | 한 줄 요약 | 출처 URL |
| --- | --- | --- |
| Render (정적 사이트) | 정적 사이트는 무제한/영구 무료, CDN 포함, **신용카드 불필요**. 단 "Web Service"(서버 필요 시)는 무료지만 15분 미사용 시 슬립 → 재요청 시 약 1분 콜드스타트 | https://render.com/articles/platforms-with-a-real-free-tier-for-developers-in-2026 (3자 자료; Render 자체 공식 가격 페이지 직접 대조는 못함 — 세부는 참고용) |
| Railway | **영구 무료 티어 없음**(2024년 폐지). 신규 가입 시 $5 트라이얼 크레딧(4~10일 소진), 이후 사용량 과금 또는 최소 월 $5 Hobby | https://kuberns.com/blogs/railway-free-tier/ (3자 자료; Railway 공식 문서 직접 대조는 못함) |
| AWS Amplify Hosting | 영구 무료 아님. "12개월 무료" 프레이밍 + 가입 시 크레딧이지 결제수단 자체는 등록 필요(AWS 계정 생성 시 카드 필수)로 통상 알려짐 — 이번 검색에서는 "신용카드 불필요" 언급도 있었으나 AWS 계정 가입 관행상 신뢰도 낮음, **사실상 카드 필요로 보는 것이 안전** | https://aws.amazon.com/free/free-tier-faqs/ (공식 FAQ, 세부 카드 요구사항은 이 자료에서 명확히 확인 못함 — **미확인** 취급) |
| Firebase App Hosting | Spark(무료) 플랜 자체는 카드 불요하나, **App Hosting은 Blaze(종량제, 결제 계정 연결) 플랜 필요** → 이 청첩장 용도로 카드 없이 쓰려면 App Hosting이 아니라 일반 Firebase Hosting(정적)만 가능 | https://firebase.google.com/pricing (공식 가격 페이지; App Hosting-Blaze 요구사항은 3자 자료 교차 확인, 공식 페이지에서 직접 문구 인용은 못함) |

### 2-8. 종합 비교표

| 플랫폼 | Next.js 지원 방식 | 무료 한도 핵심 | 이미지 최적화 | 서버 엔드포인트 | 카드 필요 | 주의 |
| --- | --- | --- | --- | --- | --- | --- |
| Cloudflare Workers (OpenNext) | `@opennextjs/cloudflare` 어댑터, Node.js 런타임 | 100,000요청/일, 10ms CPU/요청, Worker 번들 64MiB(비압축, 2026-09-04부 통일) | next/image는 Cloudflare Images 연동 설정 시 지원 | Route Handlers/Server Actions 지원(Node Middleware 15.2+는 미지원) | 불요 | OpenNext 문서 아직 구 3MiB/10MiB 압축 기준 기술 — 실측 재확인 필요 |
| Cloudflare Workers (vinext, 신규 권장) | Cloudflare 자체 Vite 기반 재구현, Cloudflare가 2026년 하반기 "기본 권장"으로 전환 | Workers Free와 동일 한도 상속 | "부분 지원, 요청 시점만" | Server Actions/Middleware/ISR 지원 명시 | 불요 | **Experimental, "not battle-tested at scale"** — 프로덕션엔 아직 위험 |
| Netlify | 자체 OpenNext 기반 런타임 어댑터 | 월 300크레딧(≈15GB 대역폭 상당), 하드캡, 초과 시 사이트 정지 | Netlify Image CDN 기본 지원(별도 무료 할당량 없이 크레딧에 통합) | ISR/SSR/Middleware/Server Actions/Route Handlers 대부분 지원 | 불요 | 2025-09-04 이후 신규 가입은 크레딧제, 트래픽 조금만 늘어도 캡 도달 가능 |
| GitHub Pages | `output: 'export'` 정적 export만 | 사이트/저장소 1GB, 대역폭 100GB/월(소프트), 빌드 10회/시간(소프트) | 서버 최적화 없음 → 빌드타임 sharp 스크립트/`next-image-export-optimizer` 필요 | 불가(정적 전용) | 불요 | 방명록/RSVP 등 서버 기능은 외부 서비스(폼 서비스, 별도 API) 연동 필수 |
| Render (정적) | 정적 export만(무료 티어 기준) | 무제한 정적 호스팅 + CDN | 없음(직접 처리 필요) | Web Service로 가능하나 15분 유휴 후 슬립+콜드스타트 | 불요 | 서버 필요 시 Web Service 무료 티어의 슬립/콜드스타트 감안 |
| Railway | 해당 없음(영구 무료 아님) | $5 트라이얼(4~10일)만 | - | - | 트라이얼도 카드 요구 이력 있음(자료 상충) | 결혼식 청첩장처럼 "몇 달" 운영에는 부적합 |
| AWS Amplify Hosting | 정적/SSR 모두 어댑터 통해 가능 | "12개월 무료" 프레이밍, 5GB 저장/15GB 전송/1000분 빌드(3자 자료) | Amplify 자체 이미지 최적화 없음(3자 자료) | 가능(SSR 지원) | 사실상 필요(AWS 계정 가입 관행) | 영구 무료 아님, 계정 가입 자체에 카드 요구가 일반적 |
| Firebase App Hosting | Next.js SSR 지원(Blaze 플랜 전제) | Blaze 종량제, "무료 한도" 있으나 결제계정 연결 필수 | 별도 확인 필요 | 가능 | **필요**(Blaze 플랜 결제수단 연결 필수) | 청첩장처럼 카드 없이 쓰려는 목적엔 부적합, 대신 순수 Firebase Hosting(정적)만 무카드 가능 |

### 2-9. 리서치 중 확인하지 못한(미확인) 항목

- Cloudflare Images/R2 무료 티어 자체가 신용카드 등록을 요구하는지 여부(계정 가입 자체는 무카드로 확인됨, 개별 서비스 활성화 시점의 요구사항은 공식 문서에서 명문화된 문장을 찾지 못함).
- Cloudflare Workers 커스텀 도메인이 100% 무제한으로 Free 플랜에 열려있는지(커뮤니티에 과거 제한 요청 스레드 존재, 현재 공식 문서에는 플랜 제약 언급 없음 — 정황상 가능해 보이나 완전 확정은 아님).
- AWS Amplify Hosting과 Firebase App Hosting의 정확한 "신용카드 요구" 여부는 공식 페이지에서 직접 인용 문구를 확보하지 못해 3자 자료 및 일반적 가입 관행에 근거해 판단함.

## 3. 무료 스토리지·DB (정지·슬립·삭제 규칙 중심)

### 3-1. 오브젝트/이미지 스토리지

| 서비스 | 무료 한도 | 정지·슬립·삭제 규칙 | 콜드스타트 | 카드 필요 | 근접 리전 | 출처 URL |
|---|---|---|---|---|---|---|
| Vercel Blob (Hobby) | 스토리지 1GB/월, 데이터 전송 10GB/월, Simple Ops 10,000/월, Advanced Ops 2,000/월, Blob Store 최대 100개, 파일당 최대 5TB(캐시는 512MB까지) | 한도 초과 시 과금은 없으나 30일간 Blob 접근 자체가 차단됨(데이터 삭제 언급 없음, 보존) | 해당없음(오브젝트 스토리지) | 불필요(Hobby 자체는 무료) | Tokyo(hnd1), Seoul(icn1) 포함 19개 리전 중 선택 가능 | https://vercel.com/docs/vercel-blob/usage-and-pricing , https://vercel.com/pricing |
| Cloudflare R2 | 스토리지 10GB-month, Class A(쓰기/목록) 100만/월, Class B(읽기) 1,000만/월, 이그레스 무료(무제한). Standard storage에만 적용, 12개월 만료 없음 | 비활성 삭제 정책 공식 문서에 명시 없음 — **미확인** | 해당없음 | 문서상 명시 없음(일반적으로 불필요, 미확인) | 리전 "선택"이 아닌 Location Hint 방식. 2026-06 추가된 apac-ne(일본·한국 특화)/apac-se(싱가포르) 힌트 존재하나 best-effort일 뿐 보장 아님 | https://developers.cloudflare.com/r2/pricing/ , https://developers.cloudflare.com/r2/reference/data-location/ , https://developers.cloudflare.com/changelog/post/2026-06-19-apac-ne-apac-se-location-hints/ |
| Cloudflare Image Transformations | 월 5,000 "고유(unique)" 변환 무료(요청 수가 아니라 이미지+옵션 조합당 월 1회 과금). 단, Cloudflare **Images**(저장소 상품) 자체는 무료 스토리지 없음 — 저장은 Paid부터 | 한도 초과 시 신규 변환만 오류(9422)로 실패, 서비스 중단 아님 | 해당없음 | 명시 없음(미확인) | Cloudflare 글로벌 엣지(한국 PoP 포함), 리전 선택 불필요 | https://developers.cloudflare.com/images/pricing/ |
| Supabase Storage | 스토리지 1GB, 이그레스 5GB(소스마다 "5GB egress"/"cached egress" 표기 차이 있음 — 정확 구분은 대시보드 확인 필요) | **프로젝트 단위**로 7일간 API/DB 활동 없으면 자동 일시정지. 데이터는 삭제되지 않고 보존, 1년 내 복원 가능. 방지법: 주 1회 이상 API 호출(예: 주간 ping) | 정지된 프로젝트는 대시보드에서 수동 "Resume" 필요(자동 복구 아님, 수 분 소요 가능) | 불필요 | Tokyo(ap-northeast-1), Seoul(ap-northeast-2) 제공 | https://supabase.com/docs/guides/platform/free-project-pausing , https://supabase.com/docs/guides/platform/regions |
| Cloudinary (Free) | 월 25 크레딧 — 1크레딧=1,000회 변환 또는 1GB 저장 또는 1GB 대역폭 중 혼합 소진(스토리지만 쓰면 최대 25GB). 비디오 대역폭은 별도 1GB 상한 | 초과 시 계정 정지·삭제 규정 공식 문서에 없음 — **미확인**(일반적으로 신규 업로드/전송 제한 추정) | 해당없음 | 불필요 | 리전 선택 기능/한국 인접 리전 명시 없음 — **미확인** | https://cloudinary.com/documentation/billing_and_plans , https://cloudinary.com/documentation/developer_onboarding_faq_credits |
| Firebase Cloud Storage | **2026-02-03부로 Spark(무료) 플랜에서 Cloud Storage 완전 차단.** Blaze(종량제) 전환 후에도 GCS "Always Free"(5GB-month 저장 + 북미 이그레스 100GB/월) 내엔 과금 없음(단 한국발 트래픽은 "북미" 조건 아니므로 소액 과금 가능) | Spark 상태에서는 기존 버킷도 402/403 에러로 접근 차단(데이터 삭제는 아님, 접근 불가) | 해당없음 | **Blaze 전환(카드 등록) 필수** — 사실상 무료 스토리지 자체가 카드 없이 불가능 | asia-northeast1(Tokyo), asia-northeast3(Seoul) 버킷 리전 선택 가능(Blaze 전제) | https://firebase.google.com/docs/storage/faqs-storage-changes-announced-sept-2024 |
| GitHub 저장소 직접 커밋 + Git LFS | 저장소 권장 크기 1GB 미만(경고), 5GB 초과 시 축소 요청 가능, 하드리밋 100GB, 파일당 100MB 초과 시 push 차단(50MB부터 경고). Git LFS 무료: Free/Pro 계정 스토리지 10GiB + 대역폭(다운로드) 10GiB/월(결제주기마다 리셋) | LFS 한도 초과 시 push/pull 차단(데이터팩 구매 전까지), 저장소 자체 삭제 없음 | 해당없음 | 불필요 | 리전 선택 불가(전역 CDN) | https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-storage-and-bandwidth-usage , https://vercel.com/changelog/git-lfs-support |

Vercel 빌드는 프로젝트 설정에서 Git LFS를 모든 플랜에서 무료로 지원하며, 빌드 시 현재 브랜치의 LFS 오브젝트를 가져오고 저장소 캐시로 신규 오브젝트만 재수신합니다.

### 3-2. 데이터베이스 / KV

| 서비스 | 무료 한도 | 정지·슬립·삭제 규칙 | 콜드스타트 | 카드 필요 | 근접 리전 | 출처 URL |
|---|---|---|---|---|---|---|
| Neon Postgres (Free) | 프로젝트당 스토리지 0.5GB, 컴퓨트 100 CU-hour/월(최대 2CU=8GB RAM), 브랜치 최대 10개, 이그레스 5GB/월, 조직당 프로젝트 100개 | 5분 미사용 시 컴퓨트가 0으로 스케일다운(scale-to-zero, 과금 없음). 월 한도(컴퓨트/스토리지/이그레스) 초과 시 다음 결제월까지 컴퓨트 정지. 완전 비활성 시 프로젝트 자체 삭제 여부는 공식 문서에 명시 없음 — **미확인** | scale-to-zero 이후 첫 연결 시 약 500ms~2초 지연 | 불필요(상시 무료, 트라이얼 아님) | Tokyo/Seoul 미제공. 가장 가까운 리전은 Singapore(ap-southeast-1) | https://neon.com/pricing , https://neon.com/docs/introduction/regions |
| Upstash Redis (Free) | 명령 50만 건/월(2025-03-12부로 일 1만 건 정책 폐지, 월간 정액제 전환), 스토리지 256MB, 대역폭 10GB/월, 무료 DB 최대 10개 | 정식(콘솔 생성) 무료 DB는 자동 슬립/정지 없음(유휴 시에도 유지, PAYG 유휴비용 $0). 단 "Instant" 방식(API로 즉시 생성해 미클레임 상태)은 3일 내 계정 클레임 없으면 자동 삭제 | 없음(상시 온라인, REST 기반) | 불필요 | Tokyo(ap-northeast-1) 제공 확인, Seoul은 공식 리전 목록에서 미확인 | https://upstash.com/pricing , https://upstash.com/blog/redis-new-pricing |
| Turso (libSQL) Free | DB 100개, 스토리지 5GB, 월간 읽기 로우 5억 행, 쓰기 로우 1,000만 행, 기간 제한 없음 | 슬립/정지/삭제 정책 공식 자료에서 확인 안 됨 — **미확인** | **미확인**(공식 수치 확인 안 됨) | 불필요(추정, 공식 재확인 필요) | **미확인**(리전 목록 직접 검증 못 함) | 3차 소스만 확인됨(turso.tech/pricing 직접 fetch 실패) — https://costbench.com/software/database-as-service/turso/ |
| Cloudflare D1 (Free) | 스토리지 5GB(계정 전체), 하루 로우 읽기 500만, 하루 로우 쓰기 10만. **2026-09-01부터 한도 강제 적용 시작**(이전엔 통과되던 초과 요청이 이제 즉시 실패) | 일일 한도 초과 시 자정(UTC) 리셋 전까지 쿼리 즉시 에러 반환("...Upgrade or wait until tomorrow"). 저장 데이터 자체는 영향 없음, 이메일 알림 제공 | 해당없음(요청 단위 실행) | 명시 없음(일반적으로 Workers Free는 불필요, 미확인) | 리전 선택 기능 제한적(Location Hint 방식) — D1 자체 적용 여부 부분 미확인 | https://developers.cloudflare.com/d1/platform/pricing/ , https://developers.cloudflare.com/changelog/post/2026-09-01-d1-free-tier-limit-enforcement/ |
| Cloudflare KV (Free) | 스토리지 1GB, 읽기 10만/일, 쓰기 1,000/일, 삭제 1,000/일, list 1,000/일(모두 UTC 자정 리셋) | 한도 초과 시 해당 종류 작업만 오류 | 해당없음 | 명시 없음 | 글로벌 엣지 복제(한국 포함), 리전 선택 불필요 | https://developers.cloudflare.com/kv/platform/pricing/ |
| Supabase Postgres (Free) | DB 스토리지 500MB(초과 시 read-only 전환), 이그레스 5GB, MAU 50,000, 활성 프로젝트 2개 | Storage와 동일 규칙: 7일 비활성 시 자동 일시정지, 데이터 보존, 1년 내 복원, 수동 Resume 필요. 방지: 주 1회 이상 API/DB 호출 | 활성 상태에선 별도 콜드스타트 없음(상시 구동 소형 인스턴스, Neon식 초단위 scale-to-zero 아님). 정지 후 복원은 수동+수 분 | 불필요 | Tokyo(ap-northeast-1), Seoul(ap-northeast-2) | https://supabase.com/docs/guides/platform/free-project-pausing , https://supabase.com/docs/guides/platform/database-size |
| Firebase Firestore (Spark, 무료) | 문서 읽기 5만/일, 쓰기 2만/일, 삭제 2만/일, 저장용량 1GiB, 프로젝트당 무료 DB 1개 | 한도 초과 시 그날 초과 작업만 실패, 태평양시간 자정 리셋, 데이터 삭제 없음. **Storage와 달리 Firestore는 Spark에서도 2026년 현재 계속 무료 사용 가능**(별개 정책) | 해당없음(완전관리형 NoSQL) | 불필요(Spark 유지 시) | asia-northeast1(Tokyo), asia-northeast3(Seoul) 선택 가능 | https://firebase.google.com/docs/firestore/quotas |
| Google Sheets + Apps Script (폼 백엔드) | 소비자(개인 Gmail) 계정: 스크립트 1회 실행 최대 6분, 트리거 총 실행시간 90분/일, 동시 실행 30개, UrlFetch(외부 API) 2만 건/일, 시트 생성 250개/일. 스프레드시트 자체 셀 한도 1,000만 개(전체 탭 공유) | 한도 초과 시 스크립트가 예외를 던지고 실행 중단(계정 정지·데이터 삭제 아님), 24시간 후 리셋 | 명시적 공식 수치 없음(체감상 수백ms~1-2초 추정) — **미확인** | 불필요 | 해당없음(Google 인프라 전역, 리전 선택 없음) | https://developers.google.com/apps-script/guides/services/quotas |

방명록/RSVP처럼 하루 몇 백 건 수준의 쓰기라면 위 UrlFetch·트리거·시트 생성 한도에 여유가 크고, 총 수백 행은 1,000만 셀 한도에 비해 무시할 수준입니다. 다만 "웹앱(doGet/doPost)으로 배포했을 때 HTTP 요청 자체에 별도 일일 상한이 있는지"는 공식 quotas 문서에 명시된 수치를 찾지 못해 **미확인**입니다(UrlFetch 2만/일은 스크립트가 외부로 나가는 호출 한도이며, 폼 제출을 받는 인바운드 요청과는 다른 개념입니다).

### 3-3. 청첩장 당일 다운되면 안 되는 상황에서 치명적 위험이 될 수 있는 항목

- **Firebase Cloud Storage(Spark)**: 2026-02-03부로 무료 플랜에서 완전히 막혀 있음. 이미 카드 등록(Blaze) 없이는 사진 업로드/서빙 자체가 불가능 — 이 옵션은 사실상 "무료" 후보에서 제외해야 함.
- **Supabase(Storage·Postgres 공통)**: 7일간 활동이 없으면 자동 일시정지됨. 청첩장 발송 후 하객 방문이 뜸한 기간(예: 발송 직후~결혼식 사이 몇 주)이 생기면 결혼식 당일 직전에 프로젝트가 정지된 상태로 남아 있을 수 있고, 복구는 **수동**(대시보드에서 Resume 클릭)이라 자동으로 풀리지 않음. 반드시 주 1회 이상 ping을 걸어두지 않으면 당일 접속 불가 리스크로 이어짐.
- **Cloudflare D1**: 2026-09-01부로(현재 시점 직전) 무료 한도 초과 시 "통과"가 아니라 "즉시 에러"로 강제되기 시작함. 결혼식 피크 하루에 방문객이 몰려 하루 로우 읽기 500만/쓰기 10만을 넘기면(가능성은 낮지만 조회 쿼리 설계에 따라 소진 가능) 자정(UTC, 한국시간 오전 9시)까지 서비스가 즉시 막힘.
- **Vercel Blob(Hobby)**: 한도(스토리지 1GB, 전송 10GB, Ops) 초과 시 30일간 접근 자체가 차단됨 — 사진 30~60장(장당 2~8MB)을 원본 그대로 서빙하면 스토리지 1GB를 넘기기 쉽고, 피크일 조회 트래픽이 전송 10GB를 초과하면 당일 사진이 아예 안 뜰 수 있음.
- **Upstash "Instant" 무료 DB**: 콘솔에서 정식 생성하지 않고 API로 즉시 만든 무료 DB는 3일 내 계정에 클레임하지 않으면 자동 삭제됨 — 설정 실수로 이 경로를 쓰면 데이터가 조용히 사라질 수 있음.
- **Neon**: 완전 비활성 시 프로젝트 자체가 삭제되는지 공식 문서에서 확인하지 못함(미확인) — 장기간 방치 후 결혼식 당일 되살아나는지 사전 검증 없이 의존하면 위험.
- **Turso**: 슬립/정지/삭제 정책과 콜드스타트 수치를 공식 소스에서 확인하지 못함(미확인) — 검증 없이 프로덕션 의존은 리스크.
- **공통**: "무료 한도 초과 시 조용히 막힘"과 "완전 비활성 시 일시정지"는 서로 다른 리스크이며, 다수 서비스(Vercel Blob, Cloudflare D1/KV, Firestore)는 초과 시 에러로 막히되 데이터는 보존되는 반면, Supabase는 활동이 없어도(=한도를 안 넘겨도) 정지되는 점이 구조적으로 다름 — 어느 조합을 쓰든 "결혼식 1주일 전부터 최소 1회 이상 트래픽 발생"을 보장하는 장치(예: 정기 헬스체크 핑)가 없으면 당일 위험으로 이어짐.
