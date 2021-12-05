import React from 'react'

import { isArrayEmpty } from '../../../lib/utils'
import MasterDetailsLayout from '../../common/MasterDetailsLayout'
import FreelancerList from '../../freelancer/FreelancerList'
import Profile from '../../profile/Profile'

const Proposals = ({ data, updateActiveProject, activeFreelancer }) => {
  if (isArrayEmpty(data)) return <p>No proposals</p>

  return (
    <MasterDetailsLayout>
      <FreelancerList data={data} updateActiveProject={updateActiveProject} />
      <Profile data={activeFreelancer} isReadOnly />
    </MasterDetailsLayout>
  )
}
export default Proposals
