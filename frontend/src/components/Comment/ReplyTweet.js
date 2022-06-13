import axios from "axios"
import { ErrorMessage, Field, Form, Formik } from "formik"
import React, { useState } from "react"
import Modal from "react-modal"
import { useDispatch } from "react-redux"
import * as Yup from "yup"
import { createTweet } from "../../store/tweet/tweet-actions"
import { customStyles } from "../../styles/CustomModalStyles"
import "../../styles/tweet.css"


const ReplyTweet = ({ tweet, id, name, token }) => {


    const [modalIsOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()

    const initialValues = {
        content: ""
    }

    const validationSchema = Yup.object({
        content: Yup.string()
            .required()
            .min(1, "Must be more than 1 character")
            .max(256, "Must be less than 257 characters")
    })

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const handleReply = (content) => {
        const data = {
            content,
            responseTo: id,
            token
        }
        // axios.post(`${process.env.REACT_APP_API_URI_DEV}/tweet`, { responseTo: id, content }, { headers: { 'Authorization': `Bearer ${token}` } })
        //     .then(res => {

        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
        dispatch(createTweet('tweet', data))
    }
    return (
        <div>
            <span onClick={openModal}>
                <i className="far fa-comment" aria-hidden="true" />
            </span>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Modal" style={customStyles}>
                <span className="exit" onClick={closeModal}>
                    <i className="fa fa-times" aria-hidden="true" />
                </span>
                <div className="header" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 8fr", marginTop: "10px" }}>
                    <span className="avatar">
                        <i className="fa fa-user fa-5x" aria-hidden="true" style={{ fontSize: "20px", borderRadius: "50%" }}></i>
                    </span>
                    <h5>{name}</h5>
                </div>
                <p
                    style={{
                        marginLeft: "20px",
                        borderLeft: "1px solid var(--accent)",
                        paddingLeft: "20px",
                        height: "50px",
                        marginTop: 0
                    }}
                >
                    {tweet}
                </p>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true)
                        handleReply(values.content)
                        setSubmitting(false)
                        setIsOpen(false)
                    }}
                >
                    <Form>
                        <span className="avatar">
                            <i className="fa fa-user fa-5x" aria-hidden="true" style={{ fontSize: "20px", borderRadius: "50%" }}></i>
                        </span>
                        <Field name="content" type="text" as="textarea" placeholder="Tweet your reply..." />
                        <ErrorMessage name="content" component={"div"} />

                        <div className="footer" />
                        <button type="submit" className="tweet-button">
                            <span>Reply</span>
                        </button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    )
}

export default ReplyTweet