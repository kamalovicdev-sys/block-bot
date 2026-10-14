require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const express = require('express');

if (!process.env.BOT_TOKEN) {
    console.error("❌ XATOLIK: .env faylida BOT_TOKEN topilmadi!");
    process.exit(1);
}

// Bot tokenini muhit o'zgaruvchisidan olamiz
const bot = new Telegraf(process.env.BOT_TOKEN);

// ==========================================
// YORDAMCHI FUNKSIYALAR VA ADMIN KESHI
// ==========================================

// HTML belgilarni xavfsiz holatga keltirish (HTML Injection oldini olish)
const escapeHTML = (str = '') => String(str).replace(/[&<>'"]/g, (tag) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
}[tag]));

// Adminlarni vaqtinchalik xotirada saqlash (API 429 xatoligini oldini olish uchun)
const adminCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 daqiqa

async function checkIsAdmin(ctx, userId) {
    // 1087968824 - GroupAnonymousBot (Anonim admin)
    // 777000 - Telegram Service (Guruhga ulangan rasmiy kanal postlari)
    // 136817688 - Channel_Bot (Kanal nomidan yozilgan xabarlar)
    if (userId === 1087968824 || userId === 777000 || userId === 136817688) {
        return true;
    }

    // Agar xabar guruhning o'zi yoki ulangan kanal nomidan yuborilgan bo'lsa
    if (ctx.message && ctx.message.sender_chat) {
        if (ctx.message.sender_chat.id === ctx.chat.id || ctx.message.is_automatic_forward) {
            return true;
        }
    }

    const cacheKey = `${ctx.chat.id}_${userId}`;
    const cached = adminCache.get(cacheKey);

    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        return cached.isAdmin;
    }

    try {
        const chatMember = await ctx.getChatMember(userId);
        const isAdmin = chatMember.status === 'administrator' || chatMember.status === 'creator';
        adminCache.set(cacheKey, { isAdmin, timestamp: Date.now() });
        return isAdmin;
    } catch (error) {
        console.error("Adminlikni tekshirishda xatolik:", error);
        return false;
    }
}

// Standart cheklov va ruxsatlar
const MUTE_PERMISSIONS = {
    can_send_messages: false,
    can_send_media_messages: false,
    can_send_polls: false,
    can_send_other_messages: false,
    can_add_web_page_previews: false
};

const UNMUTE_PERMISSIONS = {
    can_send_messages: true,
    can_send_media_messages: true,
    can_send_polls: true,
    can_send_other_messages: true,
    can_add_web_page_previews: true,
    can_invite_users: true
};

// Qoidabuzarlarni jazolash uchun umumiy funksiya
async function punishUser(ctx, userId, userName, messageId, days, warningTextGenerator) {
    await ctx.deleteMessage(messageId).catch(() => {});

    const durationMs = days * 24 * 60 * 60 * 1000;
    const unbanDate = new Date(Date.now() + durationMs);
    const formattedDate = unbanDate.toLocaleString('uz-UZ', {
        day: '2-digit',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Tashkent'
    });
    const untilDate = Math.floor(unbanDate.getTime() / 1000);

    await ctx.restrictChatMember(userId, {
        permissions: MUTE_PERMISSIONS,
        until_date: untilDate
    }).catch(() => {});

    const safeName = escapeHTML(userName);
    const warningMsg = await ctx.reply(warningTextGenerator(safeName, formattedDate), {
        parse_mode: 'HTML'
    });

    setTimeout(() => ctx.deleteMessage(warningMsg.message_id).catch(() => {}), 10000);
}

// ==========================================
// 1. XIZMAT XABARLARINI O'CHIRISH
// ==========================================
bot.on([
    'new_chat_members',
    'new_chat_title',
    'new_chat_photo',
    'delete_chat_photo',
    'pinned_message',
    'video_chat_started',
    'video_chat_ended',
    'video_chat_participants_invited',
    'message_auto_delete_timer_changed'
], async (ctx) => {
    try {
        await ctx.deleteMessage(ctx.message.message_id).catch(() => {});
    } catch (error) {
        console.error("Xizmat xabarini o'chirishda xatolik:", error);
    }
});

