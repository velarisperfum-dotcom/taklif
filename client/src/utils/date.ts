const UZBEK_MONTHS = [
  'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
  'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'
]

const UZBEK_DAYS = [
  'Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba',
  'Payshanba', 'Juma', 'Shanba'
]

export function formatUzbekDate(dateStr: string): string {
  if (!dateStr) return ''
  const parts = dateStr.split('-')
  if (parts.length !== 3) return dateStr

  const year = parseInt(parts[0], 10)
  const monthIdx = parseInt(parts[1], 10) - 1
  const day = parseInt(parts[2], 10)

  const dateObj = new Date(year, monthIdx, day)
  const dayName = UZBEK_DAYS[dateObj.getDay()] || ''
  const monthName = UZBEK_MONTHS[monthIdx] || ''

  return `${year}-yil ${day}-${monthName}, ${dayName}`
}

export function formatShortUzbekDate(dateStr: string): string {
  if (!dateStr) return ''
  const parts = dateStr.split('-')
  if (parts.length !== 3) return dateStr

  const day = parseInt(parts[2], 10)
  const monthIdx = parseInt(parts[1], 10) - 1
  const year = parts[0]

  return `${day} ${UZBEK_MONTHS[monthIdx]} ${year}`
}
