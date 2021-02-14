import React from 'react';

const AbsentItem = ({item}) => {

    return (
        <li>
            {item.name.toDateString()}
        </li>
    )

}

export default AbsentItem;