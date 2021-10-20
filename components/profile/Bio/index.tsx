import { gql, useMutation, useQuery } from '@apollo/client'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import React, { ChangeEvent, useEffect, useState } from 'react'

const GET_USER = gql`
  query User($_id: ID!) {
    user(_id: $_id) {
      bio
    }
  }
`
const UPDATE_USER = gql`
  mutation UpdateUserBio($_id: ID!, $bio: String) {
    updateUserBio(_id: $_id, bio: $bio) {
      bio
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

const Bio = ({ display, userId }) => {
  const classes = useStyles()
  const [edit, setEdit] = useState<boolean>(false)
  const { loading, data } = useQuery(GET_USER, {
    variables: { _id: userId },
  })
  const [updateUserBio, { error }] = useMutation(UPDATE_USER)
  const [bio, setBio] = useState<null | String>('')

  useEffect(() => {
    if (data?.user?.bio) {
      setBio(data.user.bio)
      setEdit(false)
    } else setEdit(true)
  }, [data])
  if (loading) return <div>Loading...</div>

  if (error) return <div>Error! ${error.message}</div>
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setBio(evt.target.value)
  }

  const updateUser = async () => {
    await updateUserBio({
      variables: { _id: userId, bio },
      refetchQueries: [{ query: GET_USER, variables: { _id: userId } }],
    })
    setEdit(!edit)
  }

  const cancelUpdateUser = () => {
    if (data?.user?.bio) {
      setBio(data.user.bio)
    } else setBio('')
    setEdit(false)
  }

  return (
    <div className="p-4 md:p-6">
      {!edit || display ? (
        <button type="button" className="float-right" onClick={() => setEdit(true)}>
          <EditIcon />
        </button>
      ) : null}
      <h3 className="text-xl md:text-2xl uppercase pb-3">bio</h3>
      {edit || display ? (
        <div className="flex flex-col ">
          <TextField
            id="outlined-multiline-static"
            label="Bio"
            value={bio}
            multiline
            onChange={handleChange}
            rows={4}
            variant="outlined"
            color="primary"
            required
            fullWidth
          />
          <div className="self-end pt-2">
            <Button className={classes.savecancelbtn} onClick={() => updateUser()} variant="contained" color="primary">
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
      ) : (
        <div>
          <div>{data?.user?.bio}</div>
        </div>
      )}
    </div>
  )
}
export default Bio
