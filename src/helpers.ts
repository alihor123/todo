import { ToastAndroid } from 'react-native'

export function showMessage(message: string) {
    ToastAndroid.show(message, ToastAndroid.SHORT)
}

export function timeFormating(date: string) {
  return new Date(date).toLocaleDateString('ru-RU')
}
