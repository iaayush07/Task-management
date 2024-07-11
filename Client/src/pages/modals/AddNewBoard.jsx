import React from 'react'

const AddNewBoard = ({ id, title, content, onClose }) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg capitalize">Add new board</h3>
        <p className="py-4">{content}</p>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  )
}

export default AddNewBoard