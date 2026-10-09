export function getShareLinks(url: string, title: string) {
  const text = encodeURIComponent(`${title} — Sizni to‘yimizga taklif etamiz!`)
  const targetUrl = encodeURIComponent(url)

  return {
    telegram: `https://t.me/share/url?url=${targetUrl}&text=${text}`,
    whatsapp: `https://api.whatsapp.com/send?text=${text}%20${targetUrl}`,
    qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${targetUrl}`,
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
