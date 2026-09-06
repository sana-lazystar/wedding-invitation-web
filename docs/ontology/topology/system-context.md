# 시스템 구성 (topology)

결정 출처: `docs/dashboard/discussions/2026-09-06--tech-stack-and-infra.md` 결정 표 (접두 "스택 결정 N")

청첩장이 무엇으로 이루어져 있고 어디에 떠 있는지의 현행 정본입니다. 상태는 **결정됨 · 프로비저닝 전**(2026-09-06)입니다. Vercel 프로젝트 생성과 첫 배포는 `docs/` 밖 변경이라 외부 반영 게이트(task 문서 + 승인)를 거친 뒤에 하고, 그때 "프로비저닝 후 확정" 칸을 채웁니다. 한도 수치의 근거는 동결본 `references/2026-09-06--free-tier-survey.md`(조회 2026-09-06)입니다. 값이 바뀌면 동결본을 새로 만들고 이 문서를 고칩니다.

## 1. 한 줄 정의

TypeScript·Next.js·React로 만든 정적 모바일 청첩장을 GitHub 레포에서 Vercel Hobby로 빌드·배포하고, `*.vercel.app` 주소를 카카오톡 등으로 하객에게 보냅니다(스택 결정 1·3·7). 서버 저장·DB·로그인·방명록은 없습니다(스택 결정 6). 브라우저 밖에서 도는 이 프로젝트의 코드는 없습니다.

## 2. 배포 단위

| 표면 | 실물 | 역할 |
| --- | --- | --- |
| 청첩장 페이지 | Vercel Hobby 프로젝트의 production 배포. CDN이 정적 파일을 서빙 | 전부 정적 생성(SSG). 함수·ISR·미들웨어 없음 |
| 프리뷰 | 같은 프로젝트의 preview 배포 | develop·story·feature 브랜치 확인용 |
| 소스 | GitHub `sana-lazystar/wedding-invitation-web` (public, 2026-09-06 확인. 전환은 Q7) | 코드 · 사진 변형 · 문서(`docs/`) · 스크립트(`docs/scripts/`) |

프로비저닝 후 확정: Vercel 계정 · 프로젝트 이름 · production URL · 리전. 계정 전제는 U-3입니다.

## 3. 요청 경로

1. 하객이 카카오톡 링크(OG 미리보기)로 `https://{project}.vercel.app/`을 엽니다.
2. Vercel CDN이 정적 HTML·JS·CSS·이미지를 줍니다. 서버 함수는 호출되지 않습니다.
3. 페이지가 외부 스크립트(§6)를 부를 수 있습니다. 그 밖의 네트워크 요청은 없습니다.

## 4. 빌드·배포 경로

- 트리거는 GitHub push입니다. Vercel Git 연동이 `main` → production, 그 밖의 브랜치 → preview로 배포합니다(스택 결정 9, 잠정). 부트스트랩 결정 7(main 배포 기준 · develop 통합)과 짝입니다.
- 빌드는 Hobby Basic 머신(2 vCPU · 8GB), 동시 빌드 1, 배포 100회/일입니다. `next build` 결과는 전부 정적입니다. `output: 'export'`는 쓰지 않습니다(Vercel에서 이점이 없고 되돌릴 일을 만들지 않습니다).
- 프리뷰 URL의 공개 범위는 policy 서랍이 생길 때 정합니다. 청첩장은 개인정보를 담습니다.

## 5. 이미지 파이프라인 (스택 결정 4 · 5)

- 리사이즈 서버·람다·Vercel 런타임 이미지 최적화를 쓰지 않습니다.
- 원본은 git 밖에 둡니다. 사진은 50여 장, 원본 총 500MB 미만이고 이산하가 보관합니다(U-2). 스크립트가 폭 3~4단계 webp + 블러 placeholder + 매니페스트를 만들고, 산출물만 `public/`에 커밋합니다. next/image는 custom loader로 그 파일을 가리킵니다.
- 산출물 크기는 50장 × 4폭 × 약 150KB ≈ 30MB로 추정합니다. 원본을 레포에 넣으면 Vercel CLI 배포의 소스 한도 100MB(Hobby)와 GitHub의 파일당 100MB 차단에 걸립니다. Git 연동 배포는 소스 한도 대신 clone 시간이 늘어납니다(Vercel limits 2026-09-03).
- 그 밖의 에셋 규칙입니다. 일러스트·아이콘은 사진과 같은 파이프라인이나 SVG로 갑니다. 배경음악은 한 곡 3~5MB 이내로 두고 탭해서 재생합니다. 영상은 YouTube 임베드나 5MB 이하 클립에 클릭 재생으로 갑니다. 20MB 영상을 5천 회 재생하면 100GB로 Hobby 전송 한도를 다 쓰기 때문입니다. 파일 하나가 50MB를 넘지 않게 합니다(GitHub 경고선). 에셋은 배경음악 한 곡·일러스트·폰트이고 영상은 없습니다(U-4).
- 원본 파일명은 촬영 시각 순 두 자리 번호(`01.jpg`~)이고 새 사진은 다음 번호를 받습니다(스택 결정 12, 잠정). 산출 스크립트는 `docs/scripts/`에 둡니다(스택 결정 10). `docs/gallery/`와 `docs/design/`는 git에서 제외합니다(스택 결정 13, 잠정. 반영은 WIW-1).

