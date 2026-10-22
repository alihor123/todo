import { Plus } from '@/assets/icons'
import { TaskCard } from '@/components/TaskCard'
import { useStyles } from '@/hooks/useStyles'
import { Image } from 'expo-image'
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// Тестовые задачи для вёрстки экрана
const mockTasks = [
  {
    id: '1',
    title: 'Подготовить отчёт по лабораторной работе',
    isCompleted: false,
    createdAt: '2026-10-23T08:30:00.000Z'
  },
  {
    id: '2',
    title: 'Повторить работу с состоянием в React',
    isCompleted: false,
    createdAt: '2026-10-23T09:15:00.000Z'
  },
  {
    id: '3',
    title: 'Проверить конвертер валют на телефоне',
    isCompleted: true,
    createdAt: '2026-10-22T16:45:00.000Z'
  },
  {
    id: '4',
    title: 'Сделать калькулятор',
    isCompleted: true,
    createdAt: '2026-10-21T10:00:00.000Z'
  }
]

const filters = [
  { name: 'Все', value: null },
  { name: 'Активные', value: false },
  { name: 'Выполненные', value: true }
]

export default function Index() {
  const styles = useStyles((colors) => ({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    content: {
      width: '100%',
      maxWidth: 600,
      alignSelf: 'center',
      padding: 24,
      paddingBottom: 104,
      gap: 20
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 10
    },
    wrapper: {
      width: '100%',
      gap: 10
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text
    },
    input: {
      width: '100%',
      height: 50,
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderRadius: 999,
      borderColor: colors.border,
      borderWidth: 2,
      backgroundColor: colors.surface,
      color: colors.onSurface,
      fontSize: 16,
      fontWeight: '500'
    },
    inputPlaceholder: {
      color: colors.textSecondary
    },
    filters: {
      flexDirection: 'row',
      gap: 8
    },
    filterButton: {
      flex: 1,
      minHeight: 38,
      paddingHorizontal: 4,
      paddingVertical: 8,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 999,
      backgroundColor: colors.surfaceSoft
    },
    filterButtonActive: {
      backgroundColor: colors.primary
    },
    filterButtonText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.onSurfaceSoft,
      textAlign: 'center'
    },
    filterButtonTextActive: {
      color: colors.onPrimary
    },
    addButton: {
      position: 'absolute',
      right: 18,
      bottom: 18,
      width: 56,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 999,
      backgroundColor: colors.primary
    },
    addIcon: {
      width: 28,
      height: 28,
      tintColor: colors.onPrimary
    },
    buttonPressed: {
      opacity: 0.6
    }
  }))

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Список задач</Text>

          <View style={styles.wrapper}>
            <Text style={styles.label}>Поиск</Text>
            <TextInput
              style={styles.input}
              placeholder="Найти задачу по названию"
              placeholderTextColor={styles.inputPlaceholder.color}
              editable={false}
            />
          </View>

          <View style={styles.filters}>
            {filters.map(filter => (
              <Pressable
                key={filter.name}
                style={({ pressed }) => [styles.filterButton, pressed && styles.buttonPressed]}
              >
                <Text style={[styles.filterButtonText]}>
                  {filter.name}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.wrapper}>
            {mockTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </View>
        </ScrollView>
        <Pressable
          style={({ pressed }) => [styles.addButton, pressed && styles.buttonPressed]}
        >
          <Image
            source={Plus}
            style={styles.addIcon}
            tintColor={styles.addIcon.tintColor}
            contentFit="contain"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
