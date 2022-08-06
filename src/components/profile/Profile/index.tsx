import React from 'react'

import { isReadOnlyContext } from '../../../hooks/useIsReadOnlyContext'
import Bio from '../Bio'
import Contacts from '../Contacts'
import CountriesICanWork from '../ContriesICanWork'
import DeveloperCommunityInvolement from '../DeveloperCommunityInvolement'
import Education from '../Education'
import Heading from '../Heading'
import Hobbies from '../Hobbies'
import Languages from '../Languages'
import ProfessionalExperience from '../ProfessinalExperience'
import Skills from '../Skills'
import Sport from '../Sport'

interface Props {
  isReadOnly?: any
  data: any
  countries?: any
}

const SideBarContainer = ({ children }) => <div className="bg-resume py-4">{children}</div>
const MainContainer = ({ children }) => <div>{children}</div>

const Profile = ({ countries, data, isReadOnly }: Props) => (
  <isReadOnlyContext.Provider value={isReadOnly}>
    <div className="max-w-5xl mx-auto w-full">
      <Heading data={data} />
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-profile lg:min-h-screen ">
        <SideBarContainer>
          <Contacts data={data.contact} />
          <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
          <Education data={data.education} />
          <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
          <Skills data={data.skills} />
        </SideBarContainer>
        <MainContainer>
          <Bio data={data.bio} />
          <ProfessionalExperience data={data.professionalExperience} />
        </MainContainer>
      </div>
      <div className="my-10 flex flex-col-reverse lg:grid lg:grid-cols-profile lg:min-h-screen ">
        <SideBarContainer>
          <Languages data={data.languages} />
          <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
          <Hobbies data={data.hobbies} />
          <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
          <Sport data={data.sports} />
          <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
          <CountriesICanWork countries={countries} data={data.countriesICanWork} />
          <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
        </SideBarContainer>
        <DeveloperCommunityInvolement data={data.developerCommunityInvolement} />
      </div>
    </div>
  </isReadOnlyContext.Provider>
)
export default Profile

Profile.defaultProps = {
  isReadOnly: false,
  countries: null,
}
