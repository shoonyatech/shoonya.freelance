/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'

export const GET_USER_PROPOSALS = gql`
  query GetProposalsByUser($proposser: ID!) {
    getProposalsByUser(proposser: $proposser) {
      coverLetter
      budget
      projectId
      proposser
    }
  }
`

export const GET_USER_PROPOSALS_AND_PROJECT_OWNER = gql`
  query GetProposals($projectId: ID!) {
    getProposals(projectId: $projectId) {
      coverLetter
      budget
      projectId
      proposser
    }
    project(_id: $projectId) {
      owner
    }
  }
`

export const ADD_NEW_PROPOSAL = gql`
  mutation AddNewProposal($coverLetter: String, $budget: String, $projectId: ID!) {
    addNewProposal(coverLetter: $coverLetter, budget: $budget, projectId: $projectId) {
      projectId
      coverLetter
      budget
    }
  }
`