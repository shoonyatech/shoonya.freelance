/* eslint-disable react/no-array-index-key */
import { gql, useMutation, useQuery } from '@apollo/client'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Slider from '@material-ui/core/Slider'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import DeleteAlert from '../DeleteAlert'

interface SkillsObj {
  name: string
  scale: number
}

const GET_USER = gql`
  query User($_id: ID!) {
    user(_id: $_id) {
      skills {
        name
        scale
      }
    }
  }
`

const UPDATE_USER = gql`
  mutation UpdateUserSkills($_id: ID!, $skills: [SkillsInput]) {
    updateUserSkills(_id: $_id, skills: $skills) {
      skills {
        name
        scale
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

const Skills = ({ display, userId }) => {
  const classes = useStyles()
  const [popUp, setPopup] = useState({ show: false, index: null })
  const [edit, setEdit] = useState<boolean>(false)
  const { loading, data } = useQuery(GET_USER, {
    variables: { _id: userId },
  })
  const [updateUserSkills, { error }] = useMutation(UPDATE_USER)
  const [skills, setSkills] = useState<SkillsObj[]>([])

  useEffect(() => {
    if (data?.user?.skills && data?.user?.skills.length !== 0) {
      const filterTypename = data.user.skills.map(({ __typename, ...rest }) => rest)
      setSkills(filterTypename)
      setEdit(false)
    } else setEdit(true)
  }, [data])
  if (loading) return <div>Loading...</div>

  if (error) return <div>Error! ${error.message}</div>
  const handleScaleChange = (index: number) => (_, newValue) => {
    setSkills([...skills.slice(0, index), { ...skills[index], scale: newValue }, ...skills.slice(index + 1)])
  }

  const handleNameChange = (index: number) => (evt: ChangeEvent<HTMLInputElement>) => {
    setSkills([...skills.slice(0, index), { ...skills[index], name: evt.target.value }, ...skills.slice(index + 1)])
  }

  const addSkills = () => {
    setSkills([
      ...skills,
      {
        name: '',
        scale: 3,
      },
    ])
  }

  const cancelUpdateUser = () => {
    if (data?.user?.skills) {
      const filterTypename = data.user.skills.map(({ __typename, ...rest }) => rest)
      setSkills(filterTypename)
    } else setSkills([])
    setEdit(false)
  }

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateUserSkills({
      variables: { _id: userId, skills },
      refetchQueries: [{ query: GET_USER, variables: { _id: userId } }],
    })
    setEdit(!edit)
  }

  const openPopup = (i) => {
    setPopup({ show: true, index: i })
  }
  const closePopUp = () => {
    setPopup({ show: false, index: null })
  }

  const handleDelete = async () => {
    const filterDeletedItem = skills.filter((_, index) => index !== popUp.index)
    await updateUserSkills({
      variables: { _id: userId, skills: filterDeletedItem },
      refetchQueries: [{ query: GET_USER, variables: { _id: userId } }],
    })
    setEdit(false)
    closePopUp()
  }

  return (
    <div className="px-6">
      {!edit || display ? (
        <button type="button" className="float-right" onClick={() => setEdit(true)}>
          <EditIcon />
        </button>
      ) : null}
      <h3 className="text-xl md:text-2xl uppercase pb-3">skills</h3>
      {edit || display ? (
        <form onSubmit={updateUser} className="flex flex-col ">
          {skills.map((skill, i): any => (
            <div key={i} className="flex flex-col">
              <div className="flex">
                <TextField
                  label="skill"
                  name="skill"
                  onChange={handleNameChange(i)}
                  value={skill.name}
                  size="small"
                  color="primary"
                  margin="dense"
                  variant="outlined"
                />
                <IconButton onClick={() => openPopup(i)} className={classes.btn}>
                  <DeleteIcon color="error" />
                </IconButton>
              </div>
              <Slider
                value={skill.scale}
                onChange={handleScaleChange(i)}
                // getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={5}
              />
            </div>
          ))}
          {popUp.show ? <DeleteAlert closePopUp={closePopUp} handleDelete={handleDelete} /> : null}
          <Button className={classes.btn} onClick={() => addSkills()}>
            Add Skills
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
          {data.user.skills.map((skill, i): any => (
            <div key={i}>
              <div>{skill.name}</div>
              <div className="h-2 bg-skillbarempty">
                <div className={`bg-skillbarfilled ${skill.scale < 5 ? `w-${skill.scale}/5` : 'w-full'} h-full`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Skills
