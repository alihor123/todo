import { Pressable, Text, TextInput, View } from 'react-native'
import type { TaskModalStyles } from '.'

type EditTaskContentProps = {
  styles: TaskModalStyles
  taskTitle: string
  isTaskSaving: boolean
  onChangeTitle: (value: string) => void
  onSave: () => void
  onClose: () => void
}

export function EditTaskContent({ styles, taskTitle, isTaskSaving, onChangeTitle, onSave, onClose }: EditTaskContentProps) {
  return (
    <>
      <TextInput
        style={styles.input}
        value={taskTitle}
        onChangeText={onChangeTitle}
        placeholder="Название задачи"
        placeholderTextColor={styles.inputPlaceholder.color}
        editable={!isTaskSaving}
        returnKeyType="done"
        onSubmitEditing={onSave}
      />
      <View style={styles.modalActions}>
        <Pressable
          onPress={onClose}
          disabled={isTaskSaving}
          style={({ pressed }) => [styles.modalButton, styles.modalCancelButton, pressed && styles.buttonPressed]}
        >
          <Text style={[styles.modalButtonText, styles.modalCancelText]}>Отмена</Text>
        </Pressable>
        <Pressable
          onPress={onSave}
          disabled={isTaskSaving}
          style={({ pressed }) => [styles.modalButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.modalButtonText}>Сохранить</Text>
        </Pressable>
      </View>
    </>
  )
}
