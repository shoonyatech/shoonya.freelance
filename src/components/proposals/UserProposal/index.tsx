/* eslint-disable no-underscore-dangle */
import { useMutation } from '@apollo/client'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { DELETE_PROPOSAL, UPDATE_PROPOSAL } from '../../../gql/proposal'
import Loader from '../../common/Loader'
import ProjectProposal from '../../project/apply/ProjectProposal'
import ProposalCard from '../ProposalCard'

const UserProposal = ({ initialData }) => {
  const router = useRouter()
  const [data, setData] = useState(initialData)
  const [edit, setEdit] = useState(false)

  const toggleEdit = () => setEdit((state) => !state)
  const cancelProposal = () => {
    toggleEdit()
    setData(initialData)
  }

  const handleChange = (key, newValue) => {
    setData({
      ...data,
      [key]: newValue,
    })
  }
  const [updateUserProposal, { loading, error }] = useMutation(UPDATE_PROPOSAL, {
    variables: {
      id: initialData._id,
      coverLetter: data.coverLetter,
      proposedRate: data.proposedRate,
    },
    onCompleted({ updateProposal }) {
      setData(updateProposal)
      toggleEdit()
    },
  })

  const [deleteProposal, { loading: loadingDel, error: loadingErr }] = useMutation(DELETE_PROPOSAL, {
    variables: {
      id: initialData._id,
      projectId: initialData.projectId,
    },
    onCompleted() {
      router.push('/dashboard')
    },
  })

  if (loading) return <Loader open={loading} error={error} />
  if (loadingDel) return <Loader open={loadingDel} error={loadingErr} />

  return (
    <div className="flex flex-col gap-y-4 my-4 px-6 py-2">
      {edit ? (
        <>
          <ProjectProposal
            submitProposal={updateUserProposal}
            currency={initialData.currency}
            cancelProposal={cancelProposal}
            data={data}
            handleChange={handleChange}
          />
        </>
      ) : (
        <>
          <div className="flex gap-x-4">
            <Button onClick={() => toggleEdit()} variant="contained" color="primary">
              Edit
            </Button>
            <Button onClick={() => deleteProposal()} variant="contained" color="primary">
              Delete
            </Button>
          </div>
          <ProposalCard data={data} />
        </>
      )}
    </div>
  )
}

export default UserProposal
