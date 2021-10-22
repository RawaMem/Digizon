import React from 'react'
import './index.css'
import ReactDom from 'react-dom'

export const Modal = ({openModal, closeModal, children}) => {
    if (!openModal) return null
    return ReactDom.createPortal(
        <>
        <div className="backgroud-style" />
            <div className='modal-style'>
                {children}
                <button onClick={closeModal} className="modal-close-button">Cancel</button>
            </div>
        </>,
        document.getElementById('portal')
    )
}
