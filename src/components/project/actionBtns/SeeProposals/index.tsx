import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import React from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    btn: {
      marginRight: '.5rem',
    },
  })
)

const SeeProposals = ({ projectId }) => {
  const classes = useStyles()
  return (
    <Link href={`/projects/${projectId}/proposals`} passHref>
      <Button className={classes.btn} variant="contained" color="primary">
        See proposals
      </Button>
    </Link>
  )
}

export default SeeProposals
