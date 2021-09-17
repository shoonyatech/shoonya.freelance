/* eslint-disable react/button-has-type */
import { gql, useMutation, useQuery } from '@apollo/client'
import Button from '@material-ui/core/Button'
import Slider from '@material-ui/core/Slider'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

interface SkillsObj {
  name: string
  scale: number
}

const GET_USER = gql`
  {
    user(_id: "613890d00e9d3a2bfc8dd2f7") {
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

const Skills = () => {
  const classes = useStyles()

  const [edit, setEdit] = useState<boolean>(false)
  const { loading, data } = useQuery(GET_USER)
  const [updateUserSkills, { error }] = useMutation(UPDATE_USER)
  const [skills, setSkills] = useState<SkillsObj[]>([])

  useEffect(() => {
    if (data?.user?.skills) {
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
      const filterTypename = data.user.professionalExperience.map(({ __typename, ...rest }) => rest)
      setSkills(filterTypename)
      setEdit(false)
    } else setSkills([])
  }

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateUserSkills({
      variables: { _id: '613890d00e9d3a2bfc8dd2f7', skills },
      refetchQueries: [{ query: GET_USER }],
    })
    setEdit(!edit)
  }

  return (
    <div className="p-6">
      {!edit ? (
        <button className="float-right" onClick={() => setEdit(true)}>
          <EditIcon />
        </button>
      ) : null}
      <h3 className="text-xl md:text-2xl  uppercase pb-3">skills</h3>
      {edit ? (
        <form onSubmit={updateUser} className="flex flex-col ">
          {skills.map((skill, i): any => (
            <div className="flex flex-col">
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
          {data.user.skills.map((skill): any => (
            <div>
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
