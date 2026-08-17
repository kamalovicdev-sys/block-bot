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
                    Markup.button.callback('⚙️ Permissions', `perms_${targetId}`)
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
// 4. SPAM SO'ZLAR BAZASI
// ==========================================
const spamWords = [
    "odam qosh", "odam qush",
    "aktiv ayol", "aktiv erkak",
    "terib qosh", "terib qush",
    "halol va qonuniy", "qonuniy halol",
    "ish vaqti erkin", "tajriba talab",
    "haftalik daromad", "oylik daromad",
    "bola puli", "nakrutka",
    "obunachi kopaytirish", "reaksiya va layk",
    "ovoz yigib", "onlayn ish", "online ish",
    "premium olib", "premiumlar",
    "savdo bn shugullanmoqchi", "daromad topish",
    "1000 ta toza", "aralash 60 ming", "uzoq muddat kirmagan"
];

// ==========================================
// 5. APK, SPAM VA LINKLARNI AVTOMATIK TEKSHIRISH
// ==========================================
bot.on(['text', 'photo', 'video', 'document', 'audio', 'animation'], async (ctx, next) => {
    if (ctx.chat.type === 'private') return next();

    const message = ctx.message;
    const userId = ctx.from.id;
    const messageId = message.message_id;
    const userName = ctx.from.first_name;

    try {
        const chatMember = await ctx.getChatMember(userId);
        const isAdmin = chatMember.status === 'administrator' || chatMember.status === 'creator';

        // --- A) APK TEKSHIRUVI ---
        if (message.document && message.document.file_name) {
            if (message.document.file_name.toLowerCase().endsWith('.apk')) {
                await ctx.deleteMessage(messageId).catch(() => {});

                if (!isAdmin) {
                    const durationMs = 30 * 24 * 60 * 60 * 1000;
                    const unbanDate = new Date(Date.now() + durationMs);
                    const formattedDate = unbanDate.toLocaleString('uz-UZ', { day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tashkent' });
                    const untilDate30 = Math.floor(unbanDate.getTime() / 1000);

                    await ctx.restrictChatMember(userId, { permissions: { can_send_messages: false }, until_date: untilDate30 });
                    await ctx.reply(`🚫 <a href="tg://user?id=${userId}">${userName}</a> guruhga APK fayl yuborgani uchun <b>${formattedDate}</b> gacha xabar yozish huquqidan mahrum qilindi.`, { parse_mode: 'HTML' });
                } else {
                    const msg = await ctx.reply(`⚠️ <a href="tg://user?id=${userId}">${userName}</a> (Admin), xavfsizlik sababli guruhga APK fayl yuborish barchaga taqiqlangan. Xabar o'chirildi!`, { parse_mode: 'HTML' });
                    setTimeout(() => ctx.deleteMessage(msg.message_id).catch(() => {}), 5000);
                }
                return;
            }
        }

        // Xabar matnini aniqlash (oddiy text yoki rasm/video ostidagi yozuv)
        const textToCheck = message.text || message.caption || '';

        // --- B) SPAM SO'ZLARNI TEKSHIRISH ---
        if (textToCheck) {
            // Matnni kichik harfga o'tkazish va tutuq belgilarini olib tashlash
            const normalizedText = textToCheck.toLowerCase().replace(/['‘`’ʻ]/g, '');

            // Xabarda spam so'zlardan biri qatnashganligini tekshirish
            const isSpam = spamWords.some(word => normalizedText.includes(word));

            if (isSpam) {
                await ctx.deleteMessage(messageId).catch(() => {});

                if (!isAdmin) {
                    const durationMs = 3 * 24 * 60 * 60 * 1000; // 3 kun
                    const unbanDate = new Date(Date.now() + durationMs);
                    const formattedDate = unbanDate.toLocaleString('uz-UZ', { day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tashkent' });
                    const untilDate3 = Math.floor(unbanDate.getTime() / 1000);

                    await ctx.restrictChatMember(userId, {
                        permissions: { can_send_messages: false, can_send_media_messages: false, can_send_other_messages: false, can_add_web_page_previews: false },
                        until_date: untilDate3
                    });

                    await ctx.reply(`⚠️ <a href="tg://user?id=${userId}">${userName}</a>, guruhda spam va reklama tarqatish qat'iyan man etiladi!\n\n⏳ Qoida buzganligingiz uchun <b>${formattedDate}</b> gacha guruhda xabar yoza olmaysiz.`, { parse_mode: 'HTML' });
                } else {
                    const msg = await ctx.reply(`⚠️ <a href="tg://user?id=${userId}">${userName}</a> (Admin), reklama va spam xabarlari avtomatik o'chirildi!`, { parse_mode: 'HTML' });
                    setTimeout(() => ctx.deleteMessage(msg.message_id).catch(() => {}), 5000);
                }
                return;
            }
        }

        // --- C) LINK VA INSERT LINK TEKSHIRUVI ---
        const entities = message.entities || message.caption_entities;
        let hasLink = false;

        if (entities) {
            hasLink = entities.some(entity => entity.type === 'url' || entity.type === 'text_link');
        }

        if (hasLink) {
            if (!isAdmin) {
                await ctx.deleteMessage(messageId).catch(() => {});

                const durationMs = 3 * 24 * 60 * 60 * 1000;
                const unbanDate = new Date(Date.now() + durationMs);
                const formattedDate = unbanDate.toLocaleString('uz-UZ', { day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tashkent' });
                const untilDate3 = Math.floor(unbanDate.getTime() / 1000);

                await ctx.restrictChatMember(userId, {
                    permissions: { can_send_messages: false, can_send_media_messages: false, can_send_other_messages: false, can_add_web_page_previews: false },
                    until_date: untilDate3
                });

                await ctx.reply(`⚠️ <a href="tg://user?id=${userId}">${userName}</a>, guruhda havola (link) tarqatish mumkin emas!\n\n⏳ Qoida buzganligingiz uchun <b>${formattedDate}</b> gacha guruhda xabar yoza olmaysiz.`, { parse_mode: 'HTML' });
                return;
            }
        }

    } catch (error) {
        console.error("Xabarni tekshirishda xatolik:", error);
    }

    return next();
});

// Botni ishga tushirish
bot.launch().then(() => {
    console.log("✅ Bot muvaffaqiyatli ishga tushdi (Anti-Spam va Express bilan).");
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