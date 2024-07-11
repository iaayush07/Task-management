import React, { useEffect, useState } from 'react'

const ThemeController = () => {
    const [theme, setTheme] = useState('mytheme');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'mytheme' ? 'dark' : 'mytheme'));
  };
  return (
    <div className="mode-wrapper flex justify-center items-center ms-5 p-3 rounded">
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