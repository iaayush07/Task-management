import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../../../../core/services/interceptor';
import { useToaster } from '../../../../core/utility/custom-hooks/useToaster';
import Toaster from '../../../../shared/components/Toaster';

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);
  const [toast, showToast] = useToaster();
  const [activeBoardId, setActiveBoardId] = useState(null);

  const getBoards = () => {
    axiosInstance.get('/boards')
      .then((res) => {
        setBoards(res.data);
        if (res.data.length > 0 && !activeBoardId) {
          setActiveBoardId(res.data[0]._id);
        }
      })
      .catch((err) => {
        showToast('Error', 'Failed to fetch boards');
        // console.log(err);
      });
  };


  const setActiveBoard = (boardId) => {
    setActiveBoardId(boardId);
    // console.log(`Active board ID changed to: ${boardId}`);
  };
  const addBoardForm = (boardData) => {
    axiosInstance({
      method: 'post',
      url: '/boards/add',
      data: boardData
    }).then(res => {
      // console.log("post call", res);
      showToast('Success', 'New board added successfully');
      getBoards();
      setActiveBoardId(res.data._id)
    })
      .catch(err => {
        console.error("Post call error:", err.response ? err.response.data : err.message);
        showToast('Error', 'Failed to add new board');
      });
  }

  const updateBoard = (boardId, updatedData) => {
    axiosInstance({
        method: 'put',
        url: `/boards/${boardId}`,
        data: updatedData
    }).then(res => {
      // console.log(res.data);
      showToast('Success', 'Board updated successfully');
        getBoards();
    })
    .catch(err => {
      showToast('Error', 'Failed to updated board');
        console.error(err);
    });
};


  const actionBoard = (boardId, closeModal, type) => {
    let actionMethod;
    let urlEndpoint;

    switch (type) {
      case 'clear':
        actionMethod = 'put';
        urlEndpoint = `/boards/${boardId}/clear`;
        break;
      case 'delete':
        actionMethod = 'delete';
        urlEndpoint = `/boards/${boardId}/delete`;
        break;
      case 'reset':
        actionMethod = 'delete';
        urlEndpoint = `/boards`;
        break;
      default:
        console.error('Unknown action type:', type);
        return;
    }

    axiosInstance({
      method: actionMethod,
      url: urlEndpoint
    }).then(res=> {
      closeModal();
      getBoards();
      showToast('Success', `Board ${type}d successfully`);
    }).catch(err=> {
      showToast('Error', `Board ${type}d successfully`);
      console.log(err);
    })
  }

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <BoardContext.Provider value={{ boards, activeBoardId, actionBoard, setActiveBoard, addBoardForm, updateBoard }}>
      {children}
      <Toaster toast={toast} />
    </BoardContext.Provider>
  );
};
