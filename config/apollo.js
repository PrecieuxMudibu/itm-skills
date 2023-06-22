import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	from,
	HttpLink,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const httpLink = new HttpLink({
	uri: process.env.NEXT_PUBLIC_API,
})

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(({ message, locations, path }) => {
			console.error(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
			console.log(locations, path, message)
		})
	}
	if (networkError) {
		console.error(`[Network error]: ${JSON.stringify(networkError, null, 2)})`)
	}
})

export const client = new ApolloClient({
	link: from([errorLink, httpLink]),
	cache: new InMemoryCache(),
})
