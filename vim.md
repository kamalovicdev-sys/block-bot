1.1-dars: KURSORNI HARAKATLANTIRISH


   ** Kursorni harakatlantirish uchun ko'rsatilganidek h, j, k, l tugmalarini bosing. **
             ^
             k             Maslahat:  h tugmasi chapda joylashgan va chapga yuradi.
       < h       l >                  l tugmasi o'ngda joylashgan va o'ngga yuradi.
             j                        j tugmasi pastga ko'rsatkichga o'xshaydi.
             v
  1. Ekran bo'ylab kursorni bemalol harakatlantira olguningizcha mashq qiling.

  2. Pastga tushish tugmasini (j) u takrorlanguncha bosib turing.
     Endi keyingi darsga qanday o'tishni bilasiz.

  3. Pastga tushish tugmasidan foydalanib, 1.2-darsga o'ting.

ESLATMA: Agar yozgan buyrug'ingizga ishonchingiz komil bo'lmasa, Normal rejimga
      qaytish uchun <ESC> tugmasini bosing. Keyin kerakli buyruqni qayta kiriting.

ESLATMA: Kursor (strelka) tugmalari ham ishlashi kerak. Lekin hjkl dan foydalansangiz,
      o'rganib olganingizdan so'ng ancha tezroq harakatlanasiz. Rostdan ham!

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                             1.2-dars: VIM'DAN CHIQISH


  !! ESLATMA: Quyidagi qadamlarni bajarishdan oldin ushbu darsni to'liq o'qib chiqing !!

  1. <ESC> tugmasini bosing (Normal rejimda ekanligingizga ishonch hosil qilish uchun).

  2. Yozing:      :q! <ENTER>.
     Bu siz qilgan har qanday o'zgarishlarni BEKOR QILIB (saqlamasdan), muharrirdan chiqadi.

  3. Ushbu qo'llanmaga kirish uchun ishlatgan buyrug'ingizni bajarib bu yerga qayting.
     Bu ehtimol shunday bo'lgan:  vimtutor <ENTER>

  4. Agar bu qadamlarni yodlab olgan bo'lsangiz va o'zingizga ishonsangiz,
     muharrirdan chiqish va qayta kirish uchun 1 dan 3 gacha qadamlarni bajaring.

ESLATMA:  :q! <ENTER>  siz qilgan barcha o'zgarishlarni bekor qiladi. Bir nechta
       darsdan so'ng o'zgarishlarni faylga qanday saqlashni o'rganasiz.

  5. Kursorni pastga, 1.3-darsga tushiring.


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
               1.3-dars: MATNNI TAHRIRLASH - O'CHIRISH (DELETION)


            ** Kursor ostidagi belgini o'chirish uchun  x  ni bosing. **

  1. Kursorni pastdagi ---> bilan belgilangan qatorga olib boring.

  2. Xatolarni to'g'rilash uchun kursorni o'chirilishi kerak bo'lgan belgi ustiga
     olib boring.

  3. Keraksiz belgini o'chirish uchun  x  tugmasini bosing.

  4. Gap to'g'ri bo'lguncha 2 dan 4 gacha bo'lgan qadamlarni takrorlang.

---> The ccow jumpedd ovverr thhe mooon.

  5. Endi qator to'g'rilangandan so'ng, 1.4-darsga o'ting.

ESLATMA: Ushbu qo'llanmani o'qish jarayonida yodlashga urinmang, amaliyot orqali o'rganing.



~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                      1.4-dars: MATNNI TAHRIRLASH - QO'SHISH (INSERTION)


                         ** Matn kiritish uchun  i  ni bosing. **

  1. Kursorni pastdagi ---> bilan belgilangan birinchi qatorga olib boring.

  2. Birinchi qatorni ikkinchisiga o'xshash qilish uchun, kursorni matn kiritilishi
     kerak bo'lgan joydan KEYINGI birinchi belgi ustiga olib boring.

  3. i  tugmasini bosing va kerakli qo'shimchalarni kiriting.

  4. Har bir xato to'g'rilangach, Normal rejimga qaytish uchun <ESC> ni bosing.
     Gapni to'g'rilash uchun 2 dan 4 gacha bo'lgan qadamlarni takrorlang.

---> There is text misng this .
---> There is some text missing from this line.

  5. Matn kiritishga bemalol o'rganib olganingizdan so'ng 1.5-darsga o'ting.



~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                      1.5-dars: MATNNI TAHRIRLASH - OXIRIDAN QO'SHISH (APPENDING)


                         ** Matnni oxiridan qo'shish uchun  A  ni bosing. **

  1. Kursorni pastdagi ---> bilan belgilangan birinchi qatorga olib boring.
     Kursor bu qatorning qaysi belgisida turgani muhim emas.

  2. A  tugmasini bosing va kerakli qo'shimchalarni kiriting.

  3. Matn qo'shib bo'lingach, Normal rejimga qaytish uchun <ESC> ni bosing.

  4. Kursorni ---> bilan belgilangan ikkinchi qatorga olib boring va bu gapni
     to'g'rilash uchun 2 va 3-qadamlarni takrorlang.

---> There is some text missing from th
     There is some text missing from this line.
