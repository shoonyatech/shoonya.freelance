/* eslint-disable no-underscore-dangle */
import { useQuery } from '@apollo/client'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import { GET_PROJECT } from '../../../gql/project'
import Loader from '../../common/Loader'
import Projects from '../Projects'

const useStyles = makeStyles(() =>
  createStyles({
    btn: {
      marginRight: '.5rem',
    },
  })
)
const ProjectsPageWrapper = ({ data, activeProjectId, updateActiveProjectId }) => {
  const classes = useStyles()
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

  return (
    <>
      <div className="flex justify-end py-2">
        {/* this btn will be added in later commits */}
        {/* <Button className={classes.btn} variant="contained" color="primary">
          Draft
        </Button> */}
        <Link href={`/projects/${activeProjectId}/proposals`} passHref>
          <Button className={classes.btn} variant="contained" color="primary">
            See proposals
          </Button>
        </Link>
      </div>
      <Projects
        data={data}
        activeProjectId={activeProjectId}
        projectData={d.project}
        updateActiveProjectId={updateActiveProject}
      />
    </>
  )
}

export default ProjectsPageWrapper
