import { timeFormating } from '@/helpers/timeFormating'
import { useStyles } from '@/hooks/useStyles'
import { Pressable, Text, View } from 'react-native'

type TaskCardProps = {
  task: {
    title: string
    isCompleted: boolean
    createdAt: string
  }
}

export function TaskCard({ task }: TaskCardProps) {
  const styles = useStyles((colors) => ({
    task: {
      padding: 16,
      borderRadius: 16,
      backgroundColor: colors.surface
    },
    taskCompleted: {
      backgroundColor: colors.surfaceSoft
    },
    taskHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12
    },
    taskCheckbox: {
      width: 24,
      height: 24,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskCheckboxCompleted: {
      borderColor: colors.primary,
      backgroundColor: colors.primary
    },
    taskCheckmark: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.onPrimary
    },
    taskContent: {
      flex: 1,
      minWidth: 0,
      gap: 8
    },
    taskTitle: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: '600',
      color: colors.text
    },
    taskTitleCompleted: {
      color: colors.textSecondary,
      textDecorationLine: 'line-through'
    },
    taskDate: {
      fontSize: 12,
      color: colors.textSecondary
    },
    taskActions: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      gap: 8,
      marginTop: 12
    },
    taskActionButton: {
      minHeight: 44,
      paddingHorizontal: 8,
      borderRadius: 999,
      justifyContent: 'center'
    },
    taskEditText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.primary
    },
    taskDeleteText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.error
    },
    buttonPressed: {
      opacity: 0.6
    }
  }))

  return (
    <View style={[styles.task, task.isCompleted && styles.taskCompleted]}>
      <View style={styles.taskHeader}>
        <Pressable
          hitSlop={10}
          style={({ pressed }) => [styles.taskCheckbox, task.isCompleted && styles.taskCheckboxCompleted, pressed && styles.buttonPressed]}
        >
          {task.isCompleted && <Text style={styles.taskCheckmark}>✓</Text>}
        </Pressable>

        <View style={styles.taskContent}>
          <Text style={[styles.taskTitle, task.isCompleted && styles.taskTitleCompleted]}>
            {task.title}
          </Text>
          <Text style={styles.taskDate}>
            Создана: {timeFormating(task.createdAt)}
          </Text>
        </View>
      </View>

      <View style={styles.taskActions}>
        <Pressable
          style={({ pressed }) => [styles.taskActionButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.taskEditText}>Изменить</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.taskActionButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.taskDeleteText}>Удалить</Text>
        </Pressable>
      </View>
    </View>
  )
}
