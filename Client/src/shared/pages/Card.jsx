import React from 'react'

const Card = ({task}) => {
    // console.log(board);
    return (
        <div className="card card-compact bg-base-100 mt-3 shadow-xl cursor-pointer">
            <div className="card-body">
                <h2 className="font-bold card-title text-base mb-0">{task.taskName}</h2>
                <div className='text-secondary font-bold text-xs'>2 of {task.subtasks.lenght} subtasks</div>
            </div>
        </div>
    )
}

export default Card