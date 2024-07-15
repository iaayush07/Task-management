import React, {useContext} from 'react'
import { BoardContext } from '../../../pages/board/utility/services/BoardService'

const Header = () => {
  const { boards, activeBoardId } = useContext(BoardContext);

  const activeBoard = boards.find(board => board._id === activeBoardId)
  // console.log("header ===>" ,boards);
  return (
    <header className='p-5 flex items-center justify-between'>
      <h2 className='font-bold text-xl'>{activeBoard?.name}</h2>
      <div>
        <button className="bg-primary font-bold py-2 px-6 text-white rounded-3xl">
          + Add new task
        </button>
        <span className='ms-3 fa-solid fa-ellipsis-vertical cursor-pointer'></span>
      </div>
    </header>
  )
}

export default Header