export const HTML_LESSONS = [
    {
        id: 1,
        title: 'HTML Asoslari (1-Modul)',
        theory: [
            "HTML (HyperText Markup Language) web sahifalarning skeleti hisoblanadi. Har bir HTML hujjati brauzerga o\'zini tanitishi uchun eng yuqorisida <!DOCTYPE html> yozuvi bo\'lishi shart.",
            "Teglar (tags) HTML ning qurilish g\'ishtlaridir. Matnni qalin qilish uchun <b> (bold) tegidan foydalanamiz.",
            "Sarlavhalar muhim. <h1> dan (eng kichik) to <h6> (eng katta) gacha bo\'ladi."
        ],
        questions: [
            { id: 'q1', type: 'multiple-choice', prompt: 'HTML faylini yaratganda eng birinchi bo\'lib qaysi teg yozilishi shart?', options: [{ id: 'a', text: '<html>' }, { id: 'b', text: '<!DOCTYPE html>' }, { id: 'c', text: '<head>' }, { id: 'd', text: '<body>' }], correctId: 'b', explanation: '<!DOCTYPE html> brauzerga bu HTML5 hujjat ekanligini bildiradi.' },
            { id: 'q2', type: 'fill-blanks', prompt: 'Matnni qalin qilish (bold) uchun kerakli tegni to\'ldiring:', codeBefore: '<p>Bu oddiy matn va bu ', codeAfter: ' qalin matn.</p>', correctAnswer: '<b>', explanation: '<b> tegi (bold) so\'zni qalin qilib ko\'rsatadi.' },
            { id: 'q3', type: 'multiple-choice', prompt: 'Eng katta sarlavha (Heading) yaratish uchun qaysi teg ishlatiladi?', options: [{ id: 'a', text: '<heading>' }, { id: 'b', text: '<h6>' }, { id: 'c', text: '<h1>' }, { id: 'd', text: '<header>' }], correctId: 'c', explanation: '<h1> tegi eng katta sarlavha.' },
            { id: 'q4', type: 'code-write', prompt: 'Amaliyot: Asosiy sarlavha tegidan foydalanib "Salom Dunyo" yozuvini ekranga chiqaring.', correctAnswer: '<h1>Salom Dunyo</h1>', placeholder: 'Kodingizni bu yerga yozing...', explanation: 'Eng katta sarlavha <h1> hisoblanadi.' }
        ]
    },
    {
        id: 2,
        title: 'Havolalar va Rasmlar (2-Modul)',
        theory: [
            "Havolalar (linklar) internetni bir-biriga bog\'laydi. Boshqa sahifaga o\'tish uchun <a> tegidan va href parametrlaidan foydalaniladi.",
            "Sahifani jonlantirish uchun rasmlardan foydalanamiz. Buning uchun <img> tegi ishlatiladi (faqat bitishuvchi, yopilmaydi)."
        ],
        questions: [
            { id: 'q5', type: 'fill-blanks', prompt: 'Boshqa sahifaga o\'tish mumkin bo\'lgan havola (link) yaratuvchi tegni yozing:', codeBefore: '<', codeAfter: ' href="https://google.com">Google.com </a>', correctAnswer: 'a', explanation: '<a> (anchor) tegi web sahifada havolalar yaratadi.' },
            { id: 'q6', type: 'code-fix', prompt: 'Amaliyot: Quyida yozilgan rasm elementida xatolik mavjud. Rasm ko\'rinishi uchun atrebutni to\'g\'irlang:', initialCode: '<img href="rasm.jpg">', correctAnswer: '<img src="rasm.jpg">', explanation: '<img> tegi uchun rasm manzili doim src atributi orqali ulanadi.' },
            { id: 'q7', type: 'fill-blanks', prompt: 'Yangi qatorga o\'tish (line break) uchun qaysi yopilmaydigan teg ishlatiladi?', codeBefore: 'Birinchi qator <', codeAfter: '> Ikkinchi qator', correctAnswer: 'br', explanation: '<br> tegi matnni paska tushiradi.' }
        ]
    },
    {
        id: 3,
        title: 'Jadvallar va Shakllar (3-Modul)',
        theory: [
            "Narsalarni sanab o\'tish uchun HTML li listlardan yordam olamiz. <ol> va <ul> dan foydalaning.",
            "Ma\'lumotlarni qator va ustunlarga ajratib ko\'rsatish uchun jadvallar (tables) dan foydalanamiz. Jadval yaratish <table> tegi bilan boshlanadi."
        ],
        questions: [
            { id: 'q7', type: 'multiple-choice', prompt: 'Tartiblangan raqamli ro\'yxat yaratish uchun qaysi teg ochilishi kerak?', options: [{ id: 'a', text: '<ul>' }, { id: 'b', text: '<ol>' }, { id: 'c', text: '<li>' }, { id: 'd', text: '<list>' }], correctId: 'b', explanation: '<ol> (ordered list) raqamlangan ro\'yxat uchun.' },
            { id: 'q8', type: 'multiple-choice', prompt: 'Jadval tuzilishini eng avvalo qaysi teg boshlab beradi?', options: [{ id: 'a', text: '<tr>' }, { id: 'b', text: '<td>' }, { id: 'c', text: '<table>' }, { id: 'd', text: '<grid>' }], correctId: 'c', explanation: '<table> asosiy tegdir.' },
            { id: 'q9', type: 'fill-blanks', prompt: 'Jadvalga yangi qator qo\'shish uchun tegni yozing:', codeBefore: '<table> <', codeAfter: '> <td>Ma\'lumot</td> </tr> </table>', correctAnswer: 'tr', explanation: '<tr> Table Row degani.' }
        ]
    },
    {
        id: 4,
        title: 'Kiritish Maydoni (4-Modul)',
        theory: [
            "Foydalanuvchidan ma\'lumot olinadigan yovvoyi (kiritish) maydonlari <form> da bo'ladi.",
            "Matn kiritish uchun <input> hamda tugmalarni bosish uchun <button> xizmat qiladi."
        ],
        questions: [
            { id: 'q10', type: 'multiple-choice', prompt: 'Foydalanuvchidan ma\'lumotlarni yig\'ib uzatuvchi eng katta asosiy teg qaysi?', options: [{ id: 'a', text: '<input>' }, { id: 'b', text: '<button>' }, { id: 'c', text: '<form>' }, { id: 'd', text: '<data>' }], correctId: 'c', explanation: 'Form malumotni o\'raydi.' },
            { id: 'q11', type: 'fill-blanks', prompt: 'Matn kiritish uchun yopilmaydigan tegni kiriting:', codeBefore: '<', codeAfter: ' type="text" placeholder="Ismingiz" />', correctAnswer: 'input', explanation: '<input> matn tashiydi.' },
            { id: 'q12', type: 'multiple-choice', prompt: 'Tugma yaratuvchi html tegni toping:', options: [{ id: 'a', text: '<btn>' }, { id: 'b', text: '<submit>' }, { id: 'c', text: '<click>' }, { id: 'd', text: '<button>' }], correctId: 'd', explanation: 'Tugma <button> deyiladi.' }
        ]
    },
    {
        id: 5,
        title: 'Semantika va Bosh Boshqaruv (5-Modul)',
        theory: [
            "Brauzerlarga sahifani to\'g\'ri tushunishi uchun <header>, <main>, <footer> kabi semantika qo\'llaniladi.",
            "Tab nomk (title) <head> ichida yoziladi va oyna kengligi <meta> bilan o'lchanadi."
        ],
        questions: [
            { id: 'q13', type: 'fill-blanks', prompt: 'Saytning vizual pastki qismini (podval) qaysi tegda saqlash standart qabul qilingan?', codeBefore: '<', codeAfter: '> Sayt huquqlari himoyalangan. </footer>', correctAnswer: 'footer', explanation: 'Podval bu footer.' },
            { id: 'q14', type: 'multiple-choice', prompt: 'Mobile uskunalarida sahifa masshtabi o\'zgarib qolishini to\'xtatish tegi:', options: [{ id: 'a', text: '<meta viewport>' }, { id: 'b', text: '<view>' }, { id: 'c', text: '<scale>' }, { id: 'd', text: '<mobile>' }], correctId: 'a', explanation: '<meta> o\'lcham qat\'iyligini nazorat qiladi.' },
            { id: 'q15', type: 'multiple-choice', prompt: 'Tashqi fayllarni hujjatga (masofaviy ko\'rinish) qaysi ko\'rinmas qisimga yozamiz?', options: [{ id: 'a', text: '<body> ichiga' }, { id: 'b', text: 'Fayl oxiriga' }, { id: 'c', text: '<head> ichiga' }, { id: 'd', text: '<nav> ichiga' }], correctId: 'c', explanation: '<head> bosh miya sozlamalari joyi.' }
        ]
    }
];

