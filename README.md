# مكتب المحامي نواف بن أحمد المالكي — موقع Next.js

تصدير كامل للموقع الحالي **كما هو بالضبط** (نفس التصميم، الخطوط، الألوان، الإيفكتات، اللوغو، الهيدر والفوتر) إلى مشروع **Next.js 14** جاهز للرفع على **GitHub / Vercel**، مع ربط **Resend** لإرسال النماذج إلى البريد.

> أُضيف فقط ربط الـ API لإرسال البريد — **لم يتغيّر أي شيء في الواجهة**.

---

## 🚀 النشر على Vercel — خطوة بخطوة

### ١) ارفع المشروع على GitHub
```bash
# داخل المجلد بعد فك الـ ZIP
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/almaliki-law-firm.git
git push -u origin main
```
> بدون Git؟ افتح الـ Repo الجديد على github.com واستخدم زر **uploading an existing file** لرفع الملفات.

### ٢) أنشئ مشروع Vercel
1. ادخل [vercel.com](https://vercel.com) وسجّل بحساب GitHub.
2. **Add New → Project** ثم اختر الـ Repo.
3. اترك الإعدادات الافتراضية (Vercel يكتشف Next.js تلقائيًا).
4. **قبل Deploy:** افتح **Environment Variables** وأضف المفتاح (الخطوة ٣).
5. اضغط **Deploy**.

### ٣) متغيّر البيئة (المطلوب الوحيد)
في **Project → Settings → Environment Variables** أضف:

| المتغيّر | القيمة | إجباري؟ |
|---|---|---|
| `RESEND_API_KEY` | مفتاح من resend.com (يبدأ بـ `re_`) | ✅ **نعم — الوحيد الإجباري** |
| `RESEND_FROM` | `مكتب المالكي <noreply@law-2030.com>` | ⚪ اختياري (له قيمة افتراضية) |
| `CONTACT_EMAIL` | `nawaf@law-2030.com` | ⚪ اختياري (الافتراضي `nawaf@law-2030.com`) |

ثم اضغط **Redeploy**. المفتاح غير موجود في الكود إطلاقًا.

---

## 📧 إعداد Resend
1. سجّل في [resend.com](https://resend.com) (مجاني — ٣٠٠٠ إيميل/شهر).
2. **API Keys → Create API Key** وانسخ المفتاح إلى `RESEND_API_KEY`.
3. **Domains → Add Domain** وأدخل `law-2030.com`، ثم أضف سجلات DNS التي يعرضها Resend عند مزوّد النطاق وانتظر حالة **Verified**.
   - بدون توثيق نطاق (للتجربة فقط): اضبط `RESEND_FROM="onboarding@resend.dev"`.
4. الرسائل تصل دائمًا إلى **nawaf@law-2030.com**.

---

## 🧩 ربط النماذج (مفعّل بالفعل)

| النموذج | المسار | يرسل إلى |
|---|---|---|
| تواصل معنا | `POST /api/contact` | `nawaf@law-2030.com` |
| طلب استشارة | `POST /api/consultation` | `nawaf@law-2030.com` |
| تسجيل قضية | `POST /api/new-case` | `nawaf@law-2030.com` |

**الحقول المُرسَلة:** الاسم، رقم الجوال، البريد، نوع القضية/الاستشارة، الوصف، وجميع الحقول الموجودة في النموذج (المدينة، الصفة، الجلسة، الإقرارات، أسماء المرفقات…).

**معالجة الأخطاء:** رسالة نجاح عند الإرسال، رسالة خطأ واضحة عند الفشل، ومنع الإرسال إذا نقصت الحقول الأساسية (تحقّق في الواجهة وفي الخادم).

---

## 💻 التشغيل المحلي
```bash
npm install
cp .env.example .env.local   # ثم ضع RESEND_API_KEY
npm run dev                  # http://localhost:3000
```

---

## 📂 البنية
```
src/
├── app/
│   ├── layout.jsx          # html lang=ar dir=rtl + الخطوط
│   ├── page.jsx            # يحمّل التطبيق (SPA) على العميل
│   ├── globals.css         # نفس styles.css الأصلي بالكامل
│   └── api/
│       ├── contact/route.js
│       ├── consultation/route.js
│       └── new-case/route.js
├── server/
│   └── email.js            # عميل Resend + قوالب الإيميل
└── site/                   # نفس ملفات الموقع الأصلية حرفيًا
    ├── data.js
    ├── components.jsx      # الهيدر، الفوتر، الإيفكتات…
    ├── pages-main.jsx
    ├── pages-forms.jsx
    ├── pages-legal.jsx
    └── App.jsx
public/assets/              # اللوغو والأنماط والصور
```

تعديل المحتوى (الهاتف/الإيميل/الخدمات/الأسئلة) من `src/site/data.js`.

---

**© ٢٠٢٦ مكتب المحامي نواف بن أحمد المالكي**
