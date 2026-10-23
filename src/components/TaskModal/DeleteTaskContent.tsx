import { Pressable, Text, View } from 'react-native'
import type { TaskModalStyles } from '.'

type DeleteTaskContentProps = {
  styles: TaskModalStyles
  taskTitle: string
  isTaskSaving: boolean
  onDelete: () => void
  onClose: () => void
}

export function DeleteTaskContent({ styles, taskTitle, isTaskSaving, onDelete, onClose }: DeleteTaskContentProps) {
  return (
    <>
      <Text style={styles.modalMessage} numberOfLines={3}>
        Удалить задачу «{taskTitle}»?
      </Text>
      <View style={styles.modalActions}>
        <Pressable
          onPress={onClose}
          disabled={isTaskSaving}
          style={({ pressed }) => [styles.modalButton, styles.modalCancelButton, pressed && styles.buttonPressed]}
        >
          <Text style={[styles.modalButtonText, styles.modalCancelText]}>Отмена</Text>
        </Pressable>
        <Pressable
          onPress={onDelete}
          disabled={isTaskSaving}
          style={({ pressed }) => [styles.modalButton, styles.modalDeleteButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.modalButtonText}>Удалить</Text>
        </Pressable>
      </View>
    </>
  )
}
