export const HTML_LESSONS = [
    {
        id: 1,
        title: 'HTML hujjat tuzilishi',
        desc: 'DOCTYPE, html, head va body qismlari',
        theory: [
            'HTML sahifadagi maʼlumotlarning tuzilishini belgilaydi. Brauzer matn, sarlavha, rasm, havola va formalarni HTML teglar orqali tushunadi.',
            '<!DOCTYPE html> brauzerga hujjat HTML5 standartida yozilganini bildiradi. Undan keyin butun sahifa <html> elementi ichida joylashadi.',
            '<head> qismida sahifa sozlamalari turadi: sarlavha, kodlash turi, mobil moslashuv va CSS fayllar. Foydalanuvchi ko‘radigan kontent esa <body> ichida bo‘ladi.',
            'Toza HTML yozishning birinchi talabi - elementlarni maqsadiga qarab tanlash va teglarni to‘g‘ri ochib-yopish.'
        ],
        questions: [
            { id: 'html1-q1', type: 'multiple-choice', prompt: 'HTML5 hujjati odatda qaysi satr bilan boshlanadi?', options: [{ id: 'a', text: '<html>' }, { id: 'b', text: '<!DOCTYPE html>' }, { id: 'c', text: '<head>' }, { id: 'd', text: '<body>' }], correctId: 'b', explanation: '<!DOCTYPE html> brauzerga hujjat HTML5 ekanini bildiradi.' },
            { id: 'html1-q2', type: 'fill-blanks', prompt: 'Foydalanuvchi ko‘radigan asosiy kontent qaysi teg ichida yoziladi?', codeBefore: '<', codeAfter: '>Salom, DuoKod!</body>', correctAnswer: 'body', explanation: '<body> sahifada ko‘rinadigan kontent uchun ishlatiladi.' },
            { id: 'html1-q3', type: 'code-write', prompt: 'Sahifaga "Salom, web!" matnli asosiy sarlavha yozing.', correctAnswer: '<h1>Salom, web!</h1>', placeholder: '<h1>...</h1>', explanation: '<h1> sahifadagi eng muhim sarlavhani bildiradi.' }
        ]
    },
    {
        id: 2,
        title: 'Matn, havola va rasm',
        desc: 'Kontentni o‘qilishi va navigatsiya uchun tayyorlash',
        theory: [
            'Matn kontenti sarlavha, paragraf va ro‘yxatlar orqali tartiblanadi. <h1> asosiy sarlavha, <p> esa oddiy matn uchun ishlatiladi.',
            'Havola yaratish uchun <a> tegi va href atributi kerak. href foydalanuvchi bosganda qaysi manzil ochilishini belgilaydi.',
            'Rasm qo‘shishda <img> tegi ishlatiladi. Rasm manzili src atributida, qisqa tavsifi esa alt atributida yoziladi.',
            'alt atributi accessibility uchun muhim: rasm yuklanmasa yoki screen reader ishlatilsa, foydalanuvchiga mazmunni tushuntiradi.'
        ],
        questions: [
            { id: 'html2-q1', type: 'fill-blanks', prompt: 'Havola manzilini ko‘rsatuvchi atributni kiriting.', codeBefore: '<a ', codeAfter: '="https://duokod.uz">DuoKod</a>', correctAnswer: 'href', explanation: 'href atributi havolaning boradigan manzilini belgilaydi.' },
            { id: 'html2-q2', type: 'code-fix', prompt: 'Rasm manzili noto‘g‘ri atributda yozilgan. Xatoni tuzating.', initialCode: '<img href="logo.png" alt="DuoKod logosi">', correctAnswer: '<img src="logo.png" alt="DuoKod logosi">', explanation: '<img> elementida fayl manzili src atributiga yoziladi.' },
            { id: 'html2-q3', type: 'multiple-choice', prompt: 'Rasm mazmunini qisqa tushuntirish uchun qaysi atribut kerak?', options: [{ id: 'a', text: 'href' }, { id: 'b', text: 'alt' }, { id: 'c', text: 'target' }, { id: 'd', text: 'title-only' }], correctId: 'b', explanation: 'alt rasmga matnli tavsif beradi.' }
        ]
    },
    {
        id: 3,
        title: 'Ro‘yxatlar va jadvallar',
        desc: 'Takroriy va jadval ko‘rinishidagi maʼlumotlar',
        theory: [
            'Ro‘yxatlar bir turdagi maʼlumotlarni tartibli ko‘rsatadi. <ul> belgili ro‘yxat, <ol> raqamlangan ro‘yxat uchun ishlatiladi.',
            'Har bir ro‘yxat elementi <li> tegi bilan yoziladi. Ro‘yxat ichida havola yoki oddiy matn bo‘lishi mumkin.',
            'Jadval qator va ustunlardan iborat maʼlumotlar uchun kerak. Asosiy teg <table>, qator <tr>, katak esa <td> bilan yoziladi.',
            'Jadvalda sarlavha kataklari uchun <th> ishlatiladi; bu maʼlumotni o‘qish va tushunishni osonlashtiradi.'
        ],
        questions: [
            { id: 'html3-q1', type: 'multiple-choice', prompt: 'Raqamlangan ro‘yxat uchun qaysi teg ishlatiladi?', options: [{ id: 'a', text: '<ul>' }, { id: 'b', text: '<ol>' }, { id: 'c', text: '<li>' }, { id: 'd', text: '<list>' }], correctId: 'b', explanation: '<ol> ordered list, yaʼni tartiblangan ro‘yxat degani.' },
            { id: 'html3-q2', type: 'fill-blanks', prompt: 'Ro‘yxat elementini bildiruvchi tegni kiriting.', codeBefore: '<ul><', codeAfter: '>HTML</li></ul>', correctAnswer: 'li', explanation: '<li> ro‘yxatdagi bitta elementni bildiradi.' },
            { id: 'html3-q3', type: 'code-write', prompt: '"Ism" va "Ali" qiymatlari bilan bitta qatorli jadval yozing.', correctAnswer: '<table><tr><td>Ism</td><td>Ali</td></tr></table>', placeholder: '<table>...</table>', explanation: '<tr> qator, <td> esa qator ichidagi katak uchun ishlatiladi.' }
        ]
    },
    {
        id: 4,
        title: 'Formalar va inputlar',
        desc: 'Foydalanuvchidan maʼlumot olish',
        theory: [
            'Forma foydalanuvchidan maʼlumot olish uchun ishlatiladi. Login, qidiruv, izoh va ro‘yxatdan o‘tish oynalari formaga misol bo‘ladi.',
            '<form> elementining ichida inputlar, label va tugmalar bo‘ladi. <label> input nimaga xizmat qilishini tushuntiradi.',
            '<input> turli maʼlumotlarni qabul qiladi: text, email, password, checkbox va boshqa turlar.',
            'Tugma uchun <button> ishlatiladi. type="submit" forma maʼlumotini yuborish harakatini bildiradi.'
        ],
        questions: [
            { id: 'html4-q1', type: 'multiple-choice', prompt: 'Foydalanuvchidan maʼlumot yig‘ish uchun asosiy konteyner qaysi?', options: [{ id: 'a', text: '<form>' }, { id: 'b', text: '<data>' }, { id: 'c', text: '<section>' }, { id: 'd', text: '<table>' }], correctId: 'a', explanation: '<form> input va tugmalarni bitta maqsad atrofida birlashtiradi.' },
            { id: 'html4-q2', type: 'fill-blanks', prompt: 'Email kiritish maydonini to‘ldiring.', codeBefore: '<input type="', codeAfter: '" name="email">', correctAnswer: 'email', explanation: 'type="email" brauzerga email formatidagi qiymat kutilayotganini bildiradi.' },
            { id: 'html4-q3', type: 'code-fix', prompt: 'Tugma noto‘g‘ri teg bilan yozilgan. Uni HTML standartiga moslang.', initialCode: '<btn>Yuborish</btn>', correctAnswer: '<button>Yuborish</button>', explanation: 'HTMLda tugma uchun <button> elementi ishlatiladi.' }
        ]
    },
    {
        id: 5,
        title: 'Semantika va accessibility',
        desc: 'Maʼnoli HTML yozish va mobil moslashuv',
        theory: [
            'Semantik HTML elementlari sahifa qismlarining vazifasini aniq bildiradi. Masalan, <header>, <nav>, <main>, <section> va <footer>.',
            'Semantika qidiruv tizimlari, screen readerlar va boshqa dasturlarga sahifani to‘g‘ri tushunishga yordam beradi.',
            'Mobil qurilmalar uchun viewport meta tegi kerak: u sahifaning ekran kengligiga mos chizilishini taʼminlaydi.',
            'Yaxshi HTML faqat ko‘rinish emas; u mazmun, tartib va accessibility uchun ham masʼul.'
        ],
        questions: [
            { id: 'html5-q1', type: 'multiple-choice', prompt: 'Sahifaning asosiy takrorlanmas kontenti qaysi semantik tegda yozilgani maʼqul?', options: [{ id: 'a', text: '<main>' }, { id: 'b', text: '<footer>' }, { id: 'c', text: '<span>' }, { id: 'd', text: '<b>' }], correctId: 'a', explanation: '<main> sahifadagi asosiy kontentni bildiradi.' },
            { id: 'html5-q2', type: 'fill-blanks', prompt: 'Pastki sahifa qismi uchun semantik tegni kiriting.', codeBefore: '<', codeAfter: '>2026 DuoKod</footer>', correctAnswer: 'footer', explanation: '<footer> odatda mualliflik, aloqa yoki qo‘shimcha havolalar joylashadigan pastki qism.' },
            { id: 'html5-q3', type: 'multiple-choice', prompt: 'Mobil ekranga moslashuv uchun qaysi meta sozlama ishlatiladi?', options: [{ id: 'a', text: '<meta name="viewport" content="width=device-width, initial-scale=1.0">' }, { id: 'b', text: '<mobile scale="true">' }, { id: 'c', text: '<screen responsive>' }, { id: 'd', text: '<meta name="desktop">' }], correctId: 'a', explanation: 'viewport meta tegi responsive sahifalar uchun asosiy sozlamalardan biri.' }
        ]
    }
];

