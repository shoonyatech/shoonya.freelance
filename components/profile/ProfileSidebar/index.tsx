import React from 'react'

import Contacts from '../Contacts'
import CountriesICanWork from '../ContriesICanWork'
import Education from '../Education'
import Hobbies from '../Hobbies'
import Languages from '../Languages'
import Skills from '../Skills'
import Sport from '../Sport'

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
    ) : (
      <>
        <Languages />
        <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />

        <Hobbies />
        <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
        <Sport />
        <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
        <CountriesICanWork />
        <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
      </>
    )}
  </div>
)

export default ProfileSidebar
