import { Plus } from '@/assets/icons'
import { TaskCard } from '@/components/TaskCard'
import TaskModal, { type ModalOpen } from '@/components/TaskModal'
import { showMessage } from '@/helpers'
import { useStyles } from '@/hooks/useStyles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BlurTargetView } from 'expo-blur'
import { randomUUID } from 'expo-crypto'
import { Image } from 'expo-image'
import { useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator, Pressable, ScrollView, Text, TextInput, View, type ViewInstance
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Task = {
  title: string
  isCompleted: boolean
  createdAt: string
}

type Tasks = Record<string, Task>

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
      flexGrow: 1,
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
    emptyTasks: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
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
    tasksStatus: {
      flex: 1,
      padding: 24,
      gap: 20,
      alignItems: 'center',
      justifyContent: 'center'
    },
    tasksLoader: {
      color: colors.primary
    },
    retryButton: {
      minHeight: 44,
      paddingHorizontal: 24,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 999,
      backgroundColor: colors.primary
    },
    retryButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.onPrimary
    },
    resultMessage: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center'
    },
    buttonPressed: {
      opacity: 0.6
    }
  }))

  const [tasks, setTasks] = useState<Tasks>({})
  const [modalOpen, setModalOpen] = useState<ModalOpen>(null)
  const [taskTitle, setTaskTitle] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<boolean | null>(null)
  const [isTasksLoading, setIsTasksLoading] = useState(true)
  const [isTaskSaving, setIsTaskSaving] = useState(false)
  const [isTasksLoadError, setIsTasksLoadError] = useState(false)
  const blurTargetRef = useRef<ViewInstance | null>(null)

  const filteredTasks = filter !== null
    ? Object.entries(tasks).filter(([, task]) => task.isCompleted === filter)
    : Object.entries(tasks)

  const searchedTasks = filteredTasks.filter(([, task]) =>
    task.title.toLowerCase().includes(search.trim().toLowerCase())
  )

  // Загрузка данных из стораджа при запуске и повторной попытке
  async function loadTasks() {
    setIsTasksLoading(true)
    setIsTasksLoadError(false)

    try {
      const value = await AsyncStorage.getItem('tasks')
      const data = value ? JSON.parse(value) : {}

      setTasks(data)
    }
    catch {
      setIsTasksLoadError(true)
    }
    finally {
      setIsTasksLoading(false)
    }
  }

  // Первоначальная загрузка данных при открытии приложения
  useEffect(() => {
    loadTasks()
  }, [])

  //Открытие окна создания записи
  function openCreateModal() {
    if (isTaskSaving) return

    setTaskTitle('')
    setModalOpen({ type: 'create' })
  }

  //Открытие окна редактирования записи
  function openEditModal(id: string) {
    if (isTaskSaving) return

    setTaskTitle(tasks[id].title)
    setModalOpen({ type: 'edit', id })
  }

  //Открытие окна удаления записи
  function openDeleteModal(id: string) {
    if (isTaskSaving) return

    setTaskTitle(tasks[id].title)
    setModalOpen({ type: 'delete', id })
  }

  //Закрытие окна
  function closeModal() {

    setModalOpen(null)
    setTaskTitle('')
  }

  //Создание задачи
  async function createTask() {
    if (isTaskSaving || !taskTitle.trim()) return

    setIsTaskSaving(true)

    try {
      const id = randomUUID()
      const newTasks = {
        ...tasks,
        [id]: {
          title: taskTitle.trim(),
          isCompleted: false,
          createdAt: new Date().toISOString()
        }
      }

      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks))
      setTasks(newTasks)
      closeModal()
    }
    catch {
      showMessage('Не удалось добавить задачу')
    }
    finally {
      setIsTaskSaving(false)
    }
  }

  //Редактирование задачи
  async function editTask() {
    if (isTaskSaving || modalOpen?.type !== 'edit' || !taskTitle.trim()) return

    setIsTaskSaving(true)

    try {
      const id = modalOpen.id
      const newTasks = {
        ...tasks,
        [id]: { ...tasks[id], title: taskTitle.trim() }
      }

      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks))
      setTasks(newTasks)
      closeModal()
    }
    catch {
      showMessage('Не удалось изменить задачу')
    }
    finally {
      setIsTaskSaving(false)
    }
  }

  //Удаление
  async function deleteTask() {
    if (isTaskSaving || modalOpen?.type !== 'delete') return

    setIsTaskSaving(true)

    try {
      const newTasks = { ...tasks }
      delete newTasks[modalOpen.id]

      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks))
      setTasks(newTasks)
      closeModal()
    }
    catch {
      showMessage('Не удалось удалить задачу')
    }
    finally {
      setIsTaskSaving(false)
    }
  }

  //Отметка выполненным
  async function checkTask(id: string) {
    if (isTaskSaving || !tasks[id]) return

    setIsTaskSaving(true)

    try {
      const newTasks = {
        ...tasks,
        [id]: { ...tasks[id], isCompleted: !tasks[id].isCompleted }
      }

      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks))
      setTasks(newTasks)
    }
    catch {
      showMessage('Не удалось изменить статус задачи')
    }
    finally {
      setIsTaskSaving(false)
    }
  }

  if (isTasksLoading || isTasksLoadError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.tasksStatus}>
          {isTasksLoading ? (
            <ActivityIndicator size="large" color={styles.tasksLoader.color} />
          ) : (
            <>
              <Text style={styles.resultMessage}>Не удалось загрузить задания</Text>
              <Pressable
                onPress={loadTasks}
                style={({ pressed }) => [styles.retryButton, pressed && styles.buttonPressed]}
              >
                <Text style={styles.retryButtonText}>Повторить</Text>
              </Pressable>
            </>
          )}
        </View>
      </SafeAreaView>
    )
  }

  return (
    <>
      <BlurTargetView ref={blurTargetRef} style={styles.container}>
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
                  value={search}
                  onChangeText={setSearch}
                />
              </View>

              <View style={styles.filters}>
                {filters.map(item => (
                  <Pressable
                    key={item.name}
                    onPress={() => setFilter(item.value)}
                    style={({ pressed }) => [styles.filterButton, filter === item.value && styles.filterButtonActive, pressed && styles.buttonPressed]}
                  >
                    <Text style={[styles.filterButtonText, filter === item.value && styles.filterButtonTextActive]}>
                      {item.name}
                    </Text>
                  </Pressable>
                ))}
              </View>

              {searchedTasks.length === 0 ? (
                <View style={styles.emptyTasks}>
                  <Text style={styles.resultMessage}>
                    {Object.keys(tasks).length === 0 ? 'Задач пока нет' : 'Ничего не найдено'}
                  </Text>
                </View>
              ) : (
                <View style={styles.wrapper}>
                  {searchedTasks.map(([id, task]) => (
                    <TaskCard
                      key={id}
                      task={task}
                      disabled={isTaskSaving}
                      onCheck={() => checkTask(id)}
                      onEdit={() => openEditModal(id)}
                      onDelete={() => openDeleteModal(id)}
                    />
                  ))}
                </View>
              )}
            </ScrollView>
            <Pressable
              onPress={openCreateModal}
              disabled={isTaskSaving}
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
      </BlurTargetView>

      <TaskModal
        modalOpen={modalOpen}
        taskTitle={taskTitle}
        isTaskSaving={isTaskSaving}
        blurTarget={blurTargetRef}
        onChangeTitle={setTaskTitle}
        onCreate={createTask}
        onEdit={editTask}
        onDelete={deleteTask}
        onClose={closeModal}
      />
    </>
  )
}
