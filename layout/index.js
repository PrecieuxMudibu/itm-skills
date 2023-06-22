import styleG from '../styles/generalstyle.module.css'
import SideBarBank from '../components/SideBar'
import Head from 'next/head'

export default function Layout({ children, titre }) {
	return (
		<>
			<Head>
				<title>{titre}</title>
			</Head>
			<div className={'col-12 bg-light'}>
				<div>
					<SideBarBank />
				</div>
				<div className={`${styleG.ml280px}`}>{children}</div>
			</div>
		</>
	)
}
