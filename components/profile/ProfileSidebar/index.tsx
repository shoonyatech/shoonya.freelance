import React from 'react'

import Contacts from '../Contacts'
import Education from '../Education'
import Skills from '../Skills'

const ProfileSidebar = () => (
  <div className="bg-resume py-4">
    <Contacts />
    <Education />
    <Skills />
  </div>
)

export default ProfileSidebar
