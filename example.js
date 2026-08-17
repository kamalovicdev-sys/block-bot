const spamWords = [
    "odam qosh", "odam qush", "Spamdan chiqarishni", "ODAM QOSHISHNI OʻRGATAMAN", "PREMIUM BOR", "Ayol qizlarga yangilik", "Guruh rivojlantirish bilan shug‘ullanaman",
    "aktiv ayol", "aktiv odam", "ИШСИЗ АЙОЛ КИЗЛАРИМИЗЗИ УЗ КАМПАНЯМГА ТАКЛИФ КИЛАМАН", "Аёл-қизлар учун қулай иш", "Тадбиркорликни ўргатаман", "BARCHA TURDAGI MEBELARGA ZAKAZ OLAMIZ",
    "terib qosh", "terib qush", "Onlayn daromad", "ONLAYN ISH ga taklif qilaman", "Diqqat adminlar uchun e'lon", "Bosh tulov", "+998903045417", "spamdan chiqarib beraman",
    "halol va qonuniy", "qonuniy halol", "Ишчи керак", "Qiziqqanlar lichga", "Odam qushib beramiz narxlari aaksiyada hozirda kimga kerak bulsa lechkamga yozsin gaplashamizzz",
    "ish vaqti erkin", "tajriba talab", "lichkamga yozinglar", "+998944449949", "Diqqat adminlar uchun faqat", "arzon narxda guruhga", "telefonga tushunadigan opa singillarimiz yozin",
    "haftalik daromad", "oylik daromad", "guruhlardan olib beraman", "Евро ремонт", "Сантехника", "+998916820903", "Xavsiz va ishonchli", "Murojaatlar lichkada...",
    "sifatli aktiv", "nakrutka", "платим 2 раза неделю", "kimga shunaqa xizmatim", "guruxga ayollarni terib qushib beraman", "Ishchi kerak.", "Batafsil ma'lumot va ro‘yxatdan o‘tish uchun",
    "obunachi kopaytirish", "reaksiya va layk", "kimga kerek bulsa", "Diqqat diqqat", "judayam oson ishbor", "Ayol qizlarga yangilik", "faqat bu ish Ayol qizlar uchun",
    "ovoz yigib", "onlayn ish", "online ish", "Terib qushish iimkoniyati bor", "ADMINLAR UCHUN ELON", "lechkamga yozsin gaplashamizzz", "Бир умир Дуо киламан",
    "premium olib", "premiumlar", "ovoz yigib beraman", "I have ᴏne Queѕtioռ", "odam qoshish hizmati", "Чекланмаган обёмда", "Coucou je suis en Live",
    "savdo bn shugullanmoqchi", "daromad topish", "Иш вақти эркин", "Қизиққанлар батафсил маълумот олиш учун личкага ёзинг", "Ҳалол ва қонуний фаолият",
    "1000 ta toza", "aralash 60 ming", "uzoq muddat kirmagan", "opa singillarimiz yozin", "bekochila bezovta qilmasin", "SKIDKA"
];

const spamPatterns = [
    /(guruh|grupp|гурух|групп).*?(aktiv|актив|odam|одам|ayol|erkak|juvoy|kantakt|kontakt)/i,
    /(terib|teriib|териб).*?(qush|qosh|qo'?sh|куш|кош)/i,
    /(odam|одам|ayol|erkak|qizlar|qiizlar|kantakt|kontakt).*?(qoshish|qushish|q[o|u]'?shib|qoshib)/i,
    /(nakrutka|накрутка)/i,
    /(obunachi|обуначи).*?(kopaytirish|копайтириш)/i,
    /\d+\s*\+\s*\d+\s*ta\s*bonus/i,
    /arzon.*?narx.*?q[o|u]sh/i,
    /aksiya.*?narx/i,
    /(ishchi|ишчи).*?(kerak|керак)/i,
    /(onlayn|online|онлайн|онлайин).*?(daromad|даромад|tarmok|тармок|ish|иш)/i,
    /(uyida|уйида).*?(o'?tirib|утириб)/i,
    /100%.*?qonuniy/i,
    /(oylik|ойлик|z\/p|з\/п|foyda|фойда).*?\d+.*?(ming|минг|mln|млн|milion|милон|rub|руб)/i,
    /(bo'?sh|бош).*?(ish|иш).*?(o'?rni|орни)/i,
    /(bola|бола).*?(puli|пули)/i,
    /(mutlaqo|ta'?lim).*?(tekin|bepul)/i,
    /birinchi.*?yozgan.*?kishiga/i,
    /(premium|премиум).*?(olib|олиб)/i,
    /savdo.*?shug['o]llanmoqchi/i,
    /[\u4e00-\u9fa5]/, // Xitoycha harflar
    /([^\w\s])\1{5,}/, // Bitta maxsus belgini 5 marta takrorlab spam qiladiganlarni ushlash
    /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/ // Arab va Fors alifbosini to'liq bloklash
];