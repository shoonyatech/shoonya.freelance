import 'react-quill/dist/quill.snow.css'

import dynamic from 'next/dynamic'
import React, { FC, ReactElement } from 'react'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const Create: FC = ({ handleEditorChange, defaultValue }: any): ReactElement => (
  <ReactQuill
    style={{ height: '10rem' }}
    defaultValue={defaultValue}
    onChange={(e) => {
      handleEditorChange(e)
    }}
  />
)
export default Create
