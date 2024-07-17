import React, { useContext,useEffect, useState } from 'react';
import { BoardContext } from '../board/utility/services/BoardService';
import { getModalContent } from '../board/utility/actions';

const ClearBoard = ({ id, closeClearBoardModal, actionType }) => {
    const { activeBoardId, actionBoard } = useContext(BoardContext);
    const [ actionContent, setActionContent] = useState({title : '', content: ''});

    useEffect(() => {
        if (actionType) {
            const content = getModalContent(actionType);
            setActionContent(content);
        }
    }, [actionType]);

    return (
        <dialog id={id} className="modal">
            <div className="modal-box p-4">
                <h3 className="font-bold text-lg capitalize">{actionContent.title}</h3>
                <p className="mt-3">
                {actionContent.content}
                </p>
                <div className="grid grid-cols-2 mt-3 gap-4">
                    <button type='button' className='btn rounded-3xl btn-error px-5 text-white' onClick={() => actionBoard(activeBoardId, closeClearBoardModal, actionType)}>Clear</button>
                    <button type='button' className='btn rounded-3xl btn-white px-5 text-white' onClick={closeClearBoardModal}>Cancel</button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop" onClick={closeClearBoardModal}>
                <button>close</button>
            </form>
        </dialog>
    )
}

export default ClearBoard