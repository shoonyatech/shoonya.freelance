import React from 'react'

import Avatar from '../Avatar'
import UserNameTitle from '../UserNameTitle'

const Heading = ({ data, userId }) => {
  const userNametitle = {
    name: data.name,
    title: data.title,
  }
  return (
    <div className="lg:grid lg:grid-cols-profile">
      <UserNameTitle data={userNametitle} userId={userId} />
      <Avatar data={data.picture} userId={userId} />
    </div>
  )
}
export default Heading
