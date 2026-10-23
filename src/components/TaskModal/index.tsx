import { useStyles } from '@/hooks/useStyles'
import { BlurView } from 'expo-blur'
import type { RefObject } from 'react'
import { KeyboardAvoidingView, Modal, Platform, Pressable, Text, View, type TextStyle, type ViewInstance, type ViewStyle } from 'react-native'
import { CreateTaskContent } from './CreateTaskContent'
import { DeleteTaskContent } from './DeleteTaskContent'
import { EditTaskContent } from './EditTaskContent'

export type ModalOpen =
  | { type: 'create' }
  | { type: 'edit', id: string }
  | { type: 'delete', id: string }
  | null

export type TaskModalStyles = {
  input: TextStyle
  inputPlaceholder: TextStyle
  modalMessage: TextStyle
  modalActions: ViewStyle
  modalButton: ViewStyle
  modalCancelButton: ViewStyle
  modalDeleteButton: ViewStyle
  modalButtonText: TextStyle
  modalCancelText: TextStyle
  buttonPressed: ViewStyle
}

type TaskModalProps = {
  modalOpen: ModalOpen
  taskTitle: string
  isTaskSaving: boolean
  blurTarget: RefObject<ViewInstance | null>
  onChangeTitle: (value: string) => void
  onCreate: () => void
  onEdit: () => void
  onDelete: () => void
  onClose: () => void
}

const modalTitles = {
  create: 'Новая задача',
  edit: 'Редактирование задачи',
  delete: 'Удаление задачи'
}

export default function TaskModal({ modalOpen, taskTitle, isTaskSaving, blurTarget, onChangeTitle, onCreate, onEdit, onDelete, onClose }: TaskModalProps) {
  const styles = useStyles((colors) => ({
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
    modalContainer: {
      flex: 1
    },
    modalBackground: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    modalOverlay: {
      backgroundColor: colors.overlay
    },
    modalWrapper: {
      flex: 1,
      padding: 24,
      alignItems: 'center',
      justifyContent: 'center'
    },
    modal: {
      width: '100%',
      maxWidth: 360,
      padding: 20,
      gap: 20,
      borderRadius: 24,
      backgroundColor: colors.surface
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text
    },
    modalMessage: {
      fontSize: 16,
      lineHeight: 23,
      color: colors.text
    },
    modalActions: {
      flexDirection: 'row',
      gap: 10
    },
    modalButton: {
      flex: 1,
      minHeight: 44,
      paddingHorizontal: 12,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 999,
      backgroundColor: colors.primary
    },
    modalCancelButton: {
      backgroundColor: colors.surfaceSoft
    },
    modalDeleteButton: {
      backgroundColor: colors.error
    },
    modalButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.onPrimary
    },
    modalCancelText: {
      color: colors.onSurfaceSoft
    },
    buttonPressed: {
      opacity: 0.6
    }
  }))

  function getModalContent() {
    switch (modalOpen?.type) {
      case 'edit':
        return (
          <EditTaskContent
            styles={styles}
            taskTitle={taskTitle}
            isTaskSaving={isTaskSaving}
            onChangeTitle={onChangeTitle}
            onSave={onEdit}
            onClose={onClose}
          />
        )
      case 'delete':
        return (
          <DeleteTaskContent
            styles={styles}
            taskTitle={taskTitle}
            isTaskSaving={isTaskSaving}
            onDelete={onDelete}
            onClose={onClose}
          />
        )
      default:
        return (
          <CreateTaskContent
            styles={styles}
            taskTitle={taskTitle}
            isTaskSaving={isTaskSaving}
            onChangeTitle={onChangeTitle}
            onSave={onCreate}
            onClose={onClose}
          />
        )
    }
  }

  return (
    <Modal
      visible={modalOpen !== null}
      transparent
      hardwareAccelerated
      animationType="fade"
      onRequestClose={() => {
        if (!isTaskSaving) onClose()
      }}
    >
      <View style={styles.modalContainer}>
        <BlurView
          blurTarget={blurTarget}
          blurMethod="dimezisBlurView"
          intensity={15}
          tint="dark"
          pointerEvents="none"
          style={styles.modalBackground}
        />
        <Pressable
          onPress={onClose}
          disabled={isTaskSaving}
          style={[styles.modalBackground, styles.modalOverlay]}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          pointerEvents="box-none"
          style={styles.modalWrapper}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>{modalTitles[modalOpen?.type ?? 'create']}</Text>
            {getModalContent()}
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  )
}
