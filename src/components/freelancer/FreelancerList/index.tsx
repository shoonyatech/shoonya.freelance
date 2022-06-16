/* eslint-disable react/no-array-index-key */
import React from 'react'

import FreelancerStrip from '../FreelancerStrip'

const FreelancerList = ({ data, updateActiveProject }) => {
  const { currency } = data[0]
  return (
    <div className="flex flex-col">
      {data?.map((freelancer, i) => (
        <FreelancerStrip
          rate={freelancer.proposedRate}
          key={freelancer._id}
          currency={currency}
          freelancer={freelancer.proposser}
          updateFreelancerIndex={updateActiveProject}
          index={i}
        />
      ))}
    </div>
  )
}
export default FreelancerList
