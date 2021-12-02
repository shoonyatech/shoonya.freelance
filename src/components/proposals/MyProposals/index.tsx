// import { useQuery } from '@apollo/client'
import React from 'react'

// import { GET_PROJECT } from '../../../gql/project'
// import Loader from '../../common/Loader'
import MasterDetailsLayout from '../../common/MasterDetailsLayout'
import ProjectList from '../../project/ProjectList'

const MyProposals = ({ data }) => (
  <MasterDetailsLayout>
    <ProjectList data={data} />
  </MasterDetailsLayout>
)

export default MyProposals
