/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
import { useLazyQuery, useMutation } from '@apollo/client'
import { getSession } from '@auth0/nextjs-auth0'
import Button from '@mui/material/Button'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import GetApolloClient from '../../../apis/apollo.client'
import Loader from '../../../src/components/common/Loader'
import SliderContainer from '../../../src/components/common/Slider'
import SeeProposals from '../../../src/components/project/actionBtns/SeeProposals'
import ProjectProposal from '../../../src/components/project/apply/ProjectProposal'
import EditProject from '../../../src/components/project/EditProject'
import Project from '../../../src/components/project/Project'
import { DELETE_PROJECT, GET_PROJECT } from '../../../src/gql/project'
import { ADD_NEW_PROPOSAL, HAS_USER_APPLIED_FOR_PROJECT } from '../../../src/gql/proposal'
import { Project as ProjectProps } from '../../../src/interfaces/project'
import { getUserId } from '../../../src/lib/user-helper'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

const ProjectPage = ({
  initialData,
  isOwner,
  hasUserAppliedForProject,
}: {
  initialData: ProjectProps
  isOwner: boolean
  hasUserAppliedForProject: boolean
}) => {
  const router = useRouter()
  const [edit, setEdit] = useState(false)
  const [slider, setSlider] = useState(false)
  const [data, setData] = useState(initialData)
  const [deleteProject, { loading: delLoad, error: delErr }] = useMutation(DELETE_PROJECT, {
    async onCompleted() {
      router.push('/dashboard')
    },
  })

  const closeSlider = () => setSlider(false)
  const [proposal, setProposal] = useState({
    coverLetter: '',
    proposedRate: 0,
  })
  const handleChange = (key, newValue) =>
    setProposal({
      ...proposal,
      [key]: newValue,
    })

  const [refetchProject, { loading, error }] = useLazyQuery(GET_PROJECT, {
    async onCompleted({ project }) {
      setData(project)
    },
  })

  const getUpdatedProjectDetails = () => {
    refetchProject({
      variables: { _id: data._id },
    })
  }

  const deleteProjectHandler = () => {
    deleteProject({
      variables: {
        _id: data._id,
      },
    })
  }

  const [addNewProposal, { loading: loadAddNewProposal, error: errAddNewProposal }] = useMutation(ADD_NEW_PROPOSAL, {
    variables: {
      coverLetter: proposal.coverLetter,
      proposedRate: proposal.proposedRate,
      projectId: initialData._id,
      projectTitle: data.title,
      currency: data.budget.currency,
    },
    onCompleted({ addNewProposal: { _id } }) {
      router.push(`/proposals/${_id}`)
    },
  })

  const cancelEdit = () => setEdit(false)

  if (loading) return <Loader open={loading} error={error} />
  if (loadAddNewProposal) return <Loader open={loadAddNewProposal} error={errAddNewProposal} />
  if (delLoad) return <Loader open={delLoad} error={delErr} />

  return (
    <div>
      <div className="px-6 py-2 my-4">
        {isOwner && !edit ? (
          // todo : add margin bottom on see proposals btn
          <div className="flex pb-4 gap-x-4">
            <Button onClick={() => setEdit(true)} variant="contained" color="primary">
              Edit
            </Button>
            <Button onClick={() => deleteProjectHandler()} variant="contained" color="primary">
              Delete
            </Button>
            <SeeProposals projectId={data._id} />
          </div>
        ) : null}
        {!isOwner &&
          (!hasUserAppliedForProject ? (
            <Button onClick={() => setSlider(true)} sx={{ marginBottom: '1em' }} variant="contained" color="primary">
              Apply
            </Button>
          ) : (
            <Link href={`/proposals/${hasUserAppliedForProject}`} passHref>
              <Button variant="contained" color="primary">
                See My Proposal
              </Button>
            </Link>
          ))}

        {edit ? (
          <EditProject data={data} cancelEdit={cancelEdit} getUpdatedProjectDetails={getUpdatedProjectDetails} />
        ) : (
          <Project data={data} />
        )}
      </div>
      {slider ? (
        <SliderContainer openOrCloseSlider={slider}>
          <ProjectProposal
            submitProposal={addNewProposal}
            cancelProposal={closeSlider}
            data={proposal}
            handleChange={handleChange}
            currency={data.budget.currency}
          />
        </SliderContainer>
      ) : null}
    </div>
  )
}
export default ProjectPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = getSession(context.req, context.res)
  const userId = getUserId(session?.user.sub)

  const { data } = await client.query({
    query: GET_PROJECT,
    variables: { _id: context.query.id },
    errorPolicy: 'ignore',
  })

  const { data: d } = await client.query({
    query: HAS_USER_APPLIED_FOR_PROJECT,
    variables: {
      projectId: context.query.id,
    },
    errorPolicy: 'ignore',
  })
  const hasUserAppliedForProject = d?.hasUserAppliedForProject?._id || false
  const { project } = data

  if (!project) {
    return {
      notFound: true,
    }
  }
  const isOwner = project.owner === userId
  return {
    props: {
      initialData: project,
      hasUserAppliedForProject,
      isOwner,
    },
  }
}
