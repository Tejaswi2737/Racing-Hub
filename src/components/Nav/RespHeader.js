import React from 'react'
import "./Resp_Header.css";
import { Link} from "react-router-dom";


const RespHeader=() =>{
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
        <header className="main-header">
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
                        <Link to={`/${date}/R`} className="menu-item-link">
                            Racing
                        </Link>
                    </li>
                    <li className="yump-magic-hover">
                        <Link to={`/${date}/G`} className="menu-item-link">
                        GreyHound
                        </Link>
                    </li>
                    <li className="yump-magic-hover">
                        <Link to={`/${date}/H`} className="menu-item-link">
                        Harness
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default RespHeader;
