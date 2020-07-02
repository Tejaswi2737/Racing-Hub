import React from 'react';
import { Link} from "react-router-dom";
import { slide as Menu } from 'react-burger-menu';
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
  const showSettings =(event) =>{
    event.preventDefault();
  }
    return (
      <Menu className="icon-hamburger-menu">
        <Link exact to="/" >
        Next To Go</Link>
        <Link exact to={`/${date}/R`}
         >
        Today's Racing</Link>
        <Link exact to={`/${date}/G`}
         >
        Today's GreyHounds</Link>
        <Link exact to={`/${date}/H`} 
         >
        Today's Harness</Link>
      </Menu>
    );
}
export default MenuView