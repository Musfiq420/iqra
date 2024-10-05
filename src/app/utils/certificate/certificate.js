import React from 'react'
import './style.css'

const Certificate = ({name, courseTitle}) => {
  return (
    <body>
        <div class="container">
            <div class="logo">
                IQRA
            </div>

            <div class="marquee">
                Certificate of Completion
            </div>

            <div class="assignment">
                This certificate is presented to
            </div>

            <div class="person">
                {name}
            </div>

            <div class="reason">
                Has successfully completed the course<br/>
                <h3>{courseTitle}</h3>
            </div>
        </div>
    </body>
  )
}

export default Certificate