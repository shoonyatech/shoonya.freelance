import React from 'react'

import Avatar from '../Avatar'
import UserName from '../UserName'

const Heading = () => (
  <div className="lg:grid lg:grid-cols-profile">
    <UserName />
    <Avatar />
  </div>
)

export default Heading
