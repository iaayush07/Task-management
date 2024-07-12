import React, { useContext } from 'react'
import Card from '../../../shared/pages/Card'
import { BoardContext } from './../utility/services/BoardService';

const Boards = () => {
    const { boards } = useContext(BoardContext);
    // console.log("board===>" ,boards);
    return (
        <React.Fragment>
            {
                boards?.length ? (
                    <div className='flex board'>
                        {
                            boards?.map((board, index) => (
                                <div className="column" key={index}>
                                    <div className="title text-secondary text-sm font-bold">
                                        {board?.name} ({board?.columns?.length})
                                    </div>
                                    <Card board={board} />
                                </div>
                            ))
                        }
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