export const CSS_LESSONS = [
    {
        id: 1,
        title: 'CSS ulash va ranglar',
        desc: 'Style qoidalari, selector va ranglar',
        theory: [
            'CSS HTML elementlarining ko‘rinishini boshqaradi: rang, shrift, masofa, o‘lcham va joylashuv.',
            'CSS qoidasi selector va deklaratsiyalardan iborat: p { color: green; }. Selector qaysi element o‘zgarishini tanlaydi.',
            'Tashqi CSS fayl HTMLga <link rel="stylesheet" href="style.css"> orqali ulanadi. Bu usul kodni tartibli saqlaydi.',
            'color matn rangini, background-color esa element fonini belgilaydi.'
        ],
        questions: [
            { id: 'css1-q1', type: 'fill-blanks', prompt: 'CSS faylni ulashda rel qiymatini kiriting.', codeBefore: '<link rel="', codeAfter: '" href="style.css">', correctAnswer: 'stylesheet', explanation: 'rel="stylesheet" ulangan fayl uslub jadvali ekanini bildiradi.' },
            { id: 'css1-q2', type: 'multiple-choice', prompt: 'Matn rangini o‘zgartirish uchun qaysi property ishlatiladi?', options: [{ id: 'a', text: 'color' }, { id: 'b', text: 'text-color' }, { id: 'c', text: 'font-color' }, { id: 'd', text: 'paint' }], correctId: 'a', explanation: 'CSSda matn rangi color bilan belgilanadi.' },
            { id: 'css1-q3', type: 'code-write', prompt: 'Barcha paragraf matnlarini ko‘k rangga o‘tkazing.', correctAnswer: 'p { color: blue; }', placeholder: 'p { ... }', explanation: 'p selector barcha <p> elementlarini tanlaydi.' }
        ]
    },
    {
        id: 2,
        title: 'Box model',
        desc: 'Content, padding, border va margin',
        theory: [
            'CSS box model har bir elementni quti sifatida tushuntiradi: content, padding, border va margin.',
            'padding kontent bilan chegara orasidagi ichki masofa. margin esa element tashqarisidagi masofa.',
            'border element atrofidagi chiziqni belgilaydi. Masalan: border: 1px solid #ddd.',
            'box-sizing: border-box yozilsa, width ichiga padding va border ham qo‘shib hisoblanadi; layout boshqarish osonlashadi.'
        ],
        questions: [
            { id: 'css2-q1', type: 'multiple-choice', prompt: 'Element ichidagi masofa qaysi property bilan beriladi?', options: [{ id: 'a', text: 'margin' }, { id: 'b', text: 'padding' }, { id: 'c', text: 'gap' }, { id: 'd', text: 'outline' }], correctId: 'b', explanation: 'padding element ichidagi masofani boshqaradi.' },
            { id: 'css2-q2', type: 'fill-blanks', prompt: 'Element tashqarisidan 20px joy qoldiruvchi propertyni kiriting.', codeBefore: '', codeAfter: ': 20px;', correctAnswer: 'margin', explanation: 'margin element tashqarisidagi masofani belgilaydi.' },
            { id: 'css2-q3', type: 'code-fix', prompt: 'Chegara yozuvidagi property nomini to‘g‘rilang.', initialCode: 'line: 1px solid black;', correctAnswer: 'border: 1px solid black;', explanation: 'CSSda element chegarasi border property orqali yoziladi.' }
        ]
    },
    {
        id: 3,
        title: 'Selectorlar va specificity',
        desc: 'Element, class va id orqali tanlash',
        theory: [
            'Selector CSS qoidasi qaysi HTML elementga qo‘llanishini belgilaydi. Masalan, h1 selector barcha <h1> elementlarini tanlaydi.',
            'Class selector nuqta bilan yoziladi: .card. Bitta class ko‘p elementga berilishi mumkin.',
            'ID selector # belgisi bilan yoziladi: #hero. ID sahifada odatda bitta noyob element uchun ishlatiladi.',
            'Amaliy loyihalarda class selectorlar ko‘proq ishlatiladi, chunki ularni qayta ishlatish va boshqarish oson.'
        ],
        questions: [
            { id: 'css3-q1', type: 'fill-blanks', prompt: 'HTML elementga class atributini qo‘shing.', codeBefore: '<div ', codeAfter: '="card">...</div>', correctAnswer: 'class', explanation: 'class atributi elementga qayta ishlatiladigan nom beradi.' },
            { id: 'css3-q2', type: 'multiple-choice', prompt: '.card selector nimani tanlaydi?', options: [{ id: 'a', text: 'card nomli tegni' }, { id: 'b', text: 'card classiga ega elementlarni' }, { id: 'c', text: 'card idli elementni' }, { id: 'd', text: 'barcha divlarni' }], correctId: 'b', explanation: 'Nuqta class selector ekanini bildiradi.' },
            { id: 'css3-q3', type: 'code-write', prompt: 'hero idli element fonini oq rang qiling.', correctAnswer: '#hero { background-color: white; }', placeholder: '#hero { ... }', explanation: '#hero id selector orqali aniq element tanlanadi.' }
        ]
    },
    {
        id: 4,
        title: 'Matn va vizual uslub',
        desc: 'Typography, radius va shadow',
        theory: [
            'Typography matnning o‘qilishi va hissiyotini boshqaradi. font-family, font-size, font-weight va line-height asosiy propertylar.',
            'text-align matnni chap, markaz yoki o‘ng tomonga tekislaydi. Markazlash uchun text-align: center yoziladi.',
            'border-radius element burchaklarini yumaloqlaydi. Tugma va cardlarda ko‘p ishlatiladi.',
            'box-shadow elementga chuqurlik beradi, lekin ko‘p ishlatilsa interfeys og‘irlashadi.'
        ],
        questions: [
            { id: 'css4-q1', type: 'multiple-choice', prompt: 'Matnni markazga tekislash qaysi kod bilan yoziladi?', options: [{ id: 'a', text: 'align-items: center;' }, { id: 'b', text: 'text-align: center;' }, { id: 'c', text: 'font-align: middle;' }, { id: 'd', text: 'center: text;' }], correctId: 'b', explanation: 'text-align inline matnni gorizontal tekislaydi.' },
            { id: 'css4-q2', type: 'fill-blanks', prompt: 'Element burchaklarini yumaloqlovchi propertyni kiriting.', codeBefore: '', codeAfter: ': 12px;', correctAnswer: 'border-radius', explanation: 'border-radius burchak radiusini belgilaydi.' },
            { id: 'css4-q3', type: 'code-write', prompt: 'Sarlavhani 32px va qalin qilib yozing.', correctAnswer: 'h1 { font-size: 32px; font-weight: 700; }', placeholder: 'h1 { ... }', explanation: 'font-size o‘lchamni, font-weight qalinlikni boshqaradi.' }
        ]
    },
    {
        id: 5,
        title: 'Flexbox va responsive',
        desc: 'Elementlarni qator va ustunlarda joylashtirish',
        theory: [
            'Flexbox elementlarni bir o‘q bo‘ylab joylashtirish uchun ishlatiladi. Parent elementga display: flex yoziladi.',
            'justify-content asosiy o‘qdagi joylashuvni, align-items esa kesishuvchi o‘qdagi tekislanishni boshqaradi.',
            'gap flex itemlar orasidagi masofani belgilaydi. Bu margin bilan qo‘lda masofa berishdan tozaroq.',
            'Responsive dizaynda media querylar ekran kengligiga qarab uslubni o‘zgartiradi.'
        ],
        questions: [
            { id: 'css5-q1', type: 'fill-blanks', prompt: 'Flexboxni yoqish uchun qiymatni kiriting.', codeBefore: 'display: ', codeAfter: ';', correctAnswer: 'flex', explanation: 'display: flex parent ichidagi elementlarni flex itemga aylantiradi.' },
            { id: 'css5-q2', type: 'multiple-choice', prompt: 'Flex itemlar orasidagi masofani qaysi property boshqaradi?', options: [{ id: 'a', text: 'gap' }, { id: 'b', text: 'space' }, { id: 'c', text: 'between' }, { id: 'd', text: 'distance' }], correctId: 'a', explanation: 'gap elementlar orasida barqaror masofa beradi.' },
            { id: 'css5-q3', type: 'code-write', prompt: '600px dan kichik ekranda .grid ni bitta ustun qiling.', correctAnswer: '@media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }', placeholder: '@media (...) { ... }', explanation: 'Media query kichik ekranlar uchun alohida uslub berishga yordam beradi.' }
        ]
    }
];

