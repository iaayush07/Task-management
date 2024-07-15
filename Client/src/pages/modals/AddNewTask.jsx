import React from 'react'
import { useFormik } from 'formik';

const AddNewTask = ({ id, onClose }) => {
    const formik = useFormik({
        initialValues: {
            taskName: '',
            description: '',
            subtasks: [{ subtaskName: '' }]
        }
    })
    const addNewSubtask = () =>  {
        formik.setFieldValue('subtasks', [...formik.values.subtasks, {subtaskName : ''}])
    }
    const removeSubtask = (index) => {
        const newSubtasksColumn = formik.values.subtasks.filter((_, i)=> i !== index);
        formik.setFieldValue('subtasks', newSubtasksColumn)
    }
    console.log(formik.values);
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
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="task-description" className="mt-3 capitalize block cursor-pointer text-secondary font-bold text-xs">
                        Description(Optional)
                    </label>
                    <input
                        type="text"
                        id="task-description"
                        placeholder="e.g Start learning things"
                        name="description"
                        className="input h-9 mt-1 input-bordered w-full"
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="task-subtask" className="mt-3 capitalize block cursor-pointer text-secondary font-bold text-xs">
                        Subtasks
                    </label>
                    {
                        formik.values.subtasks.map((_, index) => (
                            <React.Fragment>
                                <div className="flex">
                                    <input
                                        type="text"
                                        name={`subtasks[${index}].subtaskName`}
                                        placeholder="e.g To Do"
                                        className="input h-9 mt-1 input-bordered w-full"
                                        onChange={formik.handleChange}
                                    />
                                    <span
                                        className="fa solid flex items-center text-2xl fa-xmark ms-3 cursor-pointer"
                                        onClick={()=>removeSubtask(index)}
                                    ></span>
                                </div>
                            </React.Fragment>
                        ))
                    }
                    <button
                        type="button"
                        className="mt-2 min-h-9 py-1 px-3 w-full size-3 rounded-full capitalize btn btn-white"
                        onClick={addNewSubtask}
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