---> There is also some text miss
     There is also some text missing here.

  5. Matn qo'shishga o'rganib olganingizdan so'ng 1.6-darsga o'ting.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                      1.6-dars: FAYLNI TAHRIRLASH

                    ** Faylni saqlash va chiqish uchun  :wq  dan foydalaning. **

  !! ESLATMA: Quyidagi qadamlarni bajarishdan oldin ushbu darsni to'liq o'qib chiqing!!

  1. 1.2-darsda qilganingizdek ushbu qo'llanmadan chiqing:  :q!
     Yoki agar sizda boshqa terminalga ulanish imkoni bo'lsa, u yerda quyidagilarni bajaring.

  2. Terminal buyruqlar qatorida (shell prompt) ushbu buyruqni kiriting:  vim tutor <ENTER>
     'vim' - Vim muharririni ishga tushirish buyrug'i, 'tutor' - tahrirlashni istagan
     fayl nomi. O'zgartirish mumkin bo'lgan fayldan foydalaning.

  3. Oldingi darslarda o'rganganingizdek matn kiriting va o'chiring.

  4. O'zgarishlar bilan faylni saqlang va Vim'dan chiqing:  :wq  <ENTER>

  5. Agar 1-qadamda vimtutor'dan chiqqan bo'lsangiz, vimtutor'ni qayta ishga
     tushiring va quyidagi xulosaga tushing.

  6. Yuqoridagi qadamlarni o'qib va tushunib yetgach: ularni bajaring.
  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                1-dars XULOSASI


  1. Kursor strelka tugmalari yoki hjkl tugmalari yordamida harakatlantiriladi.
          h (chapga)       j (pastga)       k (tepaga)       l (o'ngga)

  2. Terminaldan Vim'ni ishga tushirish uchun yozing:  vim FAYL_NOMI <ENTER>

  3. Vim'dan chiqish uchun yozing:      <ESC>   :q!   <ENTER>  (o'zgarishlarni bekor qilish)
              YOKI yozing:              <ESC>   :wq   <ENTER>  (o'zgarishlarni saqlash)

  4. Kursor turgan joydagi belgini o'chirish uchun:  x

  5. Matn kiritish yoki oxiridan qo'shish uchun yozing:
          i   kiritiladigan matn   <ESC>         kursor oldidan kiritish
          A   qo'shiladigan matn   <ESC>         qator oxiridan qo'shish

ESLATMA: <ESC> tugmasini bosish sizni Normal rejimga qaytaradi yoki xohlamagan/chala
      qolgan buyruqni bekor qiladi.

Endi 2-darsni davom ettiring.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                         2.1-dars: O'CHIRISH BUYRUQLARI


                        ** So'zni o'chirish uchun  dw  yozing. **

  1. Normal rejimda ekanligingizga ishonch hosil qilish uchun  <ESC>  ni bosing.

  2. Kursorni pastdagi ---> bilan belgilangan qatorga olib boring.

  3. Kursorni o'chirilishi kerak bo'lgan so'zning boshiga olib boring.

  4. So'zni yo'q qilish uchun   dw   yozing.

  ESLATMA: d harfi yozishingiz bilan ekranning oxirgi qatorida paydo bo'ladi.
    Vim sizdan  w  ni yozishingizni kutmoqda. Agar siz d dan boshqa belgini
    ko'rsangiz, nimadir noto'g'ri yozdingiz;  <ESC>  ni bosing va boshidan boshlang.

---> There are a some words fun that don't belong paper in this sentence.

  5. Gap to'g'ri bo'lguncha 3 va 4-qadamlarni takrorlang va 2.2-darsga o'ting.


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                      2.2-dars: BOSHQA O'CHIRISH BUYRUQLARI


            ** Qator oxirigacha o'chirish uchun  d$  yozing. **

  1. Normal rejimda ekanligingizga ishonch hosil qilish uchun  <ESC>  ni bosing.

  2. Kursorni pastdagi ---> bilan belgilangan qatorga olib boring.

  3. Kursorni to'g'ri qator oxiriga (birinchi . dan KEYIN) olib boring.

  4. Qator oxirigacha o'chirish uchun    d$    yozing.

---> Somebody typed the end of this line twice. end of this line twice.


  5. Nima bo'layotganini tushunish uchun 2.3-darsga o'ting.





~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                      2.3-dars: OPERATORLAR VA HARAKATLAR (MOTIONS)


  Matnni o'zgartiradigan ko'plab buyruqlar operator va harakatdan iborat.
  d (o'chirish) operatori bilan o'chirish buyrug'ining formati quyidagicha:

        d   harakat

  Bu yerda:
    d      - o'chirish operatori.
    harakat - operator nima ustida ishlashini bildiradi (quyida ro'yxati berilgan).

  Harakatlarning qisqa ro'yxati:
    w - keyingi so'zning boshigacha, uning birinchi belgisini HISOBGA OLMAGAN holda.
    e - joriy so'zning oxirigacha, oxirgi belgini HISOBGA OLGAN holda.
    $ - qator oxirigacha, oxirgi belgini HISOBGA OLGAN holda.

  Shunday qilib,  de  deb yozsangiz, kursordan so'zning oxirigacha o'chiradi.

ESLATMA: Normal rejimda operatorlarsiz faqat harakatni o'zini bosish
       kursorni belgilanganidek harakatlantiradi.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                      2.4-dars: HARAKAT UCHUN SONDAN FOYDALANISH


   ** Harakatdan oldin raqam kiritish uni shuncha marta takrorlaydi. **

  1. Kursorni pastdagi ---> bilan belgilangan qatorning boshiga olib boring.

  2. Kursorni ikkita so'z oldinga siljitish uchun  2w  yozing.

  3. Kursorni uchinchi so'zning oxiriga siljitish uchun  3e  yozing.

  4. Qatorning boshiga qaytish uchun  0  (nol) yozing.

  5. 2 va 3-qadamlarni turli xil raqamlar bilan takrorlang.

---> This is just a line with words you can move around in.

  6. 2.5-darsga o'ting.




~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                      2.5-dars: KO'PROQ O'CHIRISH UCHUN SONDAN FOYDALANISH


   ** Operator bilan raqam kiritish uni shuncha marta takrorlaydi. **

  Yuqorida aytib o'tilgan o'chirish operatori va harakat birikmasida ko'proq
  o'chirish uchun harakatdan oldin son qo'shishingiz mumkin:
     d   son   harakat

  1. Kursorni ---> bilan belgilangan qatordagi birinchi BOSH HARFLI so'zga olib boring.

  2. Ikkita BOSH HARFLI so'zni o'chirish uchun  d2w  yozing.

  3. Bir nechta ketma-ket kelgan BOSH HARFLI so'zlarni bitta buyruq bilan o'chirish uchun
     1 va 2-qadamlarni boshqa raqam bilan takrorlang.

--->  this ABC DE line FGHI JK LMN OP of words is Q RS TUV cleaned up.





~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                          2.6-dars: QATORLAR USTIDA ISHLASH


                    ** Butun qatorni o'chirish uchun  dd  yozing. **

  Butun qatorni o'chirish holati ko'p uchrashi sababli, Vi dasturchilari qatorni
  o'chirishni osonlashtirish uchun shunchaki ikkita d yozishga qaror qilishgan.

  1. Kursorni quyidagi iboraning ikkinchi qatoriga olib boring.
  2. Qatorni o'chirish uchun  dd  yozing.
  3. Endi to'rtinchi qatorga o'ting.
  4. Ikkita qatorni o'chirish uchun   2dd   yozing.

--->  1)  Roses are red,
--->  2)  Mud is fun,
--->  3)  Violets are blue,
--->  4)  I have a car,
--->  5)  Clocks tell time,
--->  6)  Sugar is sweet
--->  7)  And so are you.


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                          2.7-dars: BEKOR QILISH (UNDO) BUYRUG'I


   ** Oxirgi buyruqlarni bekor qilish uchun u, butun qatorni tuzatish uchun U ni bosing. **

  1. Kursorni pastdagi ---> bilan belgilangan qatorga olib boring va uni
     birinchi xato ustiga joylashtiring.
  2. Birinchi keraksiz belgini o'chirish uchun  x  yozing.
  3. Endi bajarilgan oxirgi buyruqni bekor qilish uchun  u  yozing.
  4. Bu safar qatordagi barcha xatolarni  x  buyrug'i yordamida to'g'rilang.
  5. Endi qatorni asl holatiga qaytarish uchun katta  U  yozing.
  6. Endi U va undan oldingi buyruqlarni bekor qilish uchun  u  ni bir necha marta bosing.
  7. Endi buyruqlarni qayta tiklash (undo-ni bekor qilish) uchun CTRL-R (CTRL tugmasini
     bosib turib R ni bosish) ni bir necha marta bosing.

