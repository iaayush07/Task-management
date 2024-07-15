import React from 'react'

const AddNewTask = ({ id, onClose }) => {
    return (
        <dialog id={id} className="modal">
            <div className="modal-box p-4">
                <form>
                    <h3 className="font-bold text-lg capitalize">Add new Task</h3>
                    <label htmlFor="task-name" className="mt-3 capitalize block cursor-pointer text-secondary font-bold text-xs">
                        Title
                    </label>
                    <input
                        type="text"
                        id="task-name"
                        placeholder="e.g Start learning things"
                        name="taskName"
                        className="input h-9 mt-1 input-bordered w-full"
                    />
                    <label htmlFor="task-description" className="mt-3 capitalize block cursor-pointer text-secondary font-bold text-xs">
                        Description(Optional)
                    </label>
                    <input
                        type="text"
                        id="task-description"
                        placeholder="e.g Start learning things"
                        name="taskDescription"
                        className="input h-9 mt-1 input-bordered w-full"
                    />
                    <label htmlFor="task-subtask" className="mt-3 capitalize block cursor-pointer text-secondary font-bold text-xs">
                        Subtasks
                    </label>
                    <div className="flex">
                        <input
                            type="text"
                            name={`columns1`}
                            placeholder="e.g To Do"
                            className="input h-9 mt-1 input-bordered w-full"
                        />
                        <span
                            className="fa solid flex items-center text-2xl fa-xmark ms-3 cursor-pointer"
                        ></span>
                    </div>
                    <button
                        type="button"
                        className="mt-2 min-h-9 py-1 px-3 w-full size-3 rounded-full capitalize btn btn-white"
                    >
                        + Add New Subtask
                    </button>
                    <label htmlFor="task-status" className="mt-3 capitalize block cursor-pointer text-secondary font-bold text-xs">
                        status
                    </label>
                    <select className="select select-bordered mt-2 w-full">
                        <option >Who shot first?</option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                    </select>
                    <button
                        className="mt-2 min-h-9 py-1 px-3 w-full size-3 rounded-full capitalize btn btn-primary"
                        type="submit"
                    >
                        Create New Task
                    </button>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop" onClick={onClose}>
                <button>close</button>
            </form>
        </dialog>
    )
}

export default AddNewTask