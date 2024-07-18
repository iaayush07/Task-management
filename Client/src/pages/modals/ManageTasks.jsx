import React, { useEffect, useState } from 'react';

const ManageTasks = ({ id, closeManageTasksModal, task, isTaskOpen, activeBoard, handleTaskUpdate }) => {
    useEffect(() => {
        if (isTaskOpen && task && task.taskName) {
            // console.log(task.subtasks[1]._id, "<=======manage task");
        }
    }, [isTaskOpen, task]);

    if (!isTaskOpen || !task || !task.taskName) {
        return null;
    }
    const handleSubtaskStatus = (subtaskId) => {
        const updatedSubtasks = task.subtasks.map(subtask => 
            subtask._id === subtaskId ? { ...subtask, status: subtask.status === 'completed' ? 'pending' : 'completed' } : subtask
        );
        const updatedTask = { ...task, subtasks: updatedSubtasks };
        handleTaskUpdate(updatedTask);
    };

    return (
        <dialog id={id} className="modal" open={isTaskOpen}>
            <div className="modal-box p-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg capitalize">{task.taskName}</h3>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button">
                            <span className='ms-3 fa-solid fa-ellipsis-vertical cursor-pointer'></span>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded z-[1] w-32 p-2 shadow">
                            <li><div className='p-2'>Edit Task</div></li>
                            <li><div className='p-2'>Delete Task</div></li>
                        </ul>
                    </div>
                </div>
                {
                    task.description && (
                        <p className='mt-3 text-secondary first-letter:capitalize text-sm'>{task?.description}</p>
                    )
                }
                <div>
                    <h4 className="font-bold text-secondary text-sm mt-3">Subtasks ( 2 of {task.subtasks?.length})</h4>
                    {task.subtasks.map((subtask, index) => (
                        // <div className="form-control subtask rounded p-2 bg-opacity-70 mt-2" key={index}>
                            <label className="flex items-center cursor-pointer form-control subtask rounded p-2 bg-opacity-70 mt-2" key={index}>
                                <input type="checkbox"
                                checked={subtask.status === 'completed'}
                                className="checkbox rounded checkbox-xs checkbox-primary" 
                                onChange={()=>handleSubtaskStatus(subtask?._id)} />
                                <span className="label-text text-sm text-secondary ms-3">{subtask.subtaskName}</span>
                            </label>
                    ))}
                </div>
                <h4 className="font-bold text-secondary text-sm mt-3">Current Status</h4>
                <select
                    className="select select-bordered mt-2 w-full"
                    name="selectedColumn">
                    {
                        activeBoard?.columns?.map((column, index) => (
                            <option key={index} value={column.columnName}>{column.columnName}</option>
                        ))
                    }
                </select>
            </div>
            <div method="dialog" className="modal-backdrop" onClick={closeManageTasksModal}>
                <button>close</button>
            </div>
        </dialog>
    );
};

export default ManageTasks;
