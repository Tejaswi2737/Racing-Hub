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
        <Link exact to="/" className="menu-item">
        Home</Link>
        <Link exact to="/next-to-go" className="menu-item">
        Next To Go</Link>
        <Link exact to={`/${date}/R`} className="menu-item"
         >
        Racing</Link>
        <Link exact to={`/${date}/G`} className="menu-item"
         >
        GreyHound</Link>
        <Link exact to={`/${date}/H`}  className="menu-item"
         >
        Harness</Link>
      </Menu>
    );
}
export default MenuView;

