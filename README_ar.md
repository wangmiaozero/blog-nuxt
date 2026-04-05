# blog-nuxt

## 🎃 أهلاً بك، أيها الغريب

تهانينا — لقد عثرت على لؤلؤة مخفية: مكان يمكنك فيه امتلاك موقع ويب كامل لك وحدك.

كتابة المقالات وتدوين الملاحظات ومشاركة الأفكار وصف سيرتك — كل ما تحتاجه هنا، يمنحك زاوية من سماء رقمية تخصّك وحدك. 🌞

غالباً ما يسمّي الناس هذا «مدونة»، لكنني أفضّل أن أمنح موقعي اسماً خاصاً: `Mood Town`. بالنسبة لي هو أشبه ببلدة صغيرة — وعاءٌ لمشاعري وأفكاري وتجاربي وإبداعي. كل مقالٍ بيتٌ في البلدة؛ كل صفحةٍ زاوية؛ وكل ميزةٍ من وسائل الراحة. بنيتُ هذه البلدة بقلبي وأعتني بها بعناية. أتمنى أن تكون دافئة ومريحة وجذّابة — مكاناً يسرّ الناس أن يمكثوا فيه ويتواصلوا ويشاركوا.

<p align="center">
  <a href="./README.zh-CN.md">简体中文</a> |
  <a href="./README.md">English</a> |
  <a href="./README_ko.md">한국어</a> |
  <a href="./README_fr.md">Français</a> |
  <a href="./README_de.md">Deutsch</a> |
  <a href="./README_ja.md">日本語</a> |
  <a href="./README_ru.md">Русский</a> |
  <a href="./README_es.md">Español</a> |
  <a href="./README_pt.md">Português</a> |
  <a href="./README_it.md">Italiano</a> |
  <a href="./README_vi.md">Tiếng Việt</a> |
  <strong>العربية</strong>
</p>

