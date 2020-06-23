import React from 'react'
import "./Resp_Header.css";
import { Link} from "react-router-dom";


const RespHeader=() =>{
    return (
        <header className="flex flex-vertical-center flex-space-between">
            <div id="site-heading">
                <Link to="/" className="title-main">
                    <div id="vollie-tagline">
                        Racing, Hub
                    </div>
                </Link>
            </div>
            <nav id="header-menu">
                <ul className="top-menu">
                    <li className="yump-magic-hover">
                        <Link to="/" className="menu-item-link">
                        </Link>
                    </li>
                    <li className="yump-magic-hover">
                        <Link to="/next-to-go" className="menu-item-link">
                            Next To Go
                        </Link>
                    </li>
                    <li className="yump-magic-hover">
                        <Link to="/Today/R" className="menu-item-link">
                            Racing
                        </Link>
                    </li>
                    <li className="yump-magic-hover">
                        <Link to="/Today/G" className="menu-item-link">
                        GreyHound
                        </Link>
                    </li>
                    <li className="yump-magic-hover">
                        <Link to="/Today/H" className="menu-item-link">
                        Harness
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default RespHeader;
