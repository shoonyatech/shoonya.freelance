/* eslint-disable react/button-has-type */
import { gql, useMutation, useQuery } from '@apollo/client'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import MailIcon from '@material-ui/icons/Mail'
import PhoneIcon from '@material-ui/icons/Phone'
import RoomIcon from '@material-ui/icons/Room'
import TwitterIcon from '@material-ui/icons/Twitter'
import React, { ChangeEvent, useEffect, useState } from 'react'

interface ContactObj {
  location: string
  phone: string
  mail: string
  linkedin: string
  github: string
  twitter: string
}

const GET_USER = gql`
  {
    user(_id: "6134b89dc6afe90180393569") {
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

const Contacts = () => {
  const [edit, setEdit] = useState<boolean>(false)
  const { loading, data } = useQuery(GET_USER)
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
    if (data?.user?.contact)
      setContact({
        location: data.user.contact.location,
        phone: data.user.contact.phone,
        mail: data.user.contact.mail,
        linkedin: data.user.contact.linkedin,
        github: data.user.contact.github,
        twitter: data.user.contact.twitter,
      })
    else setEdit(true)
  }, [data])

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error! ${error.message}</div>

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setContact({
      ...contact,
      [evt.target.name]: evt.target.value,
    })
  }

  const updateUser = async () => {
    await updateUserContact({
      variables: { _id: '6134b89dc6afe90180393569', contact },
      refetchQueries: [{ query: GET_USER }],
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

  const { location, phone, mail, linkedin, github, twitter } = data?.user?.contact

  return (
    <div className="px-6">
      <div>CONTACTS</div>

      {edit ? (
        <div className="flex flex-col w-max">
          <TextField
            className="self-start"
            label="Location"
            name="location"
            onChange={handleChange}
            value={contact.location}
            size="small"
            color="secondary"
            margin="dense"
            variant="outlined"
          />
          <TextField
            className="self-start"
            label="phone"
            name="phone"
            onChange={handleChange}
            value={contact.phone}
            color="secondary"
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
            color="secondary"
            margin="dense"
            variant="outlined"
          />
          <TextField
            className="self-start"
            label="Linkedin"
            name="linkedin"
            onChange={handleChange}
            value={contact.linkedin}
            color="secondary"
            margin="dense"
            variant="outlined"
          />

          <TextField
            className="self-start"
            label="Github"
            name="github"
            onChange={handleChange}
            value={contact.github}
            color="secondary"
            margin="dense"
            variant="outlined"
          />
          <TextField
            className="self-start"
            label="Twitter"
            name="twitter"
            onChange={handleChange}
            value={contact.twitter}
            color="secondary"
            margin="dense"
            variant="outlined"
          />
          <div className="self-end">
            <Button className="ml-1" onClick={() => cancelUpdateUser()} variant="contained" color="secondary">
              Cancel
            </Button>
            <Button className="ml-1" onClick={() => updateUser()} variant="contained" color="primary">
              Save
            </Button>
          </div>
        </div>
      ) : (
        <>
          <button className="self-start pb-3" onClick={() => setEdit(true)}>
            <EditIcon />
          </button>
          <ul className="list-none">
            {location ? (
              <li className="pb-1">
                <RoomIcon />
                <span className="break-all">{location}</span>
              </li>
            ) : null}
            {phone ? (
              <li className="pb-1">
                <PhoneIcon /> <span className="break-all">{phone}</span>
              </li>
            ) : null}
            {mail ? (
              <li className="pb-1">
                <MailIcon /> <span className="break-all">{mail}</span>
              </li>
            ) : null}

            {linkedin ? (
              <li className="pb-1">
                <LinkedInIcon /> <span className="break-all">{linkedin}</span>
              </li>
            ) : null}

            {github ? (
              <li className="pb-1">
                <GitHubIcon /> <span className="break-all">{github}</span>
              </li>
            ) : null}

            {twitter ? (
              <li className="pb-1">
                <TwitterIcon /> <span className="break-all">{twitter}</span>
              </li>
            ) : null}
          </ul>
        </>
      )}
    </div>
  )
}

export default Contacts
