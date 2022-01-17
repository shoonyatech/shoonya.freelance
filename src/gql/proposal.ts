/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'

export const GET_PROPOSAL_BY_ID = gql`
  query GetProposalById($id: ID!) {
    getProposalsById(_id: $id) {
      _id
      coverLetter
      proposedRate
      projectTitle
      currency
      proposser {
        skills
        avatar
        name
        _id
        location
      }
      projectId
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
      proposedRate
      projectId
      projectTitle
      _id
      currency
      projectId
    }
    project(_id: $projectId) {
      owner
    }
  }
`

export const HAS_USER_APPLIED_FOR_PROJECT = gql`
  query HasUserAppliedForProject($projectId: ID!) {
    hasUserAppliedForProject(projectId: $projectId) {
      _id
    }
  }
`

export const GET_PROPOSALS_BY_PROJECT = gql`
  query GetProposalsByProject($projectId: ID!) {
    getProposalsByProject(projectId: $projectId) {
      _id
      coverLetter
      proposedRate
      projectTitle
      currency
      projectId
      proposser {
        _id
        name
        avatar
        skills
        location
      }
    }
  }
`

export const ADD_NEW_PROPOSAL = gql`
  mutation addNewProposal(
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
      proposser {
        _id
        name
        avatar
        skills
        location
      }
    }
  }
`

export const DELETE_PROPOSAL = gql`
  mutation DeleteProposal($id: ID!, $projectId: ID!) {
    deleteProposal(_id: $id, projectId: $projectId) {
      _id
    }
  }
`

export const UPDATE_PROPOSAL = gql`
  mutation UpdateProposal($id: ID!, $coverLetter: String!, $proposedRate: String!) {
    updateProposal(_id: $id, coverLetter: $coverLetter, proposedRate: $proposedRate) {
      _id
      coverLetter
      projectId
      currency
      proposedRate
      projectTitle
    }
  }
`
