const { Telegraf, Markup } = require('telegraf');

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
        // Buyruqni bergan shaxs admin ekanligini tekshirish
        const senderMember = await ctx.getChatMember(senderId);
        const isSenderAdmin = senderMember.status === 'administrator' || senderMember.status === 'creator';

        if (!isSenderAdmin) {
            const msg = await ctx.reply("❌ Bu buyruqdan faqat adminlar foydalana oladi.");
            // 5 soniyadan keyin ogohlantirishni o'chirish
            setTimeout(() => ctx.deleteMessage(msg.message_id).catch(() => {}), 5000);
            return;
        }

        // Xabarga reply qilinganligini tekshirish
        if (!ctx.message.reply_to_message) {
            const msg = await ctx.reply("⚠️ Iltimos, xaqoratli xabarga reply qilib /mute deb yozing.");
            setTimeout(() => ctx.deleteMessage(msg.message_id).catch(() => {}), 5000);
            return;
        }

        const targetMessage = ctx.message.reply_to_message;
        const targetId = targetMessage.from.id;
        const targetName = targetMessage.from.first_name;

        // O'z-o'zini yoki botni mute qilmasligi uchun
        if (targetId === ctx.botInfo.id) return ctx.reply("🤖 Botni mute qilib bo'lmaydi.");

        // Mute qilinayotgan shaxs admin emasligini tekshirish (Bot adminni cheklay olmaydi)
        const targetMember = await ctx.getChatMember(targetId);
        const isTargetAdmin = targetMember.status === 'administrator' || targetMember.status === 'creator';

        if (isTargetAdmin) {
            return ctx.reply("⚠️ Kechirasiz, Telegram qoidalariga ko'ra bot adminlarni mute qila olmaydi.");
        }

        // 1. Xaqoratli xabarni o'chirish
        await ctx.deleteMessage(targetMessage.message_id).catch(() => {});
        // 2. /mute buyrug'ini o'zini o'chirish
        await ctx.deleteMessage(ctx.message.message_id).catch(() => {});

        // 3. Foydalanuvchini mute qilish (cheksiz vaqtga)
        await ctx.restrictChatMember(targetId, {
            permissions: { can_send_messages: false }
        });

        // 4. Xabar va tugmalarni chiqarish
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
        // Tugmani bosgan odam admin ekanligini tekshiramiz
        const clickerMember = await ctx.getChatMember(clickerId);
        const isClickerAdmin = clickerMember.status === 'administrator' || clickerMember.status === 'creator';

        if (!isClickerAdmin) {
            // Oddiy foydalanuvchiga qizil alert ko'rsatadi
            return ctx.answerCbQuery("❌ Bu tugmadan faqat adminlar foydalana oladi!", { show_alert: true });
        }

        // Foydalanuvchi huquqlarini tiklash (Unmute)
        await ctx.restrictChatMember(targetId, {
            permissions: {
                can_send_messages: true,
                can_send_media_messages: true,
                can_send_other_messages: true,
                can_add_web_page_previews: true
            }
        });

        await ctx.answerCbQuery("✅ Foydalanuvchi muvaffaqiyatli unmute qilindi!");

        // Xabarni o'zgartirib qo'yish
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

        // Permission tugmasi bosilganda to'liq huquqlarni beramiz
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
// 4. APK VA LINKLARNI AVTOMATIK TEKSHIRISH
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

        // --- APK TEKSHIRUVI ---
        if (message.document && message.document.file_name) {
            if (message.document.file_name.toLowerCase().endsWith('.apk')) {

                // KIM YUBORISHIDAN QAT'I NAZAR FAYLNI O'CHIRAMIZ
                await ctx.deleteMessage(messageId).catch(() => {});

                if (!isAdmin) {
                    // Agar yuborgan odam ODDIY FOYDALANUVCHI bo'lsa -> 30 kunga mute qilamiz
                    const untilDate30 = Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60);

                    await ctx.restrictChatMember(userId, {
                        permissions: { can_send_messages: false },
                        until_date: untilDate30
                    });

                    await ctx.reply(`🚫 <a href="tg://user?id=${userId}">${userName}</a> guruhga APK fayl yuborgani uchun 30 kungacha xabar yozish huquqidan mahrum qilindi.`, {
                        parse_mode: 'HTML'
                    });
                } else {
                    // Agar yuborgan odam ADMIN bo'lsa -> faqat ogohlantiramiz (bot adminni mute qilolmaydi)
                    const msg = await ctx.reply(`⚠️ <a href="tg://user?id=${userId}">${userName}</a> (Admin), xavfsizlik sababli guruhga APK fayl yuborish barchaga taqiqlangan. Xabar o'chirildi!`, {
                        parse_mode: 'HTML'
                    });
                    // Admin yozishmalarini tozalab turish uchun ogohlantirishni 5 soniyadan keyin o'chiramiz (ixtiyoriy)
                    setTimeout(() => ctx.deleteMessage(msg.message_id).catch(() => {}), 5000);
                }
                return;
            }
        }

        // --- LINK VA INSERT LINK TEKSHIRUVI ---
        const entities = message.entities || message.caption_entities;
        let hasLink = false;

        if (entities) {
            hasLink = entities.some(entity => entity.type === 'url' || entity.type === 'text_link');
        }

        if (hasLink) {
            // Linkni faqat admin bo'lmaganlar yuborsa o'chiramiz va jazolaymiz
            if (!isAdmin) {
                await ctx.deleteMessage(messageId).catch(() => {});
                const untilDate3 = Math.floor(Date.now() / 1000) + (3 * 24 * 60 * 60);

                await ctx.restrictChatMember(userId, {
                    permissions: {
                        can_send_messages: false,
                        can_send_media_messages: false,
                        can_send_other_messages: false,
                        can_add_web_page_previews: false
                    },
                    until_date: untilDate3
                });

                await ctx.reply(`⚠️ <a href="tg://user?id=${userId}">${userName}</a>, guruhda zararli havola (link) tarqatish mumkin emas!\nQoida buzganligingiz uchun 3 kun guruhda xabar yoza olmaysiz. Iltimos guruhga reklama yoki zararli havolalarni tashlamang.`, {
                    parse_mode: 'HTML'
                });
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
    console.log("✅ Bot muvaffaqiyatli ishga tushdi (Mute tugmalari bilan).");
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));


const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Bot faol va ishlamoqda...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Web server ${PORT}-portda ishga tushdi.`);
});