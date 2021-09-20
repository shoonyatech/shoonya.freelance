/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import { gql, useMutation, useQuery } from '@apollo/client'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import TextEditor from '../TextEditor'
import TextEditorReadOnly from '../TextEditorReadOnly'

interface developerCommunityInvolementObj {
  title: string
  description: string
}

const GET_USER = gql`
  {
    user(_id: "613890d00e9d3a2bfc8dd2f7") {
      developerCommunityInvolement {
        title
        description
      }
    }
  }
`

const UPDATE_USER = gql`
  mutation UpdateUserDeveloperCommunityInvolement(
    $_id: ID!
    $developerCommunityInvolement: [DeveloperCommunityInvolementInput]
  ) {
    updateUserDeveloperCommunityInvolement(_id: $_id, developerCommunityInvolement: $developerCommunityInvolement) {
      developerCommunityInvolement {
        title
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
    savecancelbtn: {
      marginRight: '.5rem',
    },
  })
)

const DeveloperCommunityInvolement = () => {
  const classes = useStyles()
  const [edit, setEdit] = useState<boolean>(false)
  const { loading, data } = useQuery(GET_USER)
  const [updateUserDeveloperCommunityInvolement, { error }] = useMutation(UPDATE_USER)
  const [developerCommunityInvolement, setDeveloperCommunityInvolement] = useState<developerCommunityInvolementObj[]>(
    []
  )

  useEffect(() => {
    if (data?.user?.developerCommunityInvolement) {
      const filterTypename = data.user.developerCommunityInvolement.map(({ __typename, ...rest }) => rest)
      setDeveloperCommunityInvolement(filterTypename)
      setEdit(false)
    } else setEdit(true)
  }, [data])

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error! ${error.message}</div>

  const handleChange = (index: number) => (evt: ChangeEvent<HTMLInputElement>) => {
    setDeveloperCommunityInvolement([
      ...developerCommunityInvolement.slice(0, index),
      { ...developerCommunityInvolement[index], [evt.target.name]: evt.target.value },
      ...developerCommunityInvolement.slice(index + 1),
    ])
  }

  const handleEditorChange = (index: number) => (evt: any) => {
    setDeveloperCommunityInvolement([
      ...developerCommunityInvolement.slice(0, index),
      { ...developerCommunityInvolement[index], description: evt },
      ...developerCommunityInvolement.slice(index + 1),
    ])
  }
  const handleDelete = async (i: number) => {
    const filterDeletedItem = developerCommunityInvolement.filter((_, index) => index !== i)
    await updateUserDeveloperCommunityInvolement({
      variables: { _id: '613890d00e9d3a2bfc8dd2f7', developerCommunityInvolement: filterDeletedItem },
      refetchQueries: [{ query: GET_USER }],
    })
  }

  const cancelUpdateUser = () => {
    if (data?.user?.developerCommunityInvolement) {
      const filterTypename = data.user.developerCommunityInvolement.map(({ __typename, ...rest }) => rest)
      setDeveloperCommunityInvolement(filterTypename)
      setEdit(false)
    } else setDeveloperCommunityInvolement([])
  }

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateUserDeveloperCommunityInvolement({
      variables: { _id: '613890d00e9d3a2bfc8dd2f7', developerCommunityInvolement },
      refetchQueries: [{ query: GET_USER }],
    })
    setEdit(!edit)
  }

  const addDeveloperCommunityInvolement = () => {
    setDeveloperCommunityInvolement([
      ...developerCommunityInvolement,
      {
        title: '',
        description: '',
      },
    ])
  }

  return (
    <div className="p-4 md:p-6">
      {!edit ? (
        <button className="float-right" onClick={() => setEdit(true)}>
          <EditIcon />
        </button>
      ) : null}
      <h3 className="text-xl md:text-2xl uppercase pb-3">developer community involement</h3>
      {edit ? (
        <form className="flex flex-col" onSubmit={updateUser}>
          <div>
            {developerCommunityInvolement.map((dev, i: number) => (
              <div key={i} className="flex flex-col pb-28">
                <Button onClick={() => handleDelete(i)} className={classes.btn}>
                  <DeleteIcon color="error" />
                </Button>
                <TextField
                  label="Title"
                  margin="dense"
                  value={dev.title}
                  name="title"
                  onChange={handleChange(i)}
                  variant="outlined"
                  color="primary"
                  required
                  fullWidth
                />
                <div className="text-xl md:text-2xl">Description</div>
                <TextEditor handleEditorChange={handleEditorChange(i)} defaultValue={dev.description} />
              </div>
            ))}
          </div>
          <Button className={classes.btn} onClick={() => addDeveloperCommunityInvolement()}>
            Add Developer Community Involvement
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
          {data.user.developerCommunityInvolement.map((dev, i): any => (
            <div key={i}>
              <div className="font-bold uppercase">{dev.title}</div>
              <TextEditorReadOnly defaultValue={dev.description} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DeveloperCommunityInvolement
