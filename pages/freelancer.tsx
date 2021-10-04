import { gql, useQuery } from '@apollo/client'
import React from 'react'

import FreelancerCard from '../components/profile/FreelancerCard'

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
      {data?.freelancer.map((list) => (
        <FreelancerCard
          name={list.name}
          skills={list.skills}
          experience={list.experience}
          rate={list.rate}
          currency={list.currency}
          image={list.image}
        />
      ))}
    </div>
  )
}

export default Freelancer
