# DuoKod

Python va web dasturlashni o‘rgatishga mo‘ljallangan React/Vite platformasi. Autentifikatsiya, progress va boshqaruv ma’lumotlari Supabase’da saqlanadi.

## Ishga tushirish

Talablar: Node.js 20+ va Supabase loyihasi.

```bash
npm install
copy .env.example .env
npm run dev
```

`.env` ichida `VITE_SUPABASE_URL` va `VITE_SUPABASE_ANON_KEY` qiymatlarini kiriting. Anon kalitni frontendda ishlatish normal, lekin service-role kalitini hech qachon frontendga joylamang.

## Tekshiruv

```bash
npm run lint
npm test
npm run build
```

## Supabase

`supabase/migrations` ichidagi migratsiyalarni vaqt tartibida qo‘llang. Production muhitida `profiles`, `course_progress`, `lesson_contents` va to‘lov jadvallarida RLS yoqilganini tekshiring. Admin roli faqat ishonchli server yoki Supabase boshqaruv paneli orqali berilishi kerak.

## Production xavfsizligi

Code Arena foydalanuvchi kodini origin huquqisiz sandboxlangan iframe ichida bajaradi. XP, premium va to‘lov kabi ishonch talab qiluvchi amallarni yakuniy production versiyada Supabase RPC yoki Edge Function orqali serverda tasdiqlash kerak.
