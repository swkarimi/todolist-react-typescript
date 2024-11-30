import { FC, ReactNode, MouseEvent } from "react"
import styles from "./Modal.module.css"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}
export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  const clickOverlayHandler = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={styles["modal-overlay"]} onClick={clickOverlayHandler}>
      <div className={styles["modal-content"]}>
        <button className={styles["modal-close"]} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}
