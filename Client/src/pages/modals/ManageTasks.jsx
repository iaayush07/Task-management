import React, { useEffect } from 'react';

const ManageTasks = ({ id, closeManageTasksModal, task, isTaskOpen }) => {
    useEffect(() => {
        if (isTaskOpen && task && task.taskName) {
            console.log(task, "manage task");
        }
    }, [isTaskOpen, task]);

    // Return null if task or task.taskName is not available yet
    if (!isTaskOpen || !task || !task.taskName) {
        return null;
    }

    return (
        <dialog id={id} className="modal" open={isTaskOpen}>
            <div className="modal-box p-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg capitalize">{task.taskName}</h3>
                    <span className='ms-3 fa-solid fa-ellipsis-vertical cursor-pointer'></span>
                </div>
                <p>Description: {task.description}</p>
                <div>
                    <h4 className="font-bold text-base capitalize">Subtasks:</h4>
                    {task.subtasks.map((subtask, index) => (
                        <p key={index}>{subtask.subtaskName}</p>
                    ))}
                </div>
            </div>
            <div method="dialog" className="modal-backdrop" onClick={closeManageTasksModal}>
                <button>close</button>
            </div>
        </dialog>
    );
};

export default ManageTasks;
