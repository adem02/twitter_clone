import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Link } from "react-router-dom"

import { useDispatch } from 'react-redux'
import { signUser } from '../../store/auth/auth-actions'

const Login = () => {
    const dispatch = useDispatch()


    const initialValues = {
        email: '',
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
            <h3>Log in to Twitter clone</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    dispatch(await signUser('auth/signin', values))
                    setSubmitting(false)
                }}
            >
                <Form>
                    <Field name="email" type="text" placeholder="email" />
                    <ErrorMessage name="email" component={'div'} />
                    <Field name="password" type="password" placeholder="Password" />
                    <ErrorMessage name="password" component={'div'} />
                    <button type='submit' className="login-button">
                        <span>Login</span>
                    </button>
                </Form>
            </Formik>
            <div className="register">
                <h4>Don't have an account ?</h4>
                <Link to='../signup'>Signup</Link>
            </div>
        </React.Fragment>
    )
}

export default Login