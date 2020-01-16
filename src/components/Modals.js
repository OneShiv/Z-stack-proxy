import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';
import './Modals.scss';
function Portal({ children }) {
    const modalRoot = document.getElementById('modal-root');
    const [element] = useState(document.createElement('div'));

    useEffect(() => {
        modalRoot.appendChild(element)
        // remove created div
        return function cleanup() {
            modalRoot.removeChild(element)
        }
    }, [modalRoot, element])

    return createPortal(children, element)
}

// A modal component which will be used by other components / pages
function Modal({ children, toggle, open }) {
    return (
        <Portal>
            {open && (
                <div className="wrapper" onClick={toggle}>
                    <span className="closeButton">&times;</span>
                    <div className="modal-body" >
                        {children}
                    </div>
                </div>
            )}
        </Portal>
    )
}

export default Modal
