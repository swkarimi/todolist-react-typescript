import { useState } from "react"
import { EditTask } from "@/components/EditTask/EditTask"
import { taskType } from "@/types/types"
import styles from "./Task.module.css"

type TaskProps = {
  task: taskType
  onRemove: (id: string) => void
  onComplete: (id: string, done: boolean) => void
  onEdit: (id: string, title: string) => void
}

export const Task = ({ task, onRemove, onComplete, onEdit }: TaskProps) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  return (
    <div className={styles.task}>
      <p
        className={`${styles.title} ${task.done && styles.done}`}
        onClick={() => onComplete(task.id, task.done)}
      >
        {task.title}
      </p>
      <div className={styles["btn-action"]}>
        <button
          className={`${styles.btn} ${styles["btn-edit"]}`}
          onClick={() => setEditModalOpen(true)}
        >
          Edit
        </button>
        <button
          className={`${styles.btn} ${styles["btn-delete"]}`}
          onClick={() => onRemove(task.id)}
        >
          Delete
        </button>
      </div>
      {isEditModalOpen && (
        <EditTask
          task={task}
          isEditModalOpen={isEditModalOpen}
          onClose={setEditModalOpen}
          onEdit={onEdit}
        />
      )}
    </div>
  )
}
