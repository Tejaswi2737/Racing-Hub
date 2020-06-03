import React from 'react';
import { Link} from "react-router-dom";
import { slide as Menu } from 'react-burger-menu';
import "./Menu.css";

const MenuView=()=> {
  const showSettings =(event) =>{
    event.preventDefault();
  }
    return (
      <Menu className="icon-hamburger-menu">
        <Link exact to="/" >
        Next To Go</Link>
        <Link exact to="/Today/R"
         >
        Today's Racing</Link>
        <Link exact to="/Today/G"
         >
        Today's GreyHounds</Link>
        <Link exact to="/Today/H" 
         >
        Today's Harness</Link>
      </Menu>
    );
}
export default MenuView