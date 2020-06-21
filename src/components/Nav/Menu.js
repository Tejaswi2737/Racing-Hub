import React from 'react';
import { Link} from "react-router-dom";
import { elastic as Menu } from 'react-burger-menu';
import "./Menu.css";

const MenuView=()=> {
    return (
      <Menu className="icon-hamburger-menu">
        <Link exact to="/" >
        Home</Link>
        <Link exact to="/next-to-go" >
        Next To Go</Link>
        <Link exact to="/Today/R"
         >
        Racing</Link>
        <Link exact to="/Today/G"
         >
        GreyHound</Link>
        <Link exact to="/Today/H" 
         >
        Harness</Link>
      </Menu>
    );
}
export default MenuView