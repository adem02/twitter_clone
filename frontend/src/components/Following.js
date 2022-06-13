import React, { useState } from "react"
import Modal from "react-modal"
import { Link } from "react-router-dom"
import { customStyles } from "../styles/CustomModalStyles"
import "../styles/tweet.css"

export default function Following({ followings = [] }) {
    const [modalIsOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <div>
            <span onClick={openModal}>
                <p> Following {followings.length}</p>
            </span>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Modal" style={customStyles}>
                <span className="exit" onClick={closeModal}>
                    <i className="fa fa-times" aria-hidden="true" />
                </span>
                <div className="header" />
                <div style={{ marginLeft: "20px" }}>
                    {followings.length > 0 && followings.map((person) => (
                        <div style={{ borderBottom: "1px solid lightGrey", padding: "5px" }}>
                            <div className="tweet-header">
                                <img src={person.avatar} style={{ width: "40px", borderRadius: "50%" }} alt="avatar" />

                                <Link to={`/user/${person.followId}`}>
                                    <h4 className="name">{person.name} </h4>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    )
}