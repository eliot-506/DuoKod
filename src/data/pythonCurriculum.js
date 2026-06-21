const options = (items) => items.map((text, index) => ({
    id: String.fromCharCode(97 + index),
    text
}));

const choice = (id, skill, prompt, answers, correctId, explanation) => ({
    id, skill, type: 'multiple-choice', prompt,
    options: options(answers), correctId, explanation
});

const blank = (id, skill, prompt, codeBefore, codeAfter, correctAnswer, explanation, smartHint) => ({
    id, skill, type: 'fill-blanks', prompt, codeBefore, codeAfter,
    correctAnswer, explanation, smartHint
});

const write = (id, skill, prompt, correctAnswer, explanation) => ({
    id, skill, type: 'code-write', prompt, correctAnswer, explanation,
    placeholder: 'Python kodini yozing...'
});

const fix = (id, skill, prompt, initialCode, correctAnswer, explanation) => ({
    id, skill, type: 'code-fix', prompt, initialCode, correctAnswer, explanation
});

const drag = (id, skill, prompt, blocks, correctAnswer, terminalOutput, explanation) => ({
    id, skill, type: 'drag-reorder', prompt, options: blocks,
    correctAnswer, terminalOutput, explanation
});

// Eric Matthes, Python Crash Course (3-nashr), I qism asosida moslashtirilgan.
// Matnlar so'zma-so'z ko'chirilmagan: boshlovchilar uchun o'zbekcha qayta bayon qilingan.
export const PYTHON_CURRICULUM = [
    {
        id: 1,
        title: 'Python bilan ilk qadam',
        desc: 'Muhit, buyruqlar, print() va xatoni o‘qish',
        theory: [
            'Python dasturi buyruqlarni yuqoridan pastga bajaradi. Birinchi maqsad kodni ishga tushirish va natijani terminalda ko‘rishdir.',
            'print() funksiyasi matn yoki qiymatni ekranga chiqaradi: print("Salom, DuoKod!"). Matn qo‘shtirnoq ichida yoziladi.',
            'Python katta va kichik harfni farqlaydi. print to‘g‘ri nom, Print esa boshqa nom hisoblanadi.',
            'Xato xabari jazolash emas, yo‘l-yo‘riqdir. Traceback ichidagi oxirgi satr odatda xato turi va sababini ko‘rsatadi.',
            'Python dasturi .py kengaytmali faylda saqlanadi. Terminalda python salom.py buyrug‘i fayldagi kodni interpreter orqali bajaradi.'
        ],
        questions: [
            choice('py1-1', 'syntax', 'Qaysi kod matnni terminalga chiqaradi?', ['echo("Salom")', 'print("Salom")', 'console.log("Salom")', 'show("Salom")'], 'b', 'Python ekranga chiqarish uchun print() funksiyasidan foydalanadi.'),
            blank('py1-2', 'syntax', 'Funksiya nomini to‘ldiring.', '', '("DuoKod")', 'print', 'print kichik harflarda yoziladi.', 'Ekranga chiqarish funksiyasini eslang.'),
            drag('py1-3', 'syntax', 'Salomlashish kodini yig‘ing.', ['print', '(', '"Salom, Python!"', ')'], 'print("Salom, Python!")', 'Salom, Python!', 'Matn qo‘shtirnoqda, argument esa qavs ichida turadi.'),
            fix('py1-4', 'syntax', 'Katta-kichik harf xatosini tuzating.', 'Print("Birinchi missiya")', 'print("Birinchi missiya")', 'Python nomlarni registr bo‘yicha farqlaydi.'),
            choice('py1-5', 'syntax', 'Python kodi saqlanadigan fayl kengaytmasi qaysi?', ['.js', '.html', '.py', '.css'], 'c', 'Python manba fayllari .py kengaytmasida saqlanadi.')
        ]
    },
    {
        id: 2,
        title: 'O‘zgaruvchilar va sodda turlar',
        desc: 'Matn, son, nomlash qoidalari va f-string',
        theory: [
            'O‘zgaruvchi qiymatga berilgan tushunarli nomdir: ism = "Aziza". Python qiymat turini o‘zi aniqlaydi.',
            'O‘zgaruvchi nomi harf yoki pastki chiziq bilan boshlanadi, bo‘sh joy bo‘lmaydi va Python kalit so‘zlaridan foydalanmaydi.',
            'Matn str, butun son int, kasr son float turiga kiradi. + sonlarni qo‘shadi, matnlarni esa birlashtiradi.',
            'f-string o‘zgaruvchini matnga qulay joylaydi: f"Salom, {ism}!". Bu usul turli qiymatlarni qo‘lda aylantirishni kamaytiradi.',
            'strip() matnning ikki chetidagi ortiqcha bo‘sh joyni olib tashlaydi. lstrip() chap, rstrip() esa o‘ng tomonni tozalaydi.'
        ],
        questions: [
            choice('py2-1', 'variables', 'Python uchun to‘g‘ri o‘zgaruvchi nomini toping.', ['2yosh', 'mening yoshim', 'mening_yoshim', 'class'], 'c', 'Nom raqam bilan boshlanmaydi va unda bo‘sh joy bo‘lmaydi.'),
            blank('py2-2', 'variables', 'Qiymat biriktirish operatorini kiriting.', 'yosh ', ' 18', '=', '= qiymatni o‘zgaruvchiga biriktiradi.', 'Bitta tenglik belgisi kerak.'),
            write('py2-3', 'variables', 'ism o‘zgaruvchisiga "Ali" matnini saqlang.', 'ism = "Ali"', 'Matn qo‘shtirnoqda yoziladi va = orqali saqlanadi.'),
            fix('py2-4', 'variables', 'O‘zgaruvchi nomidagi xatoni tuzating.', 'mening yoshim = 18', 'mening_yoshim = 18', 'Ko‘p so‘zli nomlarda pastki chiziq ishlatiladi.'),
            blank('py2-5', 'variables', 'Matn chetidagi bo‘sh joylarni tozalang.', 'toza_ism = ism.', '()', 'strip', 'strip() matn boshidagi va oxiridagi bo‘sh joylarni olib tashlaydi.', 'Matnni tozalash metodini kiriting.')
        ]
    },
    {
        id: 3,
        title: 'Ro‘yxatlar',
        desc: 'Elementlar, indeks, append() va remove()',
        theory: [
            'List bir nechta qiymatni tartibli saqlaydi: mevalar = ["olma", "anor"]. Elementlar vergul bilan ajratiladi.',
            'Indeks 0 dan boshlanadi. mevalar[0] birinchi elementni, mevalar[-1] esa oxirgi elementni beradi.',
            'append() oxiriga element qo‘shadi, insert() joy tanlaydi, remove() qiymat bo‘yicha o‘chiradi va pop() elementni olib qaytaradi.',
            'sort() ro‘yxatning o‘zini tartiblaydi, sorted() esa yangi tartiblangan natija qaytaradi. len() elementlar sonini beradi.',
            'Ro‘yxat elementini indeks orqali yangilash mumkin: ranglar[0] = "ko‘k". Indeks mavjud bo‘lmasa IndexError yuz beradi.'
        ],
        questions: [
            choice('py3-1', 'variables', 'Ro‘yxatning birinchi elementi qaysi indeksda?', ['-1', '0', '1', 'first'], 'b', 'Python indekslashni 0 dan boshlaydi.'),
            blank('py3-2', 'variables', 'Ro‘yxat oxiriga "anor" qo‘shing.', 'mevalar.', '("anor")', 'append', 'append() yangi elementni ro‘yxat oxiriga qo‘shadi.', 'Inglizcha “oxiriga qo‘shmoq” metodini eslang.'),
            write('py3-3', 'variables', 'ranglar nomli bo‘sh ro‘yxat yarating.', 'ranglar = []', 'Bo‘sh list kvadrat qavs bilan yaratiladi.'),
            fix('py3-4', 'variables', 'Birinchi mevani chiqaradigan qilib tuzating.', 'print(mevalar[1])', 'print(mevalar[0])', 'Birinchi element indeksi 0.'),
            write('py3-5', 'variables', 'ranglar ro‘yxatining birinchi elementini "ko‘k" ga almashtiring.', 'ranglar[0] = "ko‘k"', 'Element qiymati indeks orqali yangilanadi.')
        ]
    },
    {
        id: 4,
        title: 'Ro‘yxatlar bilan ishlash',
        desc: 'for, range(), kesmalar va tuple',
        theory: [
            'for sikli ro‘yxatdagi har bir element uchun bir xil amalni bajaradi. Sikldagi kod to‘rt bo‘sh joy bilan ichkariga suriladi.',
            'range(boshi, oxiri) sonlar ketma-ketligini beradi, lekin oxirgi chegara natijaga kirmaydi. list(range(1, 5)) natijasi [1, 2, 3, 4].',
            'Kesma ro‘yxatning qismini oladi: sonlar[1:4]. Boshlanish kiradi, tugash indeksi esa kirmaydi.',
            'Tuple o‘zgarmas qiymatlar to‘plamidir va dumaloq qavsda yoziladi. O‘zgarmas o‘lcham yoki koordinatalar uchun qulay.',
            'List comprehension sikl va yangi ro‘yxat yaratishni bir qatorda birlashtiradi: kvadratlar = [son ** 2 for son in range(1, 6)].'
        ],
        questions: [
            choice('py4-1', 'loops', 'range(1, 4) qanday sonlarni beradi?', ['1, 2, 3', '1, 2, 3, 4', '0, 1, 2, 3', '2, 3, 4'], 'a', 'range() ning tugash chegarasi ketma-ketlikka kirmaydi.'),
            blank('py4-2', 'loops', 'Har bir mevani aylanib chiqing.', '', ' meva in mevalar:', 'for', 'Ro‘yxat elementlari for sikli bilan aylaniladi.', 'Takrorlash kalit so‘zini kiriting.'),
            drag('py4-3', 'loops', '1 dan 3 gacha sonlarni chiqaradigan kodni yig‘ing.', ['for son in range(1, 4):', '\n  ', 'print(son)'], 'for son in range(1, 4):\n  print(son)', '1\n2\n3', 'Sikl tanasi ichkariga suriladi.'),
            fix('py4-4', 'loops', 'Sikl sintaksisini tuzating.', 'for rang in ranglar\n  print(rang)', 'for rang in ranglar:\n  print(rang)', 'for qatori ikki nuqta bilan tugaydi.'),
            write('py4-5', 'loops', '1 dan 3 gacha sonlarning kvadratlari ro‘yxatini comprehension bilan yarating.', 'kvadratlar = [son ** 2 for son in range(1, 4)]', 'List comprehension ifodani, siklni va yangi ro‘yxatni bir qatorda yozadi.')
        ]
    },
    {
        id: 5,
        title: 'Shartlar va qarorlar',
        desc: 'Taqqoslash, boolean, if, elif va else',
        theory: [
            'Shart natijasi True yoki False bo‘ladi. == tenglikni tekshiradi, = esa qiymat biriktiradi.',
            'Taqqoslash operatorlari: !=, >, <, >= va <=. and ikkala shartni, or esa kamida bittasini talab qiladi.',
            'if shart rost bo‘lsa blokni bajaradi. elif qo‘shimcha shartlarni, else qolgan barcha holatlarni boshqaradi.',
            'in qiymat kolleksiyada borligini, not in esa yo‘qligini tekshiradi. Shart bloklarida chekinish majburiy.',
            'Bo‘sh ro‘yxat shartda False, ichida element bor ro‘yxat esa True sifatida baholanadi. if users: yozuvi ro‘yxat bo‘sh emasligini tekshiradi.'
        ],
        questions: [
            choice('py5-1', 'logic', 'Tenglikni tekshiruvchi operator qaysi?', ['=', '==', '!=', '=>'], 'b', '== ikki qiymat tengligini tekshiradi.'),
            blank('py5-2', 'logic', 'Aks holda ishlaydigan blokni to‘ldiring.', 'if ball >= 60:\n  print("O‘tdi")\n', ':\n  print("Yiqildi")', 'else', 'else oldingi shartlar bajarilmaganda ishlaydi.', 'if zanjirining oxirgi bo‘lagi.'),
            write('py5-3', 'logic', 'yosh 18 yoki katta bo‘lsa "Kirish mumkin" deb chiqaring.', 'if yosh >= 18:\n  print("Kirish mumkin")', 'Shartdan keyin ikki nuqta, tanada chekinish bo‘ladi.'),
            fix('py5-4', 'logic', 'Python shartini tuzating.', 'if yosh = 18:\n  print("18 yosh")', 'if yosh == 18:\n  print("18 yosh")', 'Taqqoslash uchun == ishlatiladi.'),
            blank('py5-5', 'logic', 'Ro‘yxat bo‘sh emasligini tekshiruvchi shartni to‘ldiring.', '', ' foydalanuvchilar:', 'if', 'Ro‘yxat ichida element bo‘lsa if uni True deb baholaydi.', 'Shart boshlovchi kalit so‘zni yozing.')
        ]
    },
    {
        id: 6,
        title: 'Lug‘atlar',
        desc: 'Kalit-qiymat, get(), sikl va ichma-ich tuzilma',
        theory: [
            'Dictionary ma’lumotni kalit-qiymat juftligida saqlaydi: odam = {"ism": "Ali", "yosh": 20}.',
            'Qiymat odam["ism"] orqali olinadi. get("ism") esa kalit topilmaganda dasturni yiqitmasdan natija qaytaradi.',
            'Yangi juftlik lugat["shahar"] = "Toshkent" ko‘rinishida qo‘shiladi, del esa juftlikni o‘chiradi.',
            'items() kalit va qiymatlarni, keys() kalitlarni, values() qiymatlarni siklda ko‘rish imkonini beradi.',
            'Lug‘atlar va ro‘yxatlar ichma-ich joylashishi mumkin. Masalan, talabalar = [{"ism": "Ali"}, {"ism": "Lola"}] bir nechta obyektni saqlaydi.'
        ],
        questions: [
            choice('py6-1', 'variables', 'Lug‘at qaysi qavsda yoziladi?', ['[]', '()', '{}', '<>'], 'c', 'Dictionary jingalak qavsda yoziladi.'),
            blank('py6-2', 'variables', 'ism qiymatini xavfsiz oling.', 'odam.', '("ism")', 'get', 'get() kalit topilmasa xatoni oldini oladi.', 'Qiymatni “olish” metodini kiriting.'),
            write('py6-3', 'variables', 'talaba nomli bo‘sh lug‘at yarating.', 'talaba = {}', 'Bo‘sh dictionary {} bilan yaratiladi.'),
            fix('py6-4', 'variables', 'Lug‘atdan ismni olish kodini tuzating.', 'print(odam.ism)', 'print(odam["ism"])', 'Lug‘at kaliti kvadrat qavs va qo‘shtirnoq bilan beriladi.'),
            write('py6-5', 'variables', 'Ali ismli bitta lug‘atdan iborat talabalar ro‘yxatini yarating.', 'talabalar = [{"ism": "Ali"}]', 'Lug‘atni ro‘yxat ichiga joylash murakkab ma’lumot tuzilmasini yaratadi.')
        ]
    },
    {
        id: 7,
        title: 'Foydalanuvchi kiritishi va while',
        desc: 'input(), int(), while, break va continue',
        theory: [
            'input() foydalanuvchidan ma’lumot oladi va natijani doim matn sifatida qaytaradi.',
            'Son bilan hisoblashdan oldin kiritilgan matn int() yoki float() orqali aylantiriladi.',
            'while shart True bo‘lib turgan vaqt davomida takrorlanadi. Holatni o‘zgartirmaslik cheksiz siklga olib kelishi mumkin.',
            'break siklni darhol tugatadi, continue esa joriy aylanishni tashlab keyingisiga o‘tadi.',
            'Qoldiq operatori % sonning boshqasiga bo‘lingandagi qoldiqni beradi. son % 2 == 0 sharti son juftligini aniqlaydi.'
        ],
        questions: [
            choice('py7-1', 'loops', 'input() qanday turdagi qiymat qaytaradi?', ['int', 'float', 'str', 'bool'], 'c', 'input() natijasi har doim str; kerak bo‘lsa uni aylantiramiz.'),
            blank('py7-2', 'loops', 'Kiritilgan yoshni butun songa aylantiring.', 'yosh = ', '(input("Yosh: "))', 'int', 'int() raqamli matnni butun songa aylantiradi.', 'Butun son turi nomini kiriting.'),
            write('py7-3', 'loops', 'x 5 dan kichik paytda uni bittaga oshiradigan sikl yozing.', 'while x < 5:\n  x += 1', 'while shart bilan takrorlanadi; x o‘zgarishi cheksiz siklni oldini oladi.'),
            fix('py7-4', 'loops', 'Sikldan chiqish buyrug‘ini tuzating.', 'while True:\n  breyk', 'while True:\n  break', 'Sikldan chiqish kalit so‘zi break.'),
            blank('py7-5', 'logic', 'Son juftligini tekshiradigan operatorni kiriting.', 'if son ', ' 2 == 0:', '%', '% bo‘lishdan qolgan qoldiqni hisoblaydi.', 'Qoldiq operatorini yozing.')
        ]
    },
    {
        id: 8,
        title: 'Funksiyalar',
        desc: 'Parametr, argument, return va modullar',
        theory: [
            'Funksiya nomlangan va qayta ishlatiladigan kod blokidir. U def kalit so‘zi bilan yaratiladi.',
            'Parametr funksiya ta’rifidagi nom, argument esa chaqirish paytida uzatilgan haqiqiy qiymatdir.',
            'return hisoblangan qiymatni chaqirgan joyga qaytaradi. print() faqat natijani ekranga ko‘rsatadi.',
            'Funksiyalarni alohida modulda saqlash va import orqali ulash kodni tartibli hamda qayta ishlatiladigan qiladi.',
            'Standart parametr argument berilmaganda ishlatiladi: def salom(ism="Do‘st"). Majburiy parametrlar standart parametrlardan oldin yoziladi.'
        ],
        questions: [
            choice('py8-1', 'functions', 'Funksiya yaratish qaysi kalit so‘zdan boshlanadi?', ['func', 'function', 'def', 'define'], 'c', 'Python funksiyasi def bilan e’lon qilinadi.'),
            blank('py8-2', 'functions', 'Natijani funksiyadan qaytaring.', 'def kvadrat(x):\n  ', ' x * x', 'return', 'return qiymatni funksiya tashqarisiga qaytaradi.', 'Natijani “qaytarish” kalit so‘zi.'),
            write('py8-3', 'functions', 'a va b ni qo‘shib qaytaradigan yigindi funksiyasini yozing.', 'def yigindi(a, b):\n  return a + b', 'Parametrlar qavsda, qaytariladigan natija return bilan yoziladi.'),
            fix('py8-4', 'functions', 'Funksiya sintaksisi va chekinishni tuzating.', 'function salom():\nprint("Salom")', 'def salom():\n  print("Salom")', 'Python def ishlatadi va funksiya tanasi ichkariga suriladi.'),
            write('py8-5', 'functions', 'ism uchun "Do‘st" standart qiymatli salom funksiyasini e’lon qiling.', 'def salom(ism="Do‘st"):\n  print(ism)', 'Standart qiymat parametr e’lonida = orqali beriladi.')
        ]
    },
    {
        id: 9,
        title: 'Klasslar va obyektlar',
        desc: '__init__, self, metod va meros olish',
        theory: [
            'Klass obyektlar uchun shablon, instance esa shu shablondan yaratilgan aniq obyekt hisoblanadi.',
            '__init__ yangi obyekt yaratilganda boshlang‘ich holatni o‘rnatadi. self aynan joriy obyektga murojaat qiladi.',
            'Atribut obyekt ma’lumoti, metod esa klass ichidagi funksiyadir. obyekt.metod() ko‘rinishida chaqiriladi.',
            'Meros olish yangi klassga mavjud klass xususiyatlarini beradi. Bu umumiy kodni takrorlamaslikka yordam beradi.',
            'Farzand klass ota klass nomini qavsda oladi: class ElektrMashina(Mashina):. super().__init__() ota klass boshlang‘ich sozlamalarini ishga tushiradi.'
        ],
        questions: [
            choice('py9-1', 'functions', 'Yangi obyekt boshlang‘ich holatini qaysi metod o‘rnatadi?', ['__start__', '__new_object__', '__init__', '__main__'], 'c', '__init__ instance yaratilganda ishga tushadi.'),
            blank('py9-2', 'functions', 'Klass e’lonini to‘ldiring.', '', ' Mashina:', 'class', 'Klass class kalit so‘zi bilan yaratiladi.', 'Obyekt shablonini bildiruvchi kalit so‘z.'),
            write('py9-3', 'functions', 'Mashina klassidan cobalt nomli obyekt yarating.', 'cobalt = Mashina()', 'Python obyekt yaratishda new kalit so‘zini ishlatmaydi.'),
            fix('py9-4', 'functions', 'Obyekt yaratish kodini tuzating.', 'telefon = new Telefon()', 'telefon = Telefon()', 'Klass nomini funksiya kabi chaqirish kifoya.'),
            blank('py9-5', 'functions', 'ElektrMashina klassini Mashina klassidan meros oling.', 'class ElektrMashina(', '):', 'Mashina', 'Ota klass nomi farzand klass qavsida yoziladi.', 'Meros olinadigan klass nomini kiriting.')
        ]
    },
    {
        id: 10,
        title: 'Fayllar, JSON va istisnolar',
        desc: 'O‘qish, yozish, saqlash va xatoni boshqarish',
        theory: [
            'Fayl bilan with open(...) as f shaklida ishlash resursning avtomatik yopilishini ta’minlaydi.',
            'r o‘qish, w qayta yozish, a oxiriga qo‘shish rejimidir. Fayl yo‘li dastur joylashuviga nisbatan yoki to‘liq beriladi.',
            'try xavfli kodni bajaradi, except kutilgan xatoni boshqaradi, else esa xato bo‘lmaganda ishlaydi.',
            'JSON sodda ma’lumotlarni faylda saqlash va keyin qayta yuklash uchun qulay almashinuv formatidir.',
            'pathlib dagi Path obyektlari fayl yo‘llarini turli operatsion tizimlarda xavfsiz boshqaradi. Path("data.txt").read_text() matnni o‘qiydi.'
        ],
        questions: [
            choice('py10-1', 'syntax', 'Python istisnoni qaysi blok bilan ushlaydi?', ['catch', 'error', 'except', 'rescue'], 'c', 'Python try-except tuzilmasidan foydalanadi.'),
            blank('py10-2', 'syntax', 'Faylni ochuvchi funksiyani kiriting.', 'f = ', '("data.txt", "r")', 'open', 'open() fayl yo‘li va rejimini qabul qiladi.', 'Inglizcha “ochmoq” funksiyasi.'),
            write('py10-3', 'syntax', 'ZeroDivisionError xatosini ushlaydigan eng sodda blokni yozing.', 'try:\n  natija = 1 / 0\nexcept ZeroDivisionError:\n  print("Nolga bo‘lib bo‘lmaydi")', 'Aniq xato turini ushlash keng except yozishdan yaxshiroq.'),
            fix('py10-4', 'syntax', 'JavaScript uslubidagi xato blokini Python uslubiga o‘tkazing.', 'try:\n  x = 1 / 0\ncatch:\n  print("Xato")', 'try:\n  x = 1 / 0\nexcept:\n  print("Xato")', 'Python catch o‘rniga except ishlatadi.'),
            blank('py10-5', 'syntax', 'Path obyektidan fayl matnini o‘qing.', 'matn = path.', '()', 'read_text', 'read_text() Path ko‘rsatgan fayl matnini o‘qib qaytaradi.', 'Matnni o‘qish metodini kiriting.')
        ]
    },
    {
        id: 11,
        title: 'Kodlarni testlash',
        desc: 'pytest, assert, test holatlari va regressiya',
        theory: [
            'Avtomatik test funksiya yoki klass kutilgan natijani berishini tekshiradi. Testlar xatoni foydalanuvchidan oldin topadi.',
            'Test case bitta xatti-harakatni tekshiradi. Oddiy, chegara va noto‘g‘ri kirish holatlarini alohida sinash kerak.',
            'assert haqiqiy natijani kutilgan natija bilan solishtiradi. Teng bo‘lmasa test aniq sabab bilan yiqiladi.',
            'Xato tuzatilgach yozilgan test regressiyani oldini oladi: kelajakdagi o‘zgarish eski muammoni qaytarsa test darhol ogohlantiradi.',
            'pytest testlarni avtomatik topishi uchun fayl va funksiya nomlari test_ bilan boshlanadi. Fixture takror ishlatiladigan test ma’lumotini bir joyda tayyorlaydi.'
        ],
        questions: [
            choice('py11-1', 'logic', 'Testning asosiy vazifasi nima?', ['Kod rangini tanlash', 'Kutilgan xatti-harakatni tekshirish', 'Fayl hajmini oshirish', 'Parol yaratish'], 'b', 'Test kodning belgilangan natijani berishini tekshiradi.'),
            blank('py11-2', 'logic', 'Tekshiruv kalit so‘zini kiriting.', '', ' yigindi(2, 3) == 5', 'assert', 'assert ifoda True bo‘lishini talab qiladi.', 'Natijani qat’iy tasdiqlovchi kalit so‘z.'),
            write('py11-3', 'logic', '2 + 2 natijasi 4 ekanini assert bilan tekshiring.', 'assert 2 + 2 == 4', 'assert dan keyin boolean ifoda yoziladi.'),
            fix('py11-4', 'logic', 'Testdagi taqqoslash xatosini tuzating.', 'assert 5 = 5', 'assert 5 == 5', 'Test tenglikni == bilan tekshiradi.'),
            choice('py11-5', 'logic', 'pytest avtomatik topadigan funksiya nomini tanlang.', ['check_yigindi()', 'sinov_yigindi()', 'test_yigindi()', 'yigindi_testi()'], 'c', 'pytest test_ bilan boshlanadigan funksiyalarni avtomatik aniqlaydi.')
        ]
    }
];