export const CSS_LESSONS = [
    {
        id: 1, title: 'Asoslar va Ranglar (1-Modul)',
        theory: ["CSS kodlarni bog\'lash rel='stylesheet' yordamida ulanadi.", "Ranglar turlicha (color) tizimdan chiqadi."],
        questions: [
            { id: 'q1', type: 'fill-blanks', prompt: 'CSS HTML faylga rel xossasida nima bilan ulanish kerak?', codeBefore: '<link ', codeAfter: '="stylesheet" href="style.css">', correctAnswer: 'rel', explanation: 'rel css kiyim boglosi.' },
            { id: 'q2', type: 'multiple-choice', prompt: 'Matn rangini o\'zgartirish (masalan yashil qilish) qoidasi qanday?', options: [{ id: 'a', text: 'color:' }, { id: 'b', text: 'text-color:' }, { id: 'c', text: 'font-color:' }, { id: 'd', text: 'background:' }], correctId: 'a', explanation: 'Textlarga color: qo\'llaniladi.' },
            { id: 'q3', type: 'fill-blanks', prompt: 'Elementning fon rangini (orqasini) o\'zgartirish:', codeBefore: '', codeAfter: '-color: green;', correctAnswer: 'background', explanation: 'background orqa ufq.' }
        ]
    },
    {
        id: 2, title: 'O\'lcham va Masofalar (2-Modul)',
        theory: ["O\'lchov eng ko\'p piksel (px) asosida.", "Tashqi masofa Margin, Ichki masofa esa Padding deb yuritiladi."],
        questions: [
            { id: 'q4', type: 'multiple-choice', prompt: 'CSS da biror qutining kengligini nimada o\'lchash eng qabul qilingan hisoblanadi?', options: [{ id: 'a', text: 'Kg' }, { id: 'b', text: 'Px (Pixel)' }, { id: 'c', text: 'Cm' }, { id: 'd', text: 'Hz' }], correctId: 'b', explanation: 'Pixels o\'lchovi.' },
            { id: 'q5', type: 'fill-blanks', prompt: 'Qutilar orasidan (tashqaridan) masofa qoldirish komandasi:', codeBefore: '', codeAfter: ': 20px;', correctAnswer: 'margin', explanation: 'Tashqi zona Margin.' },
            { id: 'q6', type: 'multiple-choice', prompt: 'Qutining ichidan masofa qoldirish nimaga deyiladi?', options: [{ id: 'a', text: 'Margin' }, { id: 'b', text: 'Spacing' }, { id: 'c', text: 'Border' }, { id: 'd', text: 'Padding' }], correctId: 'd', explanation: 'Padding haqiqiy ichki xavo qatlami.' }
        ]
    },
    {
        id: 3, title: 'Tanlovchilar (Selectlar) (3-Modul)',
        theory: ["Obyektlarni tanlash CSSda .klass va # id orqali amalga oshadiki bu orqali to\'g\'ri aniq manzil egasi topiladi.", "Hammasi klass nomiga tayansa, u . belgisidan foydalanadi."],
        questions: [
            { id: 'q7', type: 'fill-blanks', prompt: 'Htmldagi <div bo\'shligiga class ismini yo\'llang?', codeBefore: 'Htmldagi <div ', codeAfter: '="btn"> class deymiz.', correctAnswer: 'class', explanation: 'Class guruh.' },
            { id: 'q8', type: 'multiple-choice', prompt: '1ta elementda "#"(hash) belgisi nimani anglatadi?', options: [{ id: 'a', text: 'ID bo\'yicha murojaat' }, { id: 'b', text: 'Class bo\'yicha murojaat' }, { id: 'c', text: 'Tag' }, { id: 'd', text: 'Mevmura' }], correctId: 'a', explanation: 'ID faqat birdonadir.' },
            { id: 'q9', type: 'fill-blanks', prompt: 'Atrofdan qora uzluksiz chiziq o\'tkazish (chegara belgilash):', codeBefore: '', codeAfter: ': 2px solid red;', correctAnswer: 'border', explanation: 'Chegara yaratit borderdan o\'tadi.' }
        ]
    },
    {
        id: 4, title: 'Matn va Burchaklar (4-Modul)',
        theory: ["Element burchaklarini radius berib dumaloqlash uni ko\'z teshilishidan asraydi.", "Shriftlarni font-family dan matn o\'rtalashtirishni align-center deb ishlating."],
        questions: [
            { id: 'q10', type: 'multiple-choice', prompt: 'Elementning burchaklarini yumaloqlash qaysi xususiyat orqali bajariladi?', options: [{ id: 'a', text: 'corner-radius' }, { id: 'b', text: 'border-round' }, { id: 'c', text: 'border-radius' }, { id: 'd', text: 'padding-radius' }], correctId: 'c', explanation: 'Radius bu egrilik.' },
            { id: 'q11', type: 'fill-blanks', prompt: 'Matnning xarflarini boshqa turga o\'zgartirish:', codeBefore: 'font-', codeAfter: ': Arial, sans-serif;', correctAnswer: 'family', explanation: 'Oila xususiyatni beradi.' },
            { id: 'q12', type: 'multiple-choice', prompt: 'Matnni to\'liq o\'rtaga (markazga) joylashtirish kodi?', options: [{ id: 'a', text: 'align-item: center;' }, { id: 'b', text: 'text-align: middle;' }, { id: 'c', text: 'text-center' }, { id: 'd', text: 'text-align: center;' }], correctId: 'd', explanation: 'Tekslangan qadam.' }
        ]
    },
    {
        id: 5, title: 'Joylashuv (Flex & Shadow) (5-Modul)',
        theory: ["Soya tashlash va animatsiyalarni joylash CSS maxsus hususiyatidir.", "Box-shadow hamda display Flex saytlarning silliq ko\'rinishda mosalashishi qoidasidek tanilgan."],
        questions: [
            { id: 'q13', type: 'fill-blanks', prompt: 'Flexbox tizimini faollashtirish buyrug\'i markaziga yo\'llang:', codeBefore: 'display: ', codeAfter: ';', correctAnswer: 'flex', explanation: 'Flex mo\'jiza tizimidir.' },
            { id: 'q14', type: 'multiple-choice', prompt: 'Qutiga ortqi tomondan (yoki ostidan) soya berish qanday yoziladi?', options: [{ id: 'a', text: 'box-shadow' }, { id: 'b', text: 'text-shadow' }, { id: 'c', text: 'shadow-box' }, { id: 'd', text: 'drop-shadow' }], correctId: 'a', explanation: 'Box-shadow u orqa xavo!' },
            { id: 'q15', type: 'fill-blanks', prompt: 'Animatsiyani sekin, yumshoq (silliq) bo\'lishini ta\'minlovchi kod:', codeBefore: '', codeAfter: ': all 0.3s ease;', correctAnswer: 'transition', explanation: 'Transition o\'tishlar darajasi!' }
        ]
    }
];

