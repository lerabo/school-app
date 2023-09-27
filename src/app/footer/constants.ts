import { gql } from "@apollo/client"

export const getInfo = ({
	tel,
	web,
	aboutUs,
	email,
}: {
	tel: string
	web: string
	aboutUs: string
	email: string
}) => {
	return [
		{
			label: 'Timetable',
			schedule: [
				{ label: 'Schedule of bells', href: '/bells' },
				{ label: 'Timetable', href: '/timetable' },
				{ label: 'Schedule of electives', href: '/clubs' },
			],
			width: 20,
		},
		{
			label: 'About us',
			text: `${aboutUs}`,
			width: 60,
		},
		{
			label: 'Contacts',
			text: `<strong>Tel:</strong> ${tel}<br /><strong>Email:</strong> <Link href="mailto: ${email}">${email}</Link> <br/><strong>web:</strong> <Link href="${web}">${web}</Link>`,
			width: 20,
		},
	]
}

export const FOOTER_NAV_ITEMS = [
	{ label: 'Home', href: '/' },
	{ label: 'About us', href: '/' },
	{ label: 'Site map', href: '/' },
]

export const InfoQuery = gql`
	query Infos {
		infos {
			data {
				attributes {
					email
					aboutUs
					web
					tel
					description
				}
			}
		}
	}
`