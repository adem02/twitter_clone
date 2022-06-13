import { ErrorMessage, Field, Form, Formik } from "formik"
import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import Modal from "react-modal"
import { customStyles } from "../../styles/CustomModalStyles"
import { createProfile } from "../../store/auth/auth-actions"
import * as Yup from 'yup'


Modal.setAppElement('#root');

const CreateProfile = () => {
    const [modalIsOpon, setIsOpen] = useState(false)
    const dispatch = useDispatch()

    const initialValues = {
        location: "",
        bio: "",
    }

    const validationSchema = Yup.object({
        bio: Yup.string()
            .min(2, "Votre description doit avoir un minimum de 20 caractères"),

        location: Yup.string()
            .min(2, "2 charactères minimum requis")
            .max(20, "20 charactères maximum requis"),
    })

    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <div>
            <button onClick={openModal} className="edit-button">
                Create Profile
            </button>
            <Modal
                isOpen={modalIsOpon}
                onRequestClose={closeModal}
                contentLabel="Modal"
                style={customStyles}
            >
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true)
                        dispatch(createProfile('profile', values))
                        setSubmitting(false)
                        setIsOpen(false)
                    }}
                >
                    <Form>
                        <Field name="location" type="location" placeholder="Location" />
                        <ErrorMessage name="location" component={"div"} />
                        <Field name="bio" type="text" as="textarea" placeholder="Bio" />
                        <ErrorMessage name="bio" component={"div"} />

                        <button type="submit" className="login-button">
                            <span>Create Profile</span>
                        </button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    )
}
export default CreateProfile