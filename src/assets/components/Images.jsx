import React from 'react'

const Images = ({src,className}) => {
  return (
    <img src={src} className={`${className}`}/>
  )
}

export default Images
