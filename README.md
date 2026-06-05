# مكتب المحامي نواف بن أحمد المالكي — Law Firm Website

موقع رسمي لمكتب محاماة سعودي مبني بـ **Next.js 14** و **TypeScript** و **Tailwind CSS**.

> **اللغة:** عربي (RTL) — مع طبقات لاتينية مائلة في الهيدر والفوتر
> **الخدمات المضمّنة:** ١١ مجال ممارسة، نموذج تسجيل قضية بأربع خطوات، طلب استشارة، تواصل، أسئلة شائعة، خصوصية، شروط شروط

---

## 📦 المحتويات

```
almaliki-law-firm/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Header + Footer wrap
│   │   ├── page.tsx                # الصفحة الرئيسية
│   │   ├── globals.css             # توكنات الهوية البصرية
│   │   ├── about/page.tsx          # من نحن
│   │   ├── services/page.tsx       # ١١ خدمة
│   │   ├── new-case/page.tsx       # تسجيل قضية (٤ خطوات)
│   │   ├── consultation/page.tsx   # طلب استشارة
│   │   ├── contact/page.tsx        # تواصل + خريطة
│   │   ├── faq/page.tsx            # الأسئلة الشائعة
│   │   ├── privacy/page.tsx        # سياسة الخصوصية
│   │   ├── terms/page.tsx          # الشروط والأحكام
│   │   └── api/
│   │       ├── new-case/route.ts   # 📧 يرسل لـ nawaf@law-2030.com
│   │       ├── consultation/route.ts
│   │       └── contact/route.ts
│   ├── components/
│   │   ├── Header.tsx              # Navbar + قائمة موبايل
│   │   ├── Footer.tsx
│   │   ├── Shared.tsx              # SectionHead, PageHero, CtaStrip, ScalesGlyph...
│   │   ├── Reveal.tsx              # Scroll reveal
│   │   ├── FaqAccordion.tsx
│   │   ├── LegalLayout.tsx
│   │   └── forms/
│   │       ├── NewCaseForm.tsx     # نموذج القضية بـ React Hook Form + Zod
│   │       ├── ConsultationForm.tsx
│   │       └── ContactForm.tsx
│   └── lib/
│       ├── data.ts                 # الخدمات، الأسئلة، التواصل (مصدر وحيد)
│       ├── schemas.ts              # Zod validation
│       ├── email-templates.ts      # قوالب HTML للإيميلات
│       ├── resend-client.ts        # Resend SDK wrapper
│       └── turnstile.ts            # تحقق Captcha
├── public/
│   ├── logo-mark.jpg               # شعار مربّع
│   └── logo-full.jpg               # شعار كامل
├── .env.example                    # نسخه إلى .env.local وضع المفاتيح
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 النشر على Vercel — خطوة بخطوة

### ١. ارفع الكود على GitHub أولًا (٣ دقائق)

```bash
# في مجلد المشروع بعد فك الـ ZIP
git init
git add .
git commit -m "Initial commit"
git branch -M main

# على github.com:
#   اضغط "+" → New repository → سمّه: almaliki-law-firm
#   لا تضع README أو .gitignore (موجودين بالفعل)

git remote add origin https://github.com/USERNAME/almaliki-law-firm.git
git push -u origin main
```

> **بدون Git؟** ارفع الملفات مباشرة عبر زر "uploading an existing file" داخل صفحة الـ Repo الجديد.

### ٢. أنشئ مشروع Vercel (دقيقتان)

1. ادخل [vercel.com](https://vercel.com) — اشترك بحساب GitHub
2. اضغط **Add New** → **Project**
3. اختر الـ Repo `almaliki-law-firm`
4. اترك جميع الإعدادات على الافتراضي (Vercel يكتشف Next.js تلقائيًا)
5. **قبل ما تضغط Deploy:** افتح قسم **Environment Variables** وأضف المفاتيح (الخطوة ٣)
6. اضغط **Deploy**

### ٣. متغيرات البيئة (Environment Variables)

أضف هذه المتغيرات في Vercel:

| المتغير | القيمة | إجباري؟ |
|---|---|---|
| `RESEND_API_KEY` | من resend.com بعد التسجيل (يبدأ بـ `re_`) | ✅ **نعم — الوحيد الإجباري** |
| `RESEND_FROM` | `مكتب المالكي <noreply@law-2030.com>` | ⚪ اختياري (له قيمة افتراضية) |
| `CONTACT_EMAIL` | `nawaf@law-2030.com` | ⚪ اختياري (الافتراضي `nawaf@law-2030.com`) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | من Cloudflare Turnstile | ⚪ موصى به |
| `TURNSTILE_SECRET_KEY` | من Cloudflare Turnstile | ⚪ موصى به |

> **أقل إعداد ممكن للتشغيل:** أضف `RESEND_API_KEY` فقط — وستصل جميع الرسائل تلقائيًا إلى `nawaf@law-2030.com`. باقي المتغيرات لها قيم افتراضية داخل الكود.

---

## 📧 إعداد Resend (لإرسال الإيميلات فعليًا)

### ١. سجّل في Resend
ادخل [resend.com](https://resend.com) → اشترك مجانًا (٣٠٠٠ إيميل/شهر)

### ٢. أنشئ API Key
**API Keys** → **Create API Key** → سمّه `production` → انسخ المفتاح (يبدأ بـ `re_`)

### ٣. وثّق نطاقك `law-2030.com`
**Domains** → **Add Domain** → أدخل `law-2030.com`

Resend يعرض لك ٣-٤ سجلات DNS (نوع TXT و MX). أضفها عند مزود النطاق (Hostinger / GoDaddy / Cloudflare...). انتظر ٥-١٥ دقيقة حتى يصير الحالة **Verified**.

> **بدون توثيق نطاق:** يمكنك مؤقتًا الإرسال من `onboarding@resend.dev` (للتجربة فقط). غيّر `RESEND_FROM` لـ `onboarding@resend.dev`.

### ٤. تأكد إن `CONTACT_EMAIL` صحيح
الافتراضي `nawaf@law-2030.com` — هذا اللي تصل له الرسائل من النماذج.

---

## 🛡️ إعداد Cloudflare Turnstile (موصى به لمنع السبام)

### ١. ادخل [Cloudflare Dashboard](https://dash.cloudflare.com/?to=/:account/turnstile)

### ٢. أنشئ موقع (Site)
- **Site Name:** Al-Maliki Law Firm
- **Hostnames:** أضف `law-2030.com` + `localhost` (للتطوير)
- **Widget Mode:** Managed (الافتراضي)

### ٣. انسخ المفتاحين
- **Site Key** → لـ `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- **Secret Key** → لـ `TURNSTILE_SECRET_KEY`

