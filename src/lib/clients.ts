import { HttpLink, InMemoryCache } from '@apollo/client'
import {
	NextSSRInMemoryCache,
	NextSSRApolloClient,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'

export const { getClient } = registerApolloClient(() => {
	return new NextSSRApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			uri: process.env.NEXT_PUBLIC_URL_SERVER_GRAPHQL,
			fetchOptions: { cache: 'no-store' },
		}),
	})
})
