import { useEffect, useState } from 'react'
import { handle_file } from '../helpers'
import { add_skill, get_skills } from '../types/skill'
import { useLazyQuery, useMutation } from '@apollo/client'
import { add_domain, get_domains } from '../types/domain'

const Login = () => {
	const SKILLS_OTHER_ID = '6411b94347f319287eda81ea'

	const [getSkills] = useLazyQuery(get_skills, {
		fetchPolicy: 'network-only',
		nextFetchPolicy: 'cache-and-network',
	})

	const [addSkill] = useMutation(add_skill, {
		fetchPolicy: 'no-cache',
	})

	const [getDomains] = useLazyQuery(get_domains, {
		fetchPolicy: 'network-only',
		nextFetchPolicy: 'cache-and-network',
	})
	const [addDomain] = useMutation(add_domain, {
		fetchPolicy: 'no-cache',
	})

	const [excelFileData, setExcelFileData] = useState([])

	const sendData = async () => {
		let currentFamily = ''
		for (let i = 0; i < excelFileData.length; i++) {
			console.log(`ELEMENT NUMERO---> ${i}`)

			const item = excelFileData[i]
			if (item['FAMILY TITLE'] != currentFamily) {
				currentFamily = item['FAMILY TITLE']
				console.log(currentFamily)
			}
			const responseDomains = await getDomains({
				variables: {
					args: {
						args: {
							name: {
								en: item['FAMILY TITLE'],
							},
						},
					},
				},
			})

			let domain = {}

			if (responseDomains.data.domains.length == 0) {
				// CREATE THE DOMAIN
				const responseMutation = await addDomain({
					variables: {
						args: {
							name: {
								en: item['FAMILY TITLE'],
								fr: item['FAMILY TITLE'],
							},
							skills: [SKILLS_OTHER_ID],
						},
					},
				})
				domain = responseMutation.data.addDomain
				console.log('DOMAINE CREE', responseMutation)
			} else {
				domain = responseDomains.data.domains[0]
			}

			const responseSkills = await getSkills({
				variables: {
					args: {
						args: {
							name: {
								en: item['JOB TITLE'],
							},
						},
					},
				},
			})

			if (responseSkills.data.skills.length == 0) {
				const responseMutation = await addSkill({
					variables: {
						args: {
							type: 'Job',
							domain: domain._id,
							name: {
								en: item['JOB TITLE'],
								fr: item['JOB TITLE'],
							},
							skills: [SKILLS_OTHER_ID],
						},
					},
				})
				console.log('SKILLS CREE', responseMutation)
			}
		}
	}

	useEffect(() => {
		console.log('SEND', excelFileData)
	}, [excelFileData])

	return (
		<>
			<h1>Hello</h1>
			<input
				type='file'
				onInput={(e) =>
					handle_file(e).then((response) => setExcelFileData(response))
				}
			/>
			<button onClick={sendData}>SEND</button>
		</>
	)
}

export default Login

// useEffect(() => {
// 	getSkills({
// 		variables: {
// 			args: {
// 				option: {
// 					limit: '100000',
// 					page: '1',
// 				},
// 			},
// 		},
// 	})
// }, [])

// useEffect(() => {
// 	getDomains({
// 		variables: {
// 			args: {
// 				option: {
// 					limit: '100000',
// 					page: '1',
// 				},
// 			},
// 		},
// 	})
// }, [])