export const JS_LESSONS = [
    {
        id: 1,
        title: 'JavaScript asoslari',
        desc: 'Script ulash, console va qiymatlar',
        theory: [
            'JavaScript web sahifaga interaktivlik qo‘shadi: tugma bosish, maʼlumot tekshirish, hisob-kitob va DOM o‘zgartirish.',
            'HTML ichida JavaScript <script> tegi orqali ulanadi. Katta loyihalarda kod alohida .js faylda saqlanadi.',
            'console.log() dasturchiga qiymatlarni tekshirish va kod ishlayotganini ko‘rish imkonini beradi.',
            'Qiymatlar string, number, boolean, array va object kabi turlarda bo‘lishi mumkin.'
        ],
        questions: [
            { id: 'js1-q1', type: 'multiple-choice', prompt: 'JavaScript faylini HTMLga ulash uchun qaysi teg ishlatiladi?', options: [{ id: 'a', text: '<script>' }, { id: 'b', text: '<javascript>' }, { id: 'c', text: '<style>' }, { id: 'd', text: '<code>' }], correctId: 'a', explanation: '<script> JavaScript kodini sahifaga ulaydi yoki ichida bajaradi.' },
            { id: 'js1-q2', type: 'fill-blanks', prompt: 'Konsolga xabar chiqaruvchi metodni kiriting.', codeBefore: 'console.', codeAfter: '("Salom");', correctAnswer: 'log', explanation: 'console.log() debug qilish uchun eng oddiy vosita.' },
            { id: 'js1-q3', type: 'multiple-choice', prompt: '"DuoKod" qiymati qaysi turga kiradi?', options: [{ id: 'a', text: 'number' }, { id: 'b', text: 'string' }, { id: 'c', text: 'boolean' }, { id: 'd', text: 'array' }], correctId: 'b', explanation: 'Qo‘shtirnoq ichidagi matn string hisoblanadi.' }
        ]
    },
    {
        id: 2,
        title: 'O‘zgaruvchilar va funksiyalar',
        desc: 'let, const va qayta ishlatiladigan kod',
        theory: [
            'O‘zgaruvchi qiymatni nom bilan saqlaydi. JavaScriptda ko‘p hollarda const va let ishlatiladi.',
            'const qayta qiymat berilmaydigan bog‘lanish uchun, let esa keyin o‘zgarishi mumkin bo‘lgan qiymat uchun ishlatiladi.',
            'Funksiya nomlangan kod blokidir. U bir vazifani qayta-qayta bajarish uchun kerak.',
            'Parametr funksiya ichiga tashqaridan qiymat uzatishga yordam beradi.'
        ],
        questions: [
            { id: 'js2-q1', type: 'fill-blanks', prompt: 'Keyin qiymati o‘zgarishi mumkin bo‘lgan age o‘zgaruvchisini eʼlon qiling.', codeBefore: '', codeAfter: ' age = 22;', correctAnswer: 'let', explanation: 'let qiymati keyin o‘zgaradigan o‘zgaruvchilar uchun ishlatiladi.' },
            { id: 'js2-q2', type: 'multiple-choice', prompt: 'Qayta qiymat berilmaydigan o‘zgaruvchi uchun qaysi kalit so‘z mos?', options: [{ id: 'a', text: 'var' }, { id: 'b', text: 'let' }, { id: 'c', text: 'const' }, { id: 'd', text: 'fixed' }], correctId: 'c', explanation: 'const bog‘lanishni qayta tayinlashdan himoya qiladi.' },
            { id: 'js2-q3', type: 'code-write', prompt: 'name parametrini qabul qilib konsolga chiqaradigan greet funksiyasini yozing.', correctAnswer: 'function greet(name) { console.log(name); }', placeholder: 'function greet(...) { ... }', explanation: 'function nomi, parametrlar va tana blokidan iborat bo‘ladi.' }
        ]
    },
    {
        id: 3,
        title: 'Shartlar, array va object',
        desc: 'Qaror qabul qilish va maʼlumot tuzilmalari',
        theory: [
            'if/else kodni shartga qarab turli yo‘nalishda bajaradi. Shart true bo‘lsa if bloki ishlaydi.',
            'Array tartiblangan ro‘yxatdir: qiymatlar kvadrat qavs ichida yoziladi va indeks orqali olinadi.',
            'Object kalit-qiymat juftliklarini saqlaydi. Masalan: { name: "Ali", age: 18 }.',
            'Array bir turdagi ko‘p qiymat uchun, object esa bitta obyektning xususiyatlari uchun qulay.'
        ],
        questions: [
            { id: 'js3-q1', type: 'multiple-choice', prompt: 'JavaScriptda shart tekshirish uchun qaysi kalit so‘z ishlatiladi?', options: [{ id: 'a', text: 'if' }, { id: 'b', text: 'check' }, { id: 'c', text: 'when' }, { id: 'd', text: 'select' }], correctId: 'a', explanation: 'if shartli bajarishni boshlaydi.' },
            { id: 'js3-q2', type: 'fill-blanks', prompt: 'Array ochuvchi belgini kiriting.', codeBefore: 'const fruits = ', codeAfter: '"Olma", "Anor"];', correctAnswer: '[', explanation: 'Array kvadrat qavs bilan boshlanadi.' },
            { id: 'js3-q3', type: 'code-write', prompt: 'Ali ismli user obyektini yarating.', correctAnswer: 'const user = { name: "Ali" };', placeholder: 'const user = ...', explanation: 'Object jingalak qavs ichida kalit-qiymat juftliklarini saqlaydi.' }
        ]
    },
    {
        id: 4,
        title: 'Looplar va hodisalar',
        desc: 'Takrorlash va foydalanuvchi harakati',
        theory: [
            'Loop takrorlanadigan ishni avtomatlashtiradi. for loopi sanash kerak bo‘lgan holatlarda ko‘p ishlatiladi.',
            'while loopi shart true bo‘lib turgan vaqt davomida ishlaydi. Shart hech qachon false bo‘lmasa, cheksiz loop yuzaga keladi.',
            'Event foydalanuvchi harakatini bildiradi: click, input, submit kabi hodisalar bor.',
            'DOM elementiga addEventListener orqali hodisa tinglovchi funksiya ulanadi.'
        ],
        questions: [
            { id: 'js4-q1', type: 'fill-blanks', prompt: 'Sanash uchun ishlatiladigan loop kalit so‘zini kiriting.', codeBefore: '', codeAfter: ' (let i = 0; i < 3; i++) { console.log(i); }', correctAnswer: 'for', explanation: 'for loopi boshlanish, shart va o‘zgarish qismlaridan iborat.' },
            { id: 'js4-q2', type: 'multiple-choice', prompt: 'Tugma bosilishi qaysi event bilan ifodalanadi?', options: [{ id: 'a', text: 'click' }, { id: 'b', text: 'hover-only' }, { id: 'c', text: 'pressing' }, { id: 'd', text: 'submit-text' }], correctId: 'a', explanation: 'click foydalanuvchi bosganini bildiradi.' },
            { id: 'js4-q3', type: 'code-fix', prompt: 'Event nomi noto‘g‘ri yozilgan. Uni to‘g‘rilang.', initialCode: 'button.addEventListener("pressed", run);', correctAnswer: 'button.addEventListener("click", run);', explanation: 'Tugma bosilishi uchun standart event nomi click.' }
        ]
    },
    {
        id: 5,
        title: 'Qatʼiy solishtirish va DOM',
        desc: '===, querySelector va matnni o‘zgartirish',
        theory: [
            'JavaScriptda === qiymat va tur bir xil bo‘lishini tekshiradi. == esa tur konvertatsiyasi qilishi mumkin.',
            'DOM brauzerdagi HTML hujjatning JavaScript orqali boshqariladigan daraxt ko‘rinishidir.',
            'document.querySelector() CSS selector orqali birinchi mos elementni topadi.',
            'Element matnini o‘zgartirish uchun textContent ishlatiladi. Bu foydalanuvchiga ko‘rinadigan matnni yangilaydi.'
        ],
        questions: [
            { id: 'js5-q1', type: 'multiple-choice', prompt: 'Tur va qiymatni qatʼiy solishtiruvchi operator qaysi?', options: [{ id: 'a', text: '=' }, { id: 'b', text: '==' }, { id: 'c', text: '===' }, { id: 'd', text: '=>' }], correctId: 'c', explanation: '=== tur konvertatsiyasiz qatʼiy solishtiradi.' },
            { id: 'js5-q2', type: 'fill-blanks', prompt: 'CSS selector orqali element topuvchi metodni kiriting.', codeBefore: 'document.', codeAfter: '(".title");', correctAnswer: 'querySelector', explanation: 'querySelector birinchi mos elementni qaytaradi.' },
            { id: 'js5-q3', type: 'code-write', prompt: '.message element matnini "Tayyor" ga o‘zgartiring.', correctAnswer: 'document.querySelector(".message").textContent = "Tayyor";', placeholder: 'document...', explanation: 'textContent element ichidagi matnni yangilaydi.' }
        ]
    }
];