---> Fiix the errors oon thhis line and reeplace them witth undo.

  8. Bular juda foydali buyruqlardir. Endi 2-dars Xulosasiga o'ting.




~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                2-dars XULOSASI


  1. Kursordan keyingi so'zgacha o'chirish uchun yozing:    dw
  2. Kursordan qator oxirigacha o'chirish uchun yozing:     d$
  3. Butun qatorni o'chirish uchun yozing:    dd

  4. Harakatni takrorlash uchun undan oldin son qo'shing:   2w
  5. O'zgartirish buyrug'ining formati quyidagicha:
                operator   [son]   harakat
     bu yerda:
       operator - nima qilish kerakligi, masalan o'chirish uchun d
       [son]    - harakatni necha marta takrorlash uchun ixtiyoriy raqam
       harakat  - matn bo'ylab qayerga harakatlanish, masalan w (so'z),
                  $ (qator oxiriga), va hokazo.

  6. Qator boshiga o'tish uchun noldan foydalaning:  0

  7. Oldingi harakatlarni bekor qilish uchun yozing:           u (kichik u)
     Qatordagi barcha o'zgarishlarni bekor qilish uchun yozing: U (katta U)
     Bekor qilinganlarni qayta tiklash (redo) uchun yozing:    CTRL-R

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                          3.1-dars: QO'YISH (PUT) BUYRUG'I


       ** Oldin o'chirilgan matnni kursordan keyin joylash uchun  p  yozing. **

  1. Kursorni pastdagi birinchi ---> qatoriga olib boring.

  2. Qatorni o'chirish va uni Vim xotirasiga (registriga) saqlash uchun  dd  yozing.

  3. Kursorni c) qatoriga, o'chirilgan qator joylashishi kerak bo'lgan joydan YUQORIGA olib boring.

  4. Qatorni kursordan pastga qo'yish uchun   p   yozing.

  5. Barcha qatorlarni to'g'ri tartibda joylashtirish uchun 2 dan 4 gacha qadamlarni takrorlang.

---> d) Can you learn too?
---> b) Violets are blue,
---> c) Intelligence is learned,
---> a) Roses are red,



