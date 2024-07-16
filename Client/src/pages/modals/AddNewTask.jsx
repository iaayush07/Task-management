import React, { useContext } from 'react'
import { useFormik } from 'formik';
import { BoardContext } from '../board/utility/services/BoardService';

const AddNewTask = ({ id, onClose }) => {
    const { boards, activeBoardId, updateBoard } = useContext(BoardContext);
    const activeBoard = boards.find(board => board._id === activeBoardId);
    // console.log(activeBoard);
    const formik = useFormik({
        initialValues: {
            taskName: '',
            description: '',
            subtasks: [{ subtaskName: '' }],
            selectedColumn: ''
        },
        validate: values => {
            const errors = {};
            if (!values.taskName) {
                errors.taskName = 'Required';
            } else if (values.taskName.length > 20) {
                errors.taskName = 'Title must be 20 characters or less';
            }

            if (!values.selectedColumn) {
                errors.selectedColumn = 'Required';
            }
            return errors;
        },
        onSubmit: values => {
            const selectedColumn = activeBoard.columns.find(column => column.columnName === values.selectedColumn);
            console.log(selectedColumn);

            if (selectedColumn) {
                selectedColumn.tasks.push({
                    taskName: values.taskName,
                    description: values.description,
                    subtasks: values.subtasks
                });
            }

            const updatedColumns = activeBoard.columns.map(column =>
                column.columnName === values.selectedColumn ? selectedColumn : column
            );
            updateBoard(activeBoardId, { columns: updatedColumns });
            onClose();
        }
    });
    const addNewSubtask = () => {
        formik.setFieldValue('subtasks', [...formik.values.subtasks, { subtaskName: '' }])
    }
    const removeSubtask = (index) => {
        const newSubtasksColumn = formik.values.subtasks.filter((_, i) => i !== index);
        formik.setFieldValue('subtasks', newSubtasksColumn)
    }
    // console.log(formik.errors);
    return (
        <dialog id={id} className="modal">
            <div className="modal-box p-4">
                <form onSubmit={formik.handleSubmit}>
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
                        onBlur={formik.handleBlur}
                        value={formik.values.taskName}
                    />
                    {formik.touched?.taskName && formik.errors?.taskName ? (
                        <div className="mt-1 error">{formik.errors?.taskName}</div>
                    ) : null}

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
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
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
                                        onBlur={formik.handleBlur}
                                        value={formik.values.subtasks[index].subtaskName}
                                    />
                                    <span
                                        className="fa solid flex items-center text-2xl fa-xmark ms-3 cursor-pointer"
                                        onClick={() => removeSubtask(index)}
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
                    <select
                        className="select select-bordered mt-2 w-full"
                        name="selectedColumn"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.selectedColumn}>
                        <option value="" disabled>Select column</option>
                        {
                            activeBoard?.columns?.map((column, index) => (
                                <option key={index} value={column.columnName}>{column.columnName}</option>
                            ))
                        }
                    </select>
                    {formik.touched?.selectedColumn && formik.errors?.selectedColumn ? (
                        <div className="mt-1 error">{formik.errors?.selectedColumn}</div>
                    ) : null}
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