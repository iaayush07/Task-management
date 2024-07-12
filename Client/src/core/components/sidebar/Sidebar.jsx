import React, { useContext } from 'react'
import AddNewBoard from '../../../pages/modals/AddNewBoard'
import ThemeController from '../../theme/ThemeController';
import { BoardContext } from './../../../pages/board/utility/services/BoardService'

const Sidebar = () => {
  const { boards } = useContext(BoardContext);
  console.log("sidebar===>", boards);

  const closeModal = () => {
    document.getElementById('my_modal_2').close();
  };
  return (
    <div className='sidebar pb-10 flex flex-col justify-between h-full pe-4'>
      <div className="logo">
        <h1 className='font-extrabold text-3xl px-5 py-3'>kanban</h1>
        <div className='uppercase text-secondary text-sm px-5 py-3'>All boards ({boards.length})</div>
        <ul className=''>
          {
            boards.map((board, index) => (
              <li className='py-2 text-secondary'>
                <a href="" className='capitalize font-bold text-sm px-5 py-3'>
                  <span className='fa-solid fa-table-columns'></span>
                  <span className='ms-3'>{board?.name}</span>
                </a>
              </li>
            ))
          }
        </ul>
        <a className="capitalize cursor-pointer text-primary font-bold text-sm px-5 py-3"
          onClick={() => document.getElementById('my_modal_2').showModal()}>
          <span className='fa-solid fa-table-columns'></span>
          <span className='ms-3'>+ Create New Board</span>
        </a>
      </div>
      <div className=''>
        {/* <div className="mode-wrapper flex justify-center items-center ms-5 p-3 rounded">
          <span className='fa-solid fa-sun'></span>
          <label className="switch ms-4">
            <input type="checkbox" value="synthwave" className="toggle theme-controller" />
            <span className="slider round"></span>
          </label>
          <span className='fa-solid fa-moon ms-4'></span>
        </div> */}
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
      <AddNewBoard id="my_modal_2"
        title="Create New Board"
        content="Enter the details of the new board."
        onClose={closeModal} />
    </div>
  )
}

export default Sidebar