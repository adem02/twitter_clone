import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signUser } from '../../store/auth/auth-actions'
// import { tokenToString } from 'typescript'

const Signup = () => {
    const dispatch = useDispatch()
    const initialValues = {
        email: '',
        firstname: '',
        lastname: '',
        username: '',
        birthday: new Date(),
        password: ''
    }

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid Email address")
            .required("Email is required"),

        password: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Email is required"),
    })



    return (
        <React.Fragment>
            <h3>Signup</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    dispatch(await signUser('auth/signup', values))
                    setSubmitting(false)
                }}
            >
                <Form>
                    <Field name="firstname" type="text" placeholder="Firstname" />
                    <ErrorMessage name="firstname" component={'div'} />
                    <Field name="lastname" type="text" placeholder="Lastname" />
                    <ErrorMessage name="lastname" component={'div'} />
                    <Field name="username" type="text" autoComplete="off" placeholder="Username" />
                    <ErrorMessage name="username" component={'div'} />
                    <Field name="birthday" type="date" />
                    <ErrorMessage name="birthday" component={'div'} />
                    <Field name="email" type="email" placeholder="Email" />
                    <ErrorMessage name="email" component={'div'} />
                    <Field name="password" type="password" placeholder="Password" />
                    <ErrorMessage name="password" component={'div'} />
                    <button type="submit" className="login-button">
                        <span>Sign up</span>
                    </button>
                </Form>
            </Formik>
            <div className="register">
                <h4>Already have an account?</h4>
                <Link to="../login">Log in</Link>
            </div>
        </React.Fragment>
    )
}

export default Signup