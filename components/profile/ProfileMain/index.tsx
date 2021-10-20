import React from 'react'

import Bio from '../Bio'
import DeveloperCommunityInvolement from '../DeveloperCommunityInvolement'
import ProfessionalExperience from '../ProfessinalExperience'

const ProfileMain = ({ page, display, userId }) => (
  <div>
    {page === 1 ? (
      <>
        <Bio display={display} userId={userId} />
        <ProfessionalExperience display={display} userId={userId} />
      </>
    ) : (
      <>
        <DeveloperCommunityInvolement display={display} userId={userId} />
      </>
    )}
  </div>
)

export default ProfileMain
