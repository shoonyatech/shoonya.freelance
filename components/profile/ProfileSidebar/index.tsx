import React from 'react'

import Contacts from '../Contacts'
import CountriesICanWork from '../ContriesICanWork'
import Education from '../Education'
import Hobbies from '../Hobbies'
import Languages from '../Languages'
import Skills from '../Skills'
import Sport from '../Sport'

const ProfileSidebar = ({ display, page, userId }) => (
  <div className="bg-resume py-4">
    {page === 1 ? (
      <>
        <Contacts display={display} userId={userId} />
        <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
        <Education display={display} userId={userId} />
        <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
        <Skills display={display} userId={userId} />
      </>
    ) : (
      <>
        <Languages display={display} userId={userId} />
        <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
        <Hobbies display={display} userId={userId} />
        <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
        <Sport display={display} userId={userId} />
        <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
        <CountriesICanWork display={display} userId={userId} />
        <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
      </>
    )}
  </div>
)

export default ProfileSidebar