// ==========================================
// 1.1. GURUHDAN CHIQIB KETGANLARNI AVTOMATIK BAN QILISH
// ==========================================
bot.on('left_chat_member', async (ctx) => {
    try {
        const leftUser = ctx.message.left_chat_member;
        const userId = leftUser.id;

        if (userId === ctx.botInfo.id) return;

        // 1. "Guruhni tark etdi" degan tizimli xabarni zudlik bilan o'chirib tashlash
        await ctx.deleteMessage(ctx.message.message_id).catch(() => {});

        // 2. Foydalanuvchini guruhdan butunlay ban qilish (qayta kira olmaydi)
        await ctx.banChatMember(userId).catch(() => {});
        console.log(`Foydalanuvchi ${leftUser.first_name} (ID: ${userId}) guruhdan chiqdi va bloklandi.`);
    } catch (error) {
        console.error("Guruhdan chiqqan foydalanuvchini bloklashda xatolik:", error);
    }
});

// ==========================================
// 2. /MUTE BUYRUG'I (Faqat adminlar ishlatadi)
// ==========================================
bot.command('mute', async (ctx) => {
    if (ctx.chat.type === 'private') return;

    const senderId = ctx.from.id;

    try {
        const isSenderAdmin = await checkIsAdmin(ctx, senderId);

        if (!isSenderAdmin) {
            const msg = await ctx.reply("❌ Bu buyruqdan faqat adminlar foydalana oladi.");
            setTimeout(() => ctx.deleteMessage(msg.message_id).catch(() => {}), 5000);
            return;
        }

        if (!ctx.message.reply_to_message) {
            const msg = await ctx.reply("⚠️ Iltimos, haqoratli xabarga reply qilib /mute deb yozing.");
            setTimeout(() => ctx.deleteMessage(msg.message_id).catch(() => {}), 5000);
            return;
        }

        const targetMessage = ctx.message.reply_to_message;
        const targetId = targetMessage.from.id;
        const targetName = escapeHTML(targetMessage.from.first_name);

        if (targetId === ctx.botInfo.id) return ctx.reply("🤖 Botni mute qilib bo'lmaydi.");

        const isTargetAdmin = await checkIsAdmin(ctx, targetId);

        if (isTargetAdmin) {
            return ctx.reply("⚠️ Kechirasiz, Telegram qoidalariga ko'ra bot adminlarni mute qila olmaydi.");
        }

        // Xabarlarni o'chirish
        await ctx.deleteMessage(targetMessage.message_id).catch(() => {});
        await ctx.deleteMessage(ctx.message.message_id).catch(() => {});

        // Mute qilish
        await ctx.restrictChatMember(targetId, {
            permissions: MUTE_PERMISSIONS
        });

        // Xabar va tugmalar
        await ctx.reply(
            `🔇 <a href="tg://user?id=${targetId}">${targetName}</a> haqoratli xabar yuborgani uchun admin tomonidan mute qilindi.`,
            {
                parse_mode: 'HTML',
                ...Markup.inlineKeyboard([
                    Markup.button.callback('🔓 Unmute', `unmute_${targetId}`)
                ])
            }
        );
    } catch (error) {
        console.error("/mute buyrug'ida xatolik:", error);
    }
});

