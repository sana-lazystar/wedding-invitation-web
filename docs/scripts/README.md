# scripts — 재사용 스크립트

레포 작업에 반복해서 쓰는 스크립트를 둡니다(스택 결정 10). 레포 루트에서 `node docs/scripts/{이름}.mjs`로 실행합니다. 의존성은 레포 루트 `package.json`이 가집니다.

| 스크립트 | 역할 | 상태 |
| --- | --- | --- |
| 이미지 산출 (예정) | `docs/gallery/`의 원본을 폭 3~4단계 WebP로 줄여 `public/gallery/`와 매니페스트를 만듭니다 | Next.js 스캐폴드 뒤 task에서 작성 |
