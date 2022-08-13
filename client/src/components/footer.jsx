import React from "react";
import f from '../styles/footer.module.css'
import linkedin from '../img/linkedin.png'
import instagram from '../img/instagram.png'

export default function Footer (){
    return(
        <div className={f.contMayor}>
        <div className={f.conteiner}>
             <div className={f.contOne}>
                  <p>© Larrosa Enzo Nicolas: Full Stack Developer</p>
                  <p>Todos los derechos resevados.</p>
             </div>
             <div className={f.contTwo}>
                  <a  href='https://www.linkedin.com/in/nicolas-larrosa-98bb6b23b/'><img className={f.linkedin} alt='linkedin' src={linkedin} /></a>
                  <a  href='https://www.instagram.com/nico_larrosaa/'><img className={f.instagram} alt='instagram' src={instagram} /></a>
             </div>
        </div>
        </div>
    )
}