~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        3.2-dars: ALMASHTIRISH (REPLACE) BUYRUG'I


       ** Kursor ostidagi belgini  x  bilan almashtirish uchun  rx  yozing. **

  1. Kursorni pastdagi ---> bilan belgilangan birinchi qatorga olib boring.

  2. Kursorni birinchi xato ustida bo'ladigan qilib siljiting.

  3. r  va undan so'ng o'sha joyda bo'lishi kerak bo'lgan belgini kiriting.

  4. Birinchi qator ikkinchisiga teng bo'lguncha 2 va 3-qadamlarni takrorlang.

--->  Whan this lime was tuoed in, someone presswd some wrojg keys!
--->  When this line was typed in, someone pressed some wrong keys!

  5. Endi 3.3-darsga o'ting.

ESLATMA: Yodlash orqali emas, amalda bajarish orqali o'rganishingiz kerakligini unutmang.



~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                         3.3-dars: O'ZGARTIRISH (CHANGE) OPERATORI


            ** So'zning oxirigacha o'zgartirish uchun  ce  yozing. **

  1. Kursorni pastdagi ---> bilan belgilangan birinchi qatorga olib boring.

  2. Kursorni  lubw  so'zidagi  u  harfi ustiga joylashtiring.

  3. ce  va to'g'ri so'zni yozing (bu holda  ine  deb yozasiz).

  4. <ESC> ni bosing va o'zgartirilishi kerak bo'lgan keyingi belgiga o'ting.

  5. Birinchi gap ikkinchisiga o'xshash bo'lguncha 3 va 4-qadamlarni takrorlang.

---> This lubw has a few wptfd that mrrf changing usf the change operator.
---> This line has a few words that need changing using the change operator.

E'tibor bering,  ce  so'zni o'chirib, sizni Kiritish (Insert) rejimiga o'tkazadi.



~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        3.4-dars: c YORDAMIDA BOSHQA O'ZGARISHLAR


      ** O'zgartirish operatori o'chirish bilan bir xil harakatlar (motions) bilan ishlatiladi. **

  1. O'zgartirish operatori o'chirish kabi ishlaydi. Formati quyidagicha:

         c    [son]    harakat

  2. Harakatlar bir xil, masalan,  w (so'z) va  $ (qator oxiri).

  3. Pastdagi ---> bilan belgilangan birinchi qatorga o'ting.

  4. Kursorni birinchi xatoga olib boring.

  5. c$  yozing va qatorning qolgan qismini xuddi ikkinchi qatordagidek yozib <ESC> ni bosing.

---> The end of this line needs some help to make it like the second.
---> The end of this line needs to be corrected using the  c$  command.

ESLATMA: Yozish jarayonida xatolarni to'g'rilash uchun Backspace tugmasidan foydalanishingiz mumkin.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                3-dars XULOSASI


  1. Yangi o'chirilgan matnni qayta qo'yish uchun   p  yozing. Bu o'chirilgan matnni
     kursordan KEYIN qo'yadi (agar qator o'chirilgan bo'lsa u kursordan pastdagi qatorga joylashadi).

  2. Kursor ostidagi belgini almashtirish uchun   r   va so'ngra siz o'sha joyda
     bo'lishini xohlagan belgini yozing.

  3. O'zgartirish operatori kursordan harakat qayerga olib borsa, o'sha yergacha o'zgartirish
     imkonini beradi. Masalan, kursordan so'zning oxirigacha o'zgartirish uchun  ce ,
     qator oxirigacha o'zgartirish uchun  c$  yozing.

  4. O'zgartirish formati quyidagicha:

         c   [son]   harakat

Endi keyingi darsga o'ting.



~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                  4.1-dars: KURSOR JOYLASHUVI VA FAYL HOLATI

  ** Fayldagi joylashuvingizni va fayl holatini ko'rsatish uchun CTRL-G yozing.
     Fayldagi ma'lum bir qatorga o'tish uchun  G  yozing. **

  ESLATMA: Quyidagi qadamlarni bajarishdan oldin ushbu darsni to'liq o'qib chiqing!!

  1. Ctrl tugmasini bosib turib  g  ni bosing. Biz buni CTRL-G deb ataymiz.
     Sahifaning pastki qismida fayl nomi va fayldagi o'rningiz haqida xabar paydo
     bo'ladi. 3-qadam uchun qator raqamini eslab qoling.

ESLATMA: Ekranning pastki o'ng burchagida kursor o'rnini ko'rishingiz mumkin.
       Bu 'ruler' opsiyasi yoqilgan bo'lsa ro'y beradi ( :help 'ruler' ni ko'ring).

  2. Faylning eng pastiga tushish uchun  G  ni bosing.
     Faylning boshiga o'tish uchun  gg  yozing.

  3. Boshida turgan qatoringiz raqamini yozing va so'ngra  G  ni bosing. Bu
     sizni birinchi marta CTRL-G bosganingizdagi qatorga qaytaradi.

  4. Agar o'zingizga ishonsangiz, 1 dan 3 gacha bo'lgan qadamlarni bajaring.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                         4.2-dars: QIDIRUV (SEARCH) BUYRUG'I


      ** Biror so'z/iborani qidirish uchun  /  va uning ketidan o'sha so'zni yozing. **

  1. Normal rejimda  /  belgisini yozing. E'tibor bering, u va kursor ekranning
     pastki qismida paydo bo'ladi (xuddi  :  buyrug'idagi kabi).

  2. Endi 'errroor' <ENTER> yozing. Bu siz qidirmoqchi bo'lgan so'z.

  3. Xuddi shu iborani yana qidirish uchun shunchaki  n  yozing.
     Xuddi shu iborani qarama-qarshi yo'nalishda qidirish uchun  N  yozing.

  4. Iborani orqaga (tepaga) qarab qidirish uchun  /  o'rniga  ?  dan foydalaning.

  5. O'zingiz kelgan joyga qaytish uchun  CTRL-O  ni bosing (Ctrl tugmasini
     bosib turib 'o' harfini bosing). Yana orqaga qaytish uchun takrorlang.
     CTRL-I oldinga siljitadi.

