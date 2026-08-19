const { Telegraf, Markup } = require('telegraf');
const express = require('express');

// Bot tokenini kiritamiz
const bot = new Telegraf('8129133467:AAFMEMiKOgrLshkxroQANfgsm3Fmb0EPUPo');

// ==========================================
// 1. XIZMAT XABARLARINI O'CHIRISH
// ==========================================
bot.on([
    'new_chat_members',
    'left_chat_member',
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
        await ctx.deleteMessage(ctx.message.message_id);
    } catch (error) {
        console.error("Xizmat xabarini o'chirishda xatolik:", error);
    }
});

// ==========================================
// 2. /MUTE BUYRUG'I (Faqat adminlar ishlatadi)
// ==========================================
bot.command('mute', async (ctx) => {
    if (ctx.chat.type === 'private') return;

    const senderId = ctx.from.id;

    try {
        const senderMember = await ctx.getChatMember(senderId);
        const isSenderAdmin = senderMember.status === 'administrator' || senderMember.status === 'creator';

        if (!isSenderAdmin) {
            const msg = await ctx.reply("❌ Bu buyruqdan faqat adminlar foydalana oladi.");
            setTimeout(() => ctx.deleteMessage(msg.message_id).catch(() => {}), 5000);
            return;
        }

        if (!ctx.message.reply_to_message) {
            const msg = await ctx.reply("⚠️ Iltimos, xaqoratli xabarga reply qilib /mute deb yozing.");
            setTimeout(() => ctx.deleteMessage(msg.message_id).catch(() => {}), 5000);
            return;
        }

        const targetMessage = ctx.message.reply_to_message;
        const targetId = targetMessage.from.id;
        const targetName = targetMessage.from.first_name;

        if (targetId === ctx.botInfo.id) return ctx.reply("🤖 Botni mute qilib bo'lmaydi.");

        const targetMember = await ctx.getChatMember(targetId);
        const isTargetAdmin = targetMember.status === 'administrator' || targetMember.status === 'creator';

        if (isTargetAdmin) {
            return ctx.reply("⚠️ Kechirasiz, Telegram qoidalariga ko'ra bot adminlarni mute qila olmaydi.");
        }

        // Xabarlarni o'chirish
        await ctx.deleteMessage(targetMessage.message_id).catch(() => {});
        await ctx.deleteMessage(ctx.message.message_id).catch(() => {});

        // Mute qilish
        await ctx.restrictChatMember(targetId, {
            permissions: { can_send_messages: false }
        });

        // Xabar va tugmalar
        await ctx.reply(
            `🔇 <a href="tg://user?id=${targetId}">${targetName}</a> xaqoratli xabar yuborgani uchun admin tomonidan mute qilindi.`,
            {
                parse_mode: 'HTML',
                ...Markup.inlineKeyboard([
                    Markup.button.callback('🔓 Unmute', `unmute_${targetId}`),
                    // Markup.button.callback('⚙️ Permissions', `perms_${targetId}`)
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
    const targetId = ctx.match[1];
    const clickerId = ctx.from.id;

    try {
        const clickerMember = await ctx.getChatMember(clickerId);
        const isClickerAdmin = clickerMember.status === 'administrator' || clickerMember.status === 'creator';

        if (!isClickerAdmin) {
            return ctx.answerCbQuery("❌ Bu tugmadan faqat adminlar foydalana oladi!", { show_alert: true });
        }

        await ctx.restrictChatMember(targetId, {
            permissions: {
                can_send_messages: true,
                can_send_media_messages: true,
                can_send_other_messages: true,
                can_add_web_page_previews: true
            }
        });

        await ctx.answerCbQuery("✅ Foydalanuvchi muvaffaqiyatli unmute qilindi!");
        await ctx.editMessageText(`✅ Ushbu foydalanuvchi admin tomonidan unmute qilindi va yozish huquqi tiklandi.`);
    } catch (error) {
        console.error("Unmute actionda xatolik:", error);
        await ctx.answerCbQuery("Xatolik yuz berdi. Bot huquqlarini tekshiring.", { show_alert: true });
    }
});

bot.action(/perms_(.+)/, async (ctx) => {
    const targetId = ctx.match[1];
    const clickerId = ctx.from.id;

    try {
        const clickerMember = await ctx.getChatMember(clickerId);
        const isClickerAdmin = clickerMember.status === 'administrator' || clickerMember.status === 'creator';

        if (!isClickerAdmin) {
            return ctx.answerCbQuery("❌ Bu tugmadan faqat adminlar foydalana oladi!", { show_alert: true });
        }

        await ctx.restrictChatMember(targetId, {
            permissions: {
                can_send_messages: true,
                can_send_media_messages: true,
                can_send_polls: true,
                can_send_other_messages: true,
                can_add_web_page_previews: true,
                can_change_info: false,
                can_invite_users: true,
                can_pin_messages: false
            }
        });

        await ctx.answerCbQuery("✅ Barcha yozish huquqlari (Permissions) tiklandi!", { show_alert: true });
        await ctx.editMessageText(`✅ Ushbu foydalanuvchining barcha yozish ruxsatlari admin tomonidan to'liq tiklandi.`);
    } catch (error) {
        console.error("Permissions actionda xatolik:", error);
        await ctx.answerCbQuery("Xatolik yuz berdi.", { show_alert: true });
    }
});

// ==========================================
// 4. SPAM SO'ZLAR BAZASI VA AQLLI FILTR
// ==========================================

const spamWords = [
    "odam qosh", "odam qush", "Spamdan chiqarishni", "ODAM QOSHISHNI OʻRGATAMAN", "PREMIUM BOR", "Ayol qizlarga yangilik", "Guruh rivojlantirish bilan shug‘ullanaman", "ishlab daromad qilaman",
    "aktiv ayol", "aktiv odam", "ИШСИЗ АЙОЛ КИЗЛАРИМИЗЗИ УЗ КАМПАНЯМГА ТАКЛИФ КИЛАМАН", "Аёл-қизлар учун қулай иш", "Тадбиркорликни ўргатаман", "BARCHA TURDAGI MEBELARGA ZAKAZ OLAMIZ",
    "terib qosh", "terib qush", "Onlayn daromad", "ONLAYN ISH ga taklif qilaman", "Diqqat adminlar uchun e'lon", "Bosh tulov", "+998903045417", "spamdan chiqarib beraman",
    "halol va qonuniy", "qonuniy halol", "Ишчи керак", "Qiziqqanlar lichga", "Odam qushib beramiz narxlari aaksiyada hozirda kimga kerak bulsa lechkamga yozsin gaplashamizzz",
    "ish vaqti erkin", "tajriba talab", "lichkamga yozinglar", "+998944449949", "Diqqat adminlar uchun faqat", "arzon narxda guruhga", "telefonga tushunadigan opa singillarimiz yozin",
    "haftalik daromad", "oylik daromad", "guruhlardan olib beraman", "Евро ремонт", "Сантехника", "+998916820903", "Xavsiz va ishonchli", "Murojaatlar lichkada", "Maxsudova Zilola",
    "sifatli aktiv", "nakrutka", "платим 2 раза неделю", "kimga shunaqa xizmatim", "guruxga ayollarni terib qushib beraman", "Ishchi kerak.", "Batafsil ma'lumot va ro‘yxatdan o‘tish uchun",
    "obunachi kopaytirish", "reaksiya va layk", "kimga kerek bulsa", "Diqqat diqqat", "judayam oson ishbor", "Ayol qizlarga yangilik", "faqat bu ish Ayol qizlar uchun",
    "ovoz yigib", "onlayn ish", "online ish", "Terib qushish iimkoniyati bor", "ADMINLAR UCHUN ELON", "lechkamga yozsin gaplashamizzz", "Бир умир Дуо киламан", "odam kochrip beraman",
    "premium olib", "premiumlar", "ovoz yigib beraman", "I have ᴏne Queѕtioռ", "odam qoshish hizmati", "Чекланмаган обёмда", "Coucou je suis en Live", "pul topishni oʻrgataman",
    "savdo bn shugullanmoqchi", "daromad topish", "Иш вақти эркин", "Қизиққанлар батафсил маълумот олиш учун личкага ёзинг", "Ҳалол ва қонуний фаолият", "Xitoy Kursimga yoziling",
    "1000 ta toza", "aralash 60 ming", "uzoq muddat kirmagan", "opa singillarimiz yozin", "bekochila bezovta qilmasin", "SKIDKA", "Pulga kontak qoshamn"
];

// Smart Regex Pattern
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
    /(diqqat|диққат).*?(adminlar|админлар)/i,
    /(bekorchi|bekochi|бекорчи).*?(bezovta)/i,
    /\+998\s?\d{9}/, // +998 bilan yozilgan har qanday O'zbekiston raqamini ushlaydi

    // --- 7. Chet tilidagi spamlar va vizual belgilar ---
    /I have ᴏne Queѕtioռ/i,
    /Coucou je suis en Live/i,
    /[\u4e00-\u9fa5]/, // Xitoycha harflar
    /([^\w\s])\1{5,}/, // Bitta maxsus belgini 5 marta takrorlab spam qiladiganlarni ushlash
    /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/ // Arab va Fors alifbosini to'liq bloklash
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
        let isAdmin = false;

        // Agar foydalanuvchi "Group Anonymous Bot" (1087968824) bo'lsa, u admindir.
        if (userId === 1087968824) {
            isAdmin = true;
        } else {
            const chatMember = await ctx.getChatMember(userId);
            isAdmin = chatMember.status === 'administrator' || chatMember.status === 'creator';
        }

        // AGAR FOYDALANUVCHI ADMIN BO'LSA, TEKSHIRUVLARNI SHU YERDA TO'XTATAMIZ!
        // U xohlagan narsasini (forward, link, apk) yozishi mumkin.
        if (isAdmin) {
            return next();
        }

        // --- A) FORWARD QILINGAN XABARLAR TEKSHIRUVI ---
        const isForwarded = message.forward_date || message.forward_origin;
        if (isForwarded) {
            await ctx.deleteMessage(messageId).catch(() => {});

            const durationMs = 3 * 24 * 60 * 60 * 1000;
            const unbanDate = new Date(Date.now() + durationMs);
            const formattedDate = unbanDate.toLocaleString('uz-UZ', { day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tashkent' });
            const untilDate3 = Math.floor(unbanDate.getTime() / 1000);

            await ctx.restrictChatMember(userId, {
                permissions: { can_send_messages: false, can_send_media_messages: false, can_send_other_messages: false, can_add_web_page_previews: false },
                until_date: untilDate3
            });

            await ctx.reply(`⚠️ <a href="tg://user?id=${userId}">${userName}</a>, guruhga boshqa joydan xabar uzatish (Forward) taqiqlanadi!\n\n⏳ Qoida buzganligingiz uchun <b>${formattedDate}</b> gacha guruhda xabar yoza olmaysiz.`, { parse_mode: 'HTML' });
            return;
        }

        // --- B) APK TEKSHIRUVI ---
        if (message.document && message.document.file_name) {
            if (message.document.file_name.toLowerCase().endsWith('.apk')) {
                await ctx.deleteMessage(messageId).catch(() => {});

                const durationMs = 30 * 24 * 60 * 60 * 1000;
                const unbanDate = new Date(Date.now() + durationMs);
                const formattedDate = unbanDate.toLocaleString('uz-UZ', { day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tashkent' });
                const untilDate30 = Math.floor(unbanDate.getTime() / 1000);

                await ctx.restrictChatMember(userId, { permissions: { can_send_messages: false }, until_date: untilDate30 });
                await ctx.reply(`🚫 <a href="tg://user?id=${userId}">${userName}</a> guruhga APK fayl yuborgani uchun <b>${formattedDate}</b> gacha xabar yozish huquqidan mahrum qilindi.`, { parse_mode: 'HTML' });
                return;
            }
        }

        // Xabar matnini aniqlash
        const textToCheck = message.text || message.caption || '';

        // --- C) SPAM SO'ZLAR VA AQLLI FILTR TEKSHIRUVI ---
        if (textToCheck) {
            const normalizedText = textToCheck.toLowerCase().replace(/['‘`’ʻ]/g, '');

            const isSpamWord = spamWords.some(word =>
                normalizedText.includes(word.toLowerCase().replace(/['‘`’ʻ]/g, ''))
            );

            const isSpamPattern = spamPatterns.some(pattern => pattern.test(normalizedText));

            if (isSpamWord || isSpamPattern) {
                await ctx.deleteMessage(messageId).catch(() => {});

                const durationMs = 3 * 24 * 60 * 60 * 1000;
                const unbanDate = new Date(Date.now() + durationMs);
                const formattedDate = unbanDate.toLocaleString('uz-UZ', { day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tashkent' });
                const untilDate3 = Math.floor(unbanDate.getTime() / 1000);

                await ctx.restrictChatMember(userId, {
                    permissions: { can_send_messages: false, can_send_media_messages: false, can_send_other_messages: false, can_add_web_page_previews: false },
                    until_date: untilDate3
                });

                await ctx.reply(`⚠️ <a href="tg://user?id=${userId}">${userName}</a>, guruhda spam va reklama tarqatish qat'iyan man etiladi!\n\n⏳ Qoida buzganligingiz uchun <b>${formattedDate}</b> gacha guruhda xabar yoza olmaysiz.`, { parse_mode: 'HTML' });
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
            await ctx.deleteMessage(messageId).catch(() => {});

            const durationMs = 3 * 24 * 60 * 60 * 1000;
            const unbanDate = new Date(Date.now() + durationMs);
            const formattedDate = unbanDate.toLocaleString('uz-UZ', { day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tashkent' });
            const untilDate3 = Math.floor(unbanDate.getTime() / 1000);

            await ctx.restrictChatMember(userId, {
                permissions: { can_send_messages: false, can_send_media_messages: false, can_send_other_messages: false, can_add_web_page_previews: false },
                until_date: untilDate3
            });

            await ctx.reply(`⚠️ <a href="tg://user?id=${userId}">${userName}</a>, guruhda havola (link) yoki reklama (@username) tarqatish mumkin emas!\n\n⏳ Qoida buzganligingiz uchun <b>${formattedDate}</b> gacha guruhda xabar yoza olmaysiz.`, { parse_mode: 'HTML' });
            return;
        }

    } catch (error) {
        console.error("Xabarni tekshirishda xatolik:", error);
    }

    return next();
});

// Botni ishga tushirish
bot.launch().then(() => {
    console.log("✅ Bot muvaffaqiyatli ishga tushdi (Anti-Spam, Arab Regex va Express bilan).");
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