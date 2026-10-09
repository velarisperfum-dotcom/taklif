import { Telegraf, Markup } from 'telegraf'
import { config } from '../config/env.js'
import { prisma } from '../db.js'
import { generateSlug } from '../modules/invitations/slug.js'
import { freeVipService, FreeVipRequest } from '../modules/vip/freeVip.service.js'

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

/**
 * Send Free VIP request to Admin with [✅ Ha] and [❌ Yo‘q] buttons
 */
export async function notifyAdminFreeVipRequest(req: FreeVipRequest): Promise<boolean> {
  if (!config.telegramBotToken || !config.adminChatId) return false
  try {
    const adminText = `🔔 *YANGI BEPUL PREMIUM VIP SO‘ROVI!*

👤 *Mijoz:* ${req.name}
📱 *Bog‘lanish / Telefon:* \`${req.contact}\`
🆔 *Telegram ID:* \`${req.telegramId || 'Saytdan kiritilgan'}\`
🌐 *Manba:* ${req.source === 'telegram_bot' ? 'Telegram Bot' : req.source === 'mini_app' ? 'Mini App' : 'Veb-sayt'}
${req.slug ? `💍 *Tanlangan taklifnoma:* ${config.frontendUrl}/t/${req.slug}` : ''}
⏰ *Yuborilgan vaqt:* ${new Date(req.createdAt).toLocaleString('uz-UZ')}

❓ *Mijoz so‘rovi:*
_"Hurmatli Admin, menga Premium VIP tarifini tekinga (bepul) berasizmi?"_`

    await bot.telegram.sendMessage(config.adminChatId, adminText, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [
          Markup.button.callback('✅ Ha (Tekinga berish)', `freevip_yes_${req.id}`),
          Markup.button.callback('❌ Yo‘q (Rad etish)', `freevip_no_${req.id}`),
        ],
      ]),
    })
    return true
  } catch (err) {
    console.error('Failed to notify admin of free VIP request:', err)
    return false
  }
}

