import React from 'react'

import Contacts from '../Contacts'
import CountriesICanWork from '../ContriesICanWork'
import Education from '../Education'
import Hobbies from '../Hobbies'
import Languages from '../Languages'
import Skills from '../Skills'
import Sport from '../Sport'

const ProfileSidebar = ({ isReadOnly, page, userId }) => (
  <div className="bg-resume py-4">
    {page === 1 ? (
      <>
        <Contacts isReadOnly={isReadOnly} userId={userId} />
        <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
        <Education isReadOnly={isReadOnly} userId={userId} />
        <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
        <Skills isReadOnly={isReadOnly} userId={userId} />
      </>
    ) : (
      <>
        <Languages isReadOnly={isReadOnly} userId={userId} />
        <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
        <Hobbies isReadOnly={isReadOnly} userId={userId} />
        <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
        <Sport isReadOnly={isReadOnly} userId={userId} />
        <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
        <CountriesICanWork isReadOnly={isReadOnly} userId={userId} />
        <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
      </>
    )}
  </div>
)

export default ProfileSidebar
