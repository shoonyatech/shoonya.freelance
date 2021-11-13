/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'

export const ADD_NEW_PROPOSAL = gql`
  mutation AddNewProposal($coverLetter: String, $budget: String) {
    addNewProposal(coverLetter: $coverLetter, budget: $budget) {
      coverLetter
      budget
    }
  }
`
