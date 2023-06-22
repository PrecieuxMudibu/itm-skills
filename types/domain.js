import { gql } from '@apollo/client'

export const get_domains = gql`
	query Domains($args: domainSearch) {
		domains(domain: $args) {
			_id
			name {
				en
				fr
			}
		}
	}
`

export const add_domain = gql`
	mutation ADD_DOMAIN($args: domainInput) {
		addDomain(domain: $args) {
			_id
			name {
				en
				fr
			}
			skills {
				_id
				type
				name {
					en
					fr
				}
			}
			active
		}
	}
`
