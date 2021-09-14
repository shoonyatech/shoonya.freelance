import { Button } from '@material-ui/core'
// import { Link } from 'react-router-dom'
import Link from 'next/link'
import React from 'react'

function Buttons() {
  return (
    <div>
      <div>
        <Link href="/">
          <Button variant="contained">About us</Button>
        </Link>
      </div>
      <br/>
      <div>
        <Link href="/">
          <Button variant="contained">Contact</Button>
        </Link>
      </div>
    </div>
  )
}

export default Buttons
