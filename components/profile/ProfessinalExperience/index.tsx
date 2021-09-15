/* eslint-disable react/button-has-type */
import { gql, useMutation, useQuery } from '@apollo/client'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

interface professionalExperienceObj {
  company: string
  jobtitle: string
  date: string
  location: string
}

const GET_USER = gql`
  {
    user(_id: "613890d00e9d3a2bfc8dd2f7") {
      professionalExperience {
        company
        location
        date
        jobtitle
      }
    }
  }
`

const UPDATE_USER = gql`
  mutation UpdateUserProfessionalExperience($_id: ID!, $professionalExperience: [ProfessionalExperienceInput]) {
    updateUserProfessionalExperience(_id: $_id, professionalExperience: $professionalExperience) {
      professionalExperience {
        company
        jobtitle
        date
        location
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

  const handleChange = (index: number) => (evt: ChangeEvent<HTMLInputElement>) => {
    setProfessionalExp([
      ...professionalExp.slice(0, index),
      { ...professionalExp[index], [evt.target.name]: evt.target.value },
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
        jobtitle: '',
        date: '',
        location: '',
      },
    ])
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
        <form className='flex flex-col' onSubmit={updateUser}>
          <div>
            {professionalExp.map((details, i: number) => (
              <div key={i} className="flex flex-col pb-10">
                <TextField
                  id="outlined-m  ultiline-static"
                  label="Job Title"
                  margin="dense"
                  value={details.jobtitle}
                  name="jobtitle"
                  onChange={handleChange(i)}
                  rows={4}
                  variant="outlined"
                  color="primary"
                  required
                  fullWidth
                />
                <div className="flex justify-between">
                  <TextField
                    id="outlined-multiline-static"
                    label="Company"
                    name="company"
                    margin="dense"
                    value={details.company}
                    onChange={handleChange(i)}
                    rows={4}
                    variant="outlined"
                    color="primary"
                    required
                  />
                  <TextField
                    id="outlined-multiline-static"
                    label="Location"
                    name="location"
                    margin="dense"
                    value={details.location}
                    onChange={handleChange(i)}
                    rows={4}
                    variant="outlined"
                    color="primary"
                    required
                  />
                  <TextField
                    id="outlined-multiline-static"
                    name="date"
                    label="Date"
                    value={details.date}
                    onChange={handleChange(i)}
                    rows={4}
                    margin="dense"
                    variant="outlined"
                    color="primary"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
          <Button className={classes.btn} onClick={() => addProfessionalExperience()}>
            <AddIcon />
          </Button>
          <div className="self-end pt-2">
            <Button type='submit' variant="contained" color="primary">
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
              <div className="font-bold">{details.jobtitle}</div>
              <div>
                <span className="uppercase">{details.company} </span>| {details.location} | {details.date}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProfessionalExperience
