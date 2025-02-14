import React, { useContext, useState } from 'react'
import { BoardContext } from '../../../pages/board/utility/services/BoardService'
import AddNewTask from './../../../pages/modals/AddNewTask';
import ClearBoard from '../../../pages/modals/ClearBoard';

const Header = () => {
  const { boards, activeBoardId } = useContext(BoardContext);
  const [ actionType, setActiontype] = useState('');

  const closeModal = () => {
    document.getElementById('add_new_task_modal').close();
  };

  const closeClearBoardModal = () => {
    document.getElementById('clear_board_modal').close();
  };

  const openActionModal = (type) => {
    document.getElementById('clear_board_modal').showModal();
    setActiontype(type);
  };

  const activeBoard = boards.find(board => board._id === activeBoardId)
  return (
    <header className='p-5 flex items-center justify-between'>
      <h2 className='font-bold capitalize text-xl'>{activeBoard?.boardName}</h2>
      <div>
        <button className="bg-primary font-bold py-2 px-6 text-white rounded-3xl"
          onClick={() => document.getElementById('add_new_task_modal').showModal()}>
          + Add new task
        </button>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button">
            <span className='ms-3 fa-solid fa-ellipsis-vertical cursor-pointer'></span>
          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded z-[1] w-32 mt-7 p-2 shadow">
            <li><div className='p-2'>Edit Board</div></li>
            <li><div className='p-2' onClick={() => openActionModal('clear')}>Clear Board</div></li>
            <li><div className='p-2' onClick={() => openActionModal('delete')}>Delete Board</div></li>
            <li><div className='p-2' onClick={() => openActionModal('reset')}>Reset Board</div></li>
          </ul>
        </div>
      </div>
      <AddNewTask id="add_new_task_modal"
        title="Create New Task"
        content="Enter the details of the new task."
        onClose={closeModal} />
      <ClearBoard id="clear_board_modal"
          actionType ={actionType}
          closeClearBoardModal={closeClearBoardModal} />
    </header>
  )
}

export default Header