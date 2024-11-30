import styles from "./TodoList.module.css"
import { LOCALSTORAGE_TASKS_KEY } from "../../utils/constant"
import { TaskList } from "../TaskList/TaskList"
import { InputTask } from "../InputTask/InputTask"
import { useTask } from "../../hooks/useTask"

export const TodoList = () => {
  const { tasks, addTask, onComplete, onEditTask, onRemove } = useTask(
    LOCALSTORAGE_TASKS_KEY,
    []
  )
  
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
