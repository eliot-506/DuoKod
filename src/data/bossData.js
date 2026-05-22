// Boss Fight ma'lumotlari — har bir modul oxiriga mos boss
// type: 'bug' → foydalanuvchi xatoni 15 sek ichida tuzatadi
// type: 'shield' → to'g'ri kod bo'lsa 5 sek ichida shield yozadi

export const BOSS_DATA = {
    python: {
        bossName: 'CORRUPTED GUARDIAN',
        bossIcon: '💀',
        color: '#ef4444',
        description: 'Tizim buzildi... Endi u sizni himoya qilmaydi!',
        bosses: [
            {
                moduleId: 1,
                title: 'Hello Demon',
                subtitle: '1-Modul Bossi',
                hp: 100,
                rounds: [
                    {
                        type: 'bug',
                        bossMessage: '🐍 Kuchsiz kod! Bu noto\'g\'ri — tuzat!',
                        code: 'Print("Salom Dunyo")',
                        correctAnswer: 'print("Salom Dunyo")',
                        hint: 'Python funksiyalari kichik harfda yoziladi!',
                        damage: { blade: 40, rifle: 25, dagger: 10 }
                    },
                    {
                        type: 'shield',
                        bossMessage: '🐍 Qalqonsiz qolding! Bu to\'g\'ri kod — himoyalan!',
                        code: 'print("Himoya")',
                        shieldCode: 'print("Himoya")',
                        hint: 'Xuddi shu kodni yozing!',
                    },
                    {
                        type: 'bug',
                        bossMessage: '🐍 Ha-ha! Bu ham xato — tuzatsang qutulasan!',
                        code: 'print("Salom" + " " + "Dunyo)',
                        correctAnswer: 'print("Salom" + " " + "Dunyo")',
                        hint: 'Yopilmagan qo\'shtirnoqni toping!',
                        damage: { blade: 40, rifle: 25, dagger: 10 }
                    }
                ]
            },
            {
                moduleId: 2,
                title: 'Variable Vampire',
                subtitle: '2-Modul Bossi',
                hp: 120,
                rounds: [
                    {
                        type: 'bug',
                        bossMessage: '🐍 O\'zgaruvchini noto\'g\'ri e\'lon qilding!',
                        code: 'var yosh = 25',
                        correctAnswer: 'yosh = 25',
                        hint: 'Python da "var" yozilmaydi!',
                        damage: { blade: 40, rifle: 25, dagger: 10 }
                    },
                    {
                        type: 'shield',
                        bossMessage: '🐍 O\'zgaruvchi yasab himoyalan!',
                        code: 'son = 42',
                        shieldCode: 'son = 42',
                        hint: 'Xuddi shu kodni yozing!',
                    },
                    {
                        type: 'bug',
                        bossMessage: '🐍 Qo\'shish noto\'g\'ri!',
                        code: 'print("Yosh: " + 25)',
                        correctAnswer: 'print("Yosh: " + str(25))',
                        hint: 'Raqamni matnga aylantirish uchun str() kerak!',
                        damage: { blade: 40, rifle: 25, dagger: 10 }
                    }
                ]
            },
            {
                moduleId: 3,
                title: 'List Lurker',
                subtitle: '3-Modul Bossi',
                hp: 130,
                rounds: [
                    {
                        type: 'bug',
                        bossMessage: '🐍 Ro\'yxatni noto\'g\'ri yozdingmi?!',
                        code: 'mevalar = (olma, nok, banan)',
                        correctAnswer: 'mevalar = ["olma", "nok", "banan"]',
                        hint: 'Listlar kvadrat qavsda, matnlar qo\'shtirnoqda!',
                        damage: { blade: 40, rifle: 25, dagger: 10 }
                    },
                    {
                        type: 'shield',
                        bossMessage: '🐍 Bo\'sh ro\'yxat yasab himoyalan!',
                        code: 'raqamlar = []',
                        shieldCode: 'raqamlar = []',
                        hint: 'Bo\'sh list: kvadrat qavslar []',
                    },
                    {
                        type: 'bug',
                        bossMessage: '🐍 Birinchi elementni chiqara olmadingmi?!',
                        code: 'print(mevalar[1])',
                        correctAnswer: 'print(mevalar[0])',
                        hint: 'Python indexlash 0 dan boshlanadi!',
                        damage: { blade: 40, rifle: 25, dagger: 10 }
                    }
                ]
            },
            {
                moduleId: 4,
                title: 'Method Menace',
                subtitle: '4-Modul Bossi',
                hp: 140,
                rounds: [
                    {
                        type: 'bug',
                        bossMessage: '🐍 Ro\'yxatga qo\'shishni bilmaysan!',
                        code: 'mevalar.push("gilos")',
                        correctAnswer: 'mevalar.append("gilos")',
                        hint: 'Python da push emas, append ishlatiladi!',
                        damage: { blade: 40, rifle: 25, dagger: 10 }
                    },
                    {
                        type: 'shield',
                        bossMessage: '🐍 Ro\'yxat uzunligini yozib himoyalan!',
                        code: 'uzunlik = len(mevalar)',
                        shieldCode: 'uzunlik = len(mevalar)',
                        hint: 'len() funksiyasidan foydalaning!',
                    },
                    {
                        type: 'bug',
                        bossMessage: '🐍 O\'chirish noto\'g\'ri!',
                        code: 'mevalar.delete("olma")',
                        correctAnswer: 'mevalar.remove("olma")',
                        hint: 'O\'chirish uchun remove() ishlatiladi!',
                        damage: { blade: 40, rifle: 25, dagger: 10 }
                    }
                ]
            },
            {
                moduleId: 5,
                title: 'Conditional Cobra',
                subtitle: '5-Modul Bossi',
                hp: 150,
                rounds: [
                    {
                        type: 'bug',
                        bossMessage: '🐍 Shart xato yozilgan!',
                        code: 'if yosh > 18 {\n  print("Katta")\n}',
                        correctAnswer: 'if yosh > 18:\n  print("Katta")',
                        hint: 'Python da {} emas, : va indentation ishlatiladi!',
                        damage: { blade: 40, rifle: 25, dagger: 10 }
                    },
                    {
                        type: 'shield',
                        bossMessage: '🐍 Else yozib himoyalan!',
                        code: 'else:\n  print("Kichik")',
                        shieldCode: 'else:\n  print("Kichik")',
                        hint: 'else: deb yozing!',
                    },
                    {
                        type: 'bug',
                        bossMessage: '🐍 elif xato!',
                        code: 'else if yosh == 18:\n  print("Balog\'at")',
                        correctAnswer: 'elif yosh == 18:\n  print("Balog\'at")',
                        hint: 'Python da "else if" emas, "elif" ishlatiladi!',
                        damage: { blade: 40, rifle: 25, dagger: 10 }
                    }
                ]
            },
            {
                moduleId: 6,
                title: 'Dict Dragon',
                subtitle: '6-Modul Bossi',
                hp: 160,
                rounds: [
                    {
                        type: 'bug',
                        bossMessage: '🐍 Lug\'at xato yaratilgan!',
                        code: 'odam = ["ism": "Ali", "yosh": 25]',
                        correctAnswer: 'odam = {"ism": "Ali", "yosh": 25}',
                        hint: 'Dictionary jingalak qavsda {} yoziladi!',
                        damage: { blade: 40, rifle: 25, dagger: 10 }
                    },
                    {
                        type: 'shield',
                        bossMessage: '🐍 Bo\'sh dict yasab himoyalan!',
                        code: 'lugat = {}',
                        shieldCode: 'lugat = {}',
                        hint: 'Bo\'sh dict: jingalak qavslar {}',
                    },
                    {
                        type: 'bug',
                        bossMessage: '🐍 Qiymatni olish xato!',
                        code: 'print(odam.ism)',
                        correctAnswer: 'print(odam["ism"])',
                        hint: 'Dict dan qiymat olish uchun ["kalit"] ishlatiladi!',
                        damage: { blade: 40, rifle: 25, dagger: 10 }
                    }
                ]
            },
            {
                moduleId: 7,
                title: 'Loop Lich',
                subtitle: '7-Modul Bossi',
                hp: 170,
                rounds: [
                    {
                        type: 'bug',
                        bossMessage: '🐍 While loop xato!',
                        code: 'while x < 10\n  x += 1',
                        correctAnswer: 'while x < 10:\n  x += 1',
                        hint: 'while dan keyin : (ikki nuqta) kerak!',
                        damage: { blade: 40, rifle: 25, dagger: 10 }
                    },
                    {
                        type: 'shield',
                        bossMessage: '🐍 input() yozib himoyalan!',
                        code: 'ism = input("Ismingiz: ")',
                        shieldCode: 'ism = input("Ismingiz: ")',
                        hint: 'Foydalanuvchidan ma\'lumot olish!',
                    },
                    {
                        type: 'bug',
                        bossMessage: '🐍 Loopni to\'xtatish xato!',
                        code: 'breyk',
                        correctAnswer: 'break',
                        hint: 'Loop ni to\'xtatish: break (inglizcha to\'g\'ri yozish)',
                        damage: { blade: 40, rifle: 25, dagger: 10 }
                    }
                ]
            },
            {
                moduleId: 8,
                title: 'Function Phantom',
                subtitle: '8-Modul Bossi',
                hp: 180,
                rounds: [
                    {
                        type: 'bug',
                        bossMessage: '🐍 Funksiya xato e\'lon qilindi!',
                        code: 'function salom():\n  print("Salom")',
                        correctAnswer: 'def salom():\n  print("Salom")',
                        hint: 'Python da "function" emas, "def" ishlatiladi!',
                        damage: { blade: 40, rifle: 25, dagger: 10 }
                    },
                    {
                        type: 'shield',
                        bossMessage: '🐍 Oddiy funksiya yozib himoyalan!',
                        code: 'def himoya():\n  pass',
                        shieldCode: 'def himoya():\n  pass',
                        hint: 'def + nom + () + :',
                    },
                    {
                        type: 'bug',
                        bossMessage: '🐍 Return xato!',
                        code: 'def yigindi(a, b):\nreturn a + b',
                        correctAnswer: 'def yigindi(a, b):\n  return a + b',
                        hint: 'return indentation bilan ichkarida bo\'lishi kerak!',
                        damage: { blade: 40, rifle: 25, dagger: 10 }
                    }
                ]
            },
            {
                moduleId: 9,
                title: 'Class Chaos',
                subtitle: '9-Modul Bossi',
                hp: 190,
                rounds: [
                    {
                        type: 'bug',
                        bossMessage: '🐍 Klass xato yaratildi!',
                        code: 'class Mashina\n  def __init__(self):\n    pass',
                        correctAnswer: 'class Mashina:\n  def __init__(self):\n    pass',
                        hint: 'class nomidan keyin : (ikki nuqta) kerak!',
                        damage: { blade: 40, rifle: 25, dagger: 10 }
                    },
                    {
                        type: 'shield',
                        bossMessage: '🐍 Obyekt yaratib himoyalan!',
                        code: 'hp = Mashina()',
                        shieldCode: 'hp = Mashina()',
                        hint: 'Python da new kalit so\'zi ishlatilmaydi!',
                    },
                    {
                        type: 'bug',
                        bossMessage: '🐍 JavaScript ga o\'xshatyapsan!',
                        code: 'mashina = new Mashina()',
                        correctAnswer: 'mashina = Mashina()',
                        hint: 'Python da "new" yo\'q — to\'g\'ridan-to\'g\'ri chaqirilади!',
                        damage: { blade: 40, rifle: 25, dagger: 10 }
                    }
                ]
            },
            {
                moduleId: 10,
                title: 'Exception Executioner',
                subtitle: '10-Modul Bossi',
                hp: 200,
                rounds: [
                    {
                        type: 'bug',
                        bossMessage: '🐍 Try-except xato yozilgan!',
                        code: 'try:\n  x = 1/0\ncatch:\n  print("Xato!")',
                        correctAnswer: 'try:\n  x = 1/0\nexcept:\n  print("Xato!")',
                        hint: 'Python da "catch" emas, "except" ishlatiladi!',
                        damage: { blade: 40, rifle: 25, dagger: 10 }
                    },
                    {
                        type: 'shield',
                        bossMessage: '🐍 Fayl ochib himoyalan!',
                        code: 'f = open("fayl.txt", "r")',
                        shieldCode: 'f = open("fayl.txt", "r")',
                        hint: 'open() funksiyasidan foydalaning!',
                    },
                    {
                        type: 'bug',
                        bossMessage: '🐍 Assert xato!',
                        code: 'check 5 == 5',
                        correctAnswer: 'assert 5 == 5',
                        hint: 'Test uchun "assert" kalit so\'zi ishlatiladi!',
                        damage: { blade: 40, rifle: 25, dagger: 10 }
                    }
                ]
            },
            {
                moduleId: 11,
                title: 'Test Terror — FINAL BOSS 👑',
                subtitle: '11-Modul (Final Boss)',
                hp: 250,
                isFinalBoss: true,
                rounds: [
                    {
                        type: 'bug',
                        bossMessage: '👑 En kuchli xatom — xato print!',
                        code: 'PRINT("Salom")',
                        correctAnswer: 'print("Salom")',
                        hint: 'Python case-sensitive — kichik harf!',
                        damage: { blade: 40, rifle: 25, dagger: 10 }
                    },
                    {
                        type: 'bug',
                        bossMessage: '👑 Barcha bilimingni ishlat!',
                        code: 'def test:\n  assert 5 = 5',
                        correctAnswer: 'def test():\n  assert 5 == 5',
                        hint: '1) def dan keyin () kerak, 2) tenglash == (ikkita)',
                        damage: { blade: 40, rifle: 25, dagger: 10 }
                    },
                    {
                        type: 'shield',
                        bossMessage: '👑 Oxirgi himoya — yengil bo\'lsa kerak!',
                        code: 'print("G\'olib!")',
                        shieldCode: 'print("G\'olib!")',
                        hint: 'Shunchaki yozing!',
                    }
                ]
            }
        ]
    }
};

// Modul ID si bo'yicha boss topish
export const getBossForModule = (courseId, moduleId) => {
    const course = BOSS_DATA[courseId];
    if (!course) return null;
    return course.bosses.find(b => b.moduleId === moduleId) || null;
};