export function setupTelegramBot() {
  if (!config.telegramBotToken) {
    console.warn('⚠️ Telegram bot token not configured. Skipping bot initialization.')
    return
  }

  // Set persistent bottom-left chat menu button to open Mini App
  bot.telegram
    .setChatMenuButton({
      menuButton: {
        type: 'web_app',
        text: 'Taklifnoma Mini App',
        web_app: { url: config.frontendUrl },
      },
    })
    .catch((err) => console.warn('setChatMenuButton warning:', err))

  // /start command
  bot.command('start', async (ctx) => {
    userSessions.delete(ctx.from.id)

    const welcomeText = `✨ *Assalomu alaykum, ${ctx.from.first_name || 'aziz mehmon'}!*

💍 *Taklifnoma Mini App* — O‘zbekistondagi eng chiroyli va zamonaviy raqamli to‘y taklifnomalari ilovasiga xush kelibsiz!

🚀 *Endi siz Telegramdan chiqmasdan turib:*
• 21 xil hashamatli to‘y shablonlarini to‘liq ekranda tomosha qilishingiz;
• O‘zingizning raqamli to‘y taklifnomangizni 2 daqiqada yaratishingiz;
• Jonli sanagich, musiqa va xarita bilan mehmonlaringizga ulashishingiz mumkin!

Quyidagi tugmani bosing va Mini Appni oching:`

    // Inline Mini App Button
    await ctx.replyWithMarkdown(
      welcomeText,
      Markup.inlineKeyboard([
        [Markup.button.webApp('🚀 Taklifnoma Mini Appni Ochish', config.frontendUrl)],
        [
          Markup.button.webApp('🎨 Shablonlar', `${config.frontendUrl}/templates`),
          Markup.button.webApp('✍️ Yaratish', `${config.frontendUrl}/create`),
        ],
        [Markup.button.callback('🎁 Bepul VIP So‘rash (Admindan)', 'request_free_vip_bot')],
        [Markup.button.webApp('👑 Premium VIP (1,000 so‘m)', `${config.frontendUrl}/pricing`)],
      ])
    )

    // Keyboard Menu
    await ctx.reply(
      'Yoki pastdagi menyu tugmalaridan foydalaning:',
      Markup.keyboard([
        [Markup.button.webApp('🚀 Mini Appni Ochish', config.frontendUrl)],
        [Markup.button.webApp('🎨 Barcha Shablonlar', `${config.frontendUrl}/templates`), Markup.button.webApp('✍️ Taklifnoma Yaratish', `${config.frontendUrl}/create`)],
        ['👑 Premium Obuna (1,000 so‘m)', '🎁 Bepul VIP So‘rash'],
        ['📞 Aloqa'],
      ]).resize()
    )
  })

  // /admin command (Admin Control Panel)
  bot.command('admin', async (ctx) => {
    if (String(ctx.from.id) !== String(config.adminChatId)) {
      await ctx.reply('⛔️ Kechirasiz, siz ushbu botning bosh administratori emassiz.')
      return
    }

    const stats = await freeVipService.getStats()
    const adminText = `🛡 *TAKLIFNOMA — ADMIN BOSHQARUV PANELI*

📊 *Umumiy statistika:*
• 💌 Jami taklifnomalar: *${stats.totalInvitations} ta*
• 🎁 Jami bepul VIP so‘rovlar: *${stats.totalFreeRequests} ta*
• ⏳ Kutilayotgan so‘rovlar: *${stats.pendingRequests} ta*
• ✅ Tasdiqlangan (VIP berilgan): *${stats.approvedRequests} ta*
• ❌ Rad etilgan so‘rovlar: *${stats.rejectedRequests} ta*

⚙️ *Tarif va to‘lov sozlamalari:*
• 💳 Karta: \`${config.cardNumber}\` (${config.cardHolder})
• 💰 Narx: *${config.premiumPrice.toLocaleString('uz-UZ')} so‘m*
• 📞 Aloqa raqami: *+998 93 718 88 85*
• 🌐 Sayt: ${config.frontendUrl}

Quyidagi tugmalar orqali so‘rovlarni ko‘rishingiz mumkin:`

    await ctx.replyWithMarkdown(
      adminText,
      Markup.inlineKeyboard([
        [Markup.button.callback('🔄 Statistikani Yangilash', 'admin_refresh')],
        [Markup.button.callback('🎁 So‘nggi Bepul So‘rovlar', 'admin_requests')],
      ])
    )
  })

  // Admin refresh action
  bot.action('admin_refresh', async (ctx) => {
    if (String(ctx.from.id) !== String(config.adminChatId)) {
      await ctx.answerCbQuery('Faqat admin uchun!')
      return
    }
    const stats = await freeVipService.getStats()
    const adminText = `🛡 *TAKLIFNOMA — ADMIN BOSHQARUV PANELI*

📊 *Umumiy statistika (Yangilandi):*
• 💌 Jami taklifnomalar: *${stats.totalInvitations} ta*
• 🎁 Jami bepul VIP so‘rovlar: *${stats.totalFreeRequests} ta*
• ⏳ Kutilayotgan so‘rovlar: *${stats.pendingRequests} ta*
• ✅ Tasdiqlangan (VIP berilgan): *${stats.approvedRequests} ta*
• ❌ Rad etilgan so‘rovlar: *${stats.rejectedRequests} ta*

⚙️ *Tarif va to‘lov sozlamalari:*
• 💳 Karta: \`${config.cardNumber}\` (${config.cardHolder})
• 💰 Narx: *${config.premiumPrice.toLocaleString('uz-UZ')} so‘m*
• ⏰ Oxirgi tekshiruv: ${new Date().toLocaleTimeString('uz-UZ')}`

    try {
      await ctx.editMessageText(adminText, {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
          [Markup.button.callback('🔄 Statistikani Yangilash', 'admin_refresh')],
          [Markup.button.callback('🎁 So‘nggi Bepul So‘rovlar', 'admin_requests')],
        ]),
      })
      await ctx.answerCbQuery('Statistika yangilandi!')
    } catch {
      await ctx.answerCbQuery()
    }
  })

  // Admin list recent requests
  bot.action('admin_requests', async (ctx) => {
    if (String(ctx.from.id) !== String(config.adminChatId)) {
      await ctx.answerCbQuery('Faqat admin uchun!')
      return
    }
    const all = freeVipService.getAllRequests().slice(0, 5)
    if (all.length === 0) {
      await ctx.answerCbQuery('Hali bepul so‘rovlar yo‘q.')
      return
    }

    let report = `📋 *SO‘NGGI 5 TA BEPUL VIP SO‘ROV:* \n\n`
    all.forEach((r, idx) => {
      const statusIcon = r.status === 'APPROVED' ? '✅ Berildi' : r.status === 'REJECTED' ? '❌ Rad' : '⏳ Kutilmoqda'
      report += `${idx + 1}. *${r.name}* (${r.contact})\n`
      report += `Holat: ${statusIcon} | Manba: ${r.source}\n`
      report += `Vaqt: ${new Date(r.createdAt).toLocaleString('uz-UZ')}\n\n`
    })

    await ctx.replyWithMarkdown(
      report,
      Markup.inlineKeyboard([
        [Markup.button.callback('⬅️ Admin panelga qaytish', 'admin_refresh')],
      ])
    )
    await ctx.answerCbQuery()
  })

  // Free VIP request from bot menu
  bot.hears('🎁 Bepul VIP So‘rash', async (ctx) => {
    const text = `🎁 *PREMIUM VIP TARIFINI BEPUL SO‘RASH*

Siz adminga bepul VIP ochib berish haqida bir martalik so‘rov yuborishingiz mumkin.
Admin tasdiqlasa, sizga xabar keladi va barcha 21 ta hashamatli shablonlar (Palace Romance, Royal Gold va b.) bepul ochiladi!

Adminga so‘rov yuborilsinmi?`

    await ctx.replyWithMarkdown(
      text,
      Markup.inlineKeyboard([
        [Markup.button.callback('🚀 Ha, adminga so‘rov yuborish', 'request_free_vip_bot')],
      ])
    )
  })

  bot.action('request_free_vip_bot', async (ctx) => {
    await ctx.answerCbQuery()
    const name = ctx.from.first_name || 'Foydalanuvchi'
    const username = ctx.from.username ? `@${ctx.from.username}` : ''
    const contact = username || `Telegram ID: ${ctx.from.id}`

    const vipReq = freeVipService.createRequest({
      name,
      contact,
      telegramId: ctx.from.id,
      source: 'telegram_bot',
    })

    await notifyAdminFreeVipRequest(vipReq)

    await ctx.editMessageText(
      `✅ *So‘rovingiz adminga yuborildi!*

Admin so‘rovingizni ko‘rib chiqmoqda. Admin *"Ha"* deb tasdiqlashi bilanoq sizga ushbu botda xabar beramiz!`,
      { parse_mode: 'Markdown' }
    )
  })

  // Handle Admin Decision: YES (Ha - Tekinga berish)
  bot.action(/freevip_yes_(.+)/, async (ctx) => {
    if (String(ctx.from.id) !== String(config.adminChatId)) {
      await ctx.answerCbQuery('Faqat admin uchun!')
      return
    }

    const reqId = ctx.match[1]
    const req = freeVipService.updateStatus(reqId, 'APPROVED')
    if (!req) {
      await ctx.answerCbQuery('So‘rov topilmadi yoki muddati o‘tgan!')
      return
    }

    const currentText = ctx.callbackQuery.message && 'text' in ctx.callbackQuery.message ? ctx.callbackQuery.message.text : ''
    await ctx.editMessageText(
      `${currentText}\n\n━━━━━━━━━━━━━━━━━━━━\n✅ *TASDIQLANDI: Foydalanuvchiga bepul Premium VIP berildi!* 🎉\n(Admin tasdiqlagan vaqt: ${new Date().toLocaleTimeString('uz-UZ')})`,
      { parse_mode: 'Markdown' }
    )

    // Notify User if they sent via Telegram
    if (req.telegramId) {
      try {
        const userMsg = `🎉 *TABRIKLAYMIZ!*

Admin sizning so‘rovingizni ko‘rib chiqdi va sizga *Premium VIP* tarifini *BEPUL* taqdim etdi! 🌟

Endi siz:
• Barcha 21 ta hashamatli shablonlar (Palace Romance, Royal Gold, Black Tie);
• Maxsus fon musiqasi va interaktiv konvertlar;
• Jonli mehmonlar javoblari (RSVP)
imkoniyatlaridan mutlaqo bepul foydalanishingiz mumkin!

Quyidagi tugmani bosing va taklifnomangizni yarating:`

        await ctx.telegram.sendMessage(req.telegramId, userMsg, {
          parse_mode: 'Markdown',
          ...Markup.inlineKeyboard([
            [Markup.button.webApp('🚀 Taklifnoma Yaratish', `${config.frontendUrl}/create`)],
            [Markup.button.webApp('🎨 Shablonlarni Ko‘rish', `${config.frontendUrl}/templates`)],
          ]),
        })
      } catch (err) {
        console.warn('Could not notify user of free VIP approval:', err)
      }
    }

    await ctx.answerCbQuery('✅ Foydalanuvchiga bepul VIP berildi!')
  })

  // Handle Admin Decision: NO (Yo'q - Rad etish)
  bot.action(/freevip_no_(.+)/, async (ctx) => {
    if (String(ctx.from.id) !== String(config.adminChatId)) {
      await ctx.answerCbQuery('Faqat admin uchun!')
      return
    }

    const reqId = ctx.match[1]
    const req = freeVipService.updateStatus(reqId, 'REJECTED')
    if (!req) {
      await ctx.answerCbQuery('So‘rov topilmadi!')
      return
    }

    const currentText = ctx.callbackQuery.message && 'text' in ctx.callbackQuery.message ? ctx.callbackQuery.message.text : ''
    await ctx.editMessageText(
      `${currentText}\n\n━━━━━━━━━━━━━━━━━━━━\n❌ *RAD ETILDI: Bepul VIP berilmadi.*\n(Vaqt: ${new Date().toLocaleTimeString('uz-UZ')})`,
      { parse_mode: 'Markdown' }
    )

    // Notify User
    if (req.telegramId) {
      try {
        const userMsg = `Kechirasiz, admin bepul VIP so‘rovingizni rad etdi.

Siz bor-yo‘g‘i *1,000 so‘m* to‘lov evaziga barcha hashamatli shablonlar va imkoniyatlarni ochishingiz mumkin.

💳 *To‘lov kartasi:* \`${config.cardNumber}\` (${config.cardHolder})
Summa: *1,000 so‘m*

To‘lov chekini yuborsangiz, admin darhol faollashtirib beradi!`

        await ctx.telegram.sendMessage(req.telegramId, userMsg, {
          parse_mode: 'Markdown',
          ...Markup.inlineKeyboard([
            [Markup.button.webApp('💳 Tariflar va To‘lov', `${config.frontendUrl}/pricing`)],
          ]),
        })
      } catch (err) {
        console.warn('Could not notify user of free VIP rejection:', err)
      }
    }

    await ctx.answerCbQuery('❌ So‘rov rad etildi!')
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
      [Markup.button.webApp('🌐 Barcha shablonlarni ko‘rish', `${config.frontendUrl}/templates`)],
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

    await ctx.replyWithMarkdown(
      text,
      Markup.inlineKeyboard([
        [Markup.button.callback('🎁 Admindan bepul so‘rash', 'request_free_vip_bot')],
      ])
    )
  })

  // Admin contact
  bot.hears(['📞 Aloqa', '📞 Admin bilan bog‘lanish'], async (ctx) => {
    await ctx.reply(
      `Savollaringiz yoki takliflaringiz bo‘lsa, adminga murojaat qiling:\n📞 Telefon: +998 93 718 88 85\nTelegram: tg://user?id=${config.adminChatId}\nKarta egasi: ${config.cardHolder}`
    )
  })

  // Message Handler for wizard steps
  bot.on('text', async (ctx) => {
    const text = ctx.message.text.trim()
    const state = userSessions.get(ctx.from.id)

    // Ignore menu commands
    if (text.startsWith('/') || ['💌 Yangi Taklifnoma Yaratish', '👑 Premium Obuna (1,000 so‘m)', '🌟 Shablonlarni Ko‘rish', '📞 Aloqa', '📞 Admin bilan bog‘lanish', '🎁 Bepul VIP So‘rash'].includes(text)) {
      return
    }

    if (!state) {
      await ctx.reply('Iltimos, quyidagi menyudan buyruqni tanlang:', Markup.keyboard([
        [Markup.button.webApp('🚀 Mini Appni Ochish', config.frontendUrl)],
        [Markup.button.webApp('🎨 Barcha Shablonlar', `${config.frontendUrl}/templates`), Markup.button.webApp('✍️ Taklifnoma Yaratish', `${config.frontendUrl}/create`)],
        ['👑 Premium Obuna (1,000 so‘m)', '🎁 Bepul VIP So‘rash'],
        ['📞 Aloqa'],
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
            [Markup.button.webApp('📱 Mini Appda Ko‘rish', publicUrl)],
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

    await ctx.replyWithMarkdown(text, Markup.inlineKeyboard([
      [Markup.button.callback('🎁 Admindan bepul so‘rash', 'request_free_vip_bot')],
    ]))
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
