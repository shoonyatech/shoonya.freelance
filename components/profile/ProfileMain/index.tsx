import React from 'react'

import Bio from '../Bio'
import DeveloperCommunityInvolement from '../DeveloperCommunityInvolement'
import ProfessionalExperience from '../ProfessinalExperience'

const ProfileMain = ({ page, data }: { page: 1 | 2; data: any }) => (
  <div>
    {page === 1 ? (
      <>
        <Bio data={data.bio} />
        <ProfessionalExperience data={data.professionalExperience} />
      </>
    ) : (
      <>
        <DeveloperCommunityInvolement data={data.developerCommunityInvolement} />
      </>
    )}
  </div>
)

export default ProfileMain
