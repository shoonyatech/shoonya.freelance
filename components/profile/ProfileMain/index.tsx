import React from 'react'

import Bio from '../Bio'
import DeveloperCommunityInvolement from '../DeveloperCommunityInvolement'
import ProfessionalExperience from '../ProfessinalExperience'

const ProfileMain = ({ page }: { page: 1 | 2 }) => (
  <div>
    {page === 1 ? (
      <>
        <Bio />
        <ProfessionalExperience />
      </>
    ) : (
      <>
        <DeveloperCommunityInvolement />
      </>
    )}
  </div>
)

export default ProfileMain
