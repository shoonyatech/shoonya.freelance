import React from 'react'

import Contacts from '../Contacts'
import Education from '../Education'
import Skills from '../Skills'

const ProfileSidebar = ({ page }: { page: 1 | 2 }) => (
  <div className="bg-resume py-4">
    {page === 1 ? (
      <>
        <Contacts />
        <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
        <Education />
        <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
        <Skills />
      </>
    ) : null}
  </div>
)

export default ProfileSidebar
