import React from 'react'
import {Link} from 'react-router-dom'
import s from '../styles/landingPage.module.css'

export default function Landing() {
    return (
        <Link to='/home'>
        <div className={s.backG}>
            <h1 className={s.tit}>Clickee en cualquier parte chef </h1>
            <h1 className={s.titl}>Clickee en cualquier parte chef </h1>
        </div>
        </Link>
    )
}