import { useStyles } from '@/hooks/useStyles'
import { Text, View } from 'react-native'

export default function Index() {
  const styles = useStyles((colors) => ({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 24,
      paddingTop: 60
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
      textAlign: 'center'
    }
  }))

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Список задач</Text>
    </View>
  )
}
