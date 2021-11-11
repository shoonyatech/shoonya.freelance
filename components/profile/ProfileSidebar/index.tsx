/* eslint-disable arrow-body-style */
import React from 'react'

import Contacts from '../Contacts'
import CountriesICanWork from '../ContriesICanWork'
import Education from '../Education'
import Hobbies from '../Hobbies'
import Languages from '../Languages'
import Skills from '../Skills'
import Sport from '../Sport'

const ProfileSidebar = ({
  data,
  page,
  userId,
  countries,
}: {
  data: any
  page: 1 | 2
  userId: string
  countries: any
}) => {
  return (
    <div className="bg-resume py-4">
      {page === 1 ? (
        <>
          <Contacts data={data.contact} userId={userId} />
          <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
          <Education data={data.education} userId={userId} />
          <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
          <Skills data={data.skills} userId={userId} />
        </>
      ) : (
        <>
          <Languages data={data.languages} userId={userId} />
          <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
          <Hobbies data={data.hobbies} userId={userId} />
          <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
          <Sport data={data.sports} userId={userId} />
          <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
          <CountriesICanWork countries={countries} data={data.countriesICanWork} userId={userId} />
          <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
        </>
      )}
    </div>
  )
}
export default ProfileSidebar
