import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import addfile from '../../../assets/addfile.png'
import allfile from '../../../assets/allfile.png'
import Modal from '../../Modal/Upload'
import style from './style.module.css'

const Cardupload = () => {
	const [openfile, setOpenfile] = React.useState(false)
	const handleOpenfile = () => setOpenfile(true)
	const handleClosefile = () => setOpenfile(false)

	return (
		<div>
			<Image
				blurDataURL={addfile}
				placeholder='blur'
				onClick={handleOpenfile}
				src={addfile}
				width=''
				height=''
				alt='open modal'
				className={`${style.card}`}
			/>
			<Link href='/Files'>
				<a>
					<Image
						blurDataURL={allfile}
						placeholder='blur'
						src={allfile}
						alt='tous les fichiers'
						className={`${style.card}`}
					/>
				</a>
			</Link>
			{openfile && (
				<Modal openfile={openfile} handleclosefile={handleClosefile} />
			)}
		</div>
	)
}

export default Cardupload
