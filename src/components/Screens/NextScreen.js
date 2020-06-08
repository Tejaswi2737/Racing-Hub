import React from 'react'
import Header from '../Nav/Header';
import NextRace from '../Next/NextRace';
import NextList from '../Next/NextList';

const NextScreen=() =>{
    return (
        <div>
            <Header/>
            <NextList/>
            <NextRace/>
        </div>
    )
}
export default NextScreen;
