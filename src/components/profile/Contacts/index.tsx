import { useMutation } from '@apollo/client'
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

const Contacts = ({ data }) => {
  const classes = useStyles()
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
      <h3 className="text-xl md:text-2xl  uppercase pb-3">contacts</h3>

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