export const PYTHON_LESSONS = [
    {
        id: 1, title: 'Python va Hello World', desc: 'Birinchi dastur va asosiy sintaksis',
        theory: [
            "Python dasturchi bilan kompyuter o'rtasidagi sodda buyruqlar tilidir. Unda buyruqlar ko'pincha oddiy inglizcha so'zlarga o'xshaydi.",
            "Birinchi missiya - ekranga xabar chiqarish. Buning uchun print() funksiyasi ishlatiladi.",
            "Matn yozishda uni qo'shtirnoq ichiga olamiz: print(\"Salom\"). Qo'shtirnoq matn qayerdan boshlanib qayerda tugashini bildiradi.",
            "Python katta-kichik harflarga e'tibor beradi. print to'g'ri, Print esa boshqa nom sifatida qaraladi.",
            "Kod yozilganda kompyuter uni yuqoridan pastga qarab bajaradi. Shuning uchun har bir qatordagi buyruq aniq bo'lishi kerak."
        ],
        questions: [{ id: 'q1', skill: 'syntax', type: 'multiple-choice', prompt: 'Python da ekranga qanday qilib "Hello world!" so\'zini chiqarish mumkin?', options: [{ id: 'a', text: 'echo "Hello world!"' }, { id: 'b', text: 'console.log("Hello world!")' }, { id: 'c', text: 'print("Hello world!")' }, { id: 'd', text: 'show("Hello world!")' }], correctId: 'c', explanation: 'Pythonda maxsus print() komandasi bor.' }, { id: 'q2', skill: 'syntax', type: 'fill-blanks', prompt: 'Dasturdagi yozuvni to\'ldiring:', codeBefore: '', codeAfter: '("Hello world!");', correctAnswer: 'print', smartHint: 'Bu yerda xato qilyapsiz, ekranga chiqarish so\'zini harflab tekshiring: print', explanation: 'Buyruq doim kichik harflarda yoziladi.' }, { id: 'q3', skill: 'syntax', type: 'drag-reorder', prompt: 'Topshiriq: Ekranga "Hello world!" so\'zini chop etuvchi kodni qismlardan yig\'ing.', options: ['print', '(', '"Hello world!"', ')'], correctAnswer: 'print("Hello world!")', terminalOutput: '> Hello world!', smartHint: 'Matnni aynan qo\'shtirnoqqa o\'rash kerak!', explanation: 'Matn bo\'lgani uchun doim qo\'shtirnoq ishlatiladi.' }]
    },
    {
        id: 2, title: 'O\'zgaruvchilar va raqamlar', desc: 'Qiymatlar, sonlar va o‘zgaruvchilar bilan ishlash',
        theory: [
            "Ma'lumotlarni xotirada saqlash uchun o'zgaruvchilardan (variables) foydalanamiz. Masalan: `yosh = 20`",
            "Siz matnli (text) va raqamli (numerical) qiymatlar bilan qulay ishlashingiz mumkin."
        ],
        questions: [{ id: 'q4', skill: 'variables', type: 'multiple-choice', prompt: 'O\'zgaruvchiga ma\'lumot saqlashning to\'g\'ri usulini tanlang:', options: [{ id: 'a', text: 'let ism = "Ali"' }, { id: 'b', text: 'ism = "Ali"' }, { id: 'c', text: 'var ism = "Ali"' }, { id: 'd', text: 'String ism = "Ali"' }], correctId: 'b', explanation: 'Tilsiz (Typesiz) oson e\'lon qilinadi.' }, { id: 'q5', skill: 'variables', type: 'fill-blanks', prompt: 'Xotiraga raqamni saqlash qismini to\'ldiring:', codeBefore: 'yosh ', codeAfter: ' 25', correctAnswer: '=', smartHint: 'Ikkala tomonni biriga "tenglash" belgisi...', explanation: '= tenglashtirish operatori.' }, { id: 'q6', skill: 'variables', type: 'drag-reorder', prompt: 'Topshiriq: O\'zgaruvchini yarating va unga raqam biriktiring.', options: ['mening_yoshim', ' = ', '25', 'var '], correctAnswer: 'mening_yoshim = 25', terminalOutput: '> Process finished with exit code 0.', smartHint: 'Python da JS kabi yordamchi `var` so\'zi umuman ishlatilmaydi!', explanation: 'O\'zgaruvchi nomlarida bo\'sh joy o\'rniga (_) ishlatiladi va Pythonda var yozilmaydi.' }]
    },
    {
        id: 3, title: 'Matnlar va input', desc: 'Matn qabul qilish va natijani chiqarish',
        theory: [
            "Bir nechta ma'lumotlarni qisqa kod orqali bitta qutida saqlash - bu Ro'yxat (List).",
            "Listlar kvadrat qavslar ichida yoziladi va minglab qiymatlarni qamrab oladi: `[1, 2, 3]`"
        ],
        questions: [{ id: 'q7', skill: 'variables', type: 'multiple-choice', prompt: 'Pythonda to\'g\'ri yaratilgan ro\'yxatni toping:', options: [{ id: 'a', text: 'l = (1, 2, 3)' }, { id: 'b', text: 'l = {1, 2, 3}' }, { id: 'c', text: 'l = [1, 2, 3]' }, { id: 'd', text: 'l = <1, 2, 3>' }], correctId: 'c', explanation: 'List (Massivlar) Kvadrat qavs oladi.' }, { id: 'q8', skill: 'variables', type: 'fill-blanks', prompt: 'Bo\'sh ro\'yxatni yaratish:', codeBefore: 'mevalar = ', codeAfter: ']', correctAnswer: '[', smartHint: 'Massivlarni ochish qavsi har doim to`rtburchak shaklda bo`ladi.', explanation: 'Kvadrat qavs ochilishi kerak.' }, { id: 'q9', skill: 'variables', type: 'code-write', prompt: 'Topshiriq: Bo\'sh hisoblangan "raqamlar" nomli ro\'yxat yarating.', correctAnswer: 'raqamlar = []', placeholder: 'ro\'yxat nomini va ramzini yozing...', explanation: 'Bo\'sh ro\'yxat ochish uchun tenglikdan so\'ng ro\'yxat belgisi qoldiriladi.' }]
    },
    {
        id: 4, title: 'Shart operatorlari', desc: 'Qaror qabul qilish mantiqi',
        theory: [
            "Ro'yxat ichidagi malumotlarni bemalol o'chiring, o'zgartiring yoki samarali tahrirlang.",
            "Bu sizga yuzlab (millionlab) ma'lumotlar bilan bir necha qatorda oson ishlash imkonini beradi."
        ],
        questions: [{ id: 'q10', skill: 'functions', type: 'multiple-choice', prompt: 'Ro\'yxat oxiriga yangi narsa qo\'shish uchun mo\'ljallangan metod:', options: [{ id: 'a', text: 'add()' }, { id: 'b', text: 'insert()' }, { id: 'c', text: 'append()' }, { id: 'd', text: 'push()' }], correctId: 'c', explanation: 'Append usuli doim oxiriga yozadi.' }, { id: 'q11', skill: 'functions', type: 'fill-blanks', prompt: 'Ro\'yxatdan malumot olib tashlash kodi:', codeBefore: 'mevalar.', codeAfter: '("Olma")', correctAnswer: 'remove', smartHint: 'Inglizchada o\'chirmoq (olib tashlamoq) degan ma\'noni beruvchi so\'zx.', explanation: 'Olib tashlash remove() orqali amalga oshadi.' }, { id: 'q12', skill: 'functions', type: 'code-fix', prompt: 'Topshiriq: Kodni to\'g\'irlang, massiv uzunligini (length) o\'lchash:', initialCode: 'uzunlik = count(ro\'yxat)', correctAnswer: 'uzunlik = len(ro\'yxat)', explanation: 'Pythonda uzunlikni topish len() funksiyasi orqali yoziladi.' }]
    },
    {
        id: 5, title: 'Takrorlash operatorlari', desc: 'Kod takrorlanishini boshqarish',
        theory: [
            "Shartlarni tekshirish va dastur yo'nalishini ob-havoga qarab o'zgartirish uchun `if` ishlatiladi.",
            "Agar shart xato (False) bo'lsa `else` yoki boshqa natijalar uchun javobgar bo`limga o'tadi."
        ],
        questions: [{ id: 'q13', skill: 'logic', type: 'multiple-choice', prompt: 'Agar (If) sharti qanday qilib Pythonda standart yoziladi?', options: [{ id: 'a', text: 'if x > 5 {' }, { id: 'b', text: 'if x > 5:' }, { id: 'c', text: 'if (x > 5) then' }, { id: 'd', text: 'if x > 5 then' }], correctId: 'b', explanation: 'Shartdan keyin : (ikki nuqta) qoyiladi.' }, { id: 'q14', skill: 'logic', type: 'fill-blanks', prompt: 'Boshqa barcha shartlarsiz holatlar (aks holda) ni bildiruvchi buyruq:', codeBefore: 'if yosh >= 18: \n  print("Katta") \n', codeAfter: ': \n  print("Kichik")', correctAnswer: 'else', smartHint: 'If ni to\'ldiruvchisi, huddi qolgan hamma holatlar uchundek.', explanation: 'Else oxirgi va yagona burilishdir.' }, { id: 'q15', skill: 'logic', type: 'multiple-choice', prompt: 'Agar navbatdagi yana bitta shart kiritmoqchi bo\'lsak nimadan foydalanamiz?', options: [{ id: 'a', text: 'else if:' }, { id: 'b', text: 'elif:' }, { id: 'c', text: 'elseif:' }, { id: 'd', text: 'or if:' }], correctId: 'b', explanation: 'Pythonda u "elif" deb yoziladi.' }]
    },
    {
        id: 6, title: 'Ro\'yxatlar', desc: 'Ma’lumotlarni guruhlash va boshqarish',
        theory: [
            "Lug'at yordamida o'zaro bog'liq ma'lumot qismlarini bitta to'plamga ulash mumkin (Key-Value).",
            "Ular ham listlar kabi istalgan hajmdagi obyekt ma'lumotlarini saqlay oladi."
        ],
        questions: [{ id: 'q16', type: 'multiple-choice', prompt: 'Lug\'at yaratish ko\'rinishi qanaqa bo\'ladi?', options: [{ id: 'a', text: 'd = [1,2]' }, { id: 'b', text: 'd = {"kalit": "qiymat"}' }, { id: 'c', text: 'd = (1, 2)' }, { id: 'd', text: 'd = "kalit va qiymat"' }], correctId: 'b', explanation: 'Lug\'at jingalak qavsda `{}` yoziladi.' }, { id: 'q17', type: 'fill-blanks', prompt: 'Lug\'atdan "ism" ni chaqirib olish:', codeBefore: 'odam = {"ism": "Ali"} \nprint(odam[', codeAfter: '])', correctAnswer: '"ism"', explanation: 'Lug\'atlarni ichidagi Key (kalit) string orqali chaqiriladi.' }, { id: 'q18', type: 'code-write', prompt: 'Topshiriq: Bo\'sh "lugat" ismli Dictionary yarating.', correctAnswer: 'lugat = {}', placeholder: 'Dikt...', explanation: 'Bo\'sh lug\'atlar gulkosa qavs {} qoldirish bilan ochiladi.' }]
    },
    {
        id: 7, title: 'Funksiyalar', desc: 'Kod bloklarini qayta ishlatish',
        theory: [
            "Foydalanuvchilar qaysidir qiymatni kiritishi uchun (Interaktiv interfeys) `input()` funksiyasi xizmat qiladi.",
            "Shartlar rost (True) bo'lib turgunicha kodni marta-va-marta aylantiruvchi dvigatel bu - `while` tsikli."
        ],
        questions: [{ id: 'q19', type: 'multiple-choice', prompt: 'Terminal orqali savol berib, ma\'lumotni qayd qilib olish uchun qaysi modul keladi?', options: [{ id: 'a', text: 'read()' }, { id: 'b', text: 'scan()' }, { id: 'c', text: 'input()' }, { id: 'd', text: 'get()' }], correctId: 'c', explanation: 'Input foydalanuvchidan satr yig\'adi.' }, { id: 'q20', type: 'fill-blanks', prompt: 'To shart bajarilayotgan holida cheksiz davom eta oladigan tsikl komandasi:', codeBefore: '', codeAfter: ' x < 10: \n  x += 1', correctAnswer: 'while', explanation: 'While aylanma tsikl hisoblanadi.' }, { id: 'q21', type: 'code-fix', prompt: 'Topshiriq: While tsiklini kuch bilan yirtib (to\'xtatib) chiqib ketish buyrug\'i qanday:', initialCode: 'breyk', correctAnswer: 'break', explanation: 'Chiqib ketish kaliti - break (sindirish) deyiladi.' }]
    },
    {
        id: 8, title: 'Lug\'atlar', desc: 'Kalit-qiymat juftliklari bilan ishlash',
        theory: [
            "Aniq bitta zo'r vazifani qilib beruvchi qolipli va xohlagan vaqtingiz chaqirish mumkin bo'lgan kod bloklari bu - Funksiyalar.",
            "Pthonda funksiya e'lon qilish uchun eng birinchi `def` kalit so'zi keltiriladi."
        ],
        questions: [{ id: 'q22', type: 'multiple-choice', prompt: 'Funksiya yaratish maxsus so\'zi nimadan boshlanadi?', options: [{ id: 'a', text: 'function' }, { id: 'b', text: 'def' }, { id: 'c', text: 'func' }, { id: 'd', text: 'define' }], correctId: 'b', explanation: 'Def - definition (aniqlash) deganidir.' }, { id: 'q23', type: 'fill-blanks', prompt: 'Funksiya yaratish strukturasi boshini to\'ldiring:', codeBefore: '', codeAfter: ' salomBer(): \n  print("Salom")', correctAnswer: 'def', explanation: 'Funksiya strukturasi def harflaridan tuziladi.' }, { id: 'q24', type: 'code-write', prompt: 'Topshiriq: Ismsiz, "yugur" nomli o\'z ichiga xarxil argument olmasdan ishlovchi funksiyani yozib chaqiring.', correctAnswer: 'yugur()', placeholder: 'buyruq...', explanation: 'Ishlatishda shunchaki ustiga yozilgan nomi bilan qavs () beriladi.' }]
    },
    {
        id: 9, title: 'Fayllar bilan ishlash', desc: 'Fayllarni o‘qish va yozish',
        theory: [
            "Dasturda real-hayotdagi ob'yektlarni (itlar, odamlar, mashinalar) yaratish uchun Klass (Class) metodikasi o'zgaradi.",
            "Klasslarning real iloji bo'lmagan abstrac elementlar shabloni."
        ],
        questions: [{ id: 'q25', type: 'multiple-choice', prompt: 'Haqiqiy narsalar mantiqida obyekt yozish uchun nima ishlatiladi?', options: [{ id: 'a', text: 'database' }, { id: 'b', text: 'class' }, { id: 'c', text: 'function' }, { id: 'd', text: 'loop' }], correctId: 'b', explanation: 'Klass o\'zining nusxasini bera olaydigan shablondir.' }, { id: 'q26', type: 'fill-blanks', prompt: 'Klass nomini aniqlashtirish yozuvi:', codeBefore: '', codeAfter: ' Mashina:', correctAnswer: 'class', explanation: 'Yaratuvchi doimo class hisoblanadi.' }, { id: 'q27', type: 'code-fix', prompt: 'Topshiriq: Yaratilgan "Kompyuter" klasidan obyekt shakillantirilish jarayonini aniqlang:', initialCode: 'hp = new Kompyuter()', correctAnswer: 'hp = Kompyuter()', explanation: 'Javascript kabi Python new deb takrorlashga majburlamaydi!' }]
    },
    {
        id: 10, title: 'Xatolarni boshqarish', desc: 'Xatolarni ushlash va tuzatish',
        theory: [
            "Fayllar bloki darslarida data saqlash tushintiriladi va dasturning uzilib qolmay umr-bot ma'lumot qoldirishi tekshiriladi.",
            "Exception (Istisno) tufayli tasodifiy kutilmagan hatoni chiroyli qabul qilib kod barbod o'qilishini to'xtatadi."
        ],
        questions: [{ id: 'q28', type: 'multiple-choice', prompt: 'Pythonda xato sodir bo\'lishi va uzilib qolishini rad etib istisno yaratish:', options: [{ id: 'a', text: 'if / error' }, { id: 'b', text: 'try / except' }, { id: 'c', text: 'error / skip' }, { id: 'd', text: 'try / catch' }], correctId: 'b', explanation: 'Except - Pythondagi Try ning asosiy himoyaschisidir.' }, { id: 'q29', type: 'fill-blanks', prompt: 'Fayl bilan ma\'lumotlar ustida ishlash imkonini qaytaruvchi buyruq:', codeBefore: 'f = ', codeAfter: '("fayl.txt", "w")', correctAnswer: 'open', explanation: 'faylni doim open bilan charqidish darkort.' }, { id: 'q30', type: 'code-write', prompt: 'Topshiriq: Istisnolarni boshqaruvchi kod ramzlarini try va except yordamida to\'ldiring', correctAnswer: 'try:\n  pass\nexcept:\n  pass', placeholder: 'try:\\nexcept:', explanation: 'Eng sodda istisno formati qolipi try-except hisoblanadi.' }]
    },
    {
        id: 11, title: 'Yakuniy amaliy loyiha', desc: 'O‘rgangan bilimlarni birlashtirish',
        theory: [
            "Kodlaringiz siz istagancha aynan mantiqiy ishlayotganiga amin bo'lish uchun doimo Test yoziladi.",
            "Testing qobiliyati orqali siz yangi xatolar chiqish qo'rquvisiz va bexavotirsiz erkin kod olasiz, bu sizni (intermediate) o'rta darajali dasturchi qiladi!"
        ],
        questions: [{ id: 'q31', type: 'multiple-choice', prompt: 'Kodlarning kelajakda xatolarsiz va mutloq to\'g\'ri mos ishlashini garov orqali tekshirish bosqichi nima?', options: [{ id: 'a', text: 'Writing Comments' }, { id: 'b', text: 'Testing Code' }, { id: 'c', text: 'Try-catch handling' }, { id: 'd', text: 'Debugging tools' }], correctId: 'b', explanation: 'Testing eng asosiy mezon va sifati ko\'rsatgichdir!!' }, { id: 'q32', type: 'fill-blanks', prompt: 'Qobiliyat (skill) o\'laroq Intermediate (o\'rta) dasturchini Junior dan ajratuvchi omil ularning Kodlarini ___________ qilishidir.', codeBefore: '', codeAfter: '', correctAnswer: 'test', explanation: 'Yozilganlarni Test qilish qobiliati.' }, { id: 'q33', type: 'code-fix', prompt: 'Topshiriq: Pythonda kiritilgan narsalarning to\'griligini isbotlovchi hamda rost(True)likka majburlash operatorini to\'ldiring:', initialCode: 'check 5 == 5', correctAnswer: 'assert 5 == 5', explanation: 'Pythonda doimo assert bilan test belgilanadi.' }]
    }
];

export const COURSES = {
    html: { id: 'html', title: 'HTML Asoslari', data: HTML_LESSONS, color: 'var(--accent-pink)' },
    css: { id: 'css', title: 'CSS (Veb-Dizayn)', data: CSS_LESSONS, color: 'var(--secondary)' },
    js: { id: 'js', title: 'JavaScript (Mantiq)', data: JS_LESSONS, color: 'var(--accent-yellow)' },
    python: { id: 'python', title: 'Python Asoslari', data: PYTHON_CURRICULUM, color: '#3776AB' }
};
import { PYTHON_CURRICULUM } from './pythonCurriculum.js';
