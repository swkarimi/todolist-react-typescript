import { TaskListType } from "@/types/types"
import { useLocalStorage } from "./useLocalStorage"

type UseTasksReturnType = {
  tasks: TaskListType
  onRemove: (id: string) => void
  onComplete: (id: string, done: boolean) => void
  onEdit: (id: string, title: string) => void
  onAdd: (title: string) => void
}

export function useTasks(
  key: string,
  initalValue: TaskListType
): UseTasksReturnType {
  const [tasks, setTasks] = useLocalStorage<TaskListType>(key, initalValue)

  const onRemove = (id: string) =>
    setTasks((prev) => prev.filter((task) => task.id !== id))

  const onComplete = (id: string, done: boolean) =>
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !done } : task))
    )

  const onEdit = (id: string, title: string) => {
    setTasks((prev) =>
      prev.map((item) => (item.id === id ? { ...item, title } : item))
    )
  }

  const onAdd = (title: string) =>
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID().slice(0, 5), title, done: false },
    ])

  return {
    tasks,
    onRemove,
    onComplete,
    onEdit,
    onAdd,
  }
}
