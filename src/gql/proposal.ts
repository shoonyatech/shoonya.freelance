/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'

export const GET_PROPOSAL_BY_ID = gql`
  query GetProposalsById($_id: ID!) {
    getProposalsById(_id: $_id) {
      _id
      coverLetter
      budget
      proposser
      projectId
      currency
    }
  }
`
export const GET_PROJECT_BY_ID_AND_PROPOSAL_BY_ID = gql`
  query getProjectByIdAndProposalById($_id: ID!, $proposalId: ID!) {
    project(_id: $_id) {
      _id
      owner
      title
      description
      skills
      scope {
        size
        duration
        experience
      }
      budget {
        type
        currency
        amount
      }
      isPublished
    }
    getProposalsById(_id: $proposalId) {
      _id
      coverLetter
      projectTitle
      proposedRate
      projectId
      currency
    }
  }
`

export const GET_USER_PROPOSALS = gql`
  query GetUserProposals($_id: ID!) {
    getUserProposals(_id: $_id) {
      proposedRate
      coverLetter
      projectId
      projectTitle
      _id
      currency
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
  mutation AddNewProposal(
    $coverLetter: String!
    $proposedRate: String!
    $projectId: ID!
    $projectTitle: String!
    $currency: String!
  ) {
    addNewProposal(
      coverLetter: $coverLetter
      proposedRate: $proposedRate
      projectId: $projectId
      projectTitle: $projectTitle
      currency: $currency
    ) {
      _id
      coverLetter
      proposedRate
      projectTitle
      currency
      projectId
    }
  }
`

export const DELETE_PROPOSAL = gql`
  mutation DeleteProposal($_id: ID!) {
    deleteProposal(_id: $_id) {
      _id
    }
  }
`
