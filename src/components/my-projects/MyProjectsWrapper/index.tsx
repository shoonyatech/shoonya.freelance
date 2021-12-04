import { useQuery } from '@apollo/client'
import React, { useState } from 'react'

import { GET_PROJECT } from '../../../gql/project'
import Loader from '../../common/Loader'
import SeeProposals from '../../project/actionBtns/SeeProposals'
import Projects from '../../projects/Projects'

const MyProjectsWrapper = ({ data, activeProjectId, updateActiveProjectId, initialUserHasNoProjects, refreshData, isRefreshing }) => {

    const [isUserHasNoProjects, setIsUserHasNoProjects] = useState(initialUserHasNoProjects)
    const {
        error,
        loading,
        data: d,
        refetch,
    } = useQuery(GET_PROJECT, {
        variables: {
            _id: activeProjectId,
        },
    })
    const updateActiveProject = (newId) => {
        updateActiveProjectId(newId)
        refetch({
            _id: newId,
        })
    }

    if (loading) return <Loader open={loading} error={error} />
    if (isUserHasNoProjects) return <div style={{ marginLeft: '57px' }}>You have no projects</div>


    return (
        <div>
            <div className="flex justify-end py-2">
                <SeeProposals projectId={activeProjectId} />
            </div>
            <Projects
                data={data}
                activeProjectId={activeProjectId}
                projectData={d.project}
                updateActiveProjectId={updateActiveProject}
            />
        </div>
    )
}

export default MyProjectsWrapper