// ==========================================
// 3. INLINE TUGMALAR UCHUN ACTION HANDLERLAR
// ==========================================
bot.action(/unmute_(.+)/, async (ctx) => {
    const targetId = Number(ctx.match[1]);
    const clickerId = ctx.from.id;

    try {
        const isClickerAdmin = await checkIsAdmin(ctx, clickerId);

        if (!isClickerAdmin) {
            return ctx.answerCbQuery("❌ Bu tugmadan faqat adminlar foydalana oladi!", { show_alert: true });
        }

        await ctx.restrictChatMember(targetId, {
            permissions: UNMUTE_PERMISSIONS
        });

        await ctx.answerCbQuery("✅ Foydalanuvchi muvaffaqiyatli unmute qilindi!");
        await ctx.editMessageText(`✅ Ushbu foydalanuvchi admin tomonidan unmute qilindi va barcha yozish huquqlari tiklandi.`);
    } catch (error) {
        console.error("Unmute actionda xatolik:", error);
        await ctx.answerCbQuery("Xatolik yuz berdi. Bot huquqlarini tekshiring.", { show_alert: true });
    }
});

// ==========================================
// 4. SPAM SO'ZLAR BAZASI VA AQLLI FILTR
// ==========================================
const spamWords = [
    "odam qosh", "odam qush", "Spamdan chiqarishni", "ODAM QOSHISHNI OʻRGATAMAN", "PREMIUM BOR", "Ayol qizlarga yangilik", "Guruh rivojlantirish bilan shug‘ullanaman", "ishlab daromad qilaman", "OVOZ OLAMAN", "FABERLIC",
    "aktiv ayol", "aktiv odam", "ИШСИЗ АЙОЛ КИЗЛАРИМИЗЗИ УЗ КАМПАНЯМГА ТАКЛИФ КИЛАМАН", "Аёл-қизлар учун қулай иш", "Тадбиркорликни ўргатаман", "BARCHA TURDAGI MEBELARGA ZAKAZ OLAMIZ", "Open bujetga cheksiz miqdorda ovoz olamiz",
    "terib qosh", "terib qush", "Onlayn daromad", "ONLAYN ISH ga taklif qilaman", "Diqqat adminlar uchun e'lon", "Bosh tulov", "+998903045417", "spamdan chiqarib beraman", "ADMINDAN UZUR SO'RAYMIZ", "Lichkaga yozing", "Ovoz olaman",
    "halol va qonuniy", "qonuniy halol", "Ишчи керак", "Qiziqqanlar lichga", "Odam qushib beramiz narxlari aaksiyada hozirda kimga kerak bulsa lechkamga yozsin gaplashamizzz", "Faberlica azo boling", "Ovoz  olaman",
    "ish vaqti erkin", "tajriba talab", "lichkamga yozinglar", "+998944449949", "Diqqat adminlar uchun faqat", "arzon narxda guruhga", "telefonga tushunadigan opa singillarimiz yozin", "Open budjet", "Есть занятия для ленивых",
    "haftalik daromad", "oylik daromad", "guruhlardan olib beraman", "Евро ремонт", "Сантехника", "+998916820903", "Xavsiz va ishonchli", "Murojaatlar lichkada", "Maxsudova Zilola", "cheksiz ovoz olaman", "Водий буйлаб чегирма",
    "sifatli aktiv", "nakrutka", "платим 2 раза неделю", "kimga shunaqa xizmatim", "guruxga ayollarni terib qushib beraman", "Ishchi kerak.", "Batafsil ma'lumot va ro‘yxatdan o‘tish uchun", "автомобильной фотосъёмки",
    "obunachi kopaytirish", "reaksiya va layk", "kimga kerek bulsa", "Diqqat diqqat", "judayam oson ishbor", "Ayol qizlarga yangilik", "faqat bu ish Ayol qizlar uchun", "Madina Makka Ziyorati", "Предоставлю услуги", "Буюртма бериш учун",
    "ovoz yigib", "onlayn ish", "online ish", "Terib qushish iimkoniyati bor", "ADMINLAR UCHUN ELON", "lechkamga yozsin gaplashamizzz", "Бир умир Дуо киламан", "odam kochrip beraman", "OVOZ OLAMIZ", "ужен водитель",
    "premium olib", "premiumlar", "ovoz yigib beraman", "I have ᴏne Queѕtioռ", "odam qoshish hizmati", "Чекланмаган обёмда", "Coucou je suis en Live", "pul topishni oʻrgataman", "веруйте в Иисуса и получите жизнь вечную",
    "savdo bn shugullanmoqchi", "daromad topish", "Иш вақти эркин", "Қизиққанлар батафсил маълумот олиш учун личкага ёзинг", "Ҳалол ва қонуний фаолият", "Xitoy Kursimga yoziling", "Open bujet", "по зонам За смену ",
    "1000 ta toza", "aralash 60 ming", "uzoq muddat kirmagan", "opa singillarimiz yozin", "bekochila bezovta qilmasin", "SKIDKA", "Pulga kontak qoshamn", "Kasmetikaga qziqegon qzla", "Айоллар кушиб бераман"
];

