import React from 'react';
import cl from './Logo.module.css'

const Logo = () => {
    return (
        <div className={cl.padding}>
            <img className={cl.logo} src={require('./Безымянный.png')} alt="Логотип ИУ6"></img>
        </div>
    )
}

export default Logo;