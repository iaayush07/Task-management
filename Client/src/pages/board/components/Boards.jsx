import React, { useContext, useState, useEffect } from 'react';
import Card from '../../../shared/pages/Card';
import { BoardContext } from './../utility/services/BoardService';
import AddNewBoard from '../../modals/AddNewBoard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Boards = () => {
    const { boards, activeBoardId, updateBoard } = useContext(BoardContext);
    const activeBoard = boards.find(board => board._id === activeBoardId);
    const [isModalOpen, setModalOpen] = useState(false);
    const [initialFormValues, setInitialFormValues] = useState(null);

    const openBoardModal = () => {
        setInitialFormValues({
            boardName: activeBoard?.boardName || '',
            columns: activeBoard?.columns.map(column => ({ 
                columnName: column.columnName,
                tasks: column.tasks.map(task => ({
                    taskName: task.taskName,
                    description : task.description,
                    subtasks : task.subtasks
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
        const { source, destination } = result;

        // If no destination, exit
        if (!destination) return;

        const startColumn = activeBoard.columns.find(column => column.columnName === source.droppableId);
        const endColumn = activeBoard.columns.find(column => column.columnName === destination.droppableId);

        if (!startColumn || !endColumn) return;

        const [movedTask] = startColumn.tasks.splice(source.index, 1);
        endColumn.tasks.splice(destination.index, 0, movedTask);

        const updatedBoard = {
            columns: activeBoard.columns.map(column => 
                column.columnName === startColumn.columnName ? { ...startColumn } :
                column.columnName === endColumn.columnName ? { ...endColumn } : column
            )
        };

        updateBoard(activeBoardId, updatedBoard);
    };

    useEffect(() => {
        if (isModalOpen && initialFormValues) {
        }
    }, [isModalOpen, initialFormValues]);

    return (
        <React.Fragment>
            {boards?.length ? (
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className='flex board'>
                        {activeBoard?.columns.map((column) => (
                            <Droppable key={column.columnName} droppableId={column.columnName}>
                                {(provided) => (
                                    <div
                                        className="column"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <div className="flex items-center">
                                            <div className="title capitalize text-secondary text-sm font-bold">
                                                {column.columnName} ({column.tasks.length})
                                            </div>
                                        </div>
                                        {column?.tasks?.map((task, index) => (
                                            <Draggable key={task._id} draggableId={task._id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <Card
                                                            activeBoard={activeBoard}
                                                            task={task}
                                                            boardId={activeBoardId}
                                                            key={task._id}
                                                            updateBoard={updateBoard}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
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
            ) : (
                <div className='flex flex-col flex-grow justify-center items-center'>
                    <p className='text-secondary text-xl font-semibold'>
                        This board is empty. Create a new column to get started.
                    </p>
                    <button className='bg-primary font-bold py-2 px-6 text-white rounded-3xl mt-3' onClick={openBoardModal}>+ Add Column</button>
                </div>
            )}
            <AddNewBoard id="add_new_board_modal" isModalOpen={isModalOpen} initialFormValues={initialFormValues} onClose={closeBoardModal} />
        </React.Fragment>
    );
};

export default Boards;
