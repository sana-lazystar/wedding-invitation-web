---
type: discussion
status: in-progress
created: 2026-09-06 16:53:09
updated: 2026-09-06 17:08:04
completed:
participants: 이산하, Claude
related: []
jira:
---

# 기술 스택·인프라 선정 — 무엇으로 만들고 어디에 올리는가

## 발단

부트스트랩이 끝나고 첫 본논의입니다. 이산하가 언어·프레임워크·인프라를 정하는 논의를 열었습니다. 언어·프레임워크는 이산하가 확정으로 들고 왔고, 쟁점은 호스팅(Vercel을 쓸지부터)·이미지 처리·저장소입니다. 논의가 끝나면 `docs/ontology/topology/`의 첫 문서를 채울 수 있을 만큼 물리 구성을 확정하는 것이 목표입니다.

## 로그

### 2026-09-06 16:53:09 이전 · 이산하 (T1)

- 주제는 인프라와 개발 언어·프레임워크 선정이다. 논의가 끝날 때쯤 ontology의 topology에 넣을 내용을 어느 정도 확정하고 Claude가 넣을 수 있을 것이다.
- 생각하는 스펙: 결혼식 청첩장용 웹(모바일 퍼스트 반응형). Language TypeScript. Framework Next.js. Libraries React + 필요한 것들. Infra Vercel(Hobby plan 예상) + 필요시 이미지 리사이즈 서버 등 lambda 형식. Storage는 미정(이미지 저장 등에 필요).
- TypeScript·Next.js·React는 확정으로 삼고, 나머지(Vercel을 쓸지부터)를 논의한다.
- 인프라 선택 기준: 성능에 치명적인 오류가 없는 것에 한해 무료를 지향한다.

### 2026-09-06 17:08:04 · Claude (T1)

- 준비 방식. Sonnet 3개를 병렬로 돌려 Vercel Hobby 한도, 대안 호스팅, 무료 스토리지·DB의 정지·슬립 규칙을 공식 문서 기준으로 조사했다. 결과는 동결본 `docs/ontology/references/2026-09-06--free-tier-survey.md`에 무편집으로 두었다(references 서랍 첫 문서). 추천에 직접 걸리는 사실 하나(Vercel Fair Use의 기부 조항)는 메인 스레드가 원문을 다시 확인했다. 아래 수치의 출처는 전부 그 동결본이다.
- 전제(확인 필요, U-1·U-2). 하객 200~400명, 링크는 카카오톡으로 발송, 열람 총 1천~5천 회, 운영 3개월에 피크 1일(발송일 또는 예식일), 사진 30~60장(원본 장당 2~8MB), 상업 요소 없음.
- 쟁점은 여섯이다. ① 호스팅 ② 렌더링 모드 ③ 이미지 파이프라인 ④ 저장소·DB ⑤ 도메인 ⑥ 빌드·배포 경로. ②와 ④는 방명록·참석 여부·하객 업로드가 요구인지에 달려 있어 요구 정의 논의와 얽힌다. 이 논의에서는 "그 요구가 생겨도 무료로 감당되는 구성"을 골라 두 논의의 결합을 끊는다.

① 호스팅. 기준(무료 + 치명적 오류 없음)으로 거른 결과다.

