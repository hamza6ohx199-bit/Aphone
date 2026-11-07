# اسم المشروع: (مفيش اسم نهائي لسه)
> لانشر أندرويد بالعربي، بيحول التليفون لـ "نظام تشغيل" ذكي للطلبة. الهدف: تذاكر أكتر، تضيع وقت أقل. فيه AI agent مركزي متحكم في كل حاجة (الثيم، البرايتنس، الوول بيبر، التطبيقات، التنبيهات...) والتطبيقات المدمجة كلها متوصلة بيه.

---

## 1. فريق العمل (2 AI Agents)

المشروع بيشتغل عليه عاملين اي اي في نفس الوقت، مش واحد:

| Agent | أدوات | دوره |
|---|---|---|
| **Claude (أنا)** | Claude Code CLI، شغال في فولدر المشروع مباشرة | المهندس المعماري الرئيسي: بيحافظ على هذا الملف (PROJECT.md)، بيصمم الأركيتكتشر، بيكتب الـ core logic (الـ AI agent engine، state management، الاتصال بـ Gemini function calling، الكود الحساس زي الـ permissions والـ native bridges)، بيراجع كل كود جاي من أنتيجرافيتي قبل ما يدخل المشروع، وبيكتب البرومبتات الجاهزة اللي هتتبعت لأنتيجرافيتي. |
| **Google Antigravity** | شغال في فولدر تاني على نفس الجهاز، مش نفس الفولدر بتاع Claude | متخصص في: الشاشات والواجهات (UI screens/components)، الحركات والأنيميشن، تصميم الثيمات والـ wallpapers (توليد صور/جرافيكس لأنه مبني على Gemini وأقرب لقدراته المالتيموديال)، أي تاسك واضح ومحدد بيحتاج تنفيذ سريع ومستقل. |

**ملاحظة:** الأدوات التانية (DeepSeek، ChatGPT) ممكن تستخدم لحاجات فرعية (أسئلة سريعة، مراجعة) بس **الكود الأساسي بيتكتب من Claude وAntigravity فقط**، عشان ما تتشرمطش الأركيتكتشر.

### طريقة التسليم (Hand-off)
- مفيش git repo مشترك دلوقتي. التبادل بين الاتنين بـ **نسخ ولصق**.
- لما Claude يحتاج حاجة من Antigravity: هيكتب برومبت كامل جاهز للنسخ (فيه كل الكونتكست اللازم: الملفات المتأثرة، الـ interfaces، الـ conventions) وانت بتاخده وتحطه لأنتيجرافيتي.
- لما ترجع بكود من Antigravity: هتلصقه هنا في فولدر `F:\phone` وانا هراجعه وهظبطه لو فيه تعارض مع الأركيتكتشر قبل ما نكمل.
- أي قرار مهم بيتاخد (تغيير أركيتكتشر، مكتبة جديدة، تسمية...) بيتسجل هنا تحت "القرارات" فوق، عشان الاتنين (وانت) تبقوا شايفين نفس الصورة.

---

## 2. اللغة الموحدة

عشان الشغل يكون سلس وسريع بين الاتنين، **كل كود التطبيق (منطق + واجهات) بيتكتب بـ TypeScript**. دي اللغة الموحدة للمشروع.

الاستثناء الوحيد: بعض الـ **Native Modules** لازم تتكتب بـ **Kotlin** لأن React Native مش بتوصل لكل Android APIs (زي usage stats، notification listener، wallpaper manager) — ده مش اختيار، ده شرط تقني من نظام أندرويد نفسه. هذا الكود هيكون صغير ومحدود في فولدر `android/` بس، وكل حاجة تحته هتتوصف بـ interface واضح بالـ TypeScript عشان باقي التطبيق ما يعرفش أصلا انه Kotlin.

---

## 3. Tech Stack

- **Framework:** React Native + Expo (development build — مش Expo Go، لازم عشان الـ native modules والـ launcher registration)
- **Language:** TypeScript
- **AI:** Google Gemini API (free tier) + function calling
- **Native:** Kotlin (native modules فقط: app list, usage stats, notifications, brightness, wallpaper, launcher role)
- **Storage:** expo-secure-store (API keys) + local storage (settings/data)

---

## 4. القرارات (Decisions Log)
- 2026-11-03: الفولدر الرسمي للمشروع: `F:\phone`
- 2026-11-03: التبادل مع Antigravity بالنسخ واللصق (مش git repo مشترك)
- 2026-11-03: اللغة الموحدة: TypeScript (+ Kotlin للـ native modules بس)
- 2026-11-03: Gemini API key متاح بالفعل عند المستخدم
- 2026-11-03: جهاز التجريب: موبايل أندرويد حقيقي + USB debugging/adb جاهزين

