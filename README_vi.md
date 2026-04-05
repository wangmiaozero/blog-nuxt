# blog-nuxt

## 🎃 Chào người lạ

Chúc mừng — bạn vừa tìm thấy một viên ngọc ẩn: nơi bạn có thể sở hữu trọn vẹn một trang web cho riêng mình.

Viết bài, ghi chép, chia sẻ suy nghĩ và giới thiệu bản thân — mọi thứ đều ở đây, mang đến cho bạn một góc bầu trời số chỉ thuộc về bạn. 🌞

Mọi người thường gọi đó là “blog”, nhưng tôi muốn đặt cho trang một cái tên riêng: `Mood Town`. Với tôi nó giống một thị trấn nhỏ — nơi chứa đựng tâm trạng, ý nghĩ, trải nghiệm và sáng tạo. Mỗi bài viết là một ngôi nhà; mỗi trang là một góc; mỗi tính năng là một tiện ích. Tôi xây thị trấn này bằng cả tâm huyết và chăm sóc nó cẩn thận. Mong nó ấm áp, thân thiện — nơi mọi người muốn ở lại, kết nối và chia sẻ.

<p align="center">
  <a href="./README.zh-CN.md">简体中文</a> |
  <a href="./README.md">English</a> |
  <a href="./README_ko.md">한국어</a> |
  <a href="./README_fr.md">Français</a> |
  <a href="./README_de.md">Deutsch</a> |
  <a href="./README_ja.md">日本語</a> |
  <a href="./README_zh-TW.md">繁體中文</a> |
  <a href="./README_ru.md">Русский</a> |
  <a href="./README_es.md">Español</a> |
  <a href="./README_pt.md">Português</a> |
  <a href="./README_it.md">Italiano</a> |
  <strong>Tiếng Việt</strong> |
  <a href="./README_ar.md">العربية</a>
</p>

