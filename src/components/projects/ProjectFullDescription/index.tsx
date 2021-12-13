import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import React from 'react'

import { icons } from '../../../lib/icon'

const ProjectFullDescription = ({ data, toggleSlider }) => (
    <div className='border-solid border-gray-200 border-2 m-4 px-6 py-2 rounded-lg'>
        <div className='flex justify-between py-2 pb-2'>
            <h2 className='text-2xl font-medium'>{data.title}</h2>
            <Button onClick={() => toggleSlider()} variant="contained" color="primary">
                Apply
            </Button>
        </div>
        {data.skills.map((skill) => (
            <Chip variant="outlined" label={skill} icon={icons[`${skill}`]} />
        ))}
        <div className='flex justify-evenly text-gray-500 py-6 text-lg'>
            <p>
                {data?.scope?.duration}
            </p>
            <p>
                {data?.budget?.currency}{data?.budget?.amount}
                <span className='block text-center'>{data?.budget?.type}</span>
            </p>
        </div>
        <p>{data?.description}</p>

    </div>
)
export default ProjectFullDescription
