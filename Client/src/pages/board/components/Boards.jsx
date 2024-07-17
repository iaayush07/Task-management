import React, { useContext, useState, useEffect } from 'react';
import Card from '../../../shared/pages/Card';
import { BoardContext } from './../utility/services/BoardService';
import AddNewBoard from '../../modals/AddNewBoard';

const Boards = () => {
    const { boards, activeBoardId } = useContext(BoardContext);
    const activeBoard = boards.find(board => board._id === activeBoardId);
    const [isModalOpen, setModalOpen] = useState(false);
    const [initialFormValues, setInitialFormValues] = useState(null);

    const openBoardModal = () => {
        setInitialFormValues({
            boardName: activeBoard?.boardName || '',
            columns: activeBoard?.columns.map(column => ({ columnName: column.columnName })) || [{ columnName: '' }]
        });
        setModalOpen(true);
    };

    const closeBoardModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        if (isModalOpen && initialFormValues) {
            console.log(initialFormValues);
        }
    }, [isModalOpen, initialFormValues]);

    return (
        <React.Fragment>
            {boards?.length ? (
                <div className='flex board'>
                    {activeBoard?.columns.map((column, index) => (
                        <React.Fragment key={index}>
                            <div className="column">
                                <div className="flex items-center">
                                    <div className="title text-secondary text-sm font-bold">
                                        {column.columnName} ({column.tasks.length})
                                    </div>
                                </div>
                                {column?.tasks?.map((task, index) => (
                                    <Card task={task} key={index} />
                                ))}
                            </div>
                        </React.Fragment>
                    ))}
                    <div className="column">
                        <div
                            className="title cursor-pointer text-secondary text-xl flex justify-center items-center h-full font-bold add-column-wrapper"
                            onClick={openBoardModal}
                        >
                            + New column
                        </div>
                    </div>
                </div>
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
