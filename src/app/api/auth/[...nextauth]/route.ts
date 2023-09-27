import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
	theme: {
		colorScheme: 'light',
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				try {
					const request = await fetch(
						`${process.env.NEXT_PUBLIC_URL_SERVER_GRAPHQL}`,
						{
							method: 'post',
							body: JSON.stringify({
								query: `
        mutation Login($email: String!, $password: String!) {
  login(input: { identifier: $email, password: $password }) {
    jwt
    user {
      id
      email
      username
    }
  }
}
      `,
								variables: {
									email: credentials.email,
									password: credentials.password,
								},
							}),
							headers: { 'Content-Type': 'application/json' },
						}
					)
					const response = await request.json()
					return {
						user: {
							...response.data.login.user,
							jwt: response.data.login.jwt,
							id: response.data.login.user.id,
						},
					}
				} catch (e) {
					console.log(e)
					return null
				}
			},
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async session({ session, token }) {
			session.user.id = token.id
			session.user.jwt = token.jwt
			session.user.name = token.name
			session.user.email = token.email
			return session
		},
		async jwt({ token, user }) {
			const signedIn = user ? true : false
			if (signedIn) {
				token.id = user.id
				token.jwt = user.jwt
				token.name = user.username
			}
			return token
		},
	},
	session: {
		strategy: 'jwt',
	},

	secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
