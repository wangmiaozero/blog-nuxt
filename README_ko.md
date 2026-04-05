# blog-nuxt

## 🎃 처음 뵙겠습니다, 낯선 분!

축하합니다—당신만의 웹사이트를 온전히 가질 수 있는 숨은 보석을 발견하셨습니다.

글쓰기와 메모, 감상 공유, 자기소개까지—필요한 것이 여기 모두 있으며, 오직 당신만의 디지털 하늘 구석을 선사합니다. 🌞

사람들은 이런 것을 흔히 “블로그”라 부르지만, 저는 제 사이트에 `Mood Town`이라는 이름을 붙이고 싶습니다. 저에게는 작은 마을 같습니다—기분, 생각, 경험과 창작을 담는 그릇이요. 글 한 편은 마을의 집 하나, 페이지 하나는 모퉁이 하나, 기능 하나는 편의 시설입니다. 이 마을은 마음을 다해 짓고 정성껏 가꿉니다. 따뜻하고 아늑하며 머물고 싶은 곳—사람들이 머무르고 연결되고 나눌 수 있는 곳이 되길 바랍니다.

<p align="center">
  <a href="./README.zh-CN.md">简体中文</a> |
  <a href="./README.md">English</a> |
  <strong>한국어</strong> |
  <a href="./README_fr.md">Français</a> |
  <a href="./README_de.md">Deutsch</a> |
  <a href="./README_ja.md">日本語</a> |
  <a href="./README_ru.md">Русский</a> |
  <a href="./README_es.md">Español</a> |
  <a href="./README_pt.md">Português</a> |
  <a href="./README_it.md">Italiano</a> |
  <a href="./README_vi.md">Tiếng Việt</a> |
  <a href="./README_ar.md">العربية</a>
</p>

