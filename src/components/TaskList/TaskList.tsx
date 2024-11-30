import { TaskListType } from "../../types/types"
import { Task } from "../Task/Task"
import styles from "./TaskList.module.css"

type TaskListProps = {
  taskList: TaskListType
  onRemove: (id: string) => void
  onComplete: (id: string, done:boolean) => void
  onEditTask: (id: string, title:string) => void
}

export const TaskList = ({ taskList, onRemove,onComplete, onEditTask }: TaskListProps) => {
  return (
    <div className={styles["task-list"]}>
      {taskList.map((task) => (
        <Task key={task.id} task={task} onRemove={onRemove} onComplete={onComplete} onEditTask={onEditTask} />
      ))}
    </div>
  )
}
