import 'react-quill/dist/quill.snow.css'

import dynamic from 'next/dynamic'
import React, { FC } from 'react'

interface Props {
  handleEditorChange: any
  defaultValue: any
}
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const Create: FC<Props> = ({ handleEditorChange, defaultValue }) => (
  <ReactQuill
    style={{ height: '10rem' }}
    defaultValue={defaultValue}
    onChange={(e) => {
      handleEditorChange(e)
    }}
  />
)
export default Create