--->  "errroor" is not the way to spell error;  errroor is an error.
ESLATMA: Qidiruv faylning oxiriga yetganda, agar 'wrapscan' opsiyasi
      o'chirilmagan bo'lsa, u boshidan qidirishni davom ettiradi.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
               4.3-dars: JUFTLASHGAN QAVSLARNI QIDIRISH (MATCHING PARENTHESES)


           ** Mos keluvchi ), ], yoki } ni topish uchun  %  yozing. **

  1. Kursorni pastdagi ---> bilan belgilangan qatordagi har qanday (, [, yoki { ustiga qo'ying.

  2. Endi  %  belgisini yozing.

  3. Kursor mos keluvchi yopiluvchi qavsga siljiydi.

  4. Kursorni boshqa (ochiluvchi) qavsga qaytarish uchun yana  %  yozing.

  5. Kursorni boshqa (,),[,],{ yoki } larga olib borib,  %  nima qilishini ko'ring.

---> This ( is a test line with ('s, ['s ] and {'s } in it. ))


ESLATMA: Bu dasturlash jarayonida yopilmagan qavslarni topish uchun juda foydali!



~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                      4.4-dars: ALMASHTIRISH (SUBSTITUTE) BUYRUG'I


        ** 'eski' ni 'yangi' ga almashtirish uchun  :s/eski/yangi/g  yozing. **

  1. Kursorni pastdagi ---> bilan belgilangan qatorga olib boring.

  2. :s/thee/the <ENTER> yozing. E'tibor bering, bu buyruq qatordagi "thee" ning
     faqat birinchi uchrashini o'zgartiradi.

  3. Endi  :s/thee/the/g  yozing.  g  bayrog'i (flag) qo'shilishi qatorda global (barcha)
     almashtirishni, ya'ni "thee" ning qatordagi barcha uchrashlarini o'zgartirishni bildiradi.

---> thee best time to see thee flowers is in thee spring.

  4. Ikkita qator orasidagi belgi yoki so'zni almashtirish uchun
     :#,#s/eski/yangi/g    yozing, bu yerda #,# o'zgartirish amalga oshirilishi
                           kerak bo'lgan qatorlar raqami oralig'i.
     Butun fayl bo'ylab barcha uchrashlarni almashtirish uchun   :%s/eski/yangi/g   yozing.
     Butun fayl bo'ylab har bir almashtirishdan oldin tasdiq so'rash bilan
     almashtirish uchun    :%s/eski/yangi/gc    yozing.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                4-dars XULOSASI


  1. CTRL-G  fayldagi joylashuvingizni va fayl holatini ko'rsatadi.
             G  faylning oxiriga o'tadi.
     raqam   G  o'sha qator raqamiga o'tadi.
            gg  birinchi qatorga o'tadi.

  2. /  va undan so'ng so'z yozish OLDINGA (pastga) qarab qidiradi.
     ?  va undan so'ng so'z yozish ORQAGA (tepaga) qarab qidiradi.
     Qidiruvdan so'ng, xuddi shu yo'nalishda keyingisini topish uchun  n ,
     qarama-qarshi yo'nalishda qidirish uchun  N  yozing.
     CTRL-O eski o'rningizga qaytaradi, CTRL-I yengiroq o'rningizga olib boradi.

  3. Kursor (,),[,],{ yoki } ustida turganda  %  yozilsa, uning juftiga o'tadi.

  4. Qatorda birinchi 'eski'ni 'yangi'ga almashtirish uchun yozing       :s/eski/yangi
     Qatordagi barcha 'eski'larni 'yangi'ga almashtirish uchun yozing    :s/eski/yangi/g
     Ikkita qator raqami orasidagi barchasini almashtirish uchun yozing  :#,#s/eski/yangi/g
     Fayldagi barcha uchrashlarni almashtirish uchun yozing              :%s/eski/yangi/g
     Har safar tasdiqlashni so'rash uchun 'c' qo'shing                   :%s/eski/yangi/gc

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                5.1-dars: TASHQI BUYRUQNI QANDAY ISHGA TUSHIRISH KERAK


   ** Tashqi buyruqni ishga tushirish uchun  :!  va undan so'ng o'sha buyruqni yozing. **

  1. Kursorni ekranning pastki qismiga o'rnatish uchun tanish bo'lgan  :  buyrug'ini yozing.
     Bu sizga buyruqlar qatori buyrug'ini kiritish imkonini beradi.

  2. Endi  !  (undov belgisi) belgisini yozing. Bu sizga har qanday tashqi terminal (shell)
     buyrug'ini ishga tushirish imkonini beradi.

  3. Misol tariqasida ! dan keyin  ls  yozing va <ENTER> ni bosing. Bu sizga xuddi
     terminalda (shell prompt) bo'lganingiz kabi katalogingiz (papka) ro'yxatini ko'rsatadi.
     Yoki agar ls ishlamasa,  :!dir  dan foydalaning.

ESLATMA: Shu tarzda har qanday tashqi buyruqni, shuningdek argumentlari bilan ham
       ishga tushirish mumkin.

ESLATMA: Barcha  :  buyruqlari <ENTER> ni bosish bilan yakunlanishi kerak.
       Bundan keyin buni har doim ham eslatib o'tmaymiz.


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                      5.2-dars: FAYLLARNI YOZISH (SAQLASH) HAQIDA KO'PROQ


      ** Matnga qilingan o'zgarishlarni saqlash uchun  :w FAYL_NOMI  yozing. **

  1. Katalogingiz ro'yxatini olish uchun  :!dir  yoki  :!ls  yozing.
     Buning ortidan <ENTER> bosishingiz kerakligini allaqachon bilasiz.

  2. Hali mavjud bo'lmagan fayl nomini tanlang, masalan TEST.

  3. Endi yozing:   :w TEST   (bu yerda TEST siz tanlagan fayl nomi.)

  4. Bu butun faylni (Vim qo'llanmasini) TEST nomi bilan saqlaydi.
     Buni tasdiqlash uchun katalogingizni ko'rish uchun yana   :!dir  yoki  :!ls   yozing.

ESLATMA: Agar siz Vim'dan chiqib, uni yana  vim TEST  bilan ishga tushirsangiz, bu
       fayl qo'llanmani siz saqlagan vaqtdagi aniq nusxasi bo'ladi.

  5. Endi faylni o'chirish uchun yozing (MS-DOS uchun):    :!del TEST
                                yoki (Unix/Linux uchun):   :!rm TEST


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
               5.3-dars: SAQLASH UCHUN MATNNI TANLASH


        ** Faylning bir qismini saqlash uchun  v  harakat  :w FAYL_NOMI  yozing **

  1. Kursorni ushbu qatorga olib boring.

  2. v  ni bosing va kursorni pastdagi beshinchi bandga qarab siljiting. E'tibor
     bering, matn ajratib ko'rsatilgan (highlighted).

  3. :  belgisini bosing. Ekranning pastki qismida  :'<,'>  paydo bo'ladi.

  4. w TEST  yozing, bu yerda TEST - hali mavjud bo'lmagan fayl nomi. <ENTER> tugmasini
     bosishdan oldin  :'<,'>w TEST  ni ko'rayotganingizga ishonch hosil qiling.

  5. Vim tanlangan qatorlarni TEST fayliga yozadi (saqlaydi). Uni ko'rish uchun  :!dir  yoki
     :!ls  dan foydalaning. Uni hali o'chirmang! Biz uni keyingi darsda ishlatamiz.

ESLATMA:  v  ni bosish Vizual tanlash rejimini boshlaydi. Tanlovni kattalashtirish
       yoki kichiklashtirish uchun kursorni harakatlantirishingiz mumkin. So'ngra
       matn bilan nimadir qilish uchun operatordan foydalanishingiz mumkin.
       Masalan,  d  matnni o'chiradi.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    5.4-dars: FAYLLARNI QAYTARIB OLISH VA BIRLASHTIRISH


        ** Fayl tarkibini joylashtirish (kiritish) uchun  :r FAYL_NOMI  yozing **

  1. Kursorni ushbu qatordan biroz yuqoriga qo'ying.

ESLATMA: 2-qadamni bajarganingizdan so'ng, 5.3-darsdagi matnni ko'rasiz. Shundan
       so'ng, bu darsni yana ko'rish uchun PASTGA tushing.

  2. Endi   :r TEST   buyrug'i yordamida o'zingizning TEST faylingizni oling
     (bu yerda TEST siz ishlatgan fayl nomi).
     Siz olgan fayl kursor turgan qatordan pastga joylashtiriladi.

  3. Fayl haqiqatan ham kiritilganligini tekshirish uchun, kursorni yuqoriga siljiting va
     5.3-darsning ikkita nusxasi (asl nusxasi va fayldan olingan nusxasi) borligini ko'rasiz.

ESLATMA: Shuningdek, siz tashqi buyruqning natijasini ham o'qishingiz mumkin. Masalan,
       :r !ls  ls buyrug'ining natijasini o'qiydi va uni kursor ostiga joylashtiradi.


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                5-dars XULOSASI


  1.  :!buyruq  tashqi terminal buyrug'ini ishga tushiradi.

      Ba'zi foydali misollar:
         (MS-DOS)         (Unix/Linux)
          :!dir            :!ls            -  katalog ro'yxatini ko'rsatadi.
          :!del FAYL_NOMI  :!rm FAYL_NOMI  -  FAYL_NOMI nomli faylni o'chiradi.

  2.  :w FAYL_NOMI  joriy Vim faylini diskka FAYL_NOMI nomi bilan saqlaydi (yozadi).

  3.  v  harakat  :w FAYL_NOMI  Vizual rejimda tanlangan qatorlarni FAYL_NOMI
      faylida saqlaydi.

  4.  :r FAYL_NOMI  diskdagi FAYL_NOMI faylini o'qiydi va uni kursor pozitsiyasidan
      pastga joylashtiradi.

  5.  :r !dir  dir (yoki ls) buyrug'ining natijasini o'qiydi va uni kursor
      pozitsiyasidan pastga joylashtiradi.


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                         6.1-dars: OCHISH (OPEN) BUYRUG'I


  ** Kursordan pastda yangi qator ochib, Kiritish rejimiga o'tish uchun  o  yozing. **

  1. Kursorni pastdagi ---> bilan belgilangan qatorga olib boring.

  2. Kursordan PASTDA (below) yangi qator ochish va Kiritish (Insert) rejimiga o'tish uchun
     kichkina  o  harfini yozing.

  3. Endi qandaydir matn kiriting va Kiritish rejimidan chiqish uchun <ESC> ni bosing.

---> After typing  o  the cursor is placed on the open line in Insert mode.

  4. Kursordan YUQORIDA (above) yangi qator ochish uchun shunchaki kichkina o o'rniga
     katta  O  yozing. Buni quyidagi qatorda sinab ko'ring.

---> Open up a line above this by typing O while the cursor is on this line.




~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        6.2-dars: QO'SHISH (APPEND) BUYRUG'I


              ** Kursordan KEYIN matn kiritish uchun  a  yozing. **

  1. Kursorni pastdagi ---> bilan belgilangan qatorning boshiga olib boring.
  
  2. Kursor  li  ning oxiriga kelguncha  e  ni bosing.

  3. Kursordan KEYIN matn qo'shish uchun  a  (kichik) harfini yozing.

  4. So'zni pastdagi qatorga o'xshatib to'ldiring. Kiritish rejimidan chiqish uchun
     <ESC> ni bosing.

  5. Keyingi chala so'zga o'tish uchun  e  dan foydalaning va 3 va 4-qadamlarni takrorlang.
  
---> This li will allow you to pract appendi text to a line.
---> This line will allow you to practice appending text to a line.

ESLATMA: a, i va A barchasi bir xil Kiritish (Insert) rejimiga o'tadi, yagona farq
       belgilar qayerdan kiritila boshlashidadir.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    6.3-dars: ALMASHTIRISHNING BOSHQA USULI


       ** Bitta belgidan ko'prog'ini almashtirish uchun katta  R  yozing. **

  1. Kursorni pastdagi ---> bilan belgilangan birinchi qatorga olib boring. Kursorni
     birinchi  xxx  ning boshiga olib boring.

  2. Endi  R  ni bosing va uning o'rniga ikkinchi qatordagi uning ostida joylashgan
     raqamni kiriting, toki u xxx ni almashtirsin.

  3. Almashtirish (Replace) rejimidan chiqish uchun <ESC> ni bosing. E'tibor bering,
     qatorning qolgan qismi o'zgarishsiz qoladi.

  4. Qolgan xxx larni almashtirish uchun qadamlarni takrorlang.

---> Adding 123 to xxx gives you xxx.
---> Adding 123 to 456 gives you 579.

ESLATMA: Almashtirish rejimi xuddi Kiritish rejimiga o'xshaydi, lekin siz yozgan har bir belgi
       mavjud belgini o'chiradi.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        6.4-dars: MATNNI NUSXALASH VA JOYLASHTIRISH


          ** Matnni nusxalash uchun  y  operatoridan, joylash uchun  p  dan foydalaning **

  1. Pastdagi ---> bilan belgilangan qatorga o'ting va kursorni "a)" dan keyin joylashtiring.
  
  2. v  bilan Vizual rejimni boshlang va kursorni "first" so'zidan oldinroqqa olib boring.
  
  3. Ajratilgan matnni nusxalash (yank) uchun  y  yozing.

  4. Kursorni keyingi qatorning oxiriga olib boring:  j$

  5. Matnni joylashtirish (put/paste) uchun  p  yozing. Keyin yozing:  a second <ESC> .

  6. " item." ni tanlash uchun Vizual rejimdan foydalaning, uni  y  bilan nusxalang,  j$  bilan
     keyingi qatorning oxiriga o'ting va matnni  p  bilan o'sha yerga joylashtiring.

--->  a) this is the first item.
      b)

  ESLATMA: siz  y  dan operator sifatida ham foydalanishingiz mumkin;  yw  bitta so'zni nusxalaydi.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                            6.5-dars: SOZLAMALARNI O'RNATISH (SET OPTION)


          ** Qidiruv yoki almashtirish harf registrini e'tiborga olmasligi uchun
             sozlamani o'rnating **

  1. 'ignore' so'zini qidirish uchun quyidagilarni kiriting:   /ignore  <ENTER>
      n  ni bosish orqali buni bir necha bor takrorlang.

  2. Katta/kichik harflarni farqlamaslik (Ignore case, 'ic') opsiyasini o'rnating:   :set ic

  3. Endi yana  n  tugmasini bosish orqali 'ignore' ni qidiring.
     E'tibor bering, endi Ignore va IGNORE ham topiladi.

  4. 'hlsearch' va 'incsearch' opsiyalarini o'rnating:  :set hls is

  5. Endi qidiruv buyrug'ini qayta yozing va nima bo'lishini ko'ring:  /ignore <ENTER>

  6. Katta/kichik harflarni farqlamaslikni o'chirish uchun kiriting:  :set noic

ESLATMA:  Mos kelgan so'zlarni ajratib ko'rsatishni olib tashlash uchun:   :nohlsearch
ESLATMA:  Agar siz faqat bitta qidiruv buyrug'i uchun katta/kichik harflarni farqlashni
        xohlamasangiz, iborada  \c  dan foydalaning:  /ignore\c  <ENTER>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                6-dars XULOSASI

  1. Kursordan PASTDA yangi qator ochish va Kiritish rejimini boshlash uchun  o  yozing.
     Kursordan YUQORIDA yangi qator ochish uchun  O  yozing.

  2. Kursordan KEYIN matn kiritish uchun  a  yozing.
     Qator oxiridan matn kiritish uchun  A  yozing.

  3. e  buyrug'i so'zning oxiriga o'tkazadi.

  4. y  operatori matnni nusxalaydi (yanks),  p  esa uni joylashtiradi (puts).

  5. Katta  R  yozish <ESC> bosilgunga qadar Almashtirish (Replace) rejimiga kiradi.

  6. ":set xxx" deb yozish "xxx" opsiyasini o'rnatadi. Ba'zi opsiyalar quyidagilar:
         'ic' 'ignorecase'       qidirishda katta/kichik harflarga e'tibor bermaslik
         'is' 'incsearch'        qidiruv iborasi uchun qisman mos kelganlarni ko'rsatish
         'hls' 'hlsearch'        barcha mos kelgan iboralarni ajratib ko'rsatish (highlight)
     Siz uzun yoki qisqa opsiya nomidan foydalanishingiz mumkin.

  7. Opsiyani o'chirish uchun oldiga "no" qo'shing:   :set noic

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        7.1-dars: YORDAM (HELP) OLISH


                      ** Onlayn yordam tizimidan foydalaning **

  Vim keng qamrovli onlayn yordam tizimiga ega. Boshlash uchun ushbu uchtadan
  birini sinab ko'ring:
        - <HELP> tugmasini bosing (agar sizda mavjud bo'lsa)
        - <F1> tugmasini bosing (agar sizda mavjud bo'lsa)
        - yozing:   :help <ENTER>

  Yordam qanday ishlashini bilish uchun yordam oynasidagi matnni o'qing.
  Bir oynadan boshqasiga o'tish uchun  CTRL-W CTRL-W  yozing.
  Yordam oynasini yopish uchun   :q <ENTER>   yozing.

  Siz ":help" buyrug'iga argument berish orqali deyarli har qanday mavzu bo'yicha
  yordam topishingiz mumkin. Bularni sinab ko'ring (<ENTER> bosishni unutmang):

        :help w
        :help c_CTRL-D
        :help insert-index
        :help user-manual
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                      7.2-dars: BOSHQAISH (STARTUP) SKRIPTINI YARATISH


                          ** Vim imkoniyatlarini yoqish **

  Vim'da Vi'ga qaraganda ko'proq funksiyalar mavjud, lekin ularning aksariyati
  standart holatda o'chirilgan bo'ladi. Ko'proq imkoniyatlardan foydalanishni
  boshlash uchun siz "vimrc" faylini yaratishingiz kerak.

  1. "vimrc" faylini tahrirlashni boshlang. Bu sizning tizimingizga bog'liq:
        :e ~/.vimrc             Unix/Linux uchun
        :e $VIM/_vimrc          MS-Windows uchun

  2. Endi misol tariqasidagi "vimrc" fayli tarkibini o'qing:
        :r $VIMRUNTIME/vimrc_example.vim

  3. Faylni yozing (saqlang):
        :w

  Keyingi marta Vim'ni ishga tushirganingizda u sintaksisni ajratib ko'rsatish (syntax highlighting)
  bilan ishlaydi. Siz barcha yoqtirgan sozlamalaringizni ushbu "vimrc" fayliga qo'shishingiz mumkin.
  Qo'shimcha ma'lumot uchun yozing:  :help vimrc-intro

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                             7.3-dars: TO'LDIRISH (COMPLETION)


              ** CTRL-D va <TAB> yordamida buyruqlar qatorini to'ldirish **

  1. Vim "compatible" (moslashuvchanlik) rejimida emasligiga ishonch hosil qiling:  :set nocp

  2. Katalogda qanday fayllar borligini ko'ring:  :!ls   yoki   :!dir

  3. Buyruqning boshini yozing:  :e

  4. CTRL-D ni bosing va Vim sizga "e" bilan boshlanadigan buyruqlar ro'yxatini ko'rsatadi.

  5. <TAB> ni bosing va Vim buyruq nomini ":edit" gacha to'ldiradi.

  6. Endi bo'sh joy va mavjud fayl nomining boshini qo'shing:  :edit FIL

  7. <TAB> ni bosing. Vim agar nom yagona bo'lsa, uni to'ldiradi.

ESLATMA: To'ldirish ko'plab buyruqlar uchun ishlaydi. Shunchaki CTRL-D va <TAB> tugmalarini
       bosib ko'ring. Bu ayniqsa  :help  uchun juda foydali.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                7-dars XULOSASI


  1. Yordam oynasini ochish uchun  :help  yozing yoki <F1> yoki <Help> tugmalarini bosing.

  2. cmd bo'yicha yordam topish uchun  :help cmd  yozing.

  3. Boshqa oynaga o'tish uchun  CTRL-W CTRL-W  yozing.

  4. Yordam oynasini yopish uchun  :q  yozing.

  5. Yoqtirgan sozlamalaringizni saqlab qolish uchun vimrc ishga tushirish skriptini yarating.

  6. :  buyrug'ini kiritayotganda, mumkin bo'lgan to'ldirish variantlarini ko'rish uchun
     CTRL-D ni bosing. Taklif etilgan to'ldirishlardan birini ishlatish uchun <TAB> ni bosing.