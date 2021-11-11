import { gql } from '@apollo/client'
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import React from 'react'

import GetApolloClient from '../apis/apollo.client'
import Profile from '../components/profile/Profile'
import { getUserId } from '../lib/user-helper'

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

export default function Me({ data, countries }) {
  return <Profile countries={countries} data={data} />
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const session = getSession(context.req, context.res)
    const userId = getUserId(session?.user.sub)
    const { data } = await client.query({
      query: GET_USER,
      variables: { _id: userId },
      errorPolicy: 'ignore',
    })
    return {
      props: {
        data: data.user,
        countries: data.countries,
      },
    }
  },
})
