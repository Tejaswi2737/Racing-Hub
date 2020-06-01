import React from 'react';
import { connect } from 'react-redux';
import  fetchToday  from "../actions"
import _ from 'lodash';
import response from "../data/today_table.json";
// import TableData from "./Table";
// import Table_Blog from "./Table_Blog";
import "./Today_Race.css";
// import TableData from './Table';
import TableBasic from "./TableBasic";

class Today_Race extends React.Component {
    render() {
        return(
            <div className="table-div">
                <TableBasic/>
            </div>
        )
    }
};
export default Today_Race;