export const JS_LESSONS = [
    {
        id: 1, title: 'Mantiq va Print (1-Modul)',
        theory: ["JS tili qora oynaga console.log orqali aloqa etadi va <script> deb boglanadi", "Turlardan biri const uzgarib turaolmaydi!"],
        questions: [
            { id: 'q1', type: 'multiple-choice', prompt: 'JavaScript HTML ichida qaysi teg yordamida ulanish mumkin?', options: [{ id: 'a', text: '<javascript>' }, { id: 'b', text: '<script>' }, { id: 'c', text: '<js>' }, { id: 'd', text: '<code>' }], correctId: 'b', explanation: 'Script tegsiz qabul yoq.' },
            { id: 'q2', type: 'fill-blanks', prompt: 'Brauzer qora konsoliga ma\'lumot chiqarish komandasi:', codeBefore: 'console.', codeAfter: '("Salom");', correctAnswer: 'log', explanation: 'log qaydnomaga saqlaydi.' },
            { id: 'q3', type: 'multiple-choice', prompt: 'Zamonaviy JS da doimiy o\'zgarmas idishni e\'lon qilish uchun...?', options: [{ id: 'a', text: 'var' }, { id: 'b', text: 'let' }, { id: 'c', text: 'const' }, { id: 'd', text: 'int' }], correctId: 'c', explanation: 'const harakatsiz tiqilgan yozuv.' }
        ]
    },
    {
        id: 2, title: 'Turlar (Types) (2-Modul)',
        theory: ["Let kabi o\'zgaruvchan tur hamda String Number lar ma\'lumotni saqlaydi.", "JS asosi funksiaylar va tiplarga asirlangan!"],
        questions: [
            { id: 'q4', type: 'fill-blanks', prompt: 'Yoshi o\'zgarib turadigan o\'zgaruvchi (Variable) qanday nomlanadi?', codeBefore: '', codeAfter: ' age = 22;', correctAnswer: 'let', explanation: 'Keyin o\'zgarishga sabab let!' },
            { id: 'q5', type: 'multiple-choice', prompt: 'JS da `"Salom"` (qo\'shtirnoq ichida kelgan) qanday ma\'lumot turiga kiradi?', options: [{ id: 'a', text: 'Number' }, { id: 'b', text: 'String' }, { id: 'c', text: 'Boolean' }, { id: 'd', text: 'Array' }], correctId: 'b', explanation: 'Stringlar ma\'suliyatli jumladir.' },
            { id: 'q6', type: 'fill-blanks', prompt: 'Bitta vazifani ko\'p marta ishlatish imkonini (qolipini) yaratadigan kalit so\'z:', codeBefore: '', codeAfter: ' salomBer() { console.log("Salom"); }', correctAnswer: 'function', explanation: 'Fuksiyachalar oson ish qurollar!' }
        ]
    },
    {
        id: 3, title: 'If Else Mantiqi (3-Modul)',
        theory: ["To\'gri xolida if ichi ochiladi. false bulsa oxtariladi", "Massiv va boshqa Arraylar orqali tartibli yigish imkoniga etgan"],
        questions: [
            { id: 'q7', type: 'multiple-choice', prompt: 'JS da shartni qaysi kalit so\'z operatori tekshiradi?', options: [{ id: 'a', text: 'when / do' }, { id: 'b', text: 'if / else' }, { id: 'c', text: 'check' }, { id: 'd', text: 'while' }], correctId: 'b', explanation: 'if eshik yo\'l ko\'rsatgichidek' },
            { id: 'q8', type: 'fill-blanks', prompt: 'Massiv (Array) turidagi qutilarni yaratish uchun qaysi maxsus belgi foydalaniladi?', codeBefore: 'let mevalar = ', codeAfter: '"Olma", "Anor", "Kivi"];', correctAnswer: '[', explanation: 'Brasket qavsi doim Arraydir' },
            { id: 'q9', type: 'multiple-choice', prompt: 'JS da Obyektlar asosan qanday qavs dizayni orqali ulanadi va belgilinadi?', options: [{ id: 'a', text: '{ } (Jingalak)' }, { id: 'b', text: '[ ] (Kvadrat)' }, { id: 'c', text: '( ) (Oddiy)' }, { id: 'd', text: '< >' }], correctId: 'a', explanation: 'Obyektlar qiymati klyuchlikdir!' }
        ]
    },
    {
        id: 4, title: 'Tsiklar aylanuvchanlik (4-Modul)',
        theory: ["100 bor takror ish qilmang looplarni ishlating For() ulardan asosiysi", "While tokidan ishni tugatmagunicha aylanib turaveradi"],
        questions: [
            { id: 'q10', type: 'fill-blanks', prompt: 'Kompyuterga qayta-qayta loopli takror vazifa tuzish operatorining asosi:', codeBefore: '', codeAfter: ' (let i=0; i<10; i++) { console.log(i) }', correctAnswer: 'for', explanation: 'For sanoq loopini olib qoladi!' },
            { id: 'q11', type: 'multiple-choice', prompt: 'Raqamlamasdan faqatgina toki shart True holdaligida aylanadigan loop turi?', options: [{ id: 'a', text: 'for ()' }, { id: 'b', text: 'loop' }, { id: 'c', text: 'repeat' }, { id: 'd', text: 'while ()' }], correctId: 'd', explanation: 'while cheksiz loopga kiritubchidir!' },
            { id: 'q12', type: 'fill-blanks', prompt: 'Qaysi atribut tugma bossangiz reaksiya hosil etishi uchun kutadi?', codeBefore: '<button on', codeAfter: '="saqla()">Qabul</button>', correctAnswer: 'click', explanation: 'Click foydalaniluvchidan teginish kutar' }
        ]
    },
    {
        id: 5, title: 'Chuqur JS Darrichasi (5-Modul)',
        theory: ["Shunchaki tenglash = yoki ikki bor qilish bu turkda noto'qrilik oib kelishi mumkin === ushuni manq qiladigan qollanilma.", "Bular ustidan Boolean rosti true o'rnatadi."],
        questions: [
            { id: 'q13', type: 'multiple-choice', prompt: 'Xatto Son va Yozuv formati (Tipini ham) mos solishtiruviga olib bora oladigan ideal belgini kiriting:', options: [{ id: 'a', text: '=' }, { id: 'b', text: '==' }, { id: 'c', text: '===' }, { id: 'd', text: '!=' }], correctId: 'c', explanation: 'Qat\'iy tekshiruv 3 ustuniga bo\'ysunadi' },
            { id: 'q14', type: 'fill-blanks', prompt: 'Tegni maxsus ID dan bilib foydalanish uchun funksiya nomini to\'ldiring:', codeBefore: 'document.getElementBy', codeAfter: '("id_nomi");', correctAnswer: 'Id', explanation: 'IDni topish id nomzoddidr.' },
            { id: 'q15', type: 'multiple-choice', prompt: 'Matnlar string, Sonlar number xisoblansa false/true ligini javoblantiruvchi qism?', options: [{ id: 'a', text: 'String' }, { id: 'b', text: 'Boolean' }, { id: 'c', text: 'Null' }, { id: 'd', text: 'Array' }], correctId: 'b', explanation: 'Mantiq True va False dir' }
        ]
    }
];

