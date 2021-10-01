import { gql } from '@apollo/client'
import React from 'react'

import MasterDetailsLayout from '../../common/MasterDetailsLayout'

const GET_PROJECTS = gql`
  query Projects {
    projects {
      name
      description
      __typename
      priceRange
    }
  }
`

const ProjectMain = () => <MasterDetailsLayout queryToFetchList={GET_PROJECTS} />

export default ProjectMain
