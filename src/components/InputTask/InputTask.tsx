import { FormEvent, useEffect, useRef, useState } from "react"
import styles from "./InputTask.module.css"

export const InputTask = ({
  onAddTask,
}: {
  onAddTask: (v: string) => void
}) => {
  const [inputValue, setInputValue] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue.trim() === "") return
    onAddTask(inputValue.trim())
    setInputValue("")
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className={styles["input-task"]}
        type="text"
        placeholder="Enter Task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className={styles["submit-button"]}
        type="submit"
        disabled={inputValue.trim() === ""}
      >
        Submit
      </button>
    </form>
  )
}