---

## 5. Stage 1 — تم تنفيذه (project setup + launcher + theme system)

### اللي حصل
- مشروع Expo (SDK 58) + TypeScript + Expo Router متسكفولد في `F:\phone`.
- Package name (مؤقت لحد ما نختار اسم نهائي): `com.studentos.launcher`. اسم العرض المؤقت: `StudentOS`.
- **تسجيل اللانشر**: `plugins/withHomeLauncher.js` — config plugin بيضيف `android.intent.category.HOME` و `DEFAULT` لنفس الـ intent-filter بتاع `MainActivity` (اللي فيه MAIN/LAUNCHER أصلا). اتأكدنا إنه شغال عن طريق `npx expo prebuild` وفحص `android/app/src/main/AndroidManifest.xml`.
- **RTL**: `I18nManager.forceRTL(true)` في `src/app/_layout.tsx`. ملحوظة مهمة: RTL في React Native بياخد تأثيره الكامل بعد reload واحد للتطبيق (مش حاجة تتصلح دلوقتي، طبيعة المكتبة).
- **نظام الثيم** (`src/theme/`):
  - `types.ts`: شكل `ThemeConfig` (style: glass/matte/solid، blur، transparency، accentColor، cornerRadius، animationLevel، fontSize، colorScheme، wallpaperUri).
  - `defaultTheme.ts`: الديفولت = "liquid glass" زي ما في الفيجن.
  - `profiles.ts`: بروفايلات جزئية (`battery`, `speed`) جاهزة عشان أداة `apply_profile` بتاعة الـ AI agent تستخدمها في مرحلة جاية — دلوقتي بس data، لسه مش متوصلة بحاجة.
  - `ThemeContext.tsx`: Provider + `useTheme()` بيحفظ الثيم في `AsyncStorage` (مفتاح `theme-config`) ويرجعه تاني أول ما التطبيق يفتح.
- **شاشة home مؤقتة** (`src/app/index.tsx`): بس لإثبات إن نظام الثيم شغال (بتقرأ accentColor/cornerRadius/transparency وتعرض نص الـ AI bar بالعربي RTL). هتتبدل بشاشة حقيقية في Stage تالية.
- اتأكد: `npx tsc --noEmit` ماشي بدون أي error.
- جاري: أول build بـ Gradle (`assembleDebug`) للتأكد إن المشروع الـ native بيتبني صح قبل التجربة الفعلية على الموبايل.

### لسه ناقص لإقفال Stage 1 فعليا
- تجربة فعلية على الموبايل (`npx expo run:android --device`) — محتاجة الموبايل يكون متوصل بالـ USB وقت التشغيل.
- بعد التثبيت: اختيار StudentOS كـ Home app من إعدادات أندرويد (الخطوات هتتوصف في رسالة التجربة).

### ⚠️ بلوكر حرج: مساحة قرص C: خلصت
أول محاولة build بـ Gradle فشلت (محتاج JDK 17 بالذات، وAndroid Studio معاه JDK 21 بس). وأثناء ما كنت بحمل JDK 17 محمول لحل المشكلة، لقيت إن **قرص C: ماله أي مساحة فاضية (0 بايت فاضي من 121 جيجا)**. مسحت الملف اللي كنت نزلته علشان أرجع مساحة بسيطة (~167 ميجا فاضيين دلوقتي)، بس ده برضه مش كفاية لأي build أندرويد (Gradle محتاج يحمل ويكاش جيجات على `C:\Users\HP\.gradle` و Android SDK بتاخد مساحة كبيرة برضه).

**محتاج من المستخدم:** يفضي مساحة على C: (كذا جيجا على الأقل) قبل ما نكمل أي build أندرويد فعلي. من غير كده مفيش طريقة نأكد إن اللانشر شغال على الموبايل فعلا، حتى لو كل الكود صحيح.
الكود نفسه (TypeScript + config plugin) اتأكد منه بطريقة تانية (tsc + فحص AndroidManifest بعد prebuild) وسليم.

### أسماء مؤقتة (محتاجة قرار نهائي من المستخدم)
- اسم التطبيق المعروض: `StudentOS` (placeholder بالإنجليزي، المفروض يتبدل لاسم عربي نهائي)
- Package name: `com.studentos.launcher` (أي تغيير هنا بعد كده بيحتاج uninstall/reinstall لأنه بيتغير identity التطبيق)
