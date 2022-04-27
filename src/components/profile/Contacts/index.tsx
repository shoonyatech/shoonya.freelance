import { useMutation } from '@apollo/client'
import EditIcon from '@mui/icons-material/Edit'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import MailIcon from '@mui/icons-material/Mail'
import PhoneIcon from '@mui/icons-material/Phone'
import RoomIcon from '@mui/icons-material/Room'
import TwitterIcon from '@mui/icons-material/Twitter'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'

import { UserIsReadOnlyContext } from '../../../context/isReadOnlyContext'
import { UPDATE_USER_CONTACT } from '../../../gql/user'
import { removeKey } from '../../../lib/utils'
import Loader from '../../common/Loader'

interface ContactObj {
  location: string
  phone: string
  mail: string
  linkedin: string
  github: string
  twitter: string
}

const Contacts = ({ data }) => {
  const [edit, setEdit] = useState<boolean>(!data)
  const isReadOnly = useContext(UserIsReadOnlyContext)

  const [contact, setContact] = useState<ContactObj>(data)
  const [updatedContact, setUpdatedContact] = useState(null)

  const [updateUserContact, { loading, error }] = useMutation(UPDATE_USER_CONTACT, {
    onCompleted(val) {
      const newContact = val.updateUserContact.contact
      setContact(newContact)
      setUpdatedContact(newContact)
      setEdit(false)
    },
  })

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const filterTypename = removeKey('__typename', contact)
    await updateUserContact({
      variables: { contact: filterTypename },
    })
  }

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setContact({
      ...contact,
      [evt.target.name]: evt.target.value,
    })
  }

  const cancelUpdateUser = () => {
    const revertUserContact = updatedContact || data
    setContact(revertUserContact)
    setEdit(false)
  }

  if (loading) return <Loader open={loading} error={error} />
  return (
    <div className="px-6">
      {!edit && !isReadOnly ? (
        <button type="button" className="float-right" onClick={() => setEdit(true)}>
          <EditIcon />
        </button>
      ) : null}
      <h3 className="pb-3 text-xl uppercase md:text-2xl">contacts</h3>

      {edit && !isReadOnly ? (
        <form onSubmit={updateUser} className="flex flex-col w-max">
          <TextField
            className="self-start"
            label="Location"
            name="location"
            onChange={handleChange}
            value={contact?.location}
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
            value={contact?.phone}
            color="primary"
            margin="dense"
            variant="outlined"
          />
          <TextField
            className="self-start"
            label="mail"
            name="mail"
            onChange={handleChange}
            value={contact?.mail}
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
            value={contact?.linkedin}
            color="primary"
            margin="dense"
            variant="outlined"
          />

          <TextField
            className="self-start"
            label="Github"
            name="github"
            onChange={handleChange}
            value={contact?.github}
            color="primary"
            margin="dense"
            variant="outlined"
          />
          <TextField
            className="self-start"
            label="Twitter"
            name="twitter"
            onChange={handleChange}
            value={contact?.twitter}
            color="primary"
            margin="dense"
            variant="outlined"
          />
          <div className="self-end pt-1">
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
        <>
          <ul className="list-none">
            {contact?.location ? (
              <li className="pb-1">
                <RoomIcon />
                <span className="break-all">{contact?.location}</span>
              </li>
            ) : null}
            {contact?.phone ? (
              <li className="pb-1">
                <PhoneIcon /> <span className="break-all">{contact?.phone}</span>
              </li>
            ) : null}

            {contact?.mail ? (
              <li className="pb-1">
                <MailIcon /> <span className="break-all">{contact?.mail}</span>
              </li>
            ) : null}

            {contact?.linkedin ? (
              <li className="pb-1">
                <LinkedInIcon /> <span className="break-all">{contact?.linkedin}</span>
              </li>
            ) : null}

            {contact?.github ? (
              <li className="pb-1">
                <GitHubIcon /> <span className="break-all">{contact?.github}</span>
              </li>
            ) : null}

            {contact?.twitter ? (
              <li className="pb-1">
                <TwitterIcon /> <span className="break-all">{contact?.twitter}</span>
              </li>
            ) : null}
          </ul>
        </>
      )}
    </div>
  )
}

export default Contacts
