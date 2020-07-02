import React from 'react';
import { Link} from "react-router-dom";
import { elastic as Menu } from 'react-burger-menu';
import "./Menu.css";

const MenuView=()=> {
      function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const date=formatDate(Date.now())
    return (
      <Menu className="icon-hamburger-menu">
        <Link exact to="/" >
        Home</Link>
        <Link exact to="/next-to-go" >
        Next To Go</Link>
        <Link exact to={`/${date}/R`}
         >
        Racing</Link>
        <Link exact to={`/${date}/G`}
         >
        GreyHound</Link>
        <Link exact to={`/${date}/H`} 
         >
        Harness</Link>
      </Menu>
    );
}
export default MenuView