import React from 'react'

import Bio from '../Bio'
import DeveloperCommunityInvolement from '../DeveloperCommunityInvolement'
import ProfessionalExperience from '../ProfessinalExperience'

const ProfileMain = ({ isReadOnly, page, userId }) => (
  <div>
    {page === 1 ? (
      <>
        <Bio isReadOnly={isReadOnly} userId={userId} />
        <ProfessionalExperience isReadOnly={isReadOnly} userId={userId} />
      </>
    ) : (
      <>
        <DeveloperCommunityInvolement isReadOnly={isReadOnly} userId={userId} />
      </>
    )}
  </div>
)

export default ProfileMain