![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt.js&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-3-42B883?logo=vue.js&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-3-F7C545?logo=pinia&logoColor=333)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Mock Ready](https://img.shields.io/badge/API-Mock%20Ready-0F172A)

Giao diện blog cá nhân Nuxt 4: trang bài viết, lưu trữ, giới thiệu, thư, trang ngày mưa, biểu mẫu đăng ký, chế độ tối, tài nguyên media cục bộ và lớp API ưu tiên mock có thể thay bằng backend thật với ít ma sát.

Nếu dự án hữu ích, hãy cho một ngôi sao — giúp người khác dễ tìm thấy và duy trì công việc phát triển.

## Tổng quan dự án

Kho lưu trữ này là mẫu blog hướng frontend và bản triển khai tham khảo. Trọng tâm:

- trải nghiệm site cá nhân nhiều nội dung với hình ảnh tùy chỉnh
- phát triển mock-first rồi bàn giao backend
- tải dữ liệu thân thiện SSR Nuxt
- đọc bài, bình luận, nhạc, đăng ký và trang theo chủ đề
- bố cục thân thiện desktop và mobile

Tuyến đường hiện tại:

- `/` trang chủ
- `/article` lưu trữ
- `/[articleId]` chi tiết bài
- `/about` giới thiệu
- `/envelope` thư
- `/rain` ngày mưa
- `/subscribe` đăng ký

## Điểm nổi bật

- Kiến trúc Nuxt 4 + Vue 3 + Pinia
- Chế độ tối toàn trang
- Danh sách bài, chi tiết, tìm kiếm, lọc, tải thêm
- Markdown với tô sáng cú pháp và nhúng media
- Danh sách và gửi bình luận
- Hình ảnh cục bộ, logo, avatar, mp3
- Hợp đồng API mock để thay backend
- Khởi tạo SSR thông tin site cho tiêu đề và meta

## Ảnh chụp màn hình

### Trang chủ

![Home](./docs/screenshots/index.jpg)

### Trang chủ (tối)

![Home Dark](./docs/screenshots/index-dark.jpg)

### Biến thể 1

![Home Variant 1](./docs/screenshots/index-1.jpg)

### Biến thể 2

![Home Variant 2](./docs/screenshots/index-2.jpg)

### Biến thể 3

![Home Variant 3](./docs/screenshots/index-3.jpg)

### Biến thể 4

![Home Variant 4](./docs/screenshots/index-4.jpg)

### Biến thể 5

![Home Variant 5](./docs/screenshots/index-5.jpg)

### Lưu trữ

![Archive](./docs/screenshots/article.jpg)

### Lưu trữ (tối)

![Archive Dark](./docs/screenshots/article-dark.jpg)

### Chi tiết bài

![Article Detail](./docs/screenshots/articleInfo.jpg)

### Chi tiết bài (tối)

![Article Detail Dark](./docs/screenshots/articleInfo-dark.jpg)

### Giới thiệu

![About](./docs/screenshots/about.jpg)

### Giới thiệu (tối)

![About Dark](./docs/screenshots/about-dark.jpg)

### Mưa

![Rain](./docs/screenshots/rain.jpg)

### Đăng ký

![Subscribe](./docs/screenshots/subscribe.jpg)

## Công nghệ

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

## Cấu trúc dự án

```text
blog-nuxt
├── assets/              # Style toàn cục, font, biến theme
├── components/          # UI dùng chung: Header, Footer, Comment, ArticleContent
├── composables/         # Bọc API và HTTP client
├── config/              # Hằng số và helper cấu hình cấp app
├── docs/                # Tài liệu API, ảnh chụp, tài liệu bàn giao
├── layouts/             # Layout Nuxt
├── mixin/               # Mixin cũ vẫn dùng ở một số trang
├── mock/                # Dữ liệu mock cục bộ và handler endpoint
├── pages/               # Trang route Nuxt
├── plugins/             # Khởi động app và hành vi runtime
├── public/              # Tài nguyên tĩnh công khai, ảnh, âm thanh, logo
├── server/              # Mở rộng phía server khi cần
├── stores/              # Store Pinia
├── types/               # Kiểu API và app dùng chung
└── utils/               # Helper tài nguyên, ảnh, tiện ích
```

## Phát triển cục bộ

### Cài đặt

```bash
npm install
```

### Máy chủ dev

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Xem trước bản build production

```bash
npm run preview
```

## Biến môi trường

Sao chép `.env.example` thành `.env` và chỉnh:

```env
NUXT_PUBLIC_USE_MOCK=true
NUXT_PUBLIC_API_BASE_URL=http://localhost:7001
```

Ý nghĩa:

- `NUXT_PUBLIC_USE_MOCK=true`: dùng handler mock cục bộ trong `mock/index.ts`
- `NUXT_PUBLIC_USE_MOCK=false`: gọi backend thật
- `NUXT_PUBLIC_API_BASE_URL`: chỉ host backend, không có `/api/v1`

## Tích hợp backend

Dự án đã được cấu trúc để bàn giao. Quy trình đề xuất:

1. Triển khai API trong [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md) hoặc [`docs/api.md`](./docs/api.md).
2. Giữ nguyên đường dẫn và tên trường phản hồi.
3. Trả về bọc chuẩn `{ code, message, data }`.
4. Luôn có `pagination.total` ở endpoint danh sách.
5. Khi backend sẵn sàng: `NUXT_PUBLIC_USE_MOCK=false`.
6. Đặt `NUXT_PUBLIC_API_BASE_URL` trỏ tới host backend.

Lưu ý tích hợp:

- `composables/http.ts` nối `baseUrl + path`, nên `NUXT_PUBLIC_API_BASE_URL` phải dạng `http://localhost:7001`.
- Để không đổi frontend, lỗi nghiệp vụ nên trả HTTP `200` với JSON `code` và `message`.
- Avatar bình luận là tên file cục bộ như `3.jpg`, được ánh xạ tới `/image/comment/3.jpg`.
- Trang chi tiết chủ yếu render `mdcontent`.

## Tài liệu API

- Hợp đồng tiếng Trung: [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md)
- Hợp đồng tiếng Anh: [`docs/api.md`](./docs/api.md)

## Lớp Mock

Mock không chỉ là phụ trợ demo — đó là nguồn hợp đồng hiện tại cho backend thật:

- handler: [`mock/index.ts`](./mock/index.ts)
- bọc API có kiểu: [`composables/api.ts`](./composables/api.ts)
- kiểu phản hồi: [`types/api.ts`](./types/api.ts)

Khi backend tuân thủ, frontend có thể tắt mock gọn gàng.

## Giấy phép, sử dụng và tuyên bố miễn trừ

Phát hành theo MIT License — xem [`LICENSE`](./LICENSE).

- Chia sẻ chủ yếu để học tập, nghiên cứu và tham khảo kỹ thuật.
- Không dùng dự án cho mục đích bất hợp pháp, gian lận, xâm phạm quyền riêng tư hoặc gây hại.
- Trước khi triển khai công khai hoặc thương mại, thay nội dung cá nhân, thông tin pháp lý, thương hiệu, media và tài nguyên bên thứ ba bằng tài liệu tuân thủ.
- Phần mềm được cung cấp “nguyên trạng”, không bảo đảm. Tuân thủ, vận hành và bảo vệ dữ liệu là trách nhiệm của bạn.
