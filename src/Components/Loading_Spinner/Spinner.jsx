import React from 'react'
import './Spinner.css'

export default function Spinner() {
    return (
        <div className='body2'>

            <div class="container2 rotate" style={{"--size":"16rem"}} >
                <div class="circle primary rotate-reverse"></div>
                <div class="circle tertiary rotate-reverse"></div>
            </div>
           
        </div>
    )
}
