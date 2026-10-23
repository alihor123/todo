import { Check } from '@/assets/icons'
import { timeFormating } from '@/helpers/timeFormating'
import { useStyles } from '@/hooks/useStyles'
import { Image } from 'expo-image'
import { Pressable, Text, View } from 'react-native'

type TaskCardProps = {
  task: {
    title: string
    isCompleted: boolean
    createdAt: string
  }
  disabled: boolean
  onCheck: () => void
  onEdit: () => void
  onDelete: () => void
}

export function TaskCard({ task, disabled, onCheck, onEdit, onDelete }: TaskCardProps) {
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
    taskCheckIcon: {
      width: 16,
      height: 16,
      tintColor: colors.onPrimary
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
    <Pressable
      onPress={onCheck}
      disabled={disabled}
      style={({ pressed }) => [styles.task, task.isCompleted && styles.taskCompleted, pressed && styles.buttonPressed]}
    >
      <View style={styles.taskHeader}>
        <View style={[styles.taskCheckbox, task.isCompleted && styles.taskCheckboxCompleted]}>
          {task.isCompleted && (
            <Image
              source={Check}
              style={styles.taskCheckIcon}
              tintColor={styles.taskCheckIcon.tintColor}
              contentFit="contain"
            />
          )}
        </View>

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
          onPress={event => {
            event.stopPropagation()
            onEdit()
          }}
          disabled={disabled}
          style={({ pressed }) => [styles.taskActionButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.taskEditText}>Изменить</Text>
        </Pressable>
        <Pressable
          onPress={event => {
            event.stopPropagation()
            onDelete()
          }}
          disabled={disabled}
          style={({ pressed }) => [styles.taskActionButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.taskDeleteText}>Удалить</Text>
        </Pressable>
      </View>
    </Pressable>
  )
}
