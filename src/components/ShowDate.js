import React from 'react';


const ShowDate = ({date, isAbsent}) => {

    let color = 'gray';

    console.log('================== isAbsent', isAbsent);

    if(isAbsent) {
        color= 'red';
    }

    return (
        <h1 style= {{color: color}} > 
            {getcurrentDate(date)}
        </h1>
    );
};

const getcurrentDate = (d) => {
    return d.toDateString();
    // return d.getDate() + '-' + (d.getMonth()+1) + '-' + (d.getFullYear());
}

export default ShowDate;

