import React from 'react'

import Contacts from '../Contacts'
import Education from '../Education'
import Skills from '../Skills'

const ProfileSidebar = () => (
  <div className="bg-resume py-4">
    <Contacts />
    <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
    <Education />
    <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
    <Skills />
  </div>
)

export default ProfileSidebar