## 6. 외부 의존

요구 정의 논의에서 확정합니다. 후보와 조건은 다음과 같고, 유료 항목은 없습니다.

| 용도 | 후보 | 비용 · 조건 |
| --- | --- | --- |
| 지도 | Kakao Map JS SDK | 무료. 앱 키 + 도메인 등록 |
| 공유 | Kakao JS SDK | 무료. 앱 키 |
| 폰트 | CDN(이산하 선호) 또는 next/font 자체 호스팅 | 둘 다 무료. 한도 영향 없음. 디자인 논의에서 고릅니다 |
| 분석 | Vercel Web Analytics | Hobby 5만 이벤트/월. 초과 시 수집만 중단 |

## 7. 무료 한도 대 예상 사용

전제는 U-1(열람 1천~5천 회, 사진 30~60장)입니다.

| 항목 | 예상 | Hobby 한도 | 초과 시 |
| --- | --- | --- | --- |
| Fast Data Transfer | 5천 회 × 약 3MB ≈ 15GB/월 | 100GB/월 | 공식 문서 미명시(동결본 §1 #12) |
| Function Invocations | 0 | 1M/월 | 해당 없음 |
| Image Transformations · Cache Reads | 0 (런타임 최적화 안 씀) | 5K · 300K/월 | 해당 없음 |
| 배포 | 하루 수 회 | 100회/일 | 큐잉 |
| 배경음악 1곡 | 5천 회 × 약 5MB ≈ 25GB/월 | 전송 100GB/월에 합산 | 사진과 합쳐 40GB 안팎 |
| 영상 | 없음(U-4) | 해당 없음 | 생기면 임베드 또는 5MB 이하 클립 |

## 8. 도메인 (스택 결정 7)

- 기본은 `*.vercel.app`입니다.
- 커스텀 도메인은 Hobby에서도 붙일 수 있습니다(프로젝트당 50개, Vercel 쪽 비용 0). 이산하가 외부 등록기관에서 사서 그 DNS를 Vercel이 안내하는 레코드로 향하게 합니다. 레코드값은 Vercel 대시보드 안내가 SSOT라 여기 적지 않습니다.

## 9. 감수한 위험과 이전 경로

- R1(Fair Use 기부 조항)은 감수합니다(스택 결정 8).
- 이전 경로는 Cloudflare Workers(OpenNext 어댑터)입니다. Vercel이 배포를 정지하거나 한도를 넘으면 옮깁니다. 정적 사이트라 옮길 것은 빌드 설정과 도메인뿐입니다. 근거는 동결본 §2입니다.

## 10. 코드가 SSOT인 것

코드가 생기면 `docs/ontology/README.md` §코드가 SSOT인 것들 표에 `next.config.*` · `vercel.json`(있으면) · 이미지 생성 스크립트를 등록합니다. 이 문서는 그것들을 복제하지 않고 가리킵니다.

## 11. 프로비저닝 절차 (이산하가 Vercel 대시보드에서 합니다)

선행 조건이 하나 있습니다. Next.js 스캐폴드가 `main`에 올라 있어야 합니다. 그 전에 import하면 Vercel이 레포 루트를 정적 사이트로 배포해 `docs/`가 그대로 노출됩니다. 스캐폴드는 별도 task로 만들고, 이 절차도 task 문서를 두고 결과를 §2에 적습니다.

1. Vercel 계정 설정(Account Settings → Authentication)에서 연결된 GitHub 계정이 `sana-lazystar`인지 확인합니다. 개인 계정 레포는 Vercel에 연결된 GitHub 사용자가 그 레포의 Owner여야 import할 수 있습니다. 다른 GitHub 계정이 연결돼 있으면 연결을 끊고 `sana-lazystar`로 다시 연결합니다. 문서는 "다른 GitHub 계정으로 가입하려면 현재 GitHub에서 로그아웃한 뒤 가입을 다시 시작하라"고 안내합니다.
2. 대시보드에서 Add New → Project → Import Git Repository로 갑니다. 레포가 목록에 없으면 Adjust GitHub App Permissions를 눌러 `sana-lazystar` 계정에 Vercel GitHub App을 설치하고, Only select repositories로 이 레포만 허용합니다.
3. Import 화면에서 Framework Preset이 Next.js로 잡히는지 봅니다. Root Directory는 레포 루트, Build 설정은 기본값, 환경 변수는 없습니다. Project Name이 `{name}.vercel.app` 주소가 됩니다. Deploy를 누릅니다.
4. Project Settings → Git에서 Production Branch가 `main`인지 확인합니다. 그 밖의 브랜치는 push마다 preview로 배포됩니다.
5. Project Settings → Deployment Protection에서 preview 보호 옵션을 봅니다. 적용 여부는 policy 서랍이 정합니다.
6. 프로젝트 이름·production URL·리전을 §2 "프로비저닝 후 확정"에 적습니다.

근거는 Vercel 문서 "Deploying GitHub Projects with Vercel"(2026-08-11)입니다. 대시보드 메뉴 이름은 바뀔 수 있어 재확인이 필요합니다.