// Boshlang'ich normallashtirilgan spam so'zlar ro'yxati (Tezlikni oshirish uchun)
const normalizedSpamWords = spamWords.map(word => word.toLowerCase().replace(/['‘`’ʻ]/g, ''));

const spamPatterns = [
    // --- 1. Odam qo'shish va Nakrutka xizmatlari ---
    /(guruh|grupp|гурух|групп).*?(aktiv|актив|odam|одам|ayol|erkak|juvoy|kantakt|kontakt|kontak)/i,
    /(terib|teriib|териб).*?(qush|qosh|qo'?sh|куш|кош)/i,
    /(odam|одам|ayol|erkak|qizlar|qiizlar|kantakt|kontakt|kontak).*?(qoshish|qushish|q[o|u]'?shib|qoshib)/i,
    /(pulga|пулга).*?(kontak|kontakt|kantakt).*?(qosh|qush)/i,
    /(guruh|grupp).*?(rivojlantirish|ривожлантириш)/i,
    /(nakrutka|накрутка)/i,
    /(obunachi|обуначи).*?(kopaytirish|копайтириш)/i,
    /(ovoz|овоз).*?(yigib|йигиб)/i,
    /(reaksiya|реаксия|реакция).*?(layk|лайк)/i,
    /\d+\s*\+\s*\d+\s*ta\s*bonus/i,
    /arzon.*?narx.*?q[o|u]sh/i,
    /arzon.*?narx.*?guruhga/i,
    /aksiya.*?narx/i,

    // --- 2. Ish, daromad, oylik va biznes takliflari ---
    /(ishchi|ишчи).*?(kerak|керак)/i,
    /(onlayn|online|онлайн|онлайин).*?(daromad|даромад|tarmok|тармок|ish|иш)/i,
    /(ishlab|ишлаб).*?(daromad|даромад)/i,
    /(uyida|уйида).*?(o'?tirib|утириб)/i,
    /(oylik|ойлик|haftalik|хафталик|z\/p|з\/п|foyda|фойда).*?(daromad|даромад|\d+.*?(ming|минг|mln|млн|milion|милон|rub|руб))/i,
    /(bo'?sh|бош).*?(ish|иш).*?(o'?rni|орни)/i,
    /(ish|иш).*?(vaqti|вакти).*?(erkin|эркин)/i,
    /(tajriba|тажриба).*?(talab)/i,
    /(pul|пул).*?(topishni|топишни).*?(o'?rgataman|ўргатаман)/i,
    /(tadbirkorlikni|тадбиркорликни).*?(o'?rgataman|ўргатаман)/i,
    /(kampanya|кампаня|kompaniya).*?(taklif|таклиф)/i,
    /(judayam|жудаям).*?(oson|осон).*?(ish|иш)/i,
    /100%.*?qonuniy/i,
    /(halol|халол|qonuniy|қонуний).*?(faoliyat|faolyat|фаолият)/i,

    // --- 3. Ayol-qizlarga qaratilgan maxsus reklamalar ---
    /(ayol|аёл).*?(qizlar|қизлар).*?(yangilik|янгилик|ish|иш|qulay|қулай)/i,
    /(ishsiz|ишсиз).*?(ayol|аёл).*?(qiz|киз)/i,
    /(telefonga|телефонга).*?(tushunadigan|тушунадиган).*?(opa|singil)/i,
    /(bola|бола).*?(puli|пули)/i,

    // --- 4. Xizmatlar, savdo va kurslar ---
    /(savdo|савдо).*?(shug['o]llanmoqchi|шугулланмокчи)/i,
    /(xitoy|хитой).*?(kurs|курс)/i,
    /(mebel|мебел).*?(zakaz|заказ)/i,
    /(yevro|евро|evro).*?(remont|ремонт)/i,
    /(santexnika|сантехника)/i,
    /(xavfsiz|xavsiz|хавфсиз).*?(ishonchli|ишончли)/i,
    /(spamdan|спамдан).*?(chiqar|чикар)/i,

    // --- 5. Tarmoqli marketing va maxsus yozuvlar ---
    /(mutlaqo|ta'?lim).*?(tekin|bepul)/i,
    /birinchi.*?yozgan.*?kishiga/i,
    /(premium|премиум).*?(bor|бор|olib|олиб|lar)/i,
    /(bosh|бош).*?(to'lov|tulov|тўлов)/i,
    /(1000|ming).*?(toza|тоза)/i,
    /(aralash|аралаш).*?(60|ming)/i,
    /(uzoq|узоқ).*?(muddat|муддат).*?(kirmagan|кирмаган)/i,
    /(skidka|скидка)/i,
    /(cheklanmagan|чекланмаган).*?(obyom|обём|obyem)/i,
    /(bir|бир).*?(umir|умир).*?(duo|дуо)/i,
    /(maxsudova|махсудова).*?(zilola|зилола)/i,

    // --- 6. Murojaat, lichka va telefon raqamlar ---
    /(qiziqqanlar|қизиққанлар|murojaat|мурожаат).*?(lichka|личка|batafsil|батафсил)/i,
    /(lichkamga|lechkamga|личкамга).*?(yozsin|yozing|gaplashamiz)/i,
    /(batafsil|батафсил).*?(ma'?lumot|маълумот)/i,
    /(diqqat|диқqat).*?(adminlar|админлар)/i,
    /(bekorchi|bekochi|бекорчи).*?(bezovta)/i,
    /\+998\s?\d{9}/,

    // --- 7. Chet tilidagi spamlar va vizual belgilar ---
    /I have ᴏne Queѕtioռ/i,
    /Coucou je suis en Live/i,
    /[\u4e00-\u9fa5]/,
    /([^\w\s])\1{5,}/,
    /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/
];

// Ruxsat etilgan rasmiy kanallar (barchasi kichik harfda va @ belgisisiz)
const allowedChannels = [
    'ishonch',
    'ishonchsavdouzbekistan',
    'ishonch_quva',
    'ishonch_dangara',
    'ishonch_fargonasum',
    'ishonch_uchkoprik',
    'ishonch_qoqon',
    'ishonch_bagdod',
    'ishonch_yaypan',
    'ishonch_fargona',
    'ishonch_filiali'
];

// ==========================================
// 5. BARCHA QOIDALARNI AVTOMATIK TEKSHIRISH
// ==========================================
bot.on(['text', 'photo', 'video', 'document', 'audio', 'animation'], async (ctx, next) => {
    if (ctx.chat.type === 'private') return next();

    const message = ctx.message;
    const userId = ctx.from.id;
    const messageId = message.message_id;
    const userName = ctx.from.first_name;

    try {
        // --- 1-QADAM: ADMINLIKNI TEKSHIRISH ---
        const isAdmin = await checkIsAdmin(ctx, userId);
        if (isAdmin) {
            return next();
        }

        // --- A) FORWARD QILINGAN XABARLAR TEKSHIRUVI ---
        const isForwarded = !!(message.forward_date || message.forward_origin || message.forward_from_chat);

        if (isForwarded) {
            let fwUsername = '';

            if (message.forward_origin && message.forward_origin.chat && message.forward_origin.chat.username) {
                fwUsername = message.forward_origin.chat.username.toLowerCase();
            } else if (message.forward_from_chat && message.forward_from_chat.username) {
                fwUsername = message.forward_from_chat.username.toLowerCase();
            }

            if (fwUsername && allowedChannels.includes(fwUsername)) {
                return next();
            } else {
                await punishUser(
                    ctx,
                    userId,
                    userName,
                    messageId,
                    3,
                    (safeName, formattedDate) =>
                        `⚠️ <a href="tg://user?id=${userId}">${safeName}</a>, guruhga ruxsatsiz boshqa joydan xabar uzatish (Forward) taqiqlanadi!\n\n⏳ Qoida buzganligingiz uchun <b>${formattedDate}</b> gacha guruhda xabar yoza olmaysiz.`
                );
                return;
            }
        }

        // --- B) APK TEKSHIRUVI ---
        if (message.document && message.document.file_name) {
            if (message.document.file_name.toLowerCase().endsWith('.apk')) {
                await punishUser(
                    ctx,
                    userId,
                    userName,
                    messageId,
                    30,
                    (safeName, formattedDate) =>
                        `🚫 <a href="tg://user?id=${userId}">${safeName}</a> guruhga APK fayl yuborgani uchun <b>${formattedDate}</b> gacha xabar yozish huquqidan mahrum qilindi.`
                );
                return;
            }
        }

        const textToCheck = message.text || message.caption || '';

        // --- C) SPAM SO'ZLAR VA AQLLI FILTR TEKSHIRUVI ---
        if (textToCheck) {
            const normalizedText = textToCheck.toLowerCase().replace(/['‘`’ʻ]/g, '');

            const isSpamWord = normalizedSpamWords.some(word => normalizedText.includes(word));
            const isSpamPattern = spamPatterns.some(pattern => pattern.test(normalizedText));

            if (isSpamWord || isSpamPattern) {
                await punishUser(
                    ctx,
                    userId,
                    userName,
                    messageId,
                    3,
                    (safeName, formattedDate) =>
                        `⚠️ <a href="tg://user?id=${userId}">${safeName}</a>, guruhda spam va reklama tarqatish qat'iyan man etiladi!\n\n⏳ Qoida buzganligingiz uchun <b>${formattedDate}</b> gacha guruhda xabar yoza olmaysiz.`
                );
                return;
            }
        }

        // --- D) LINK VA USERNAME (@) TEKSHIRUVI ---
        const entities = message.entities || message.caption_entities;
        let hasLinkOrMention = false;

        if (entities) {
            hasLinkOrMention = entities.some(entity =>
                entity.type === 'url' ||
                entity.type === 'text_link' ||
                entity.type === 'mention' ||
                entity.type === 'text_mention'
            );
        }

        if (hasLinkOrMention) {
            await punishUser(
                ctx,
                userId,
                userName,
                messageId,
                3,
                (safeName, formattedDate) =>
                    `⚠️ <a href="tg://user?id=${userId}">${safeName}</a>, guruhda havola (link) yoki reklama (@username) tarqatish mumkin emas!\n\n⏳ Qoida buzganligingiz uchun <b>${formattedDate}</b> gacha guruhda xabar yoza olmaysiz.`
            );
            return;
        }

    } catch (error) {
        console.error("Xabarni tekshirishda xatolik:", error);
    }

    return next();
});

// Botni ishga tushirish
bot.launch().then(() => {
    console.log("✅ Bot muvaffaqiyatli ishga tushdi (To'liq Himoya tizimi bilan).");
}).catch((err) => {
    console.error("❌ Botni ishga tushirishda xatolik:", err);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// ==========================================
// 6. RENDER UCHUN EXPRESS WEB-SERVER
// ==========================================
const app = express();

app.get('/', (req, res) => {
    res.send('Bot faol va ishlamoqda...');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌐 Web server ${PORT}-portda ishga tushdi.`);
});