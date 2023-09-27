import { gql } from '@apollo/client'

export const CREATE_STUDENT = gql`
	mutation createStudent {
		createStudent(data: { password: "helloWorld", email: "john@doe.com" }) {
			data {
				id
				attributes {
					email
					password
				}
			}
		}
	}
`
