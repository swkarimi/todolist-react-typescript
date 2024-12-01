import { FormEvent, useEffect, useRef, useState } from "react"
import { Modal } from "@/components/Modal/Modal"
import { taskType } from "@/types/types"
import styles from "./EditTask.module.css"

type EditTaskProps = {
  task: taskType
  onClose: (v: boolean) => void
  isEditModalOpen: boolean
  onEdit: (id: string, title: string) => void
}

export const EditTask = ({
  task,
  isEditModalOpen,
  onClose,
  onEdit,
}: EditTaskProps) => {
  const [inputValue, setInputValue] = useState(task.title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [])

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() === "") return
    onEdit(task.id, inputValue.trim())
    onClose(false)
  }

  return (
    <Modal isOpen={isEditModalOpen} onClose={() => onClose(false)}>
      <form className={styles.form} onSubmit={submitHandler}>
        <input
          ref={inputRef}
          type="text"
          className={styles["input-task"]}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className={styles["submit-button"]}
          disabled={!inputValue.trim()}
        >
          Submit
        </button>
      </form>
    </Modal>
  )
}
