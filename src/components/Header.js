import React from 'react'
import "./Header.css";
import { Link} from "react-router-dom";
import MenuView from "./Menu";
const Header=() =>{
    return (
        <div>
            <header className="page-header">
                <div className="content-wrapper">
                    <div className="positioned-left">
                        <div className="positioned-left">
                            <div className="toggle-menu-link">
                                <i className="icon-hamburger-menu">
                                    <MenuView/>
                                </i>
                                <span className="hamburger-title">
                                    <Link to="/">
                                        <div className="menu" 
                                        value="menu">Menu</div>
                                    </Link>
                                    
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}
export default Header;