| 후보 | 판정 | 근거 |
| --- | --- | --- |
| Vercel Hobby | 통과, 추천 | Next.js를 어댑터 없이 돌린다. 카드 불필요. 한도(전송 100GB·함수 호출 1M/월)가 예상치의 10배 이상. 한도 초과 시 해당 기능만 실패하고 사이트는 산다. 약점은 Fair Use 기부 조항(아래)과 1인 계정 |
| Cloudflare Workers | 통과, 2순위 | 요청 10만/일, 상업 제한 없음, 콜드스타트 없음, `R2`·`D1`·KV 무료 부속이 강하다. 약점은 OpenNext 어댑터를 거치는 데다 2026년 하반기에 Cloudflare 권장 경로가 실험 단계인 vinext로 바뀌는 중이라 "치명적 오류 없음"을 지금 보장하기 어렵다. next/image도 Cloudflare Images 연동이 필요하다 |
| GitHub Pages(정적 export) | 조건부 | 가장 단순하고 한도 걱정이 없다. 서버 엔드포인트가 0이라 방명록·참석 여부는 클라이언트가 외부 서비스에 직접 붙어야 하고, next/image 최적화를 잃는다 |
| Netlify | 탈락 | 2025-09 이후 신규 가입은 월 300크레딧 하드캡(대역폭 약 15GB 상당). 피크일에 사이트가 멈출 수 있다 |
| Render · Railway · Amplify · Firebase App Hosting | 탈락 | 슬립, 카드 필수, 영구 무료 아님 중 하나 이상 |

- 추천은 Vercel Hobby다. Cloudflare Workers는 이전 경로로 topology에 남긴다(기부 조항이 문제되거나 한도를 넘으면 옮긴다). → Q1
- Fair Use 기부 조항. 원문 확인: "Asking for Donations fall under commercial usage." Hobby는 비상업 개인용만 허용한다. 한국 청첩장의 계좌 안내(마음 전하실 곳)는 결제 처리도 광고도 아니지만 문언상 회색이다. 선택지는 셋이다. (a) 감수하고 R1로 관리 (b) Vercel Support에 사전 문의 (c) 계좌 안내를 넣지 않는다. Cloudflare Workers 무료 플랜에는 이 제한이 없다. → Q5
- ② 렌더링. 페이지는 전부 정적 생성(SSG)으로 만든다. ISR·미들웨어는 쓰지 않는다. 방명록·참석 여부가 요구로 확정되면 Route Handler 몇 개를 더한다(Hobby 호출 1M/월, 최대 300초). `output: 'export'`로 굳히지는 않는다. Vercel에서는 SSG로 두어도 비용이 0이고, 나중에 서버 기능을 더할 때 설정을 되돌릴 일이 없다.
- ③ 이미지. 이산하가 든 "리사이즈 서버(람다)"는 필요 없다. 갤러리가 고정이면 변형을 미리 만들어 정적으로 서빙하는 것이 가장 싸고 가장 안 죽는다. 두 방식의 Hobby 한도 노출은 아래 표다.

| 방식 | 예상 사용 | Hobby 한도 | 판정 |
| --- | --- | --- | --- |
| Vercel 런타임 최적화(next/image 기본) | 변환 60장 × 4폭 ≈ 240/월. 캐시 읽기 5천 회 × 20~60장 = 10만~30만/월 | 변환 5K/월 · 캐시 읽기 300K/월 | 캐시 읽기가 상한과 겹친다. 초과 시 새 이미지 최적화 실패(alt 텍스트 노출) |
| 사전 생성 정적 변형 | 정적 전송 5천 회 × 약 3MB ≈ 15GB/월 | 전송 100GB/월 | 이미지 한도 노출 0 |

