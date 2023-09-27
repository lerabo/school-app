import { gql } from '@apollo/client'

export const CarouselQuery = gql`
	query Carousels {
		carousels {
			data {
				attributes {
					images {
						data {
							attributes {
								url
							}
						}
					}
					title
					desc
					href
				}
			}
		}
	}
`
