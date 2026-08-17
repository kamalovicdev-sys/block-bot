const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf('7761366713:AAED3Rj0zRmCrdem7fYQWuynoC4OEX2fIOQ');

// Yangi a'zolar qo'shilganda ishlaydigan hodisa
bot.on('new_chat_members', async (ctx) => {
    const newMembers = ctx.message.new_chat_members;

    for (const member of newMembers) {
        // Botlarga e'tibor bermaslik
        if (member.is_bot) continue;

        try {
            // 1. Foydalanuvchini yozish huquqini cheklash (Faqat o'qish rejimi)
            await ctx.restrictChatMember(member.id, {
                permissions: {
                    can_send_messages: false,
                    can_send_media_messages: false,
                    can_send_polls: false,
                    can_send_other_messages: false,
                    can_add_web_page_previews: false
                }
            });

            // 2. Matematik misol yaratish (masalan: 1 dan 10 gacha sonlar)
            const num1 = Math.floor(Math.random() * 10) + 1;
            const num2 = Math.floor(Math.random() * 10) + 1;
            const correctAnswer = num1 + num2;

            // 3. Variantlarni yaratish va aralashtirish
            let options = [correctAnswer, correctAnswer + 1, correctAnswer - 2, correctAnswer + 3];
            options = options.sort(() => Math.random() - 0.5);

            // 4. Tugmalarni shakllantirish (callback_data format: action_userId)
            const buttons = options.map(opt => {
                const action = opt === correctAnswer ? `pass_${member.id}` : `fail_${member.id}`;
                return Markup.button.callback(opt.toString(), action);
            });

            // 5. Guruhga xabar yuborish
            await ctx.reply(
                `👋 Salom, <a href="tg://user?id=${member.id}">${member.first_name}</a>!\n\nGuruhga yozish uchun siz odam ekanligingizni tasdiqlang. Misolni yeching:\n<b>${num1} + ${num2} = ?</b>`,
                {
                    parse_mode: 'HTML',
                    ...Markup.inlineKeyboard(buttons)
                }
            );

        } catch (error) {
            console.error("CAPTCHA xatoligi:", error);
        }
    }
});

// To'g'ri javob bosilganda
bot.action(/pass_(\d+)/, async (ctx) => {
    const userId = parseInt(ctx.match[1]);

    // Boshqa odam tugmani bossa ruxsat bermaslik
    if (ctx.from.id !== userId) {
        return ctx.answerCbQuery("Bu test siz uchun emas! 🚫", { show_alert: true });
    }

    try {
        // Foydalanuvchi huquqlarini tiklash
        await ctx.restrictChatMember(userId, {
            permissions: {
                can_send_messages: true,
                can_send_media_messages: true,
                can_send_polls: true,
                can_send_other_messages: true,
                can_add_web_page_previews: true
            }
        });

        await ctx.answerCbQuery("Testdan muvaffaqiyatli o'tdingiz! ✅");
        // Test xabarini o'chirib tashlash
        await ctx.deleteMessage();
    } catch (error) {
        console.error("Cheklovni yechishda xatolik:", error);
    }
});

// Noto'g'ri javob bosilganda
bot.action(/fail_(\d+)/, async (ctx) => {
    const userId = parseInt(ctx.match[1]);

    if (ctx.from.id !== userId) {
        return ctx.answerCbQuery("Bu test siz uchun emas! 🚫", { show_alert: true });
    }

    await ctx.answerCbQuery("Noto'g'ri javob! Qaytadan urinib ko'ring. ❌", { show_alert: true });
});

bot.launch();