- 추천은 사전 생성이다. 원본은 git 밖에 두고(U-2), 스크립트가 폭 3~4단계 webp + 블러 placeholder + 매니페스트를 만들며, 산출물만 `public/`에 커밋한다(60장 × 4폭 × 약 150KB ≈ 36MB). next/image는 custom loader로 그 파일을 가리켜 lazy·sizes 이점은 유지한다. 대안(런타임 최적화)은 코드가 0이라는 장점이 있다. → Q2
- ④ 저장소·DB. 기본안은 "없음"이다. 사진은 레포에, 문구는 코드에 있다. 요구가 생길 때의 후보는 미리 정해 둔다. 하객 사진 업로드가 생기면 Cloudflare `R2`(10GB, 이그레스 무료)가 1순위이고, Vercel Blob은 전송 10GB/월에 초과 시 30일 접근 차단이라 사진용으로 부적합하다. 방명록·참석 여부가 생기면 Upstash Redis(슬립 없음, 도쿄, 50만 명령/월) 또는 Firestore Spark(서울, 슬립 없음, 읽기 5만/일)다. 제외는 Supabase(7일 비활성 시 정지, 복구 수동), Neon(scale-to-zero 뒤 첫 연결 0.5~2초, 최근접 싱가포르), Cloudflare `D1`(Cloudflare 종속)이다. 확정은 database 서랍이 생기는 시점에 한다. → Q4
- ⑤ 도메인. `*.vercel.app`이 기본이다. 커스텀 도메인은 연 1~2만 원이라 무료 기준 밖이고 이산하 선택이다. 카카오톡 미리보기는 OG 제목·이미지가 크게 보이고 도메인은 작게 보인다. → Q3
- ⑥ 빌드·배포 경로. GitHub `sana-lazystar/wedding-invitation-web` → Vercel Git 연동. `main` → production, 그 밖의 브랜치(develop·story·feature) → preview. Hobby는 동시 빌드 1·배포 100회/일이라 충분하다. 부트스트랩 결정 7과 맞물린다. 프리뷰 URL의 공개 범위(청첩장은 개인정보를 담는다)는 policy 서랍 몫으로 넘긴다. Vercel 계정은 이산하 개인 계정에 GitHub `sana-lazystar`를 연동해야 한다(Hobby는 1인). → U-3
- 외부 의존(요구 정의로 넘기되 인프라 관점 메모). 지도는 Kakao Map JS SDK(무료, 도메인 등록), 공유는 Kakao SDK, 폰트는 next/font 자체 호스팅, 분석은 Vercel Web Analytics(Hobby 5만 이벤트/월). 어느 것도 유료 항목이 없다.
- 논의가 끝나면 채울 topology 첫 문서의 골격. 한 줄 정의 · 배포 단위 · 요청 경로 · 빌드·배포 경로 · 이미지 파이프라인 · 외부 의존 · 무료 한도 대 예상 사용 표 · 코드 SSOT 포인터(`next.config`·`vercel.json`). 참고 레포 `topology/system-context.md`의 절 구성을 따른다.
- 이산하에게 묻는 것. Q1(호스팅) · Q2(이미지) · Q3(도메인) · Q4(저장·DB) · Q5(기부 조항 대응) · U-1(트래픽 가정) · U-2(원본 수·용량·보관처) · U-3(Vercel 계정). `open-questions.md`에 등재했다. 위험 R1(기부 조항)은 `risks.md`에 등재했다.
- CLAUDE.md 라우터 2절 표에 `references/` 행을 더하는 일은 CLAUDE.md 편집 보류 지시가 있어 열린 액션으로 남겼다.

## 결정

행의 내용은 불변입니다. 상태 칸만 갱신할 수 있습니다.
결정이 뒤집히면 행을 고치지 않고 새 행으로 대체한 뒤, 옛 행 상태에 "폐기 — 결정 N으로 대체"를 적습니다.

| # | 결정 | 결정자 | 상태 |
| --- | --- | --- | --- |
| 1 | 언어는 TypeScript, 프레임워크는 Next.js, UI 라이브러리는 React입니다. 그 밖의 라이브러리는 필요할 때 정합니다 | 이산하 | 확정 |
| 2 | 인프라 선택 기준은 "성능에 치명적인 오류가 없는 것에 한해 무료"입니다. 유료 항목은 이 기준을 넘는 근거가 있을 때만 씁니다 | 이산하 | 확정 |

## 정본 반영 점검 (완결 전)

점검 대상 목록의 정본 = `docs/dashboard/README.md` §논의 "완결 전 정본 반영 점검 대상" (정책·DB·API·IA + open-questions 열린 액션·requirements·risks·glossary·artifacts). 같은 커밋에서 대조합니다. 다른 논의록의 결정을 뒤집었으면 그 표의 상태 칸에 "폐기 — {이 파일}:결정 N으로 대체"를 적습니다.

## 적재

이 논의에서 생성된 epic·task·bugfix ID를 분해 승인 후 적습니다.
