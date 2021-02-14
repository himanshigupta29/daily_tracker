// soorar puttu 
// master 

import  React from 'react';
import  AbsentItem from './AbesntItem';

const AbsentList = function(props) {

    const list = props.absent;

    if(list.length) {
        return (
            <ul>
                {
                list.map( (item) => <AbsentItem key = {item.id} item={item} ></AbsentItem> )
                }
            </ul>
        );
    } else {
        return (
            <div className="empty">
                No absent this month
            </div>
        )
    }


// return 



}

export default AbsentList;