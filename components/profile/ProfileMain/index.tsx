import React from 'react'

import Bio from '../Bio'
import DeveloperCommunityInvolement from '../DeveloperCommunityInvolement'
import ProfessionalExperience from '../ProfessinalExperience'

const ProfileMain = ({ page, data, userId }: { page: 1 | 2; data: any; userId: string }) => (
  <div>
    {page === 1 ? (
      <>
        <Bio data={data.bio} userId={userId} />
        <ProfessionalExperience data={data.professionalExperience} userId={userId} />
      </>
    ) : (
      <>
        <DeveloperCommunityInvolement data={data.developerCommunityInvolement} userId={userId} />
      </>
    )}
  </div>
)

export default ProfileMain
