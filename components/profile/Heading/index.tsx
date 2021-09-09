import React from 'react'

import Avatar from '../Avatar'
import UserNameTitle from '../UserNameTitle'

const Heading = () => (
  <div className="lg:grid lg:grid-cols-profile">
    <UserNameTitle />
    <Avatar />
  </div>
)

export default Heading
