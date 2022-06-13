import { ErrorMessage, Field, Form, Formik } from "formik"
import React from "react"
import { useDispatch } from "react-redux"
import * as Yup from "yup"
import { createTweet } from "../../store/tweet/tweet-actions"
import "../../styles/tweet.css"

const HomeTweet = ({ token }) => {
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

	return (
		<div className="home-page-tweet">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					const { content } = values
					const responseTo = null
					setSubmitting(true)
					dispatch(createTweet('tweet', { content, token, responseTo }))
					setSubmitting(false)
					resetForm()
				}}
			>
				<Form>
					<Field name="content" type="text" as="textarea" placeholder="What's happening..." />
					<ErrorMessage name="content" component={"div"} />

					<button type="submit" className="home-tweet-button">
						<span>Tweet</span>
					</button>
				</Form>
			</Formik>
			<div className="footer" />
		</div>
	)
}

export default HomeTweet