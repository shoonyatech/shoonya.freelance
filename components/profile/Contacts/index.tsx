import { gql, useMutation, useQuery } from '@apollo/client'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
// import GitHubIcon from '@material-ui/icons/GitHub'
// import LinkedInIcon from '@material-ui/icons/LinkedIn'
// import MailIcon from '@material-ui/icons/Mail'
// import PhoneIcon from '@material-ui/icons/Phone'
// import RoomIcon from '@material-ui/icons/Room'
// import TwitterIcon from '@material-ui/icons/Twitter'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

interface ContactObj {
  location: string
  phone: string
  mail: string
  linkedin: string
  github: string
  twitter: string
}

const GET_USER = gql`
  query User($_id: ID!) {
    user(_id: $_id) {
      contact {
        location
        phone
        mail
        linkedin
        github
        twitter
      }
    }
  }
`
const UPDATE_USER = gql`
  mutation UpdateUserContact($_id: ID!, $contact: ContactInput) {
    updateUserContact(_id: $_id, contact: $contact) {
      contact {
        location
        phone
        mail
        linkedin
        github
        twitter
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

const Contacts = ({ isReadOnly, userId }) => {
  const classes = useStyles()
  const [edit, setEdit] = useState<boolean>(false)
  const { loading, data } = useQuery(GET_USER, {
    variables: { _id: userId },
  })
  const [updateUserContact, { error }] = useMutation(UPDATE_USER)

  const initialVal = {
    location: '',
    phone: '',
    mail: '',
    linkedin: '',
    github: '',
    twitter: '',
  }

  const [contact, setContact] = useState<ContactObj>(initialVal)

  useEffect(() => {
    if (data?.user?.contact) {
      setContact({
        location: data.user.contact.location,
        phone: data.user.contact.phone,
        mail: data.user.contact.mail,
        linkedin: data.user.contact.linkedin,
        github: data.user.contact.github,
        twitter: data.user.contact.twitter,
      })
      setEdit(false)
    } else setEdit(true)
  }, [data])

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error! ${error.message}</div>

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setContact({
      ...contact,
      [evt.target.name]: evt.target.value,
    })
  }

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateUserContact({
      variables: { _id: userId, contact },
      refetchQueries: [{ query: GET_USER, variables: { _id: userId } }],
    })
    setEdit(!edit)
  }

  const cancelUpdateUser = () => {
    if (data?.user?.contact) {
      setContact({
        location: data.user.contact.location,
        phone: data.user.contact.phone,
        mail: data.user.contact.mail,
        linkedin: data.user.contact.linkedin,
        github: data.user.contact.github,
        twitter: data.user.contact.twitter,
      })
    } else setContact(initialVal)
    setEdit(false)
  }

  return (
    <div className="bg-resume flex flex-col justify-center p-4 md:p-6">
      <h3 className="text-xl md:text-2xl  uppercase pb-3">contacts</h3>
      {edit && isReadOnly ? (
        <form onSubmit={updateUser} className="flex flex-col">
          <div className="flex justify-end">
            <button type="button" className="flex flex-end" onClick={() => setEdit(!edit)}>
              <EditIcon />
            </button>
          </div>
          <TextField
            className="self-start"
            label="Location"
            name="location"
            onChange={handleChange}
            value={contact.location}
            size="small"
            color="primary"
            margin="dense"
            variant="outlined"
          />
          <TextField
            className="self-start"
            label="phone"
            name="phone"
            onChange={handleChange}
            value={contact.phone}
            color="primary"
            margin="dense"
            variant="outlined"
          />
          <TextField
            className="self-start"
            label="mail"
            name="mail"
            onChange={handleChange}
            value={contact.mail}
            size="medium"
            color="primary"
            margin="dense"
            variant="outlined"
          />
          <TextField
            className="self-start"
            label="Linkedin"
            name="linkedin"
            onChange={handleChange}
            value={contact.linkedin}
            color="primary"
            margin="dense"
            variant="outlined"
          />

          <TextField
            className="self-start"
            label="Github"
            name="github"
            onChange={handleChange}
            value={contact.github}
            color="primary"
            margin="dense"
            variant="outlined"
          />
          <TextField
            className="self-start"
            label="Twitter"
            name="twitter"
            onChange={handleChange}
            value={contact.twitter}
            color="primary"
            margin="dense"
            variant="outlined"
          />
          <div className="pt-1 self-end">
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
        <>
          <TextField
            className="self-start"
            onChange={handleChange}
            value={contact.location}
            size="small"
            color="primary"
            margin="dense"
            variant="outlined"
          />
          <TextField
            className="self-start"
            onChange={handleChange}
            value={contact.phone}
            color="primary"
            margin="dense"
            variant="outlined"
          />
          <TextField
            className="self-start"
            onChange={handleChange}
            value={contact.mail}
            size="medium"
            color="primary"
            margin="dense"
            variant="outlined"
          />
          <TextField
            className="self-start"
            onChange={handleChange}
            value={contact.linkedin}
            color="primary"
            margin="dense"
            variant="outlined"
          />

          <TextField
            className="self-start"
            onChange={handleChange}
            value={contact.github}
            color="primary"
            margin="dense"
            variant="outlined"
          />
          <TextField
            className="self-start"
            onChange={handleChange}
            value={contact.twitter}
            color="primary"
            margin="dense"
            variant="outlined"
          />
        </>
      )}
    </div>
  )
}

export default Contacts
