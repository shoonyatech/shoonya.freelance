import React from 'react'

import MasterDetailsLayout from '../../../common/MasterDetailsLayout'
import ManageProject from '../../../manageProject/ManageProject'
import ProjectProposal from '../ProjectProposal'

const Apply = ({ data }) => (
  <div style={{ marginLeft: '57px' }}>
    <MasterDetailsLayout>
      <ProjectProposal />
      <ManageProject data={data} isReadOnly />
    </MasterDetailsLayout>
  </div>
)

export default Apply
