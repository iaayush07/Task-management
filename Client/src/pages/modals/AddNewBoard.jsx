import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import { BoardContext } from '../board/utility/services/BoardService';

const AddNewBoard = ({ id, isModalOpen, initialFormValues, onClose }) => {
    const { addBoardForm, updateBoard  } = useContext(BoardContext);

    const formik = useFormik({
        initialValues: initialFormValues ? {
            boardName: initialFormValues.boardName,
            columns: initialFormValues.columns.map(column => ({
                columnName: column.columnName,
                tasks: column.tasks || []
            }))
        } : {
            boardName: '',
            columns: [{ columnName: '', tasks: [] }]
        },
        enableReinitialize: true,
        validate: values => {
            const errors = {};
    
            // Validate board name
            if (!values.boardName) {
                errors.boardName = 'Required';
            }
    
            // Validate columns
            const columnsErrors = values.columns.map(column => {
                if (!column.columnName) {
                    return { columnName: 'Required' };
                }
                return null;
            });
    
            if (columnsErrors.some(error => error !== null)) {
                errors.columns = columnsErrors;
            }
    
            return errors;
        },
        onSubmit: values => {
            const boardData = {
                boardName: values.boardName,
                columns: values.columns.map(column => ({
                    columnName: column.columnName,
                    tasks: column.tasks
                }))
            };
            if (initialFormValues) {
                updateBoard(initialFormValues._id, boardData);
            } else {
                addBoardForm(boardData);
            }
            formik.resetForm();
            console.log(formik.initialValues, "formik");
            onClose();
        }
    });
    
    const addColumn = () => {
        formik.setFieldValue('columns', [...formik.values.columns, { columnName: '', tasks: [] }]);
    };
    
    const removeColumn = (index) => {
        const newColumns = formik.values.columns.filter((_, colIndex) => colIndex !== index);
        formik.setFieldValue('columns', newColumns);
    };
    

    return (
        <dialog id={id} className="modal" open={isModalOpen}>
            <div className="modal-box rounded p-4">
                <form onSubmit={formik.handleSubmit}>
                    <h3 className="font-bold text-lg capitalize">{initialFormValues ? 'Edit Board' : 'Add new board'}</h3>
                    <label htmlFor="board-name" className="mt-3 capitalize block cursor-pointer text-secondary font-bold text-xs">
                        Board Name
                    </label>
                    <input
                        type="text"
                        id="board-name"
                        placeholder="e.g Web Development"
                        name="boardName"
                        className="input h-9 mt-1 input-bordered w-full"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.boardName}
                    />
                    {formik.touched.boardName && formik.errors.boardName ? (
                        <div className="mt-1 error">{formik.errors.boardName}</div>
                    ) : null}

                    <label htmlFor="board-columns" className="mt-4 capitalize block cursor-pointer text-secondary font-bold text-xs">
                        Board Columns
                    </label>
                    {formik.values.columns.map((column, index) => (
                        <React.Fragment key={index}>
                            <div className="flex">
                                <input
                                    type="text"
                                    name={`columns[${index}].columnName`}
                                    placeholder="e.g To Do"
                                    className="input h-9 mt-1 input-bordered w-full"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.columns[index].columnName}
                                />
                                <span
                                    className="fa solid flex items-center text-2xl fa-xmark ms-3 cursor-pointer"
                                    onClick={() => removeColumn(index)}
                                ></span>
                            </div>
                            {formik.touched.columns && formik.touched.columns[index] && formik.errors.columns && formik.errors.columns[index] ? (
                                <div className="mt-1 error">{formik.errors.columns[index].columnName}</div>
                            ) : null}
                        </React.Fragment>
                    ))}
                    <button
                        type="button"
                        className="mt-2 min-h-9 py-1 px-3 w-full size-3 rounded-full capitalize btn btn-white"
                        onClick={addColumn}
                    >
                        + Add new column
                    </button>
                    <button
                        className="mt-2 min-h-9 py-1 px-3 w-full size-3 rounded-full capitalize btn btn-primary"
                        type="submit"
                    >
                        {initialFormValues ? 'Save Changes' : 'Create New Board'}
                    </button>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop" onClick={onClose}>
                <button>close</button>
            </form>
        </dialog>
    );
};

export default AddNewBoard;
