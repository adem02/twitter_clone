import React, { useState } from 'react'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteTweet } from '../../store/tweet/tweet-actions'
import { customManageTweetStyles } from "../../styles/customManageTweetStyles"


const ManageTweet = ({ id, token }) => {
    const dispatch = useDispatch()
    const [modalIsOpon, setIsOpen] = useState(false)
    const { tweetId } = useParams()
    const navigate = useNavigate()


    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    const handleDeleteTweet = () => {
        dispatch(deleteTweet(`tweet/${id}`, { token, id }))

        id === tweetId && navigate(-1)
    }

    return (
        <div style={{ position: 'relative' }}>
            <span onClick={openModal} className="manageTweet" style={{ marginLeft: "10px" }}>
                <i className="fas fa-ellipsis-h"></i>
            </span>
            <Modal
                isOpen={modalIsOpon}
                onRequestClose={closeModal}
                contentLabel="Modal"
                style={customManageTweetStyles}
            >
                <button onClick={handleDeleteTweet} className="manageTweetButton">Supprimer ce tweet ?</button>
            </Modal>
        </div>
    )
}

export default ManageTweet