export const PYTHON_LESSONS = [
    {
        id: 1, title: 'Python va Hello World', desc: 'Birinchi dastur va asosiy sintaksis',
        theory: [
            "Python kompyuterga o'rnatilgach o'zingizning ilk kodingizni yozishingiz mumkin.",
            "Ekranga xabar chiqarish uchun `print('Hello world!')` funksiyasidan foydalanamiz."
        ],
        questions: [{ id: 'q1', skill: 'syntax', type: 'multiple-choice', prompt: 'Python da ekranga qanday qilib "Hello world!" so\'zini chiqarish mumkin?', options: [{ id: 'a', text: 'echo "Hello world!"' }, { id: 'b', text: 'console.log("Hello world!")' }, { id: 'c', text: 'print("Hello world!")' }, { id: 'd', text: 'show("Hello world!")' }], correctId: 'c', explanation: 'Pythonda maxsus print() komandasi bor.' }, { id: 'q2', skill: 'syntax', type: 'fill-blanks', prompt: 'Dasturdagi yozuvni to\'ldiring:', codeBefore: '', codeAfter: '("Hello world!");', correctAnswer: 'print', smartHint: 'Bu yerda xato qilyapsiz, ekranga chiqarish so\'zini harflab tekshiring: print', explanation: 'Buyruq doim kichik harflarda yoziladi.' }, { id: 'q3', skill: 'syntax', type: 'drag-reorder', prompt: 'Amaliyot: Ekranga "Hello world!" so\'zini chop etuvchi kodni qismlardan yig\'ing.', options: ['print', '(', '"Hello world!"', ')'], correctAnswer: 'print("Hello world!")', terminalOutput: '> Hello world!', smartHint: 'Matnni aynan qo\'shtirnoqqa o\'rash kerak!', explanation: 'Matn bo\'lgani uchun doim qo\'shtirnoq ishlatiladi.' }]
    },
    {
        id: 2, title: 'O\'zgaruvchilar va raqamlar', desc: 'Qiymatlar, sonlar va o‘zgaruvchilar bilan ishlash',
        theory: [
            "Ma'lumotlarni xotirada saqlash uchun o'zgaruvchilardan (variables) foydalanamiz. Masalan: `yosh = 20`",
            "Siz matnli (text) va raqamli (numerical) qiymatlar bilan qulay ishlashingiz mumkin."
        ],
        questions: [{ id: 'q4', skill: 'variables', type: 'multiple-choice', prompt: 'O\'zgaruvchiga ma\'lumot saqlashning to\'g\'ri usulini tanlang:', options: [{ id: 'a', text: 'let ism = "Ali"' }, { id: 'b', text: 'ism = "Ali"' }, { id: 'c', text: 'var ism = "Ali"' }, { id: 'd', text: 'String ism = "Ali"' }], correctId: 'b', explanation: 'Tilsiz (Typesiz) oson e\'lon qilinadi.' }, { id: 'q5', skill: 'variables', type: 'fill-blanks', prompt: 'Xotiraga raqamni saqlash qismini to\'ldiring:', codeBefore: 'yosh ', codeAfter: ' 25', correctAnswer: '=', smartHint: 'Ikkala tomonni biriga "tenglash" belgisi...', explanation: '= tenglashtirish operatori.' }, { id: 'q6', skill: 'variables', type: 'drag-reorder', prompt: 'Amaliyot: O\'zgaruvchini yarating va unga raqam biriktiring.', options: ['mening_yoshim', ' = ', '25', 'var '], correctAnswer: 'mening_yoshim = 25', terminalOutput: '> Process finished with exit code 0.', smartHint: 'Python da JS kabi yordamchi `var` so\'zi umuman ishlatilmaydi!', explanation: 'O\'zgaruvchi nomlarida bo\'sh joy o\'rniga (_) ishlatiladi va Pythonda var yozilmaydi.' }]
    },
    {
        id: 3, title: 'Matnlar va input', desc: 'Matn qabul qilish va natijani chiqarish',
        theory: [
            "Bir nechta ma'lumotlarni qisqa kod orqali bitta qutida saqlash - bu Ro'yxat (List).",
            "Listlar kvadrat qavslar ichida yoziladi va minglab qiymatlarni qamrab oladi: `[1, 2, 3]`"
        ],
        questions: [{ id: 'q7', skill: 'variables', type: 'multiple-choice', prompt: 'Pythonda to\'g\'ri yaratilgan ro\'yxatni toping:', options: [{ id: 'a', text: 'l = (1, 2, 3)' }, { id: 'b', text: 'l = {1, 2, 3}' }, { id: 'c', text: 'l = [1, 2, 3]' }, { id: 'd', text: 'l = <1, 2, 3>' }], correctId: 'c', explanation: 'List (Massivlar) Kvadrat qavs oladi.' }, { id: 'q8', skill: 'variables', type: 'fill-blanks', prompt: 'Bo\'sh ro\'yxatni yaratish:', codeBefore: 'mevalar = ', codeAfter: ']', correctAnswer: '[', smartHint: 'Massivlarni ochish qavsi har doim to`rtburchak shaklda bo`ladi.', explanation: 'Kvadrat qavs ochilishi kerak.' }, { id: 'q9', skill: 'variables', type: 'code-write', prompt: 'Amaliyot: Bo\'sh hisoblangan "raqamlar" nomli ro\'yxat yarating.', correctAnswer: 'raqamlar = []', placeholder: 'ro\'yxat nomini va ramzini yozing...', explanation: 'Bo\'sh ro\'yxat ochish uchun tenglikdan so\'ng ro\'yxat belgisi qoldiriladi.' }]
    },
    {
        id: 4, title: 'Shart operatorlari', desc: 'Qaror qabul qilish mantiqi',
        theory: [
            "Ro'yxat ichidagi malumotlarni bemalol o'chiring, o'zgartiring yoki samarali tahrirlang.",
            "Bu sizga yuzlab (millionlab) ma'lumotlar bilan bir necha qatorda oson ishlash imkonini beradi."
        ],
        questions: [{ id: 'q10', skill: 'functions', type: 'multiple-choice', prompt: 'Ro\'yxat oxiriga yangi narsa qo\'shish uchun mo\'ljallangan metod:', options: [{ id: 'a', text: 'add()' }, { id: 'b', text: 'insert()' }, { id: 'c', text: 'append()' }, { id: 'd', text: 'push()' }], correctId: 'c', explanation: 'Append usuli doim oxiriga yozadi.' }, { id: 'q11', skill: 'functions', type: 'fill-blanks', prompt: 'Ro\'yxatdan malumot olib tashlash kodi:', codeBefore: 'mevalar.', codeAfter: '("Olma")', correctAnswer: 'remove', smartHint: 'Inglizchada o\'chirmoq (olib tashlamoq) degan ma\'noni beruvchi so\'zx.', explanation: 'Olib tashlash remove() orqali amalga oshadi.' }, { id: 'q12', skill: 'functions', type: 'code-fix', prompt: 'Amaliyot: Kodni to\'g\'irlang, massiv uzunligini (length) o\'lchash:', initialCode: 'uzunlik = count(ro\'yxat)', correctAnswer: 'uzunlik = len(ro\'yxat)', explanation: 'Pythonda uzunlikni topish len() funksiyasi orqali yoziladi.' }]
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
        questions: [{ id: 'q16', type: 'multiple-choice', prompt: 'Lug\'at yaratish ko\'rinishi qanaqa bo\'ladi?', options: [{ id: 'a', text: 'd = [1,2]' }, { id: 'b', text: 'd = {"kalit": "qiymat"}' }, { id: 'c', text: 'd = (1, 2)' }, { id: 'd', text: 'd = "kalit va qiymat"' }], correctId: 'b', explanation: 'Lug\'at jingalak qavsda `{}` yoziladi.' }, { id: 'q17', type: 'fill-blanks', prompt: 'Lug\'atdan "ism" ni chaqirib olish:', codeBefore: 'odam = {"ism": "Ali"} \nprint(odam[', codeAfter: '])', correctAnswer: '"ism"', explanation: 'Lug\'atlarni ichidagi Key (kalit) string orqali chaqiriladi.' }, { id: 'q18', type: 'code-write', prompt: 'Amaliyot: Bo\'sh "lugat" ismli Dictionary yarating.', correctAnswer: 'lugat = {}', placeholder: 'Dikt...', explanation: 'Bo\'sh lug\'atlar gulkosa qavs {} qoldirish bilan ochiladi.' }]
    },
    {
        id: 7, title: 'Funksiyalar', desc: 'Kod bloklarini qayta ishlatish',
        theory: [
            "Foydalanuvchilar qaysidir qiymatni kiritishi uchun (Interaktiv interfeys) `input()` funksiyasi xizmat qiladi.",
            "Shartlar rost (True) bo'lib turgunicha kodni marta-va-marta aylantiruvchi dvigatel bu - `while` tsikli."
        ],
        questions: [{ id: 'q19', type: 'multiple-choice', prompt: 'Terminal orqali savol berib, ma\'lumotni qayd qilib olish uchun qaysi modul keladi?', options: [{ id: 'a', text: 'read()' }, { id: 'b', text: 'scan()' }, { id: 'c', text: 'input()' }, { id: 'd', text: 'get()' }], correctId: 'c', explanation: 'Input foydalanuvchidan satr yig\'adi.' }, { id: 'q20', type: 'fill-blanks', prompt: 'To shart bajarilayotgan holida cheksiz davom eta oladigan tsikl komandasi:', codeBefore: '', codeAfter: ' x < 10: \n  x += 1', correctAnswer: 'while', explanation: 'While aylanma tsikl hisoblanadi.' }, { id: 'q21', type: 'code-fix', prompt: 'Amaliyot: While tsiklini kuch bilan yirtib (to\'xtatib) chiqib ketish buyrug\'i qanday:', initialCode: 'breyk', correctAnswer: 'break', explanation: 'Chiqib ketish kaliti - break (sindirish) deyiladi.' }]
    },
    {
        id: 8, title: 'Lug\'atlar', desc: 'Kalit-qiymat juftliklari bilan ishlash',
        theory: [
            "Aniq bitta zo'r vazifani qilib beruvchi qolipli va xohlagan vaqtingiz chaqirish mumkin bo'lgan kod bloklari bu - Funksiyalar.",
            "Pthonda funksiya e'lon qilish uchun eng birinchi `def` kalit so'zi keltiriladi."
        ],
        questions: [{ id: 'q22', type: 'multiple-choice', prompt: 'Funksiya yaratish maxsus so\'zi nimadan boshlanadi?', options: [{ id: 'a', text: 'function' }, { id: 'b', text: 'def' }, { id: 'c', text: 'func' }, { id: 'd', text: 'define' }], correctId: 'b', explanation: 'Def - definition (aniqlash) deganidir.' }, { id: 'q23', type: 'fill-blanks', prompt: 'Funksiya yaratish strukturasi boshini to\'ldiring:', codeBefore: '', codeAfter: ' salomBer(): \n  print("Salom")', correctAnswer: 'def', explanation: 'Funksiya strukturasi def harflaridan tuziladi.' }, { id: 'q24', type: 'code-write', prompt: 'Amaliyot: Ismsiz, "yugur" nomli o\'z ichiga xarxil argument olmasdan ishlovchi funksiyani yozib chaqiring.', correctAnswer: 'yugur()', placeholder: 'buyruq...', explanation: 'Ishlatishda shunchaki ustiga yozilgan nomi bilan qavs () beriladi.' }]
    },
    {
        id: 9, title: 'Fayllar bilan ishlash', desc: 'Fayllarni o‘qish va yozish',
        theory: [
            "Dasturda real-hayotdagi ob'yektlarni (itlar, odamlar, mashinalar) yaratish uchun Klass (Class) metodikasi o'zgaradi.",
            "Klasslarning real iloji bo'lmagan abstrac elementlar shabloni."
        ],
        questions: [{ id: 'q25', type: 'multiple-choice', prompt: 'Haqiqiy narsalar mantiqida obyekt yozish uchun nima ishlatiladi?', options: [{ id: 'a', text: 'database' }, { id: 'b', text: 'class' }, { id: 'c', text: 'function' }, { id: 'd', text: 'loop' }], correctId: 'b', explanation: 'Klass o\'zining nusxasini bera olaydigan shablondir.' }, { id: 'q26', type: 'fill-blanks', prompt: 'Klass nomini aniqlashtirish yozuvi:', codeBefore: '', codeAfter: ' Mashina:', correctAnswer: 'class', explanation: 'Yaratuvchi doimo class hisoblanadi.' }, { id: 'q27', type: 'code-fix', prompt: 'Amaliyot: Yaratilgan "Kompyuter" klasidan obyekt shakillantirilish jarayonini aniqlang:', initialCode: 'hp = new Kompyuter()', correctAnswer: 'hp = Kompyuter()', explanation: 'Javascript kabi Python new deb takrorlashga majburlamaydi!' }]
    },
    {
        id: 10, title: 'Xatolarni boshqarish', desc: 'Xatolarni ushlash va tuzatish',
        theory: [
            "Fayllar bloki darslarida data saqlash tushintiriladi va dasturning uzilib qolmay umr-bot ma'lumot qoldirishi tekshiriladi.",
            "Exception (Istisno) tufayli tasodifiy kutilmagan hatoni chiroyli qabul qilib kod barbod o'qilishini to'xtatadi."
        ],
        questions: [{ id: 'q28', type: 'multiple-choice', prompt: 'Pythonda xato sodir bo\'lishi va uzilib qolishini rad etib istisno yaratish:', options: [{ id: 'a', text: 'if / error' }, { id: 'b', text: 'try / except' }, { id: 'c', text: 'error / skip' }, { id: 'd', text: 'try / catch' }], correctId: 'b', explanation: 'Except - Pythondagi Try ning asosiy himoyaschisidir.' }, { id: 'q29', type: 'fill-blanks', prompt: 'Fayl bilan ma\'lumotlar ustida ishlash imkonini qaytaruvchi buyruq:', codeBefore: 'f = ', codeAfter: '("fayl.txt", "w")', correctAnswer: 'open', explanation: 'faylni doim open bilan charqidish darkort.' }, { id: 'q30', type: 'code-write', prompt: 'Amaliyot: Istisnolarni boshqaruvchi kod ramzlarini try va except yordamida to\'ldiring', correctAnswer: 'try:\n  pass\nexcept:\n  pass', placeholder: 'try:\\nexcept:', explanation: 'Eng sodda istisno formati qolipi try-except hisoblanadi.' }]
    },
    {
        id: 11, title: 'Yakuniy amaliy loyiha', desc: 'O‘rgangan bilimlarni birlashtirish',
        theory: [
            "Kodlaringiz siz istagancha aynan mantiqiy ishlayotganiga amin bo'lish uchun doimo Test yoziladi.",
            "Testing qobiliyati orqali siz yangi xatolar chiqish qo'rquvisiz va bexavotirsiz erkin kod olasiz, bu sizni (intermediate) o'rta darajali dasturchi qiladi!"
        ],
        questions: [{ id: 'q31', type: 'multiple-choice', prompt: 'Kodlarning kelajakda xatolarsiz va mutloq to\'g\'ri mos ishlashini garov orqali tekshirish bosqichi nima?', options: [{ id: 'a', text: 'Writing Comments' }, { id: 'b', text: 'Testing Code' }, { id: 'c', text: 'Try-catch handling' }, { id: 'd', text: 'Debugging tools' }], correctId: 'b', explanation: 'Testing eng asosiy mezon va sifati ko\'rsatgichdir!!' }, { id: 'q32', type: 'fill-blanks', prompt: 'Qobiliyat (skill) o\'laroq Intermediate (o\'rta) dasturchini Junior dan ajratuvchi omil ularning Kodlarini ___________ qilishidir.', codeBefore: '', codeAfter: '', correctAnswer: 'test', explanation: 'Yozilganlarni Test qilish qobiliati.' }, { id: 'q33', type: 'code-fix', prompt: 'Amaliyot: Pythonda kiritilgan narsalarning to\'griligini isbotlovchi hamda rost(True)likka majburlash operatorini to\'ldiring:', initialCode: 'check 5 == 5', correctAnswer: 'assert 5 == 5', explanation: 'Pythonda doimo assert bilan test belgilanadi.' }]
    }
];

export const COURSES = {
    html: { id: 'html', title: 'HTML Asoslari', data: HTML_LESSONS, color: 'var(--accent-pink)' },
    css: { id: 'css', title: 'CSS (Veb-Dizayn)', data: CSS_LESSONS, color: 'var(--secondary)' },
    js: { id: 'js', title: 'JavaScript (Mantiq)', data: JS_LESSONS, color: 'var(--accent-yellow)' },
    python: { id: 'python', title: 'Python Asoslari', data: PYTHON_LESSONS, color: '#3776AB' }
};