![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt.js&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-3-42B883?logo=vue.js&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-3-F7C545?logo=pinia&logoColor=333)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Mock Ready](https://img.shields.io/badge/API-Mock%20Ready-0F172A)

واجهة أمامية لمدونة شخصية على Nuxt 4 مع صفحات المقالات والأرشيف و«من أنا» والرسائل وصفحة المطر ونموذج الاشتراك والوضع الداكن والوسائط المحلية، وطبقة API تبدأ بـ mock ويمكن استبدالها بخادم خلفي حقيقي بأقلّ احتكاك.

إن نفعك المشروع، يرجى منحه نجمة — يسهّل اكتشافه ويحفز العمل عليه.

## نظرة عامة على المشروع

هذا المستودع قالب موقع مدونة موجّه للواجهة الأمامية وتطبيق مرجعي. يركّز على:

- تجربة موقع شخصي غني بالمحتوى مع مظاهر مخصّصة
- التطوير أولاً عبر mock ثم تسليم الخلفية
- تحميل بيانات يتوافق مع SSR في Nuxt
- قراءة المقالات والتعليقات والموسيقى والاشتراك والصفحات ذات الطابع الخاص
- تخطيطات مناسبة لسطح المكتب والجوال

المسارات الحالية:

- `/` الصفحة الرئيسية
- `/article` الأرشيف
- `/[articleId]` تفاصيل المقال
- `/about` من أنا
- `/envelope` الرسائل
- `/rain` يوم ممطر
- `/subscribe` الاشتراك

## أبرز الميزات

- بنية Nuxt 4 + Vue 3 + Pinia
- الوضع الداكن على كامل الصفحة
- قائمة المقالات والتفاصيل والبحث والتصفية و«تحميل المزيد»
- عرض Markdown مع تمييز الصياغة وتضمين الوسائط
- قائمة التعليقات وإرسال تعليق
- دعم الصور المحلية والشعار والصورة الرمزية وملفات mp3
- عقد API وهمي مصمّم لاستبدال الخلفية
- تهيئة SSR لمعلومات الموقع للعنوان والبيانات الوصفية

## لقطات الشاشة

### الرئيسية

![Home](./docs/screenshots/index.jpg)

### الرئيسية (داكن)

![Home Dark](./docs/screenshots/index-dark.jpg)

### متغيّر 1

![Home Variant 1](./docs/screenshots/index-1.jpg)

### متغيّر 2

![Home Variant 2](./docs/screenshots/index-2.jpg)

### متغيّر 3

![Home Variant 3](./docs/screenshots/index-3.jpg)

### متغيّر 4

![Home Variant 4](./docs/screenshots/index-4.jpg)

### متغيّر 5

![Home Variant 5](./docs/screenshots/index-5.jpg)

### الأرشيف

![Archive](./docs/screenshots/article.jpg)

### الأرشيف (داكن)

![Archive Dark](./docs/screenshots/article-dark.jpg)

### تفاصيل المقال

![Article Detail](./docs/screenshots/articleInfo.jpg)

### تفاصيل المقال (داكن)

![Article Detail Dark](./docs/screenshots/articleInfo-dark.jpg)

### من أنا

![About](./docs/screenshots/about.jpg)

### من أنا (داكن)

![About Dark](./docs/screenshots/about-dark.jpg)

### المطر

![Rain](./docs/screenshots/rain.jpg)

### الاشتراك

![Subscribe](./docs/screenshots/subscribe.jpg)

## التقنيات

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

## هيكل المشروع

```text
blog-nuxt
├── assets/              # أنماط عامة، خطوط، متغيّرات السمة
├── components/          # واجهات مشتركة: Header، Footer، Comment، ArticleContent
├── composables/         # غلاف API وعميل HTTP
├── config/              # ثوابت التطبيق ومساعدات الإعداد
├── docs/                # وثائق API، لقطات، مواد التسليم
├── layouts/             # تخطيطات Nuxt
├── mixin/               # mixin قديمة ما زالت بعض الصفحات تستخدمها
├── mock/                # بيانات mock محلية ومعالجات النقاط الطرفية
├── pages/               # صفحات مسارات Nuxt
├── plugins/             # تهيئة التطبيق وسلوك وقت التشغيل
├── public/              # أصول ثابتة عامة، صور، صوت، شعارات
├── server/              # امتدادات الخادم عند الحاجة
├── stores/              # مخازن Pinia
├── types/               # أنواع API والتطبيق المشتركة
└── utils/               # مساعدات الأصول والصور والأدوات العامة
```

## التطوير المحلي

### التثبيت

```bash
npm install
```

### خادم التطوير

```bash
npm run dev
```

### البناء

```bash
npm run build
```

### معاينة بناء الإنتاج

```bash
npm run preview
```

## متغيّرات البيئة

انسخ `.env.example` إلى `.env` واضبط القيم:

```env
NUXT_PUBLIC_USE_MOCK=true
NUXT_PUBLIC_API_BASE_URL=http://localhost:7001
```

المعنى:

- `NUXT_PUBLIC_USE_MOCK=true`: استخدام معالجات mock المحلية في `mock/index.ts`
- `NUXT_PUBLIC_USE_MOCK=false`: استدعاء الخلفية الحقيقية
- `NUXT_PUBLIC_API_BASE_URL`: مضيف الخلفية فقط، بدون `/api/v1`

## التكامل مع الخلفية

المشروع مهيّأ أصلاً لتسليم الخلفية. الخطوات الموصى بها:

1. تنفيذ واجهة API الموثّقة في [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md) أو [`docs/api.md`](./docs/api.md).
2. الإبقاء على المسارات وأسماء الحقول كما هي.
3. إرجاع الغلاف القياسي `{ code, message, data }`.
4. تضمين `pagination.total` دائماً في قوائم النهايات.
5. عند جاهزية الخلفية: `NUXT_PUBLIC_USE_MOCK=false`.
6. توجيه `NUXT_PUBLIC_API_BASE_URL` إلى مضيف الخلفية.

ملاحظات مهمة:

- `composables/http.ts` يدمج `baseUrl + path`، لذا يجب أن يكون `NUXT_PUBLIC_API_BASE_URL` مثل `http://localhost:7001`.
- لتفادي تغيير الواجهة الأمامية، يُفضّل إرجاع أخطاء العمل عبر HTTP `200` مع JSON `code` و`message`.
- صور رمزية للتعليقات كأسماء ملفات محلية مثل `3.jpg` تُفسَّر إلى `/image/comment/3.jpg`.
- صفحة التفاصيل تعرض أساساً `mdcontent`.

## وثائق API

- العقد بالصينية: [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md)
- العقد بالإنجليزية: [`docs/api.md`](./docs/api.md)

## طبقة Mock

طبقة الـ mock ليست إضافة عرض فقط — إنها مصدر العقد الحالي للخلفية الحقيقية:

- المعالجات: [`mock/index.ts`](./mock/index.ts)
- غلاف API مُنمَّط: [`composables/api.ts`](./composables/api.ts)
- أنواع الاستجابة: [`types/api.ts`](./types/api.ts)

عند التزام الخلفية بهذه العقود، يمكن إيقاف وضع mock بسلاسة.

## الترخيص والاستخدام وإخلاء المسؤولية

يُصدَر المستودع بموجب رخصة MIT — راجع [`LICENSE`](./LICENSE).

- يُشارَك أساساً للتعلّم والبحث والمرجع التقني.
- لا تستخدم المشروع لأنشطة غير قانونية أو احتيالية أو انتهاك خصوصية أو ضارة.
- قبل أي نشر عام أو تجاري، استبدل المحتوى الشخصي والمعلومات الرسمية والعلامة والوسائط والموارد المضمّنة من أطراف ثالثة بمواد متوافقة.
- البرنامج مُقدَّم «كما هو» دون ضمانات. الامتثال والتشغيل وحماية البيانات مسؤوليتك.
