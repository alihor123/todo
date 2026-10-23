import { Alert, Platform, ToastAndroid } from 'react-native'

export function showMessage(message: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT)
  }
  else if (Platform.OS === 'web') {
    window.alert(message)
  }
  else {
    Alert.alert('ToDo', message)
  }
}
