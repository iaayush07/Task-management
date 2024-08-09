import React, { useEffect, useState } from 'react';
import ManageTasks from '../../pages/modals/ManageTasks';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ task, activeBoard, boardId, updateBoard, index }) => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [isTaskOpen, setIsTaskOpen] = useState(false);
    const [taskColumn, setTaskColumn] = useState('');
    const [updatedBoardData, setUpdatedBoardData] = useState(null);

    const handleTaskUpdate = (updatedTask) => {
        setSelectedTask(updatedTask);

        const currentColumn = activeBoard.columns.find(column =>
            column.tasks.some(t => t._id === updatedTask._id)
        );

        const updatedCurrentColumn = {
            ...currentColumn,
            tasks: currentColumn.tasks.map(t =>
                t._id === updatedTask._id ? updatedTask : t
            )
        };

        const updatedBoardDataa = {
            columns: activeBoard.columns.map(column =>
                column.columnName === currentColumn.columnName ? updatedCurrentColumn : column
            )
        };

        setUpdatedBoardData(updatedBoardDataa);
    };

    const handleColumnChange = (taskId, newColumnName) => {
        const currentColumn = activeBoard.columns.find(column =>
            column.tasks.some(t => t._id === taskId)
        );
        const newColumn = activeBoard.columns.find(column => column.columnName === newColumnName);

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

    };

    const closeManageTasksModal = () => {
        if (updatedBoardData) {
            updateBoard(boardId, updatedBoardData);
        }
        document.getElementById('manage_tasks_modal').close();
        setIsTaskOpen(false);
        setSelectedTask(null);
    };

    const openManageTasksModal = (task) => {
        setSelectedTask(task);
        setIsTaskOpen(true);
        const column = activeBoard.columns.find(column => column.tasks.some(t => t._id === task._id));
        setTaskColumn(column ? column.columnName : '');
    };

    return (
        <Draggable key={task._id} draggableId={task._id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${snapshot.isDragging ? 'bg-gray-300' : 'bg-base-100'}`}
                >
                    <div className="card card-compact mb-3 shadow-md hover:shadow-xl rounded cursor-pointer" onClick={() => openManageTasksModal(task)}>
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
                </div>
            )}
        </Draggable>
    );
};

export default Card;
