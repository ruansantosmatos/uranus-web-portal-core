export function formatPhone(value: string): string {
  if (!value) return ''

  const digits = value.replace(/\D/g, '')

  if (digits.length <= 2) {
    return `(${digits}`
  }

  if (digits.length <= 7) {
    return digits.replace(/(\d{2})(\d{1,5})/, '($1) $2')
  }

  return digits.replace(/(\d{2})(\d{5})(\d{1,4}).*/, '($1) $2-$3').trim()
}
