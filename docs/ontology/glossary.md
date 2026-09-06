# 용어집

계약·판정에 걸리는 용어만 담습니다. 화면 이름과 코드 이름이 다르면 주의 칸에 적습니다.

| 용어 | 정의 · 주의 |
| --- | --- |
| production 배포 | `main`에 push될 때 Vercel이 만드는 배포. 하객이 받는 주소(`wedding-invitation-web-mu.vercel.app`)가 이것을 가리킵니다. 정본 `topology/system-context.md` §2·§4 |
| preview 배포 | `main` 밖 브랜치에 push될 때 Vercel이 만드는 확인용 배포. 주소가 push마다 바뀌고 하객 주소와 무관합니다 |
| 원본(사진) | 촬영 그대로의 사진 파일. `docs/gallery/NN.jpg`, git 제외. 사이트는 원본을 쓰지 않습니다 |
| 산출물(이미지) | 원본을 폭별 WebP로 줄인 파일. `public/gallery/`에 커밋하고 사이트가 서빙합니다. 정본 `docs/scripts/README.md` |
| 매니페스트(갤러리) | 사진 목록과 표시 순서를 담는 코드 쪽 파일. 순서는 사람이 정하고 스크립트는 항목만 보탭니다. 경로는 스캐폴드 뒤 확정(잠정 `src/content/gallery.json`) |
