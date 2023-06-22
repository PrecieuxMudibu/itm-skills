import { gql } from '@apollo/client'

export const get_skills = gql`
	query Skills($args: skillSearch) {
		skills(skill: $args) {
			_id
			name {
				fr
				en
			}
		}
	}
`

export const add_skill = gql`
	mutation ADD_SKILL($args: skillInput) {
		addSkill(skill: $args) {
			_id
			name {
				en
				fr
			}
			type
			domain {
				_id
				name {
					en
					fr
				}
			}
			active
		}
	}
`
