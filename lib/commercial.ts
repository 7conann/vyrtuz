export const commercialPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''

export function commercialLink(subject = 'as soluções da Vyrtuz') {
  if (!commercialPhone) return '#contato'
  return `https://wa.me/${commercialPhone}?text=${encodeURIComponent(`Olá! Quero consultar as condições para ${subject}.`)}`
}
