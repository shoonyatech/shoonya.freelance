import React from 'react'

import ManageProject from '../../manageProject/ManageProject'
import ProposalCard from '../ProposalCard'

const ProposalDetails = ({ data, projectDetails }) => (
  <div>
    <ManageProject data={projectDetails} isReadOnly />
    <ProposalCard data={data} />
  </div>
)

export default ProposalDetails
