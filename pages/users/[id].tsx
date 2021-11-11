import { gql } from '@apollo/client'
import { GetServerSideProps } from 'next'
import React from 'react'

import GetApolloClient from '../../apis/apollo.client'
import Profile from '../../components/profile/Profile'

const GET_USER = gql`
  query User($_id: ID!) {
    user(_id: $_id) {
      name
      title
      picture
      bio
      contact {
        location
        phone
        mail
        linkedin
        github
        twitter
      }
      professionalExperience {
        company
        jobTitle
        location
        startYear
        endYear
        description
        currentJob
        techStack
      }
      skills {
        name
        scale
      }
      education {
        degree
        school
        startYear
        endYear
      }
      developerCommunityInvolement {
        title
        description
      }
      languages
      hobbies
      sports
      countriesICanWork
    }
    countries {
      name
    }
  }
`

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

function UserPage({ data, countries }) {
  return <Profile countries={countries} data={data} isReadOnly />
}

export default UserPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await client.query({
    query: GET_USER,
    variables: { _id: context.query.id },
    errorPolicy: 'ignore',
  })

  if (!data.user) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      data: data.user,
      countries: data.countries,
    },
  }
}
