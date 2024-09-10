import React, { useContext, useState, useEffect } from 'react';
import Card from '../../../shared/pages/Card';
import { BoardContext } from './../utility/services/BoardService';
import AddNewBoard from '../../modals/AddNewBoard';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const Boards = () => {
    const { boards, activeBoardId, updateBoard } = useContext(BoardContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [initialFormValues, setInitialFormValues] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // console.log('Boards:', boards);
        // console.log('Active Board ID:', activeBoardId);
        setLoading(false);
    }, [boards, activeBoardId]);

    const activeBoard = boards.find(board => board._id === activeBoardId);

    useEffect(() => {
        // console.log('Active Board:', activeBoard);
        if (activeBoard) {
            // console.log('Active Board Columns:', activeBoard.columns);
        }
    }, [activeBoard]);

    const openBoardModal = () => {
        setInitialFormValues({
            boardName: activeBoard?.boardName || '',
            columns: activeBoard?.columns.map(column => ({
                columnName: column.columnName,
                tasks: column.tasks.map(task => ({
                    taskName: task.taskName,
                    description: task.description,
                    subtasks: task.subtasks
                }))
            })) || [{ columnName: '', tasks: [] }],
            _id: activeBoardId
        });
        setModalOpen(true);
    };

    const closeBoardModal = () => {
        setModalOpen(false);
    };

    const onDragEnd = (result) => {
        // console.log('Drag End:', result);
        const { source, destination } = result;

        // If no destination, exit
        if (!destination) return;

        const startColumn = activeBoard.columns.find(column => column.columnName === source.droppableId);
        const endColumn = activeBoard.columns.find(column => column.columnName === destination.droppableId);

        if (!startColumn || !endColumn) return;

        const [movedTask] = startColumn.tasks.splice(source.index, 1);
        endColumn.tasks.splice(destination.index, 0, movedTask);

        const updatedBoard = {
            ...activeBoard,
            columns: activeBoard.columns.map(column =>
                column.columnName === startColumn.columnName ? { ...startColumn } :
                column.columnName === endColumn.columnName ? { ...endColumn } : column
            )
        };

        updateBoard(activeBoardId, updatedBoard);
    };

    useEffect(() => {
        if (isModalOpen && initialFormValues) {
            // Perform necessary actions when the modal opens
        }
    }, [isModalOpen, initialFormValues]);

    if (loading || !boards.length || !activeBoard) {
        return <div>Loading...</div>;
    }

    return (
        <React.Fragment>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className='flex board'>
                    {activeBoard.columns.map((column) => (
                        <Droppable key={column.columnName} droppableId={column.columnName}>
                            {(provided, snapshot) => (
                                <div
                                    className={`column px-2 ${snapshot.isDraggingOver ? 'bg-base-300' : ''}`}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <div className="flex items-center">
                                        <div className="title capitalize text-secondary text-sm mb-3 font-bold">
                                            {column.columnName} ({column.tasks.length})
                                        </div>
                                    </div>
                                    {column.tasks.map((task, index) => (
                                        <Card
                                            activeBoard={activeBoard}
                                            task={task}
                                            boardId={activeBoardId}
                                            key={task._id}
                                            updateBoard={updateBoard}
                                            index={index}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                    <div className="column">
                        <div
                            className="title rounded cursor-pointer text-secondary text-xl flex justify-center items-center h-full font-bold bg-base-300"
                            onClick={openBoardModal}
                        >
                            + New column
                        </div>
                    </div>
                </div>
            </DragDropContext>
            <AddNewBoard id="add_new_board_modal" isModalOpen={isModalOpen} initialFormValues={initialFormValues} onClose={closeBoardModal} />
        </React.Fragment>
    );
};

export default Boards;
