import { useLocalStorage } from "./useLocalStorage"
import { TaskListType } from "../types/types"

type UseTaskReturnType = {
  tasks: TaskListType
  onRemove: (id: string) => void
  onComplete: (id: string, done: boolean) => void
  onEditTask: (id: string, title: string) => void
  addTask: (title: string) => void
}

export function useTask(
  key: string,
  initalValue: TaskListType
): UseTaskReturnType {
  const [tasks, setTasks] = useLocalStorage<TaskListType>(key, initalValue)

  const onRemove = (id: string) =>
    setTasks((prev) => prev.filter((task) => task.id !== id))

  const onComplete = (id: string, done: boolean) =>
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !done } : task))
    )

  const onEditTask = (id: string, title: string) => {
    setTasks((prev) =>
      prev.map((item) => (item.id === id ? { ...item, title } : item))
    )
  }

  const addTask = (title: string) =>
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID().slice(0, 5), title, done: false },
    ])

  return {
    tasks,
    onRemove,
    onComplete,
    onEditTask,
    addTask,
  }
}