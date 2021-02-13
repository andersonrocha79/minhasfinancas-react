import React from 'react';

function NavBarItem( { render, ...props } )
{

    if (render)
    {

        return (

            <li className="nav-item">
                <a onClick={props.onClick} className="nav-link" href={props.href}>{props.label}</a>
            </li>        
    
        )
    
    }
    else
    {
        return false; // indica que não deve ser renderizado
    }


}

export default NavBarItem;