export function formatDate(dateInput: string | Date): string {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput)
  if (isNaN(date.getTime())) return ''

  const dia = String(date.getDate()).padStart(2, '0')
  const mes = String(date.getMonth() + 1).padStart(2, '0')
  const ano = date.getFullYear()

  const horas = String(date.getHours()).padStart(2, '0')
  const minutos = String(date.getMinutes()).padStart(2, '0')

  return `${dia}/${mes}/${ano} ${horas}:${minutos}`
}
