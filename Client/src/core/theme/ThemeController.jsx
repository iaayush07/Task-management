import React, { useEffect, useState } from 'react'

const ThemeController = () => {
    const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  return (
    <div className={`flex justify-center items-center ms-5 p-3 rounded bg-neutral`}>
      <span className='fa-solid fa-sun'></span>
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === 'dark'}
        className="toggle theme-controller ms-4"
      />
      <span className='fa-solid fa-moon ms-4'></span>
    </div>
  )
}

export default ThemeController