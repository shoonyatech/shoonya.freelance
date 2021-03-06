import Button from '@mui/material/Button'
import Link from 'next/link'
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
      <FreelancerList data={initialData} updateActiveProject={updateActiveProject} />
      <div className="border-2 border-solid m-4 px-4 py-3">
        <div className="flex gap-x-4">
          <Button variant="contained" color="primary">
            Shortlist
          </Button>
          <Button variant="contained" color="primary">
            Reject
          </Button>
          <Button variant="contained" color="primary">
            Hire
          </Button>
          <Link href={`/users/${initialData[activeIndex]?.proposser?._id}`} passHref>
            <Button variant="contained" color="primary">
              View Profile
            </Button>
          </Link>
        </div>
        <ProposalCard data={initialData[activeIndex]} />
      </div>
    </MasterDetailsLayout>
  )
}
export default Proposals
