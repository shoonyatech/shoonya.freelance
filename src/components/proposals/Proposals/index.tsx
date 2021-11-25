import React from 'react'

import { isArrayEmpty } from '../../../lib/utils'
import MasterDetailsLayout from '../../common/MasterDetailsLayout'
import FreelancerList from '../../freelancer/FreelancerList'
import Profile from '../../profile/Profile'

const Proposals = ({ data, freelancers, updateActiveProject, activeFreelancer }) => {
  if (isArrayEmpty(freelancers)) return <p>No proposals</p>

  return (
    <MasterDetailsLayout>
      <FreelancerList data={data} freelancers={freelancers} updateActiveProject={updateActiveProject} />
      <Profile data={activeFreelancer} isReadOnly />
    </MasterDetailsLayout>
  )
}
export default Proposals
