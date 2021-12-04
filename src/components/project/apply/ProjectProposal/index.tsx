import { useMutation } from '@apollo/client'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React, { useState } from 'react'

import { ADD_NEW_PROPOSAL } from '../../../../gql/proposal'
import Loader from '../../../common/Loader'

const useStyles = makeStyles(() =>
  createStyles({
    textField: {
      marginBottom: '1.5rem',
    },
  })
)

const ProjectProposal = ({ closeSlider, projectId, projectTitle, currency }) => {
  const classes = useStyles()
  const [proposal, setProposal] = useState({
    coverLetter: '',
    proposedRate: 0,
  })

  const [addNewProposal, { loading, error }] = useMutation(ADD_NEW_PROPOSAL)

  const handleChange = (e) => {
    setProposal({ ...proposal, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { coverLetter, proposedRate } = proposal
    await addNewProposal({
      variables: { coverLetter, proposedRate, projectId, projectTitle },
    })
    closeSlider()
  }

  if (loading) return <Loader open={loading} error={error} />

  return (
    <div className="p-2 md:p-3">
      <h3 className="text-black text-2xl">Project proposal</h3>
      <form onSubmit={handleSubmit} className="py-8">
        <TextField
          className={classes.textField}
          value={proposal.coverLetter}
          onChange={handleChange}
          name="coverLetter"
          multiline
          rows={10}
          variant="outlined"
          fullWidth
          label="Cover Letter"
          required
        />
        <InputLabel>proposedRate</InputLabel>
        <Input
          className={classes.textField}
          type="number"
          name="proposedRate"
          onChange={handleChange}
          value={proposal.proposedRate}
          required
          fullWidth
          startAdornment={<InputAdornment position="start">{currency}</InputAdornment>}
        />
        <div>
          <Button type="submit" variant="contained" color="primary">
            Apply
          </Button>
        </div>
      </form>
    </div>
  )
}
export default ProjectProposal
