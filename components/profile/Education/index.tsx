/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import 'react-datepicker/dist/react-datepicker.css'

import { gql, useMutation, useQuery } from '@apollo/client'
import { useUser } from '@auth0/nextjs-auth0'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'

import DeleteAlert from '../DeleteAlert'

interface educationObj {
  degree: string
  school: string
  startYear: number
  endYear: number | null
}

const GET_USER = gql`
  query User($_id: ID!) {
    user(_id: $_id) {
      education {
        startYear
        endYear
        degree
        school
      }
    }
  }
`

const UPDATE_USER = gql`
  mutation UpdateUserEducation($_id: ID!, $education: [EducationInput]) {
    updateUserEducation(_id: $_id, education: $education) {
      education {
        degree
        school
        startYear
        endYear
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
    savecancelbtn: {
      marginRight: '.5rem',
    },
  })
)

const Education = () => {
  const classes = useStyles()
  const { user } = useUser()
  const [popUp, setPopup] = useState({ show: false, index: null })
  const [edit, setEdit] = useState<boolean>(false)
  const [education, setEducation] = useState<educationObj[]>([])
  const userId = user?.sub?.split('|')[1]
  const { loading, data } = useQuery(GET_USER, {
    variables: { _id: userId },
  })
  const [updateUserEducation, { error }] = useMutation(UPDATE_USER)

  useEffect(() => {
    if (data?.user?.education) {
      const filterTypename = data.user.education.map(({ __typename, ...rest }) => rest)
      setEducation(filterTypename)
      setEdit(false)
    } else setEdit(true)
  }, [data])
  if (loading) return <div>Loading...</div>

  if (error) return <div>Error! ${error.message}</div>

  const cancelUpdateUser = () => {
    if (data?.user?.education) {
      const filterTypename = data.user.education.map(({ __typename, ...rest }) => rest)
      setEducation(filterTypename)
      setEdit(false)
    } else setEducation([])
  }

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateUserEducation({
      variables: { _id: userId, education },
      refetchQueries: [{ query: GET_USER, variables: { _id: userId } }],
    })
    setEdit(!edit)
  }

  const handleChange = (index: number, type: any) => (evt: ChangeEvent<HTMLInputElement>) => {
    const value = type === 'checkbox' ? evt.target.checked : evt.target.value
    setEducation([
      ...education.slice(0, index),
      { ...education[index], [evt.target.name]: value },
      ...education.slice(index + 1),
    ])
  }

  const handleTimeChange = (date: Date, index: number, startOrEnd: string) => {
    setEducation([
      ...education.slice(0, index),
      { ...education[index], [startOrEnd]: date.getFullYear() },
      ...education.slice(index + 1),
    ])
  }

  const openPopup = (i) => {
    setPopup({ show: true, index: i })
  }
  const closePopUp = () => {
    setPopup({ show: false, index: null })
  }

  const handleDelete = async () => {
    const filterDeletedItem = education.filter((_, index) => index !== popUp.index)
    await updateUserEducation({
      variables: { _id: userId, education: filterDeletedItem },
      refetchQueries: [{ query: GET_USER, variables: { _id: userId } }],
    })
    closePopUp()
  }

  const addEducation = () => {
    setEducation([
      ...education,
      {
        degree: '',
        school: '',
        startYear: new Date().getFullYear(),
        endYear: new Date().getFullYear(),
      },
    ])
  }

  return (
    <div className="flex flex-col px-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl md:text-2xl uppercase">education</h3>
        {!edit ? (
          <button type="button" onClick={() => setEdit(true)}>
            <EditIcon />
          </button>
        ) : null}
      </div>
      {edit ? (
        <form className="flex flex-col" onSubmit={updateUser}>
          <div className="self-end pt-2">
            {education.map((edu, i: number) => (
              <div className="flex flex-col" key={i}>
                <IconButton onClick={() => openPopup(i)} className={classes.btn}>
                  <DeleteIcon color="error" />
                </IconButton>
                <TextField
                  label="Degree"
                  margin="dense"
                  value={edu.degree}
                  name="degree"
                  onChange={handleChange(i, 'degree')}
                  variant="outlined"
                  color="primary"
                  required
                />
                <TextField
                  label="School/University"
                  margin="dense"
                  value={edu.school}
                  name="school"
                  onChange={handleChange(i, 'school')}
                  variant="outlined"
                  color="primary"
                  required
                />
                <div>
                  <label>Start Year</label>
                  <DatePicker
                    selected={new Date(`${edu?.startYear}`)}
                    onChange={(date: Date) => handleTimeChange(date, i, 'startYear')}
                    showYearPicker
                    dateFormat="yyyy"
                  />
                </div>
                <div>
                  <label htmlFor="endYear">End Year</label>
                  <DatePicker
                    selected={new Date(`${edu?.endYear}`)}
                    onChange={(date: Date) => handleTimeChange(date, i, 'endYear')}
                    showYearPicker
                    dateFormat="yyyy"
                  />
                </div>
              </div>
            ))}
            {popUp.show ? <DeleteAlert closePopUp={closePopUp} handleDelete={handleDelete} /> : null}

            <Button className={classes.btn} onClick={() => addEducation()}>
              Add New Education
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
          </div>
        </form>
      ) : (
        <div>
          {data.user.education.map((edu, i) => (
            <div key={i}>
              <div className="font-bold">{edu.degree}</div>
              <div>{edu.school}</div>
              <div>
                {edu.startYear} - {edu.endYear}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Education
