/* eslint-disable react/no-array-index-key */
import { useMutation } from '@apollo/client'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import React, { ChangeEvent, FormEvent, useState } from 'react'

import { UPDATE_USER_SKILLS } from '../../../gql/user'
import useIsReadOnlyContext from '../../../hooks/useIsReadOnlyContext'
import { removeKey } from '../../../lib/utils'
import Loader from '../../common/Loader'
import DeleteAlert from '../DeleteAlert'

interface SkillsObj {
  name: string
  scale: number
}

const Skills = ({ data }) => {
  const [popUp, setPopup] = useState({ show: false, index: null })
  const [edit, setEdit] = useState<boolean>(!data)
  const isReadOnly = useIsReadOnlyContext()

  const [skills, setSkills] = useState<SkillsObj[]>(data)
  const [updatedSkills, setUpdatedSkills] = useState(null)

  const [updateUserSkills, { loading, error }] = useMutation(UPDATE_USER_SKILLS, {
    onCompleted(val) {
      const newSkills = val.updateUserSkills.skills
      setSkills(newSkills)
      setUpdatedSkills(newSkills)
      setEdit(false)
    },
  })

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const filterTypenameMap = skills.map((skill) => removeKey('__typename', skill))
    await updateUserSkills({
      variables: { skills: filterTypenameMap },
    })
    setEdit(!edit)
  }

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
    const revertedUserSkills = updatedSkills || data
    setSkills(revertedUserSkills)
    setEdit(false)
  }

  const openPopup = (i) => {
    setPopup({ show: true, index: i })
  }
  const closePopUp = () => {
    setPopup({ show: false, index: null })
  }

  const handleDelete = async () => {
    const filterDeletedItem = skills.filter((_, index) => index !== popUp.index)
    const filterTypenameMap = filterDeletedItem.map((skill) => removeKey('__typename', skill))
    await updateUserSkills({
      variables: { skills: filterTypenameMap },
    })
    setEdit(false)
    closePopUp()
  }

  if (loading) return <Loader open={loading} error={error} />

  return (
    <div className="px-6">
      {!edit && !isReadOnly ? (
        <IconButton aria-label="edit Skills" className="float-right" onClick={() => setEdit(true)}>
          <EditIcon />
        </IconButton>
      ) : null}
      <h3 className="pb-3 text-xl uppercase md:text-2xl">skills</h3>
      {edit && !isReadOnly ? (
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
                  required
                />
                <IconButton
                  onClick={() => openPopup(i)}
                  sx={{
                    alignSelf: 'flex-end',
                    borderRadius: '999px',
                  }}
                  size="large"
                >
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
          <Button
            sx={{
              alignSelf: 'flex-end',
              borderRadius: '999px',
            }}
            onClick={() => addSkills()}
          >
            Add Skills
          </Button>
          <div className="self-end pt-2">
            <Button
              sx={{
                marginRight: '.5rem',
              }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Save
            </Button>
            <Button
              sx={{
                marginRight: '.5rem',
              }}
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
          {skills.map((skill, i): any => (
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
