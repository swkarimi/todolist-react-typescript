import { useEffect, useState } from "react"
import styles from "./TodoList.module.css"
import { LOCALSTORAGE_TASKS_KEY } from "../../utils/constant"
import { TaskList } from "../TaskList/TaskList"
import { InputTask } from "../InputTask/InputTask"
import { TaskListType } from "../../types/types"

export const TodoList = () => {
  const [tasks, setTasks] = useState<TaskListType>(
    JSON.parse(localStorage.getItem(LOCALSTORAGE_TASKS_KEY) || "[]")
  )

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_TASKS_KEY, JSON.stringify(tasks))
  }, [tasks])

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

  return (
    <div className={styles["todolist-container"]}>
      <h2>Todo List</h2>
      <InputTask onAddTask={addTask} />
      <TaskList
        taskList={tasks}
        onRemove={onRemove}
        onComplete={onComplete}
        onEditTask={onEditTask}
      />
    </div>
  )
}
