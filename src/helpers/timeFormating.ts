export function timeFormating(date: string) {
  return new Date(date).toLocaleDateString('ru-RU')
}
