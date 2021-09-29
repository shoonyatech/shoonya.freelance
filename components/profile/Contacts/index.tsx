import { gql, useMutation, useQuery } from '@apollo/client'
import { useUser } from '@auth0/nextjs-auth0'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import MailIcon from '@material-ui/icons/Mail'
import PhoneIcon from '@material-ui/icons/Phone'
import RoomIcon from '@material-ui/icons/Room'
import TwitterIcon from '@material-ui/icons/Twitter'
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

const Contacts = () => {
  const classes = useStyles()
  const { user } = useUser()
  const [edit, setEdit] = useState<boolean>(false)
  const userId = user?.sub?.split('|')[1]
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
      setEdit(false)
    } else setContact(initialVal)
  }

  return (
    <div className="px-6">
      {!edit ? (
        <button type="button" className="float-right" onClick={() => setEdit(true)}>
          <EditIcon />
        </button>
      ) : null}
      <h3 className="text-xl md:text-2xl  uppercase pb-3">contacts</h3>

      {edit ? (
        <form onSubmit={updateUser} className="flex flex-col w-max">
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
          <ul className="list-none">
            {data?.user?.contact?.location ? (
              <li className="pb-1">
                <RoomIcon />
                <span className="break-all">{data.user.contact.location}</span>
              </li>
            ) : null}
            {data?.user?.contact.phone ? (
              <li className="pb-1">
                <PhoneIcon /> <span className="break-all">{data?.user?.contact.phone}</span>
              </li>
            ) : null}
            {data?.user?.contact.mail ? (
              <li className="pb-1">
                <MailIcon /> <span className="break-all">{data?.user?.contact.mail}</span>
              </li>
            ) : null}

            {data?.user?.contact.linkedin ? (
              <li className="pb-1">
                <LinkedInIcon /> <span className="break-all">{data?.user?.contact.linkedin}</span>
              </li>
            ) : null}

            {data?.user?.contact.github ? (
              <li className="pb-1">
                <GitHubIcon /> <span className="break-all">{data?.user?.contact.github}</span>
              </li>
            ) : null}

            {data?.user?.contact.twitter ? (
              <li className="pb-1">
                <TwitterIcon /> <span className="break-all">{data?.user?.contact.twitter}</span>
              </li>
            ) : null}
          </ul>
        </>
      )}
    </div>
  )
}

export default Contacts
