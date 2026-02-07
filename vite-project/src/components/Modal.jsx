import styles from "./Modal.module.css"

function Modal({modal, onConfirm}) {
  return (
    <>
    <div className={styles.overlay}>
        <div className={styles.box} onClick={event=>event.stopPropagation()}>
            <p>Are you sure you want to delete this contact?</p>
            <button onClick={modal}>cancel</button>
            <button onClick={onConfirm}>confirm</button>
        </div>
    </div>
    </>

  )
}

export default Modal