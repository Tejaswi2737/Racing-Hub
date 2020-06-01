import React from 'react';
import response from "../data/today_table.json";
import "./Table.css";
export default class TableData extends React.Component {
    getKeys = function(){
      return Object.keys(response[0]);
    }; 
    getHeader = function(){
      var keys = this.getKeys();
      return keys.map
      ((key, index)=>{
          return (console.log(key),
          <th key={key}>{key.toUpperCase()}</th>)
      })
    };
    getRowsData = function(){
      var items = response;
      var keys = this.getKeys();
      return items.map((row, index)=>{
        return (
            console.log(index),
            <tr key={index}>
                <RenderRow key={index} 
                data={row} keys={keys}/>
            </tr>
        );
      })
    };
    render() {
        return (
          <div>
            <table>
            <thead>
              <tr>{this.getHeader()}</tr>
            </thead>
            <tbody>
              {this.getRowsData()}
            </tbody>
            </table>
          </div>  
        );
    }
};
const RenderRow = (props) =>{
    return props.keys.map((key)=>{
        return (console.log(key),
        <td onClick={()=> alert('Clicked')} key={key}>{props.data[key]}</td>)
  });
};