import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);
  const [activeBoardId, setActiveBoardId] = useState(null);

  const getBoards = () => {
    axios.get('http://localhost:3000/api/boards')
      .then((res) => {
        setBoards(res.data);
        if (res.data.length > 0 && !activeBoardId) {
          setActiveBoardId(res.data[0]._id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const setActiveBoard = (boardId) => {
    setActiveBoardId(boardId);
    // console.log(`Active board ID changed to: ${boardId}`);
  };
  const addBoardForm = (boardData) => {
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/boards/add',
      data: boardData
    }).then(res => {
      // console.log("post call", res);
      getBoards();
      setActiveBoardId(res.data._id)
    })
      .catch(err => {
        console.error("Post call error:", err.response ? err.response.data : err.message);
      });
  }

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <BoardContext.Provider value={{ boards, activeBoardId, setActiveBoard, addBoardForm }}>
      {children}
    </BoardContext.Provider>
  );
};
