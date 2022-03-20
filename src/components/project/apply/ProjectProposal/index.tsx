import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import React from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    textField: {
      marginBottom: '1.5rem',
    },
  })
)

const ProjectProposal = ({ currency, submitProposal, cancelProposal, data, handleChange }) => {
  const classes = useStyles()

  const handleProposalChange = (e) => {
    handleChange(e.target.name, e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await submitProposal()
  }

  return (
    <div className="p-2 md:p-3">
      <h3 className="text-2xl text-black">Project proposal</h3>
      <form onSubmit={handleSubmit} className="py-8">
        <TextField
          className={classes.textField}
          value={data.coverLetter}
          onChange={handleProposalChange}
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
          onChange={handleProposalChange}
          value={data.proposedRate}
          required
          fullWidth
          startAdornment={<InputAdornment position="start">{currency}</InputAdornment>}
        />
        <div className="flex gap-x-4">
          <Button onClick={() => cancelProposal()} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Send Proposal
          </Button>
        </div>
      </form>
    </div>
  )
}
export default ProjectProposal
