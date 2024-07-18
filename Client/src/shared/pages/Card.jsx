import React, { useState } from 'react';
import ManageTasks from '../../pages/modals/ManageTasks';

const Card = ({ task, activeBoard, boardId, updateBoard}) => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [isTaskOpen, setIsTaskOpen] = useState(false);

    const handleTaskUpdate = (updatedTask) => {
        setSelectedTask(updatedTask);
    };

    const closeManageTasksModal = () => {
        document.getElementById('manage_tasks_modal').close();
        setIsTaskOpen(false);
        setSelectedTask(null);

        const updatedBoardData = {
            columns: activeBoard.columns.map(column => 
                column.tasks.some(t => t._id === task._id)
                    ? { ...column, tasks: column.tasks.map(t => t._id === task._id ? selectedTask : t) }
                    : column
            )
        };
        
        updateBoard(boardId, updatedBoardData);
    };

    const openManageTasksModal = (task) => {
        setSelectedTask(task);
        setIsTaskOpen(true);
    };

    return (
        <React.Fragment>
            <div className="card card-compact bg-base-100 mt-3 shadow-md hover:shadow-xl rounded cursor-pointer" onClick={() => openManageTasksModal(task)}>
                <div className="card-body">
                    <h2 className="font-bold capitalize card-title text-base mb-0">{task.taskName}</h2>
                    <div className='text-secondary font-bold text-xs'>{task.subtasks.length} subtasks</div>
                </div>
            </div>
            <ManageTasks
                id="manage_tasks_modal"
                closeManageTasksModal={closeManageTasksModal}
                task={selectedTask}
                isTaskOpen={isTaskOpen}
                activeBoard={activeBoard}
                handleTaskUpdate={handleTaskUpdate}
            />
        </React.Fragment>
    );
};

export default Card;
