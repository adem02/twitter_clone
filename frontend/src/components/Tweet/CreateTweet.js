import { ErrorMessage, Field, Form, Formik } from "formik"
import React, { useState } from "react"
import Modal from "react-modal"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup"
import { TweetIcon } from "../../assets/SVG's/AllSvgs"
import { createTweet } from "../../store/tweet/tweet-actions"
import { customStyles } from "../../styles/CustomModalStyles"
import "../../styles/tweet.css"

Modal.setAppElement('#root');

const CreateTweet = () => {
    const dispatch = useDispatch()

    const [modalIsOpen, setIsOpen] = useState(false)
    const token = useSelector(state => state.auth.token)

    const initialValues = {
        content: "",
    }

    const validationSchema = Yup.object({
        content: Yup.string()
            .required()
            .min(1, "Must be more than 1 character")
            .max(256, "Must be less than 257 characters"),
    })

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <div>
            <button
                className="tweet"
                style={{ marginRight: "10px", marginTop: "30px" }}
                onClick={openModal}
            >
                <span style={{ padding: "15px 70px 15px 70px" }}>Tweet</span>
            </button>
            <button
                className="tweet-svg"
                onClick={openModal}
            >
                <TweetIcon height="25px" width="25px" fill="white" />
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Modal"
                style={customStyles}
            >
                <span className="exit" onClick={closeModal}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </span>
                <div className="header"></div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        const content = values.content;
                        const responseTo = null
                        setSubmitting(true)
                        dispatch(createTweet('tweet', { content, token, responseTo }))
                        setSubmitting(false)
                        setIsOpen(false)
                    }}
                >
                    <Form>
                        <Field
                            name="content"
                            type="text"
                            as="textarea"
                            placeholder="What's happening..."
                        />
                        <ErrorMessage name="content" component={"div"} />

                        <div className="footer"></div>
                        <button type="submit" className="tweet-button">
                            <span>Tweet</span>
                        </button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    )
}

export default CreateTweet