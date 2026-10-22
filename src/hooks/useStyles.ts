import { Colors } from '@/constants/colors'
import { StyleSheet, useColorScheme } from 'react-native'

export function useStyles<T extends StyleSheet.NamedStyles<T>>(createStyles: (colors: typeof Colors.light) => T) {
  const theme = useColorScheme()
  const colors = theme === 'dark' ? Colors.dark : Colors.light

  return StyleSheet.create(createStyles(colors))
}