![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt.js&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-3-42B883?logo=vue.js&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-3-F7C545?logo=pinia&logoColor=333)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Mock Ready](https://img.shields.io/badge/API-Mock%20Ready-0F172A)

글 페이지, 아카이브, 소개, 편지, 비 오는 날 페이지, 구독 폼, 다크 모드, 로컬 미디어 자산, 그리고 실제 백엔드로 쉽게 교체할 수 있는 Mock 우선 API 레이어를 갖춘 Nuxt 4 개인 블로그 프런트엔드입니다.

도움이 되었다면 Star를 눌러 주세요. 프로젝트가 더 잘 보이고, 계속 다듬을 힘이 됩니다.

## 프로젝트 개요

이 저장소는 블로그 사이트 템플릿이자 참고 구현으로, 프런트엔드 중심입니다. 초점은 다음과 같습니다.

- 커스텀 비주얼이 있는 콘텐츠 중심 개인 사이트 경험
- Mock 우선 개발 후 백엔드 인수인계
- Nuxt SSR에 맞는 데이터 로딩
- 글 읽기, 댓글, 음악, 구독, 테마 페이지
- 데스크톱·모바일 친화 레이아웃

현재 라우트:

- `/` 홈
- `/article` 아카이브
- `/[articleId]` 글 상세
- `/about` 소개
- `/envelope` 편지
- `/rain` 비 오는 날
- `/subscribe` 구독

## 주요 특징

- Nuxt 4 + Vue 3 + Pinia 아키텍처
- 전체 페이지 다크 모드
- 글 목록, 상세, 검색, 필터, 더 보기
- 구문 강조·미디어 임베드가 있는 Markdown 렌더링
- 댓글 목록 및 작성 흐름
- 로컬 이미지, 로고, 아바타, mp3 지원
- 백엔드 교체를 위한 Mock API 계약
- 제목·메타용 SSR 사이트 정보 부트스트랩

## 스크린샷

### 홈

![Home](./docs/screenshots/index.jpg)

### 홈 다크

![Home Dark](./docs/screenshots/index-dark.jpg)

### 홈 변형 1

![Home Variant 1](./docs/screenshots/index-1.jpg)

### 홈 변형 2

![Home Variant 2](./docs/screenshots/index-2.jpg)

### 홈 변형 3

![Home Variant 3](./docs/screenshots/index-3.jpg)

### 홈 변형 4

![Home Variant 4](./docs/screenshots/index-4.jpg)

### 홈 변형 5

![Home Variant 5](./docs/screenshots/index-5.jpg)

### 아카이브

![Archive](./docs/screenshots/article.jpg)

### 아카이브 다크

![Archive Dark](./docs/screenshots/article-dark.jpg)

### 글 상세

![Article Detail](./docs/screenshots/articleInfo.jpg)

### 글 상세 다크

![Article Detail Dark](./docs/screenshots/articleInfo-dark.jpg)

### 소개

![About](./docs/screenshots/about.jpg)

### 소개 다크

![About Dark](./docs/screenshots/about-dark.jpg)

### 비 오는 날

![Rain](./docs/screenshots/rain.jpg)

### 구독

![Subscribe](./docs/screenshots/subscribe.jpg)

## 기술 스택

- Nuxt 4
- Vue 3
- Pinia
- TypeScript
- SCSS
- `@nuxtjs/color-mode`
- `marked`
- `highlight.js`
- `viewerjs`
- `parallax-js`

## 프로젝트 구조

```text
blog-nuxt
├── assets/              # 전역 스타일, 폰트, 테마 변수
├── components/          # Header, Footer, Comment, ArticleContent 등 공용 UI
├── composables/         # API 래퍼 및 HTTP 클라이언트
├── config/              # 앱 수준 상수·설정 헬퍼
├── docs/                # API 문서, 스크린샷, 인수인계 자료
├── layouts/             # Nuxt 레이아웃
├── mixin/               # 일부 페이지에서 쓰는 레거시 mixin
├── mock/                # 로컬 Mock 데이터·엔드포인트 핸들러
├── pages/               # Nuxt 라우트 페이지
├── plugins/             # 앱 부트스트랩·런타임 동작
├── public/              # 공개 정적 자산, 이미지, 오디오, 로고
├── server/              # 필요 시 서버 확장
├── stores/              # Pinia 스토어
├── types/               # 공유 API·앱 타입
└── utils/               # 자산·이미지 헬퍼, 일반 유틸
```

## 로컬 개발

### 설치

```bash
npm install
```

### 개발 서버

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 프로덕션 빌드 미리보기

```bash
npm run preview
```

## 환경 변수

`.env.example`을 `.env`로 복사한 뒤 필요에 맞게 수정하세요.

```env
NUXT_PUBLIC_USE_MOCK=true
NUXT_PUBLIC_API_BASE_URL=http://localhost:7001
```

의미:

- `NUXT_PUBLIC_USE_MOCK=true`: `mock/index.ts`의 로컬 Mock 핸들러 사용
- `NUXT_PUBLIC_USE_MOCK=false`: 실제 백엔드 호출
- `NUXT_PUBLIC_API_BASE_URL`: 백엔드 호스트만, `/api/v1` 없음

## 백엔드 연동

이미 백엔드 인수인계를 염두에 둔 구조입니다. 권장 순서:

1. [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md) 또는 [`docs/api.md`](./docs/api.md)에 문서화된 API 구현
2. 요청 경로·응답 필드명을 동일하게 유지
3. 표준 봉투 `{ code, message, data }` 반환
4. 목록 엔드포인트에는 항상 `pagination.total` 포함
5. 백엔드 준비 후 `NUXT_PUBLIC_USE_MOCK=false`
6. `NUXT_PUBLIC_API_BASE_URL`을 백엔드 호스트로 설정

연동 시 참고:

- `composables/http.ts`는 `baseUrl + path`로 이어 붙이므로 `NUXT_PUBLIC_API_BASE_URL`은 `http://localhost:7001` 형태여야 합니다.
- 프런트 변경 없이 맞추려면 비즈니스 오류는 HTTP `200`과 JSON `code`, `message`로 내리는 편이 좋습니다.
- 댓글 아바타는 `3.jpg` 같은 로컬 파일명으로 기대하며 `/image/comment/3.jpg`로 해석합니다.
- 글 상세는 주로 `mdcontent`를 렌더링합니다.

## API 문서

- 중국어 계약: [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md)
- 영어 계약: [`docs/api.md`](./docs/api.md)

## Mock 레이어

Mock은 데모용 부가물이 아니라 실제 백엔드의 현재 계약 기준입니다.

- Mock 핸들러: [`mock/index.ts`](./mock/index.ts)
- 타입 API 래퍼: [`composables/api.ts`](./composables/api.ts)
- 응답 타입: [`types/api.ts`](./types/api.ts)

백엔드가 이 계약을 따르면 Mock 모드를 깔끔히 끌 수 있습니다.

## 라이선스·사용·면책

MIT License. [`LICENSE`](./LICENSE) 참고.

추가 안내:

- 학습·연구·기술 참고 목적의 공유입니다.
- 불법·침해·사기·프라이버시 침해 등 유해한 용도로 사용하지 마세요.
- 공개·상업 배포 전 개인 콘텐츠, 신고 정보, 브랜딩, 미디어, 제3자 임베드를 규정에 맞는 자료로 교체하세요.
- 소프트웨어는 “있는 그대로” 제공되며 보증이 없습니다. 규정 준수·운영·조정·데이터 보호는 배포자 책임입니다.
