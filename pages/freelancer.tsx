import { gql, useQuery } from '@apollo/client'
import React from 'react'

import FreelancerCard from '../components/profile/FreelancerCard'

const GET_FREELANCERS = gql`
  query getFreelancers {
    freelancers {
      id
      name
      skills
      expInYears
      hourlyRate
      currency
      image
    }
  }
`

function Freelancer() {
  const { data } = useQuery(GET_FREELANCERS)
  return (
    <div>
      {data?.freelancers.map((freelancers) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <FreelancerCard {...freelancers} />
      ))}
    </div>
  )
}

export default Freelancer
