import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../styles/generalstyle.module.css'
import '../styles/global.css'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import { client } from '../config/apollo'
import { Provider } from 'react-redux'
import store from '../redux'

const MyApp = ({ Component, pageProps }) => {
	return (
		<ApolloProvider client={client}>
			<Provider store={store}>
				<Head>
					<title>IFS BANQUE PAGE DE CONNEXION</title>
					<link rel='icon' type='image/png' href={'/ifs.png'}></link>
					<link
						rel='stylesheet'
						href='https://fonts.googleapis.com/icon?family=Material+Icons'
					/>
					<link rel='preconnect' href='https://fonts.googleapis.com' />
					<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
					<link
						href='https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap'
						rel='stylesheet'
					/>
				</Head>
				<Component {...pageProps} />
			</Provider>
		</ApolloProvider>
	)
}

export default MyApp
