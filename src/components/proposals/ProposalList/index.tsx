/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import React from 'react'

import FreelancerStrip from '../../freelancer/FreelancerStrip'

const ProposalList = ({ data, freelancers }) => (
  <div className="flex flex-col">
    {freelancers.map((freelancer, i) => (
      <FreelancerStrip rate={data[i].budget} key={freelancer._id} freelancer={freelancer} />
    ))}
  </div>
)

export default ProposalList
