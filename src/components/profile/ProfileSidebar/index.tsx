/* eslint-disable arrow-body-style */
import React from 'react'

import Contacts from '../Contacts'
import CountriesICanWork from '../ContriesICanWork'
import Education from '../Education'
import Hobbies from '../Hobbies'
import Languages from '../Languages'
import Skills from '../Skills'
import Sport from '../Sport'

interface Props {
  data: any
  page: 1 | 2
  countries?: any
}

const defaultProps = {
  countries: null,
}

const ProfileSidebar = ({ data, page, countries }: Props) => {
  return (
    <div className="bg-resume py-4">
      {page === 1 ? (
        <>
          <Contacts data={data.contact} />
          <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
          <Education data={data.education} />
          <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
          <Skills data={data.skills} />
        </>
      ) : (
        <>
          <Languages data={data.languages} />
          <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
          <Hobbies data={data.hobbies} />
          <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
          <Sport data={data.sports} />
          <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
          <CountriesICanWork countries={countries} data={data.countriesICanWork} />
          <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
        </>
      )}
    </div>
  )
}
export default ProfileSidebar

ProfileSidebar.defaultProps = defaultProps
