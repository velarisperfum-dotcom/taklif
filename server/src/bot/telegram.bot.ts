import { Telegraf, Markup } from 'telegraf'
import { config } from '../config/env.js'
import { prisma } from '../db.js'
import { generateSlug } from '../modules/invitations/slug.js'

export const bot = new Telegraf(config.telegramBotToken)

// Session memory for wizard
interface UserWizardState {
  step: 'groom' | 'bride' | 'date' | 'time' | 'venueName' | 'venueAddress' | 'message' | 'template' | 'waiting_receipt'
  invitationData: {
    groomName?: string
    brideName?: string
    weddingDate?: string
    weddingTime?: string
    venueName?: string
    venueAddress?: string
    invitationMessage?: string
    templateId?: string
    createdSlug?: string
  }
}

const userSessions = new Map<number, UserWizardState>()

const POPULAR_TEMPLATES = [
  { id: 'palace-romance', name: '🏰 Palace Romance (Bekzod & Munisa)' },
  { id: 'royal-gold', name: '👑 Royal Gold (Zarhal Qasr)' },
  { id: 'uzbek-heritage', name: '🕌 Uzbek Heritage (Registon & So‘zana)' },
  { id: 'rose-garden', name: '🌸 Rose Garden (Pushti Bog‘)' },
  { id: 'black-tie', name: '🖤 Black Tie (Qora & Oltin)' },
]

