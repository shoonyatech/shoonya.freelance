/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import 'react-datepicker/dist/react-datepicker.css'

import { gql, useMutation, useQuery } from '@apollo/client'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'

import TextEditor from '../TextEditor'
import TextEditorReadOnly from '../TextEditorReadOnly'

interface professionalExperienceObj {
  company: string
  jobTitle: string
  date: string
  location: string
  startYear: number
  endYear: number | null
  currentJob: boolean
  description: string
}

const GET_USER = gql`
  {
    user(_id: "613890d00e9d3a2bfc8dd2f7") {
      professionalExperience {
        company
        location
        jobTitle
        currentJob
        startYear
        endYear
        description
      }
    }
  }
`

const UPDATE_USER = gql`
  mutation UpdateUserProfessionalExperience($_id: ID!, $professionalExperience: [ProfessionalExperienceInput]) {
    updateUserProfessionalExperience(_id: $_id, professionalExperience: $professionalExperience) {
      professionalExperience {
        company
        location
        jobTitle
        currentJob
        startYear
        endYear
        description
      }
    }
  }
`

const useStyles = makeStyles(() =>
  createStyles({
    btn: {
      alignSelf: 'flex-end',
      borderRadius: '999px',
    },
  })
)

const ProfessionalExperience = () => {
  const classes = useStyles()
  const [edit, setEdit] = useState<boolean | number>(false)
  const { loading, data } = useQuery(GET_USER)
  const [updateUserProfessionalExperience, { error }] = useMutation(UPDATE_USER)
  const [professionalExp, setProfessionalExp] = useState<professionalExperienceObj[]>([])

  useEffect(() => {
    if (data?.user?.professionalExperience) {
      const filterTypename = data.user.professionalExperience.map(({ __typename, ...rest }) => rest)
      setProfessionalExp(filterTypename)
      setEdit(false)
    } else setEdit(true)
  }, [data])
  if (loading) return <div>Loading...</div>

  if (error) return <div>Error! ${error.message}</div>

  const handleChange = (index: number, type: any) => (evt: ChangeEvent<HTMLInputElement>) => {
    const value = type === 'checkbox' ? evt.target.checked : evt.target.value
    setProfessionalExp([
      ...professionalExp.slice(0, index),
      { ...professionalExp[index], [evt.target.name]: value },
      ...professionalExp.slice(index + 1),
    ])
  }

  const handleEditorChange = (index: number) => (evt: any) => {
    setProfessionalExp([
      ...professionalExp.slice(0, index),
      { ...professionalExp[index], description: evt },
      ...professionalExp.slice(index + 1),
    ])
  }

  const handleTimeChange = (date: Date, index: number, startOrEnd: string) => {
    setProfessionalExp([
      ...professionalExp.slice(0, index),
      { ...professionalExp[index], [startOrEnd]: date.getFullYear() },
      ...professionalExp.slice(index + 1),
    ])
  }

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateUserProfessionalExperience({
      variables: { _id: '613890d00e9d3a2bfc8dd2f7', professionalExperience: professionalExp },
      refetchQueries: [{ query: GET_USER }],
    })
    setEdit(!edit)
  }

  const cancelUpdateUser = () => {
    if (data?.user?.professionalExperience) {
      const filterTypename = data.user.professionalExperience.map(({ __typename, ...rest }) => rest)
      setProfessionalExp(filterTypename)
      setEdit(false)
    } else setProfessionalExp([])
  }

  const addProfessionalExperience = () => {
    setProfessionalExp([
      ...professionalExp,
      {
        company: '',
        jobTitle: '',
        date: '',
        location: '',
        startYear: new Date().getFullYear(),
        endYear: new Date().getFullYear(),
        currentJob: false,
        description: '',
      },
    ])
  }

  const handleDelete = async (i: number) => {
    setProfessionalExp(professionalExp.splice(i, 1))
    await updateUserProfessionalExperience({
      variables: { _id: '613890d00e9d3a2bfc8dd2f7', professionalExperience: professionalExp },
      refetchQueries: [{ query: GET_USER }],
    })
  }

  return (
    <div className="flex flex-col p-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl md:text-2xl uppercase">professional experience</h3>
        {!edit ? (
          <button onClick={() => setEdit(true)}>
            <EditIcon />
          </button>
        ) : null}
      </div>
      {edit ? (
        <form className="flex flex-col" onSubmit={updateUser}>
          <div>
            {professionalExp.map((details, i: number) => (
              <div key={i} className="flex flex-col pb-28">
                <Button onClick={() => handleDelete(i)} className={classes.btn}>
                  <DeleteIcon color="error" />
                </Button>
                <TextField
                  id="outlined-m  ultiline-static"
                  label="Job Title"
                  margin="dense"
                  value={details.jobTitle}
                  name="jobTitle"
                  onChange={handleChange(i, 'Job title')}
                  rows={4}
                  variant="outlined"
                  color="primary"
                  required
                  fullWidth
                />
                <div className="grid grid-cols-2 gap-x-4">
                  <TextField
                    id="outlined-multiline-static"
                    label="Company"
                    name="company"
                    margin="dense"
                    value={details.company}
                    onChange={handleChange(i, 'Company')}
                    rows={4}
                    variant="outlined"
                    color="primary"
                    fullWidth
                    required
                  />
                  <TextField
                    id="outlined-multiline-static"
                    label="Location"
                    name="location"
                    margin="dense"
                    value={details.location}
                    onChange={handleChange(i, 'location')}
                    rows={4}
                    variant="outlined"
                    color="primary"
                    fullWidth
                    required
                  />
                </div>
                <div className="flex">
                  <div>
                    <label>Start Year</label>
                    <DatePicker
                      selected={new Date(`${details?.startYear}`)}
                      onChange={(date: Date) => handleTimeChange(date, i, 'startYear')}
                      showYearPicker
                      dateFormat="yyyy"
                    />
                  </div>
                  <div>
                    <label htmlFor="endYear" className="text-gray-400">
                      End Year
                    </label>
                    <DatePicker
                      disabled={details.currentJob}
                      selected={details?.endYear && !details.currentJob ? new Date(`${details?.endYear}`) : null}
                      onChange={(date: Date) => handleTimeChange(date, i, 'endYear')}
                      showYearPicker
                      dateFormat="yyyy"
                    />
                  </div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={details.currentJob}
                        onChange={handleChange(i, 'checkbox')}
                        name="currentJob"
                        color="primary"
                      />
                    }
                    label="currentJob"
                  />
                </div>
                <div className="pt-6">
                  <div className="text-xl md:text-2xl">Description</div>
                  <TextEditor handleEditorChange={handleEditorChange(i)} defaultValue={details.description} />
                </div>
              </div>
            ))}
          </div>
          <Button className={classes.btn} onClick={() => addProfessionalExperience()}>
            <AddIcon />
          </Button>
          <div className="self-end pt-2">
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={() => cancelUpdateUser()} variant="contained" color="secondary">
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div>
          {data.user.professionalExperience.map((details, i): any => (
            <div className="pb-10" key={i}>
              <div className="font-bold">{details.jobTitle}</div>
              <div>
                <span className="uppercase">{details.company} </span>| {details.location} | {details.startYear} -{' '}
                {details.currentJob ? 'PRESENT' : details.endYear}
              </div>
              <TextEditorReadOnly defaultValue={details.description} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProfessionalExperience
