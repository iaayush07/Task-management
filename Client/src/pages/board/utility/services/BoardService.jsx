import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);

  const getBoards = () => {
    axios.get('http://localhost:3000/api/boards')
      .then((res) => {
        setBoards(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <BoardContext.Provider value={{ boards }}>
      {children}
    </BoardContext.Provider>
  );
};
