import React from 'react'

const Card = ({board}) => {
    // console.log(board);
    return (
        <div className="card card-compact bg-base-100 mt-3 shadow-xl cursor-pointer">
            <div className="card-body">
                <h2 className="font-bold text-base mb-0">{board.name}</h2>
                <div className='text-secondary font-bold text-xs'>2 of {board.columns.length} subtasks</div>
            </div>
        </div>
    )
}

export default Card