> **بدون Turnstile:** النماذج تشتغل لكن بدون حماية ضد البوتات. إذا ما عرّفت `TURNSTILE_SECRET_KEY` فالتحقق يتجاوز تلقائيًا (مفيد للتطوير المحلي).

---

## 🌐 ربط نطاق `law-2030.com` بـ Vercel

١. في Vercel: **Project Settings** → **Domains** → **Add**
٢. أدخل `law-2030.com` و `www.law-2030.com`
٣. Vercel يعرض سجلات DNS — أضفها عند مزود النطاق:
   - **A record:** `@` → `76.76.21.21`
   - **CNAME:** `www` → `cname.vercel-dns.com`
٤. انتظر ٥-٦٠ دقيقة لتفعيل الـ HTTPS تلقائيًا

---

## 💻 التشغيل المحلي (Local Development)

```bash
# داخل مجلد المشروع
npm install                  # تثبيت الحزم (يأخذ دقيقة)
cp .env.example .env.local   # نسخ ملف البيئة
# عدّل .env.local وضع مفاتيحك

npm run dev                  # تشغيل خادم التطوير
```

افتح [http://localhost:3000](http://localhost:3000)

> **بدون مفاتيح Resend:** النماذج تعرض خطأ عند الإرسال. هذا طبيعي — لتجربة كاملة استخدم مفاتيح تجريبية أو رفع المشروع على Vercel مباشرة.

---

## 🎨 تخصيص المحتوى

| تبي تعدّل... | افتح هذا الملف |
|---|---|
| رقم الجوال / الإيميل / العنوان | `src/lib/data.ts` (كائن `CONTACT`) |
| قائمة الخدمات الـ ١١ | `src/lib/data.ts` (مصفوفة `SERVICES`) |
| الأسئلة الشائعة | `src/lib/data.ts` (مصفوفة `FAQS`) |
| سياسة الخصوصية / الشروط | `src/lib/data.ts` (`PRIVACY_SECTIONS` / `TERMS_SECTIONS`) |
| الألوان والخطوط | `src/app/globals.css` (`:root` variables) |
| شعار المكتب | استبدل `public/logo-mark.jpg` و `public/logo-full.jpg` |
| نص الإيميل الواصل لك | `src/lib/email-templates.ts` |

---

## ✅ Checklist قبل النشر للعملاء

- [ ] متغيرات Resend مُضافة في Vercel
- [ ] نطاق `law-2030.com` موثّق في Resend (حالة Verified)
- [ ] Turnstile مُفعّل والمفاتيح في Vercel
- [ ] جربت إرسال نموذج تجريبي ووصلتك الرسالة
- [ ] النطاق مربوط مع Vercel و HTTPS يعمل
- [ ] راجعت بيانات التواصل في `src/lib/data.ts`
- [ ] استبدلت الشعار بصور بدقة أعلى إن وُجدت

---

## 🆘 مشكلات شائعة

**"تعذر إرسال البريد" عند الإرسال**
- تأكد أن `RESEND_API_KEY` صحيح ومُضاف في Vercel
- تأكد أن نطاق `RESEND_FROM` موثّق في Resend
- راجع **Logs** في Vercel: Project → Deployments → ▸ View Function Logs

**"فشل التحقق من Captcha"**
- تأكد أن `NEXT_PUBLIC_TURNSTILE_SITE_KEY` و `TURNSTILE_SECRET_KEY` متطابقان (نفس الـ widget)
- تأكد من إضافة hostname الموقع في إعدادات Turnstile

**الشعار ما يظهر**
- تأكد من وجود `public/logo-mark.jpg` و `public/logo-full.jpg` بالضبط بهذه الأسماء

---

## 📞 الدعم

للأسئلة التقنية:
- وثائق [Next.js](https://nextjs.org/docs)
- وثائق [Resend](https://resend.com/docs)
- وثائق [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/)
- وثائق [Vercel](https://vercel.com/docs)

---

**© ٢٠٢٦ مكتب المحامي نواف بن أحمد المالكي**
*Veritas · Diligentia · Fides*
