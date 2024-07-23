import React, { useState } from 'react';
import ManageTasks from '../../pages/modals/ManageTasks';

const Card = ({ task, activeBoard, boardId, updateBoard }) => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [isTaskOpen, setIsTaskOpen] = useState(false);
    const [taskColumn, setTaskColumn] = useState('');
    const [updatedBoardData, setUpdatedBoardData] = useState('');

    const handleTaskUpdate = (updatedTask) => {
        setSelectedTask(updatedTask);
    };

    const handleColumnChange = (taskId, newColumnName) => {
        const currentColumn = activeBoard.columns.find(column =>
            column.tasks.some(t => t._id === taskId)
        );
        const newColumn = activeBoard.columns.find(column => column.columnName === newColumnName);

        if (currentColumn !== newColumn) {
            const updatedCurrentColumn = {
                ...currentColumn,
                tasks: currentColumn.tasks.filter(t => t._id !== taskId)
            };

            const updatedNewColumn = {
                ...newColumn,
                tasks: [...newColumn.tasks, { ...selectedTask, columnName: newColumnName }]
            };

            const updatedBoardDataa = {
                columns: activeBoard.columns.map(column => {
                    if (column.columnName === currentColumn.columnName) {
                        return updatedCurrentColumn;
                    } else if (column.columnName === newColumn.columnName) {
                        return updatedNewColumn;
                    }
                    return column;
                })
            };
            setUpdatedBoardData(updatedBoardDataa);
            setTaskColumn(newColumnName);
            setSelectedTask(prevTask => ({ ...prevTask, columnName: newColumnName }));
        } else {
            setTaskColumn(newColumnName);
        }
    };

    const closeManageTasksModal = () => {
        document.getElementById('manage_tasks_modal').close();
        setIsTaskOpen(false);
        setSelectedTask(null);
        if (updatedBoardData) {
            updateBoard(boardId, updatedBoardData);
        }
    };

    const openManageTasksModal = (task) => {
        setSelectedTask(task);
        setIsTaskOpen(true);
        const column = activeBoard.columns.find(column => column.tasks.some(t => t._id === task._id));
        setTaskColumn(column ? column.columnName : '');
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
                handleColumnChange={handleColumnChange}
                taskColumn={taskColumn}
            />
        </React.Fragment>
    );
};

export default Card;
