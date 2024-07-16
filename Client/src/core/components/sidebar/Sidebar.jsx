import React, { useContext } from 'react'
import AddNewBoard from '../../../pages/modals/AddNewBoard'
import ThemeController from '../../theme/ThemeController';
import { BoardContext } from './../../../pages/board/utility/services/BoardService'

const Sidebar = () => {
  const { boards, activeBoardId,setActiveBoard  } = useContext(BoardContext);

  const closeModal = () => {
    document.getElementById('add_new_board_modal').close();
  };
  return (
    <div className='sidebar pb-10 flex flex-col justify-between h-full pe-4'>
      <div className="logo">
        <h1 className='font-extrabold text-3xl px-5 py-3'>kanban</h1>
        <div className='uppercase text-secondary text-sm px-5 py-3'>All boards ({boards.length})</div>
        <ul className=''>
          {
            boards.map((board, index) => (
              <li className={`py-2 ${board._id === activeBoardId ? 'active' : ''} text-secondary`} 
                key={index} onClick={() => setActiveBoard(board._id)}
                >
                <a href="Javascript:void(0)" className='capitalize font-bold text-sm px-5 py-3'>
                  <span className='fa-solid fa-table-columns'></span>
                  <span className='ms-3'>{board?.boardName}</span>
                </a>
              </li>
            ))
          }
        </ul>
        <a className="capitalize cursor-pointer text-primary font-bold text-sm px-5 py-3 block mt-2"
          onClick={() => document.getElementById('add_new_board_modal').showModal()}>
          <span className='fa-solid fa-table-columns'></span>
          <span className='ms-3'>+ Create New Board</span>
        </a>
      </div>
      <div className=''>
        <ThemeController />
        <div className='text-secondary px-5 py-3 font-bold cursor-pointer'>
          <span className='fa-sharp fa-solid fa-eye-slash'>
          </span>
          <span className='ms-3'>
            Hide sidebar
          </span>
        </div>
      </div>
      {/* modal */}
      <AddNewBoard id="add_new_board_modal"
        title="Create New Board"
        content="Enter the details of the new board."
        onClose={closeModal} />
    </div>
  )
}

export default Sidebar