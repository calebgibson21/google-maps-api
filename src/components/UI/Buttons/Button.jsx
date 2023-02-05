import React from 'react'
import { MainButton } from './ButtonStyle'

const Button = ({children, ...rest}) => {
  return (
    <MainButton {...rest}>{children}</MainButton>
  )
}

export default Button