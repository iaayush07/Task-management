import React from 'react'
import { useFormik } from 'formik'

const AddNewBoard = ({ id, title, content, onClose }) => {

    const formik = useFormik({
        initialValues : {
            boardName : ''
        },
        onSubmit: values => {
            console.log(values);
        },
        validate : values => {
            let errors = {

            }   
            if(!values.boardName) {
                errors.boardName = 'Required'
            }
            return errors
        }
    })
    console.log(formik.touched);
    
    return (
        <dialog id={id} className="modal">
            <div className="modal-box p-4">
                <form onSubmit={formik.handleSubmit}>
                    <h3 className="font-bold text-lg capitalize">Add new board</h3>
                    <label htmlFor="board-name" className='mt-3 capitalize block cursor-pointer text-secondary font-bold text-xs'>Board Name</label>
                    <input type="text" id='board-name'
                        placeholder="e.g Web Development" name='boardName' className="input h-9 mt-1 input-bordered w-full" 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.boardName}/>
                        {formik.touched.boardName && formik.errors.boardName ? (<div className='mt-1 error'>{formik.errors.boardName}</div>): null}
                    <label htmlFor="board-columns" className='mt-4 capitalize block cursor-pointer text-secondary font-bold text-xs'>Board Columns</label>
                    <div className="flex">
                        <input type="text" id='board-name' placeholder="Board name" className="input h-9 mt-1 input-bordered w-full" />
                        <span className='fa solid flex items-center text-2xl fa-xmark ms-3 cursor-pointer'></span>
                    </div>
                    <div className="flex">
                        <input type="text" id='board-name' placeholder="Board name" className="input h-9 mt-1 input-bordered w-full" />
                        <span className='fa solid flex items-center text-2xl fa-xmark ms-3 cursor-pointer'></span>
                    </div>
                    <div className="flex">
                        <input type="text" id='board-name' placeholder="Board name" className="input h-9 mt-1 input-bordered w-full" />
                        <span className='fa solid flex items-center text-2xl fa-xmark ms-3 cursor-pointer'></span>
                    </div>
                    <button className='mt-2 min-h-9 py-1 px-3 w-full size-3 rounded-full capitalize btn btn-white'>+ Add new column</button>
                    <button className='mt-2 min-h-9 py-1 px-3 w-full size-3 rounded-full capitalize btn btn-primary' type="submit">Create new board</button>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop" onClick={onClose}>
                <button>close</button>
            </form>
        </dialog>
    )
}

export default AddNewBoard