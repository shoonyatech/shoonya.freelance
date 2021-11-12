import { gql, useQuery } from '@apollo/client'
import React from 'react'

import FreelancerCard from '../src/components/profile/FreelancerCard'

const GET_FREELANCER = gql`
  query Freelancer {
    freelancer {
      id
      name
      skills
      experience
      rate
      currency
      image
    }
  }
`

function Freelancer() {
  const { data } = useQuery(GET_FREELANCER)
  return (
    <div>
      {data?.freelancer.map((freelancer) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <FreelancerCard {...freelancer} />
      ))}
    </div>
  )
}

export default Freelancer
