/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'

import { isArrayEmpty } from '../../../lib/utils'
import MasterDetailsLayout from '../../common/MasterDetailsLayout'
import FreelancerList from '../../freelancer/FreelancerList'
import ProposalCard from '../ProposalCard'

const Proposals = ({ initialData }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const updateActiveProject = (newId) => setActiveIndex(newId)
  if (isArrayEmpty(initialData)) return <p>No proposals</p>

  return (
    <MasterDetailsLayout>
      <FreelancerList
        data={initialData}
        updateActiveProject={updateActiveProject} //  updateActiveProject={updateActiveProject}
      />
      <div>
        <ProposalCard data={initialData[activeIndex]} />
      </div>
    </MasterDetailsLayout>
  )
}
export default Proposals
