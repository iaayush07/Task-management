import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);
  const [activeBoardId, setActiveBoardId] = useState(null);

  const getBoards = () => {
    axios.get('https://task-management-gilt-eight.vercel.app/api/boards')
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
      url: 'https://task-management-gilt-eight.vercel.app/api/boards/add',
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

  const updateBoard = (boardId, updatedData) => {
    axios({
        method: 'put',
        url: `https://task-management-gilt-eight.vercel.app/api/boards/${boardId}`,
        data: updatedData
    }).then(res => {
      // console.log(res.data);
        getBoards();
    })
    .catch(err => {
        console.error(err);
    });
};


  const actionBoard = (boardId, closeModal, type) => {
    let actionMethod;
    let urlEndpoint;

    switch (type) {
      case 'clear':
        actionMethod = 'put';
        urlEndpoint = `https://task-management-gilt-eight.vercel.app/api/boards/${boardId}/clear`;
        break;
      case 'delete':
        actionMethod = 'delete';
        urlEndpoint = `https://task-management-gilt-eight.vercel.app/api/boards/${boardId}/delete`;
        break;
      case 'reset':
        actionMethod = 'delete';
        urlEndpoint = `https://task-management-gilt-eight.vercel.app/api/boards`;
        break;
      default:
        console.error('Unknown action type:', type);
        return;
    }

    axios({
      method: actionMethod,
      url: urlEndpoint
    }).then(res=> {
      closeModal();
      getBoards();
    }).catch(err=> {
      console.log(err);
    })
  }

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <BoardContext.Provider value={{ boards, activeBoardId, actionBoard, setActiveBoard, addBoardForm, updateBoard }}>
      {children}
    </BoardContext.Provider>
  );
};
