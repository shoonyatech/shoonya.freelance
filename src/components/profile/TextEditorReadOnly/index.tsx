import 'react-quill/dist/quill.snow.css'

import dynamic from 'next/dynamic'
import React, { FC, ReactElement } from 'react'

interface Props {
  defaultValue: any
}
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const TextEditorReadOnly: FC<Props> = ({ defaultValue }): ReactElement => (
  <ReactQuill defaultValue={defaultValue} readOnly theme="bubble" />
)
export default TextEditorReadOnly
