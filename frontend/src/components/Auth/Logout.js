import React, { useState } from "react"
import Modal from "react-modal"
import { useDispatch } from "react-redux";
import { AuthActions } from "../../store/auth/auth-slice";
import "../../styles/logout.css"
import { logoutModalStyles } from "../../styles/LogoutModal"

Modal.setAppElement('#root');


export default function Logout() {
    const [modalIsOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <div className="logout">
            <span onClick={openModal} style={{ flex: 1, flexDirection: "row" }}>
                <h4>
                    <span className="avatar">
                        <i className="fa fa-user fa-5x" aria-hidden="true" style={{ fontSize: '30px' }}></i>
                    </span>
                    <span className="username" style={{ marginLeft: "10px", marginTop: "-10px" }}>
                        me
                    </span>
                    <span className="icon" style={{ marginLeft: "30px" }}>
                        <i className="fas fa-ellipsis-h"></i>
                    </span>
                </h4>
            </span>
            <div style={{ position: "absolute", bottom: 0 }}>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Modal"
                    style={logoutModalStyles}
                >
                    <span onClick={() => dispatch(AuthActions.logoutUser())} style={{ cursor: "pointer" }}>
                        <h4>
                            Log out
                        </h4>
                    </span>
                </Modal>
            </div>
        </div>
    )
}