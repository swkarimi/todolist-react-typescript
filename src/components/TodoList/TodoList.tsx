import styles from "./TodoList.module.css"
import { LOCALSTORAGE_TASKS_KEY } from "../../utils/constant"
import { TaskList } from "../TaskList/TaskList"
import { InputTask } from "../InputTask/InputTask"
import { useTask } from "../../hooks/useTask"

export const TodoList = () => {
  const { tasks, onAdd, onComplete, onEdit, onRemove } = useTask(
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
