/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import React from 'react'

import FreelancerStrip from '../FreelancerStrip'

const FreelancerList = ({ data, freelancers, updateActiveProject }) => (
  <div className="flex flex-col">
    {freelancers?.map((freelancer, i) => (
      <FreelancerStrip
        rate={data[i].budget}
        key={freelancer._id}
        freelancer={freelancer}
        updateFreelancerIndex={updateActiveProject}
        index={i}
      />
    ))}
  </div>
)

export default FreelancerList
