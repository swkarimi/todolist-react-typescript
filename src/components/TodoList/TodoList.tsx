
import { useTasks } from "@/hooks/useTasks"
import { LOCALSTORAGE_TASKS_KEY } from "@/utils/constant"
import { InputTask } from "@/components/InputTask/InputTask"
import { TaskList } from "@/components/TaskList/TaskList"
import styles from "./TodoList.module.css"

export const TodoList = () => {
  const { tasks, onAdd, onComplete, onEdit, onRemove } = useTasks(
    LOCALSTORAGE_TASKS_KEY,
    []
  )
  
  return (
    <div className={styles["todolist-container"]}>
      <h2>Todo List</h2>
      <InputTask onAdd={onAdd} />
      <TaskList
        taskList={tasks}
        onRemove={onRemove}
        onComplete={onComplete}
        onEdit={onEdit}
      />
    </div>
  )
}
