/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'

export const GET_USER_PROPOSALS = gql`
  query Proposals($proposser: ID!) {
    proposals(proposser: $proposser) {
      coverLetter
      budget
    }
  }
`

export const ADD_NEW_PROPOSAL = gql`
  mutation AddNewProposal($coverLetter: String, $budget: String) {
    addNewProposal(coverLetter: $coverLetter, budget: $budget) {
      coverLetter
      budget
    }
  }
`
