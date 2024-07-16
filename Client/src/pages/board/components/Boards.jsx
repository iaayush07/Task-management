import React, { useContext } from 'react'
import Card from '../../../shared/pages/Card'
import { BoardContext } from './../utility/services/BoardService';

const Boards = () => {
    const { boards, activeBoardId } = useContext(BoardContext);
    const activeBoard = boards.find(board => board._id === activeBoardId)
    return (
        <React.Fragment>
            {
                boards?.length ? (
                    <div className='flex board'>
                        {
                            activeBoard?.columns.map((column, index) => (
                                <React.Fragment key={index}>
                                    <div className="column" >
                                        <div className="flex items-center">
                                            {/* <div className='me-2 rounded-full color'>
                                            </div> */}
                                            <div className="title text-secondary text-sm font-bold">
                                                {column.columnName} ({column.tasks.length})
                                            </div>
                                        </div>
                                        {
                                            column?.tasks?.map((task, index) => (
                                                <Card task={task} key={index} />
                                            ))
                                        }
                                    </div>
                                </React.Fragment>
                            ))
                        }
                        <div className="column">
                            <div 
                                className="title cursor-pointer text-secondary text-xl flex justify-center items-center h-full font-bold add-column-wrapper"
                                >
                                + New column
                            </div>
                        </div>
                    </div>
                ) : (<div className='flex flex-col flex-grow justify-center items-center'>
                    <p className='text-secondary text-xl font-semibold'>
                        This board is empty. Create a new column to get started.
                    </p>
                    <button className='bg-primary font-bold py-2 px-6 text-white rounded-3xl mt-3'>+ Add Column</button>
                </div>)
            }
        </React.Fragment>
    )
}

export default Boards