import React, {useContext} from 'react'
import { BoardContext } from '../../../pages/board/utility/services/BoardService'
import AddNewTask from './../../../pages/modals/AddNewTask';

const Header = () => {
  const { boards, activeBoardId } = useContext(BoardContext);

  const closeModal = () => {
    document.getElementById('add_new_task_modal').close();
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
        <span className='ms-3 fa-solid fa-ellipsis-vertical cursor-pointer'></span>
      </div>
      <AddNewTask id="add_new_task_modal"
        title="Create New Task"
        content="Enter the details of the new task."
        onClose={closeModal}/>
    </header>
  )
}

export default Header