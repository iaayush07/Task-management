import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

const AddNewBoard = ({ id, onClose }) => {
    const [columns, setColumns] = useState(['']);

    const formik = useFormik({
        initialValues: {
            boardName: '',
            columns: ['']
        },
        validate: values => {
            const errors = {};

            // Validate board name
            if (!values.boardName) {
                errors.boardName = 'Required';
            }

            // Validate columns
            const columnsErrors = values.columns.map(column => {
                if (!column) {
                    return 'Required';
                }
                return '';
            });

            if (columnsErrors.some(error => error !== '')) {
                errors.columns = columnsErrors;
            }

            return errors;
        },
        onSubmit: values => {
            console.log("onsubmit called");
            const boardData = {
                name: values.boardName,
                columns: columns.map(columnName => ({ name: columnName }))
            };
            console.log("anyyyyy =>",boardData);
            axios.post('http://localhost:3000/api/boards/add', boardData)
                .then(res => {
                    console.log(res.data);
                    onClose();
                })
                .catch(err => {
                    console.log(err);
            })
        }
    });

    const addColumn = () => {
        setColumns([...columns, '']);
        formik.setFieldValue('columns', [...formik.values.columns, '']);
    };

    const removeColumn = index => {
        const newColumns = columns.filter((_, colIndex) => colIndex !== index);
        setColumns(newColumns);
        formik.setFieldValue('columns', newColumns);
    };

    return (
        <dialog id={id} className="modal">
            <div className="modal-box p-4">
                <form onSubmit={formik.handleSubmit}>
                    <h3 className="font-bold text-lg capitalize">Add new board</h3>
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
                    {formik.values.columns.map((_, index) => (
                        <React.Fragment>
                            <div className="flex" key={index}>
                                <input
                                    type="text"
                                    name={`columns[${index}]`}
                                    placeholder="e.g To Do"
                                    className="input h-9 mt-1 input-bordered w-full"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.columns[index]}
                                />
                                <span
                                    className="fa solid flex items-center text-2xl fa-xmark ms-3 cursor-pointer"
                                    onClick={() => removeColumn(index)}
                                ></span>
                            </div>
                            <React.Fragment>
                                {formik.touched.columns && formik.touched.columns[index] && formik.errors.columns && formik.errors.columns[index] ? (
                                    <div className="mt-1 error">{formik.errors.columns[index]}</div>
                                ) : null}
                            </React.Fragment>
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
                        Create new board
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
