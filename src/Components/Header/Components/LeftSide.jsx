import React from 'react'
import LogoApp from './ComponentsLeftSide/LogoApp'
import "./style.sass"

const LeftSide = (props) => {
  return (
    <div className="header-left-side">
      <LogoApp></LogoApp>
    </div>
  )
}

export default LeftSide