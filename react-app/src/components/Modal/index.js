import React from 'react'
import './index.css'

export const Modal = ({openModal, closeModal, children}) => {
    if (!openModal) return null
    return (
        <>
        <div className="backgroud-style" />
            <div className='modal-style'>
                {children}
                <button onClick={closeModal} className="modal-close-button">Cancel</button>
            </div>
        </>
    )
}