export function setupTelegramBot() {
  if (!config.telegramBotToken) {
    console.warn('⚠️ Telegram bot token not configured. Skipping bot initialization.')
    return
  }

  // /start command
  bot.command('start', async (ctx) => {
    userSessions.delete(ctx.from.id)

    const welcomeText = `✨ *Assalomu alaykum, ${ctx.from.first_name || 'aziz mehmon'}!*

💍 *Taklifnoma* — O‘zbekistondagi eng chiroyli va zamonaviy raqamli to‘y taklifnomalari platformasiga xush kelibsiz!

Bot orqali siz:
• Bir necha daqiqada o‘zingizning hashamatli raqamli to‘y taklifnomangizni yaratishingiz;
• Jonli sanagich (countdown), to‘yxona lokatsiyasi va musiqaga ega bo‘lishingiz;
• Mehmonlaringizga Telegram orqali bitta havola yuborishingiz mumkin!

Quyidagi menyudan kerakli bo‘limni tanlang:`

    await ctx.replyWithMarkdown(
      welcomeText,
      Markup.keyboard([
        ['💌 Yangi Taklifnoma Yaratish'],
        ['👑 Premium Obuna (1,000 so‘m)', '🌟 Shablonlarni Ko‘rish'],
        ['📞 Admin bilan bog‘lanish'],
      ]).resize()
    )
  })

  // Start creation wizard
  bot.hears('💌 Yangi Taklifnoma Yaratish', async (ctx) => {
    userSessions.set(ctx.from.id, {
      step: 'groom',
      invitationData: {},
    })

    await ctx.reply(
      `🤵 1-qadam: *Kuyovning ismini kiriting:*\n(Masalan: Bekzod)`,
      { parse_mode: 'Markdown' }
    )
  })

  // View templates
  bot.hears('🌟 Shablonlarni Ko‘rish', async (ctx) => {
    const text = `🌟 *Mashhur Premium To‘y Shablonlari:*

1. 🏰 *Palace Romance* — Ko‘l manzarali saroy balkoni, atirgulli gultoj arkasi (Bekzod & Munisa)
2. 👑 *Royal Gold* — Zarhal hashamatli saroy qasri va qandillar
3. 🕌 *Uzbek Heritage* — Registon koshinlari va an’anaviy so‘zana kashtasi
4. 🌸 *Rose Garden* — Mayin ingliz atirgullari va romantik bog‘
5. 🖤 *Black Tie* — Shampan-oltin yozuvlar va oqshom hashamati

Barcha 21 ta shablonni saytimizda ko‘rishingiz mumkin:`

    await ctx.replyWithMarkdown(text, Markup.inlineKeyboard([
      [Markup.button.url('🌐 Barcha shablonlarni ko‘rish', `${config.frontendUrl}/templates`)],
      [Markup.button.callback('✨ Taklifnoma yaratish', 'action_create')],
    ]))
  })

  // Action create button callback
  bot.action('action_create', async (ctx) => {
    await ctx.answerCbQuery()
    userSessions.set(ctx.from.id, {
      step: 'groom',
      invitationData: {},
    })
    await ctx.reply(
      `🤵 1-qadam: *Kuyovning ismini kiriting:*\n(Masalan: Bekzod)`,
      { parse_mode: 'Markdown' }
    )
  })

  // Premium Subscription Info
  bot.hears('👑 Premium Obuna (1,000 so‘m)', async (ctx) => {
    userSessions.set(ctx.from.id, {
      step: 'waiting_receipt',
      invitationData: {},
    })

    const text = `👑 *PREMIUM VIP OBUNA — 1,000 SO‘M*

Barcha 21 ta premium va milliy shablonlar, fon musiqasi, jonli RSVP va cheksiz muddat!

💳 *To‘lov uchun karta (Uzcard / Humo):*
\`${config.cardNumber}\`
Qabul qiluvchi: *${config.cardHolder}*
Summa: *${config.premiumPrice.toLocaleString('uz-UZ')} so‘m*

📸 *To‘lovni amalga oshirgach, chek skrinshotini (rasmini) shu botga yuboring.*
Admin tekshirib, darhol sizga Premium imkoniyatlarni faollashtirib beradi!`

    await ctx.replyWithMarkdown(text)
  })

  // Admin contact
  bot.hears('📞 Admin bilan bog‘lanish', async (ctx) => {
    await ctx.reply(
      `Savollaringiz yoki takliflaringiz bo‘lsa, adminga murojaat qiling:\nTelegram: tg://user?id=${config.adminChatId}\nTelefon / Karta egasi: ${config.cardHolder}`
    )
  })

  // Message Handler for wizard steps
  bot.on('text', async (ctx) => {
    const text = ctx.message.text.trim()
    const state = userSessions.get(ctx.from.id)

    // Ignore menu commands
    if (text.startsWith('/') || ['💌 Yangi Taklifnoma Yaratish', '👑 Premium Obuna (1,000 so‘m)', '🌟 Shablonlarni Ko‘rish', '📞 Admin bilan bog‘lanish'].includes(text)) {
      return
    }

    if (!state) {
      await ctx.reply('Iltimos, quyidagi menyudan buyruqni tanlang:', Markup.keyboard([
        ['💌 Yangi Taklifnoma Yaratish'],
        ['👑 Premium Obuna (1,000 so‘m)', '🌟 Shablonlarni Ko‘rish'],
        ['📞 Admin bilan bog‘lanish'],
      ]).resize())
      return
    }

    switch (state.step) {
      case 'groom':
        state.invitationData.groomName = text
        state.step = 'bride'
        await ctx.reply(`👰 2-qadam: *Kelinning ismini kiriting:*\n(Masalan: Munisa)`, { parse_mode: 'Markdown' })
        break

      case 'bride':
        state.invitationData.brideName = text
        state.step = 'date'
        await ctx.reply(
          `📅 3-qadam: *To‘y sanasini kiriting (YYYY-MM-DD):*\n(Masalan: 2026-06-28)`,
          { parse_mode: 'Markdown' }
        )
        break

      case 'date':
        state.invitationData.weddingDate = text
        state.step = 'time'
        await ctx.reply(
          `⏰ 4-qadam: *To‘y boshlanish vaqtini kiriting:*\n(Masalan: 18:00)`,
          { parse_mode: 'Markdown' }
        )
        break

      case 'time':
        state.invitationData.weddingTime = text
        state.step = 'venueName'
        await ctx.reply(
          `🏛 5-qadam: *To‘yxona (Restoran) nomini kiriting:*\n(Masalan: Versal Tantanalar Saroyi)`,
          { parse_mode: 'Markdown' }
        )
        break

      case 'venueName':
        state.invitationData.venueName = text
        state.step = 'venueAddress'
        await ctx.reply(
          `📍 6-qadam: *To‘yxona manzilini kiriting:*\n(Masalan: Toshkent shahri, Bobur ko‘chasi, 45-uy)`,
          { parse_mode: 'Markdown' }
        )
        break

      case 'venueAddress':
        state.invitationData.venueAddress = text
        state.step = 'message'
        await ctx.reply(
          `💌 7-qadam: *Taklif matnini kiriting (yoki standart matn uchun '-' yuboring):*\n\nStandart matn: "Sizni hayotimizdagi eng baxtiyor kun — nikoh to‘yimizga bag‘ishlangan tantanali kechaning aziz mehmoni bo‘lishga taklif etamiz."`,
          { parse_mode: 'Markdown' }
        )
        break

      case 'message':
        state.invitationData.invitationMessage = text === '-' 
          ? 'Sizni hayotimizdagi eng baxtiyor kun — nikoh to‘yimizga bag‘ishlangan tantanali kechaning aziz mehmoni bo‘lishga taklif etamiz.'
          : text
        state.step = 'template'

        const templateButtons = POPULAR_TEMPLATES.map((t) => [
          Markup.button.callback(t.name, `tpl_${t.id}`),
        ])

        await ctx.reply(
          `🎨 8-qadam: *Quyidagi hashamatli dizaynlardan birini tanlang:*`,
          Markup.inlineKeyboard(templateButtons)
        )
        break

      case 'waiting_receipt':
        await ctx.reply(
          `Iltimos, to‘lov chekining *rasmini (skrinshotini)* yuboring. Karta: \`${config.cardNumber}\` (${config.cardHolder})`,
          { parse_mode: 'Markdown' }
        )
        break
    }
  })

  // Template selection callback
  POPULAR_TEMPLATES.forEach((tpl) => {
    bot.action(`tpl_${tpl.id}`, async (ctx) => {
      await ctx.answerCbQuery()
      const state = userSessions.get(ctx.from.id)

      if (!state) {
        await ctx.reply('Sessiya tugagan. Iltimos, /start bosing.')
        return
      }

      state.invitationData.templateId = tpl.id

      // Generate public slug
      const slug = generateSlug(
        state.invitationData.groomName || 'kuyov',
        state.invitationData.brideName || 'kelin'
      )

      try {
        // Save to Database
        const newInvitation = await prisma.invitation.create({
          data: {
            publicSlug: slug,
            templateId: tpl.id,
            groomName: state.invitationData.groomName || 'Kuyov',
            brideName: state.invitationData.brideName || 'Kelin',
            weddingDate: state.invitationData.weddingDate || '2026-06-28',
            weddingTime: state.invitationData.weddingTime || '18:00',
            venueName: state.invitationData.venueName || 'To‘yxona',
            venueAddress: state.invitationData.venueAddress || 'Manzil',
            invitationMessage: state.invitationData.invitationMessage,
            status: 'PUBLISHED',
          },
        })

        const publicUrl = `${config.frontendUrl}/t/${slug}`
        state.invitationData.createdSlug = slug

        const successText = `🎉 *TABRIKLAYMIZ! TAKLIFNOMANGIZ TAYYOR!*

💍 *Kelin-kuyov:* ${newInvitation.groomName} & ${newInvitation.brideName}
📅 *Sana:* ${newInvitation.weddingDate} (${newInvitation.weddingTime})
🏛 *To‘yxona:* ${newInvitation.venueName}
🎨 *Dizayn:* ${tpl.name}

🔗 *Sizning to‘y taklifnomangiz havolasi:*
${publicUrl}

Ushbu havolani Telegram va WhatsApp orqali barcha yaqinlaringizga yuborishingiz mumkin!`

        await ctx.replyWithMarkdown(
          successText,
          Markup.inlineKeyboard([
            [Markup.button.url('👀 Taklifnomani Ko‘rish', publicUrl)],
            [Markup.button.url('📲 Telegramda Ulashish', `https://t.me/share/url?url=${encodeURIComponent(publicUrl)}&text=${encodeURIComponent(`${newInvitation.groomName} & ${newInvitation.brideName} to‘yiga taklifnoma!`)}`)],
            [Markup.button.callback('👑 Premium VIP ga oshirish (1,000 so‘m)', `upgrade_${slug}`)],
          ])
        )

        // Reset wizard
        userSessions.delete(ctx.from.id)
      } catch (err: any) {
        console.error('Bot create invitation error:', err)
        await ctx.reply('Kechirasiz, taklifnomani saqlashda xatolik yuz berdi. Iltimos qaytadan urinib ko‘ring.')
      }
    })
  })

  // Upgrade callback
  bot.action(/upgrade_(.+)/, async (ctx) => {
    await ctx.answerCbQuery()
    const slug = ctx.match[1]
    const state: UserWizardState = {
      step: 'waiting_receipt',
      invitationData: { createdSlug: slug },
    }
    userSessions.set(ctx.from.id, state)

    const text = `👑 *Taklifnomangizni Premium qilish:*

Havola: ${config.frontendUrl}/t/${slug}
Summa: *1,000 so‘m*
💳 Karta: \`${config.cardNumber}\` (${config.cardHolder})

Iltimos, 1,000 so‘m to‘lab, *chek rasmini* shu botga yuboring!`

    await ctx.replyWithMarkdown(text)
  })

  // Handle Photo (Payment Receipt from User)
  bot.on('photo', async (ctx) => {
    const state = userSessions.get(ctx.from.id)
    const photos = ctx.message.photo
    const fileId = photos[photos.length - 1].file_id

    const username = ctx.from.username ? `@${ctx.from.username}` : ctx.from.first_name
    const slug = state?.invitationData?.createdSlug || 'Noma‘lum'

    // Notify user
    await ctx.reply(
      `✅ *Chekingiz qabul qilindi!*

Adminimiz 1-5 daqiqa ichida tekshirib, taklifnomangizni tasdiqlaydi. Tasdiqlanishi bilan sizga xabar beramiz!`,
      { parse_mode: 'Markdown' }
    )

    // Notify Admin with inline buttons
    const adminMsg = `🔔 *YANGI TO‘LOV ARIZASI!*

👤 *Mijoz:* ${username} (ID: \`${ctx.from.id}\`)
💰 *Summa:* 1,000 so‘m
💍 *Taklifnoma havolasi:* ${slug !== 'Noma‘lum' ? `${config.frontendUrl}/t/${slug}` : 'Kiritilmagan'}
⏰ *Vaqt:* ${new Date().toLocaleString('uz-UZ')}

Chekni tekshiring va quyidagi tugmalar orqali tasdiqlang:`

    try {
      await ctx.telegram.sendPhoto(config.adminChatId, fileId, {
        caption: adminMsg,
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
          [
            Markup.button.callback('✅ Tasdiqlash', `approve_${ctx.from.id}_${slug}`),
            Markup.button.callback('❌ Rad etish', `reject_${ctx.from.id}_${slug}`),
          ],
        ]),
      })
    } catch (err) {
      console.error('Failed to notify admin:', err)
    }
  })

  // Admin Approval Action
  bot.action(/approve_(\d+)_(.+)/, async (ctx) => {
    const userId = Number(ctx.match[1])
    const slug = ctx.match[2]

    try {
      // If slug exists, update invitation status in DB
      if (slug && slug !== 'Noma‘lum') {
        await prisma.invitation.updateMany({
          where: { publicSlug: slug },
          data: { status: 'PUBLISHED' },
        })
      }

      await ctx.editMessageCaption(
        `${ctx.callbackQuery.message && 'caption' in ctx.callbackQuery.message ? ctx.callbackQuery.message.caption : ''}\n\n✅ *TASDIQLANDI* (Admin tomonidan ochildi)`,
        { parse_mode: 'Markdown' }
      )

      // Notify User
      const userSuccessText = `🎉 *XUSHXABAR! SIZNING TO‘LOVINGIZ TASDIQLANDI!*

Sizning to‘y taklifnomangiz uchun *Premium VIP* obuna muvaffaqiyatli faollashtirildi! 🌟

${slug !== 'Noma‘lum' ? `🔗 Taklifnoma havolangiz:\n${config.frontendUrl}/t/${slug}` : ''}

Baxtingizga ko‘z tegmasin!`

      await ctx.telegram.sendMessage(userId, userSuccessText, {
        parse_mode: 'Markdown',
      })

      await ctx.answerCbQuery('Mijoz taklifnomasi tasdiqlandi!')
    } catch (err: any) {
      console.error('Approval error:', err)
      await ctx.answerCbQuery('Xatolik yuz berdi!')
    }
  })

  // Admin Rejection Action
  bot.action(/reject_(\d+)_(.+)/, async (ctx) => {
    const userId = Number(ctx.match[1])

    try {
      await ctx.editMessageCaption(
        `${ctx.callbackQuery.message && 'caption' in ctx.callbackQuery.message ? ctx.callbackQuery.message.caption : ''}\n\n❌ *RAD ETILDI*`,
        { parse_mode: 'Markdown' }
      )

      // Notify User
      await ctx.telegram.sendMessage(
        userId,
        `❌ *Kechirasiz, to‘lov chekingiz tasdiqlanmadi.*\n\nIltimos, to‘lov to‘g‘ri amalga oshirilganligini tekshiring yoki adminga murojaat qiling. Karta: \`${config.cardNumber}\``,
        { parse_mode: 'Markdown' }
      )

      await ctx.answerCbQuery('Rad etildi!')
    } catch (err) {
      console.error('Reject error:', err)
      await ctx.answerCbQuery('Xatolik yuz berdi!')
    }
  })

  // Launch Bot Polling
  bot.launch()
    .then(() => {
      console.log('🤖 Telegram bot muvaffaqiyatli ishga tushdi!')
    })
    .catch((err) => {
      console.error('Telegram bot ishga tushishda xatolik:', err)
    })

  // Graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))
}
