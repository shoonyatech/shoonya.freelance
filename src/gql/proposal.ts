/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'

export const GET_USER_PROPOSALS = gql`
  query Proposals($proposser: ID!) {
    proposals(proposser: $proposser) {
      coverLetter
      budget
      projectId
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
