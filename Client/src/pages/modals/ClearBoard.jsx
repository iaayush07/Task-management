import React, { useContext} from 'react';
import { BoardContext } from '../board/utility/services/BoardService';

const ClearBoard = ({ id, title, closeClearBoardModal, content }) => {
    const { activeBoardId, clearBoard } = useContext(BoardContext);
    return (
        <dialog id={id} className="modal">
            <div className="modal-box p-4">
                <h3 className="font-bold text-lg capitalize">{title}</h3>
                <p className="mt-3">
                    {content}
                </p>
                <div className="flex justify-end mt-3">
                    <button type='button'  className='btn btn-error px-5 text-white' onClick={()=> clearBoard(activeBoardId, closeClearBoardModal)}>Clear</button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop" onClick={closeClearBoardModal}>
                <button>close</button>
            </form>
        </dialog>
    )
}

export default ClearBoard