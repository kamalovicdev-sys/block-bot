import asyncio
import qrcode
import getpass
from telethon import TelegramClient
from telethon.tl.functions.contacts import SearchRequest
from telethon.tl.functions.channels import GetFullChannelRequest
from telethon.tl.types import ChannelParticipantsKicked
from telethon.errors import SessionPasswordNeededError, ChatAdminRequiredError

api_id = 30089874
api_hash = 'a12cb9480d7270406968908db6621f12'
group_username = 'Ishonch_filial'

async def main():
    client = TelegramClient('user_session', api_id, api_hash)
    await client.connect()

    if not await client.is_user_authorized():
        print("📲 QR-kod yaratilmoqda...\n")
        qr_login = await client.qr_login()

        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=5,
            border=4,
        )
        qr.add_data(qr_login.url)
        qr.make(fit=True)

        img = qr.make_image(fill_color="black", back_color="white")
        img.save("login_qr.png")

        print("\n--> DIQQAT: PyCharm'ning chap tomondagi fayllar ro'yxatida 'login_qr.png' rasm fayli paydo bo'ldi.")
        print("--> O'sha rasm ustiga ikki marta bosib oching va telefondan skanerlang...\n")

        try:
            await qr_login.wait()
        except SessionPasswordNeededError:
            print("\n🔒 Akkauntingizda 2 bosqichli parol (Cloud password) yoqilgan.")
            password = getpass.getpass("Parolni kiriting: ")
            await client.sign_in(password=password)

    print("\n✅ Tizimga muvaffaqiyatli kirildi!\n")

    try:
        print(f"[{group_username}] tekshirilmoqda...\n")

        entity = await client.get_entity(group_username)

        full_chat = await client(GetFullChannelRequest(channel=entity))
        participants_count = full_chat.full_chat.participants_count
        print(f"👥 Umumiy a'zolar soni: {participants_count} ta")

        try:
            banned_users = await client.get_participants(entity, filter=ChannelParticipantsKicked)
            print(f"🚫 Bloklanganlar soni: {banned_users.total} ta")
        except ChatAdminRequiredError:
            print("🚫 Bloklanganlar soni: Buni ko'rish admin account orqali kirish kerak.")

        print("Telegram API orqali guruhning spam bo'lgani haqida ma'lumot topilmadi.\n")
        print("-" * 40)

        flags_found = False
        if getattr(entity, 'scam', False) or getattr(entity, 'fake', False) or getattr(entity, 'restricted', False):
            print("⚠️ STATUS: Guruhda rasmiy cheklovlar mavjud (Scam/Fake/Restricted)!")
            flags_found = True

        if not flags_found:
            print("✅ STATUS: Guruhda ochiq scam/fake cheklovlari yo'q.")

        search_result = await client(SearchRequest(q=group_username, limit=10))

        is_in_search = any(
            hasattr(chat, 'username') and chat.username and chat.username.lower() == group_username.lower()
            for chat in search_result.chats
        )

        if is_in_search:
            print("✅ SHADOWBAN: Guruh global qidiruvda mavjud (Spam emas).")
        else:
            print("❌ SHADOWBAN: Guruh global qidiruvda topilmadi (Katta ehtimol bilan Spam / Shadowban).")

    except Exception as e:
        print(f"Xatolik: {e}")
    finally:
        await client.disconnect()

if __name__ == '__main__':
    asyncio.run(main())