const optionIds = ['a', 'b', 'c', 'd', 'e'];

const makeOptions = (values) => values.map((text, index) => ({ id: optionIds[index], text }));

const makeSection = (id, title, desc, skill, concepts) => ({
    id,
    title,
    desc,
    skill,
    theoryTitles: concepts.map(concept => concept.term),
    theory: concepts.map(concept => `${concept.explanation} Masalan: ${concept.example}`),
    questions: concepts.flatMap((concept, index) => [
        {
            id: `${id}-definition-${index + 1}`,
            skill,
            type: 'multiple-choice',
            prompt: `“${concept.term}” tushunchasiga mos ta’rifni toping.`,
            options: makeOptions(concepts.map(item => item.explanation)),
            correctId: optionIds[index],
            explanation: concept.explanation
        },
        {
            id: `${id}-example-${index + 1}`,
            skill,
            type: 'multiple-choice',
            prompt: `“${concept.term}” uchun mos misolni tanlang.`,
            options: makeOptions(concepts.map(item => item.example)),
            correctId: optionIds[index],
            explanation: `${concept.term}: ${concept.example}`
        }
    ])
});

const c = (term, explanation, example) => ({ term, explanation, example });

// Python Crash Course, 3-nashr, I qismning bob va bo‘limlari asosida qayta bayon qilingan.
export const PYTHON_SECTIONS = {
    1: [
        makeSection('py1-environment', 'Setting Up Your Programming Environment', 'Python interpreteri, versiya va kod muharririni tayyorlash.', 'syntax', [
            c('Python interpreteri', 'Python kodini o‘qib, kompyuter bajaradigan amallarga aylantiruvchi dastur.', 'python buyrug‘i orqali kodni ishga tushirish'),
            c('Python 3', 'Kitob va kursda ishlatiladigan zamonaviy Python avlodi.', 'python --version natijasida Python 3.x ko‘rinishi'),
            c('Kod parchasi', 'Kichik g‘oyani tez tekshirish uchun interaktiv muhitda bajariladigan qisqa kod.', '>>> 2 + 3'),
            c('VS Code', 'Python fayllarini yozish, saqlash va ishga tushirishga yordam beradigan kod muharriri.', 'hello_world.py faylini VS Code’da ochish'),
            c('Python kengaytmasi', 'Muharrirga Python sintaksisi, ishga tushirish va xato ko‘rsatish imkonini qo‘shadi.', 'VS Code Extensions ichidan Python o‘rnatish')
        ]),
        makeSection('py1-operating-systems', 'Python on Different Operating Systems', 'Windows, macOS va Linux’da Python muhitini tekshirish.', 'syntax', [
            c('Windows terminali', 'Windows’da buyruqlar yoziladigan PowerShell yoki Command Prompt oynasi.', 'PowerShell’da python --version yozish'),
            c('macOS terminali', 'macOS’da tizim buyruqlari va Python dasturlarini bajaruvchi Terminal ilovasi.', 'python3 hello_world.py'),
            c('Linux terminali', 'Linux distributivlarida Python bilan ishlashning asosiy buyruq muhiti.', 'python3 --version'),
            c('Buyruq yo‘li', 'Terminal qaysi papkada ishlayotganini va fayl qayerdan topilishini belgilaydi.', 'cd projects/python_course'),
            c('python va python3', 'Operatsion tizimga qarab Python 3 interpreterini chaqirish uchun ishlatiladigan buyruqlar.', 'Windows’da python, Linux’da python3')
        ]),
        makeSection('py1-hello-world', 'Running a Hello World Program', 'Birinchi fayl, print() va terminaldan ishga tushirish.', 'syntax', [
            c('.py fayl', 'Python manba kodi saqlanadigan fayl turi.', 'hello_world.py'),
            c('print() funksiyasi', 'Qiymat yoki matnni terminal oynasiga chiqaradi.', 'print("Hello Python world!")'),
            c('Matn literali', 'Qo‘shtirnoq ichida yozilgan o‘zgarmas matn qiymati.', '"Salom, Python!"'),
            c('Dasturni bajarish', 'Interpreterga saqlangan Python faylini o‘qib bajarish buyrug‘i.', 'python hello_world.py'),
            c('Traceback', 'Dastur to‘xtaganda xato joyi va sababini ko‘rsatadigan hisobot.', 'NameError: name Print is not defined')
        ])
    ],
    2: [
        makeSection('py2-variables', 'Variables', 'Qiymatlarni nomlash, saqlash va qayta o‘zgartirish.', 'variables', [
            c('O‘zgaruvchi', 'Qiymatga bog‘langan va kodda qayta ishlatiladigan nom.', 'message = "Salom"'),
            c('Qiymat biriktirish', 'Tenglik belgisi yordamida o‘zgaruvchiga qiymat berish amali.', 'yosh = 18'),
            c('Nomlash qoidasi', 'Nom harf yoki pastki chiziq bilan boshlanadi va bo‘sh joy olmaydi.', 'user_name = "Ali"'),
            c('NameError', 'Mavjud bo‘lmagan yoki xato yozilgan nom ishlatilganda yuz beradigan xato.', 'print(mesage)'),
            c('Qiymatni yangilash', 'Mavjud o‘zgaruvchiga yangi qiymat biriktirish.', 'score = score + 10')
        ]),
        makeSection('py2-strings', 'Strings', 'Matn metodlari, f-string va bo‘sh joylarni boshqarish.', 'variables', [
            c('String', 'Belgilar ketma-ketligini saqlaydigan matn turi.', 'name = "ada lovelace"'),
            c('title() metodi', 'Matndagi har bir so‘zning bosh harfini katta qiladi.', 'name.title()'),
            c('f-string', 'O‘zgaruvchi qiymatini jingalak qavs orqali matnga joylaydi.', 'f"Salom, {name}!"'),
            c('Maxsus bo‘shliq', 'Tab yoki yangi qator kabi ko‘rinmaydigan format belgisi.', '"Python\nJavaScript"'),
            c('strip() metodi', 'Matnning chap va o‘ng chetidagi ortiqcha bo‘sh joylarni olib tashlaydi.', 'language.strip()')
        ]),
        makeSection('py2-numbers-comments', 'Numbers and Comments', 'Sonli amallar, konstantalar va kod izohlari.', 'variables', [
            c('Integer', 'Kasr qismi bo‘lmagan musbat yoki manfiy butun son.', 'count = 42'),
            c('Float', 'Kasr qismiga ega bo‘lgan son turi.', 'price = 19.95'),
            c('Darajaga oshirish', 'Ikki yulduz operatori bilan sonning darajasini hisoblash.', '3 ** 2'),
            c('Ko‘p qiymat biriktirish', 'Bir qatorda bir nechta o‘zgaruvchiga qiymat berish.', 'x, y, z = 1, 2, 3'),
            c('Izoh', 'Kod maqsadini tushuntiradigan va interpreter bajarmaydigan matn.', '# foydalanuvchi balli')
        ])
    ],
    3: [
        makeSection('py3-list-basics', 'What Is a List?', 'Ro‘yxat yaratish, element va indekslardan foydalanish.', 'variables', [
            c('List', 'Tartiblangan qiymatlar to‘plamini kvadrat qavsda saqlaydi.', 'bicycles = ["trek", "cannondale"]'),
            c('Musbat indeks', 'Ro‘yxat boshidan element o‘rnini 0 dan boshlab ko‘rsatadi.', 'bicycles[0]'),
            c('Manfiy indeks', 'Ro‘yxat oxiridan element tanlash imkonini beradi.', 'bicycles[-1]'),
            c('Element metodi', 'Ro‘yxatdan olingan matn qiymatiga string metodini qo‘llash.', 'bicycles[0].title()'),
            c('IndexError', 'Ro‘yxatda mavjud bo‘lmagan indeksga murojaat qilinganda yuz beradi.', 'bicycles[5]')
        ]),
        makeSection('py3-list-management', 'Modifying, Adding, and Removing Elements', 'Elementlarni yangilash, qo‘shish va olib tashlash.', 'variables', [
            c('Indeks orqali yangilash', 'Tanlangan ro‘yxat elementini yangi qiymat bilan almashtiradi.', 'motorcycles[0] = "ducati"'),
            c('append()', 'Yangi elementni ro‘yxatning oxiriga qo‘shadi.', 'motorcycles.append("honda")'),
            c('insert()', 'Yangi elementni ko‘rsatilgan indeksga joylaydi.', 'motorcycles.insert(0, "suzuki")'),
            c('del operatori', 'Indeksi ma’lum elementni qaytarmasdan o‘chiradi.', 'del motorcycles[0]'),
            c('pop()', 'Elementni ro‘yxatdan olib tashlab, uning qiymatini qaytaradi.', 'last_owned = motorcycles.pop()')
        ]),
        makeSection('py3-organizing', 'Organizing a List', 'Ro‘yxatni tartiblash, teskari aylantirish va uzunligini topish.', 'variables', [
            c('sort()', 'Ro‘yxatning o‘zini alifbo yoki son tartibida doimiy o‘zgartiradi.', 'cars.sort()'),
            c('sorted()', 'Asl ro‘yxatni o‘zgartirmasdan tartiblangan nusxa qaytaradi.', 'sorted(cars)'),
            c('reverse()', 'Ro‘yxat elementlarining joriy ketma-ketligini teskarisiga aylantiradi.', 'cars.reverse()'),
            c('len()', 'Ro‘yxat ichidagi elementlar sonini qaytaradi.', 'len(cars)'),
            c('Teskari tartiblash', 'sort() metodida reverse parametri bilan kamayish tartibini yaratadi.', 'cars.sort(reverse=True)')
        ])
    ],
    4: [
        makeSection('py4-looping', 'Looping Through an Entire List', 'for sikli, chekinish va sikldan keyingi amallar.', 'loops', [
            c('for sikli', 'Kolleksiyadagi har bir element uchun kod blokini bajaradi.', 'for magician in magicians:'),
            c('Vaqtinchalik o‘zgaruvchi', 'Har aylanishda joriy element qiymatini qabul qiladigan nom.', 'for cat in cats:'),
            c('Chekinish', 'Sikl tanasiga tegishli qatorlarni ichkariga surib belgilaydi.', '    print(magician)'),
            c('Ikki nuqta', 'for sarlavhasi tugaganini va kod bloki boshlanishini bildiradi.', 'for pizza in pizzas:'),
            c('Sikldan keyingi kod', 'Chekinishsiz yozilib, barcha aylanishlar tugagach bir marta bajariladi.', 'print("Rahmat!")')
        ]),
        makeSection('py4-numerical-lists', 'Making Numerical Lists', 'range(), statistika va list comprehension.', 'loops', [
            c('range()', 'Boshlanishdan tugash chegarasigacha sonlar ketma-ketligini yaratadi.', 'range(1, 6)'),
            c('list(range())', 'range natijasini haqiqiy ro‘yxatga aylantiradi.', 'numbers = list(range(1, 6))'),
            c('Qadam qiymati', 'range ichidagi uchinchi argument sonlar orasidagi farqni belgilaydi.', 'range(2, 11, 2)'),
            c('Oddiy statistika', 'min(), max() va sum() sonli ro‘yxatni umumlashtiradi.', 'sum(digits)'),
            c('List comprehension', 'Ifoda va for siklini bir qatorda yangi ro‘yxatga birlashtiradi.', 'squares = [value ** 2 for value in range(1, 11)]')
        ]),
        makeSection('py4-slices-tuples', 'Working with Part of a List and Tuples', 'Kesma, nusxa va o‘zgarmas ketma-ketliklar.', 'loops', [
            c('Slice', 'Boshlanish va tugash indekslari orqali ro‘yxatning qismini oladi.', 'players[0:3]'),
            c('Ochiq chegara', 'Kesma chegarasi yozilmasa ro‘yxat boshi yoki oxirigacha oladi.', 'players[:4]'),
            c('Ro‘yxat nusxasi', 'To‘liq kesma orqali alohida ro‘yxat obyektini yaratadi.', 'friend_foods = my_foods[:]'),
            c('Tuple', 'Yaratilgandan keyin elementlari o‘zgarmaydigan ketma-ketlik.', 'dimensions = (200, 50)'),
            c('Tuple qayta belgilash', 'Elementni emas, butun tuple o‘zgaruvchisini yangi qiymatga almashtiradi.', 'dimensions = (400, 100)')
        ])
    ],
    5: [
        makeSection('py5-conditional-tests', 'Conditional Tests', 'Taqqoslash, mantiqiy operator va a’zolik testlari.', 'logic', [
            c('Tenglik testi', 'Ikki qiymat bir xil ekanini == operatori bilan tekshiradi.', 'car == "bmw"'),
            c('Teng emas testi', 'Ikki qiymat farqli ekanini != operatori bilan tekshiradi.', 'requested_topping != "anchovies"'),
            c('Sonli taqqoslash', 'Katta, kichik yoki chegaraviy munosabatni tekshiradi.', 'age >= 18'),
            c('and operatori', 'Birgalikdagi barcha shartlar True bo‘lishini talab qiladi.', 'age_0 >= 21 and age_1 >= 21'),
            c('in operatori', 'Qiymat ro‘yxat yoki boshqa kolleksiyada borligini tekshiradi.', '"mushrooms" in requested_toppings')
        ]),
        makeSection('py5-if-statements', 'if Statements', 'if, elif, else va bir nechta shartlarni boshqarish.', 'logic', [
            c('Oddiy if', 'Shart True bo‘lgandagina ichki blokni bajaradi.', 'if age >= 18:'),
            c('if-else', 'Shart rost va yolg‘on holatlari uchun ikki yo‘l beradi.', 'if age >= 18: ... else: ...'),
            c('if-elif-else', 'Bir nechta o‘zaro bog‘liq holatdan bittasini tanlaydi.', 'if age < 4: ... elif age < 18: ... else: ...'),
            c('Mustaqil if lar', 'Bir nechta shart bir vaqtda bajarilishi mumkin bo‘lsa alohida tekshiriladi.', 'if "mushrooms" in toppings:'),
            c('Bo‘sh ro‘yxat testi', 'Ro‘yxatda element borligini uning boolean qiymati orqali tekshiradi.', 'if requested_toppings:')
        ])
    ],
    6: [
        makeSection('py6-working-dictionaries', 'Working with Dictionaries', 'Kalit-qiymat juftliklarini yaratish va o‘zgartirish.', 'variables', [
            c('Dictionary', 'O‘zaro bog‘langan kalit va qiymat juftliklarini saqlaydi.', 'alien_0 = {"color": "green", "points": 5}'),
            c('Kalit orqali olish', 'Kvadrat qavs ichidagi kalitga tegishli qiymatni qaytaradi.', 'alien_0["color"]'),
            c('Yangi juftlik', 'Yangi kalitga qiymat biriktirib lug‘atni kengaytiradi.', 'alien_0["x_position"] = 0'),
            c('del operatori', 'Kalit va unga tegishli qiymatni butunlay o‘chiradi.', 'del alien_0["points"]'),
            c('get()', 'Kalit yo‘q bo‘lsa xato o‘rniga standart qiymat qaytaradi.', 'alien_0.get("speed", "No speed")')
        ]),
        makeSection('py6-looping-nesting', 'Looping Through a Dictionary and Nesting', 'Lug‘at sikllari va ichma-ich ma’lumotlar.', 'loops', [
            c('items()', 'Lug‘atdagi kalit va qiymat juftliklarini siklga beradi.', 'for key, value in user_0.items():'),
            c('keys()', 'Lug‘atdagi barcha kalitlar bo‘ylab yurish imkonini beradi.', 'for name in favorite_languages.keys():'),
            c('values()', 'Lug‘atdagi qiymatlar ketma-ketligini qaytaradi.', 'favorite_languages.values()'),
            c('Lug‘atlar ro‘yxati', 'Bir xil tuzilishdagi ko‘plab obyektlarni list ichida saqlaydi.', 'aliens = [{"color": "green"}, {"color": "yellow"}]'),
            c('Ichma-ich lug‘at', 'Bir lug‘at qiymati sifatida boshqa lug‘atni saqlaydi.', 'users = {"aeinstein": {"first": "albert"}}')
        ])
    ],
    7: [
        makeSection('py7-user-input', 'How the input() Function Works', 'Prompt, matnli kiritma va son turiga aylantirish.', 'variables', [
            c('input()', 'Foydalanuvchiga prompt ko‘rsatib, kiritilgan qiymatni string sifatida qaytaradi.', 'name = input("Ismingiz: ")'),
            c('Prompt', 'Foydalanuvchidan qanday ma’lumot kutilayotganini tushuntiruvchi xabar.', '"Yoshingizni kiriting: "'),
            c('int()', 'Raqamli string qiymatini butun songa aylantiradi.', 'age = int(input("Yosh: "))'),
            c('Modulo', 'Bo‘lishdan qolgan qoldiqni % operatori orqali hisoblaydi.', 'number % 2'),
            c('Ko‘p qatorli prompt', 'Uzun ko‘rsatmani o‘zgaruvchida yig‘ib input ga uzatadi.', 'prompt += "\nIsmingiz nima? "')
        ]),
        makeSection('py7-while-loops', 'Introducing while Loops', 'Shartli takrorlash, flag, break va continue.', 'loops', [
            c('while sikli', 'Berilgan shart True bo‘lib turgan vaqt davomida kodni takrorlaydi.', 'while current_number <= 5:'),
            c('Chiqish qiymati', 'Foydalanuvchi maxsus qiymat kiritganda siklni tugatish usuli.', 'while message != "quit":'),
            c('Flag', 'Dastur davom etishi yoki to‘xtashini bitta boolean o‘zgaruvchi bilan boshqaradi.', 'active = True'),
            c('break', 'Joriy sikldan darhol chiqadi.', 'if city == "quit": break'),
            c('continue', 'Joriy aylanishning qolgan qismini tashlab keyingi aylanishga o‘tadi.', 'if number % 2 == 0: continue')
        ])
    ],
    8: [
        makeSection('py8-defining-functions', 'Defining a Function', 'Funksiya e’loni, parametr va argumentlar.', 'functions', [
            c('def kalit so‘zi', 'Yangi funksiya ta’rifini boshlaydi.', 'def greet_user():'),
            c('Funksiya chaqiruvi', 'Funksiya nomini qavs bilan yozib uning kodini bajaradi.', 'greet_user()'),
            c('Parametr', 'Funksiya ta’rifida ma’lumot qabul qiladigan o‘zgaruvchi.', 'def greet_user(username):'),
            c('Argument', 'Funksiya chaqirilganda parametrga uzatiladigan haqiqiy qiymat.', 'greet_user("jesse")'),
            c('Docstring', 'Funksiya vazifasini uch qo‘shtirnoq ichida hujjatlashtiradi.', '"""Oddiy salomlashuvni ko‘rsatadi."""')
        ]),
        makeSection('py8-arguments-returns', 'Passing Arguments and Return Values', 'Argument turlari, standart qiymat va return.', 'functions', [
            c('Pozitsion argument', 'Qiymatlarni parametrlar e’lon qilingan tartibda bog‘laydi.', 'describe_pet("hamster", "harry")'),
            c('Kalit argument', 'Qiymatni parametr nomi orqali aniq uzatadi.', 'describe_pet(animal_type="hamster", pet_name="harry")'),
            c('Standart qiymat', 'Argument berilmaganda parametr uchun oldindan belgilangan qiymatni ishlatadi.', 'def describe_pet(pet_name, animal_type="dog"):'),
            c('return', 'Funksiya hosil qilgan qiymatni chaqirilgan joyga qaytaradi.', 'return full_name.title()'),
            c('Modul importi', 'Boshqa fayldagi funksiyani joriy dasturda ishlatish imkonini beradi.', 'from pizza import make_pizza')
        ])
    ],
    9: [
        makeSection('py9-creating-classes', 'Creating and Using a Class', 'Klass, __init__, atribut, metod va instance.', 'functions', [
            c('class kalit so‘zi', 'Yangi obyekt shablonini e’lon qiladi.', 'class Dog:'),
            c('__init__()', 'Yangi instance yaratilganda atributlarni boshlang‘ich qiymat bilan o‘rnatadi.', 'def __init__(self, name, age):'),
            c('self', 'Metod ichida joriy instance ning o‘ziga murojaat qiladi.', 'self.name = name'),
            c('Metod', 'Klass ichida e’lon qilingan va instance xatti-harakatini ifodalovchi funksiya.', 'def sit(self):'),
            c('Instance', 'Klass shablonidan yaratilgan aniq obyekt.', 'my_dog = Dog("Willie", 6)')
        ]),
        makeSection('py9-inheritance', 'Inheritance and Importing Classes', 'Farzand klass, super() va klasslarni moduldan olish.', 'functions', [
            c('Meros olish', 'Farzand klassga ota klass atribut va metodlarini beradi.', 'class ElectricCar(Car):'),
            c('super()', 'Ota klass metodini farzand klass ichidan chaqiradi.', 'super().__init__(make, model, year)'),
            c('Metodni qayta yozish', 'Farzand klass ota metodiga o‘ziga mos yangi xatti-harakat beradi.', 'def fill_gas_tank(self):'),
            c('Instance atributi', 'Bir klass instance sini boshqa klass atributi sifatida saqlaydi.', 'self.battery = Battery()'),
            c('Klass importi', 'Alohida modulda saqlangan klassni dasturga olib kiradi.', 'from car import ElectricCar')
        ])
    ],
    10: [
        makeSection('py10-files', 'Reading from and Writing to a File', 'Path, read_text() va faylga yozish.', 'syntax', [
            c('Path obyekti', 'Fayl joylashuvini platformadan mustaqil ko‘rinishda ifodalaydi.', 'path = Path("pi_digits.txt")'),
            c('read_text()', 'Path ko‘rsatgan faylning barcha matnini o‘qib qaytaradi.', 'contents = path.read_text()'),
            c('splitlines()', 'Ko‘p qatorli matnni alohida qatorlar ro‘yxatiga ajratadi.', 'for line in contents.splitlines():'),
            c('write_text()', 'Berilgan string qiymatini faylga yozadi.', 'path.write_text("I love programming.")'),
            c('Nisbiy yo‘l', 'Fayl manzilini joriy loyiha papkasiga nisbatan ko‘rsatadi.', 'Path("text_files/filename.txt")')
        ]),
        makeSection('py10-exceptions-data', 'Exceptions and Storing Data', 'Xatolarni ushlash va JSON ma’lumotini saqlash.', 'syntax', [
            c('try-except', 'Xato berishi mumkin kodni bajarib, kutilgan istisnoni boshqaradi.', 'try: answer = 5 / 0\nexcept ZeroDivisionError: ...'),
            c('else bloki', 'try muvaffaqiyatli tugaganda bajariladigan kodni ajratadi.', 'else: print(answer)'),
            c('FileNotFoundError', 'Ko‘rsatilgan fayl mavjud bo‘lmaganda yuz beradigan istisno.', 'except FileNotFoundError:'),
            c('json.dumps()', 'Python qiymatini JSON formatidagi stringga aylantiradi.', 'contents = json.dumps(numbers)'),
            c('json.loads()', 'JSON stringini yana Python qiymatiga aylantiradi.', 'numbers = json.loads(contents)')
        ])
    ],
    11: [
        makeSection('py11-testing-functions', 'Testing a Function', 'pytest, test funksiyasi va assert tekshiruvlari.', 'logic', [
            c('Unit test', 'Funksiyaning bitta aniq xatti-harakatini avtomatik tekshiradi.', 'test_city_country()'),
            c('Test case', 'Birgalikda ma’lum vaziyatni tekshiradigan testlar to‘plami.', 'city_functions.py uchun test moduli'),
            c('assert', 'Haqiqiy natija kutilgan qiymatga tengligini talab qiladi.', 'assert formatted_name == "Janis Joplin"'),
            c('O‘tgan test', 'Tekshirilgan xatti-harakat kutilgan natijani berganini bildiradi.', 'pytest natijasida 1 passed'),
            c('Yiqilgan test', 'Haqiqiy va kutilgan natija farqini ko‘rsatib muammoni ochadi.', 'AssertionError')
        ]),
        makeSection('py11-testing-classes', 'Testing a Class', 'Klass metodlari, fixture va takror ishlatiladigan test ma’lumoti.', 'logic', [
            c('Klass testi', 'Instance yaratib uning atribut va metod natijalarini tekshiradi.', 'survey = AnonymousSurvey(question)'),
            c('assert in', 'Kutilgan qiymat kolleksiya ichida mavjudligini tekshiradi.', 'assert "English" in survey.responses'),
            c('Fixture', 'Bir nechta testga kerak bo‘ladigan obyektni oldindan tayyorlaydi.', '@pytest.fixture'),
            c('Fixture parametri', 'pytest tayyorlagan fixture ni test funksiyasiga avtomatik uzatadi.', 'def test_store_single_response(language_survey):'),
            c('Test izolyatsiyasi', 'Har bir test boshqalardan mustaqil boshlang‘ich holatda ishlaydi.', 'har test uchun yangi survey instance')
        ])
    ]
};
