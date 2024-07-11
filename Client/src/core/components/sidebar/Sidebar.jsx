import React from 'react'

const Sidebar = () => {
  return (
    <div className='sidebar pb-10 flex flex-col justify-between h-full pe-4'>
      <div className="logo">
        <h1 className='font-extrabold text-3xl px-5 py-3'>kanban</h1>
        <div className='uppercase text-secondary text-sm px-5 py-3'>All boards (3)</div>
        <ul className='navbar'>
          <li className='py-2 text-secondary'>
            <a href="" className='capitalize font-bold text-sm px-5 py-3'>
              <span className='fa-solid fa-table-columns'></span>
              <span className='ms-3'>Any</span>
            </a>
          </li>
          <li className='py-2 text-secondary'>
            <a href="" className='capitalize font-bold text-sm px-5 py-3'>any</a>
          </li>
          <li className='py-2 text-secondary active'>
            <a href="" className='capitalize font-bold text-sm px-5 py-3'>any</a>
          </li>
        </ul>
      </div>
      <div className=''>
        <div className="mode-wrapper flex justify-center items-center ms-5 p-3 rounded">
          <span className='fa-solid fa-sun'></span>
          <label className="switch ms-4">
            <input type="checkbox"></input>
            <span className="slider round"></span>
          </label>
          <span className='fa-solid fa-moon ms-4'></span>
        </div>
        <div className='text-secondary px-5 py-3 font-bold cursor-pointer'>
          <span className='fa-sharp fa-solid fa-eye-slash'>
          </span>
          <span className='ms-3'>
            Hide sidebar
          </span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar