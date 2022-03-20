/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import 'react-datepicker/dist/react-datepicker.css'

import { useMutation } from '@apollo/client'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import DatePicker from 'react-datepicker'

import { UserIsReadOnlyContext } from '../../../context/isReadOnlyContext'
import { UPDATE_USER_PROFESSIONALEXPERIENCE } from '../../../gql/user'
import { icons } from '../../../lib/icon'
import { removeKey } from '../../../lib/utils'
import Loader from '../../common/Loader'
import SkillIcons from '../../common/SkillIcons'
import DeleteAlert from '../DeleteAlert'
import TextEditor from '../TextEditor'
import TextEditorReadOnly from '../TextEditorReadOnly'

interface professionalExperienceObj {
  company: string
  jobTitle: string
  location: string
  startYear: number
  endYear: number | null
  currentJob: boolean
  description: string
  techStack: any
}

const useStyles = makeStyles(() =>
  createStyles({
    btn: {
      alignSelf: 'flex-end',
      borderRadius: '999px',
    },
    savecancelbtn: {
      marginRight: '.5rem',
    },
    iconbtn: {
      margin: '0.5rem',
      borderRadius: '1rem',
    },
    active: {
      border: '1px solid',
    },
  })
)

const ProfessionalExperience = ({ data }) => {
  const classes = useStyles()
  const [popUp, setPopup] = useState({ show: false, index: null })
  const [edit, setEdit] = useState<boolean | number>(!data)
  const isReadOnly = useContext(UserIsReadOnlyContext)

  const [professionalExp, setProfessionalExp] = useState<professionalExperienceObj[]>(data)
  const [updatedProfessionalExp, setupdatedProfessionalExp] = useState(null)

  const [updateUserProfessionalExperience, { loading, error }] = useMutation(UPDATE_USER_PROFESSIONALEXPERIENCE, {
    onCompleted(val) {
      const newProfessionalExperience = val.updateUserProfessionalExperience.professionalExperience
      setProfessionalExp(newProfessionalExperience)
      setupdatedProfessionalExp(newProfessionalExperience)
      setEdit(false)
    },
  })

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const filterTypenameMap = professionalExp.map((item) => removeKey('__typename', item))
    await updateUserProfessionalExperience({
      variables: { professionalExperience: filterTypenameMap },
    })
    setEdit(false)
  }

  const cancelUpdateUser = () => {
    const revertUserProfessionalExperience = updatedProfessionalExp || data
    setProfessionalExp(revertUserProfessionalExperience)
    setEdit(false)
  }

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

  const handleSkillChange = (index: number) => (icon) => {
    setProfessionalExp([
      ...professionalExp.slice(0, index),
      { ...professionalExp[index], techStack: icon },
      ...professionalExp.slice(index + 1),
    ])
  }

  const addProfessionalExperience = () => {
    setProfessionalExp([
      ...professionalExp,
      {
        company: '',
        jobTitle: '',
        location: '',
        startYear: new Date().getFullYear(),
        endYear: new Date().getFullYear(),
        currentJob: false,
        description: '',
        techStack: [],
      },
    ])
  }

  const openPopup = (i) => {
    setPopup({ show: true, index: i })
  }
  const closePopUp = () => {
    setPopup({ show: false, index: null })
  }

  const handleDelete = async () => {
    const filterDeletedItem = professionalExp.filter((_, index) => index !== popUp.index)
    const filterTypenameMap = filterDeletedItem.map((item) => removeKey('__typename', item))
    await updateUserProfessionalExperience({
      variables: { professionalExperience: filterTypenameMap },
    })
    closePopUp()
  }

  if (loading) return <Loader open={loading} error={error} />

  return (
    <div className="flex flex-col p-4 md:p-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl uppercase md:text-2xl">professional experience</h3>
        {!edit && !isReadOnly ? (
          <button type="button" onClick={() => setEdit(true)}>
            <EditIcon />
          </button>
        ) : null}
      </div>
      {edit && !isReadOnly ? (
        <form className="flex flex-col" onSubmit={updateUser}>
          <div>
            {professionalExp.map((details, i: number) => (
              <div key={i} className="flex flex-col pb-28">
                <IconButton onClick={() => openPopup(i)} className={classes.btn} size="large">
                  <DeleteIcon color="error" />
                </IconButton>
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
                <SkillIcons techStack={details.techStack} handleSkillChange={(icon) => handleSkillChange(i)(icon)} />
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
            {popUp.show ? <DeleteAlert closePopUp={closePopUp} handleDelete={handleDelete} /> : null}
          </div>
          <Button className={classes.btn} onClick={() => addProfessionalExperience()}>
            Add Professional Experience
          </Button>
          <div className="self-end pt-2">
            <Button className={classes.savecancelbtn} type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button
              className={classes.savecancelbtn}
              onClick={() => cancelUpdateUser()}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div>
          {professionalExp.map((details, i): any => (
            <div className="pb-10" key={i}>
              <div className="flex items-center">
                <div className="mr-2 font-bold">{details.jobTitle}</div>
                {details.techStack.map((icon) => (
                  <span key={icon} className="px-px">
                    {icons[`${icon}`]}
                  </span>
                ))}
              </div>

              <div>
                <span className="uppercase">{details.company} </span>| {details.location} | {details.startYear} -
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
