/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import React from 'react'

import FreelancerStrip from '../../freelancer/FreelancerStrip'

const ProposalList = ({ freelancers }) => (
  <div className="flex flex-col">
    {freelancers.map((freelancer, i) => (
      <FreelancerStrip key={freelancer._id} freelancer={freelancer} />
    ))}
  </div>
)

export default ProposalList
