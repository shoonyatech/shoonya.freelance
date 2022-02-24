import React from 'react'

import DisplayPicture from '../DisplayPicture'
import UserNameTitle from '../UserNameTitle'

const Heading = ({ data }) => {
  const userNametitle = {
    name: data.name,
    title: data.title,
  }
  return (
    <div className="lg:grid lg:grid-cols-profile">
      <UserNameTitle data={userNametitle} />
      <DisplayPicture data={data.picture} />
    </div>
  )
}
export default Heading
