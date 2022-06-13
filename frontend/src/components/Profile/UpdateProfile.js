import { ErrorMessage, Field, Form, Formik } from "formik"
import React, { useState } from "react"
import Modal from "react-modal"
import { useDispatch } from "react-redux"
import { updateProfile } from "../../store/auth/auth-actions"
import { customStyles } from "../../styles/CustomModalStyles"



function UpdateProfile({ profile }) {
    const dispatch = useDispatch()

    const [modalIsOpen, setIsOpen] = useState(false)

    const initialValues = {
        bio: profile.bio,
        location: profile.location,
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <div>
            <button onClick={openModal} className="edit-button">
                Edit Profile
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Modal"
                style={customStyles}
            >
                <Formik
                    initialValues={initialValues}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true)
                        dispatch(updateProfile(`profile/${profile.id}`, values))
                        setSubmitting(false)
                        setIsOpen(false)
                    }}
                >
                    <Form>
                        <Field name="location" type="text" placeholder="Location" />
                        <ErrorMessage name="location" component={"div"} />
                        <Field name="bio" type="text" as="textarea" placeholder="Bio" />
                        <ErrorMessage name="bio" component={"div"} />

                        <button type="submit" className="login-button">
                            <span>Update Profile</span>
                        </button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    )
}

export default UpdateProfile