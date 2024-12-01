import { TaskListType } from "@/types/types"
import { Task } from "@/components/Task/Task"
import styles from "./TaskList.module.css"

type TaskListProps = {
  taskList: TaskListType
  onRemove: (id: string) => void
  onComplete: (id: string, done:boolean) => void
  onEdit: (id: string, title:string) => void
}

export const TaskList = ({ taskList, onRemove,onComplete, onEdit }: TaskListProps) => {
  return (
    <div className={styles["task-list"]}>
      {taskList.map((task) => (
        <Task key={task.id} task={task} onRemove={onRemove} onComplete={onComplete} onEdit={onEdit} />
      ))}
    </div>
  )
}
