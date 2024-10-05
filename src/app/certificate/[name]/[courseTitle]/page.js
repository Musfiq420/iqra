import React from 'react'
import Certificate from './certificate'

const Page = async ({params}) => {
  const name = params.name.replace(/%20/g, " ");
  const courseTitle = params.courseTitle.replace(/%20/g, " ");

  return (
    <div style={{marginTop:"60px"}}>
      <Certificate name={name} courseTitle={courseTitle} />
    </div>
  )
}

export default Page