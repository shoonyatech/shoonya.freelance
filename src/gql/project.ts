import { gql } from '@apollo/client'

export const UPDATE_PROJECT_BUDGET = gql`
  mutation UpdateProjectBudget($_id: ID!, $budget: BudgetInput) {
    updateProjectBudget(_id: $_id, budget: $budget) {
      budget {
        type
        currency
        amount
      }
    }
  }
`
export const UPDATE_PROJECT_DESCRIPTION = gql`
  mutation UpdateProjectDescription($_id: ID!, $description: String) {
    updateProjectDescription(_id: $_id, description: $description) {
      description
    }
  }
`

export const UPDATE_PROJECT_SCOPE = gql`
  mutation UpdateProjectScope($_id: ID!, $scope: ScopeInput) {
    updateProjectScope(_id: $_id, scope: $scope) {
      scope {
        size
        duration
        experience
      }
    }
  }
`

export const UPDATE_PROJECT_SKILLS = gql`
  mutation UpdateProjectSkills($_id: ID!, $skills: [String]) {
    updateProjectSkills(_id: $_id, skills: $skills) {
      skills
    }
  }
`

export const UPDATE_PROJECT_TITLE = gql`
  mutation UpdateProjectTitle($_id: ID!, $title: String) {
    updateProjectTitle(_id: $_id, title: $title) {
      title
    }
  }
`
