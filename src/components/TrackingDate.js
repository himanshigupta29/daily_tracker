import React, {Component} from 'react';
import ShowDate from './ShowDate';
import AbsentList from './AbsentList';
import { v4 as uuidv4 } from 'uuid';


class TrackingDate extends Component {

    constructor() {
        super();

        this.state = {
            date: this.getDate(),
            absent: [],
            isdateabsent: false
        }
    }

    getDate() {

        return new Date();

    }

    setPreviousDate = ()=>{
      
        const prev = new Date(this.state.date);
        prev.setDate(prev.getDate() - 1)

        this.setState({date: prev});
        console.log('=================', prev);

        console.log('=================', prev.toDateString());

    }

    setNextDate = () => {

    
        console.log('next');

        const next = new Date(this.state.date);
        next.setDate(next.getDate() + 1)

        this.setState({date: next});
    }
    

    checkIfAbsent = () => {
        let marked = false;
        for(let i =0; i< this.state.absent.length; i++) {
            if(this.state.absent[i].name.toDateString() === this.state.date.toDateString()) {
                console.log('====..... DUPLICATE...====', this.state.absent[i].name.toDateString());
                marked = true;
                break;
            }
        }
        return marked;
    }

    markAbsent = () => {
        console.log('mark absent');
        if(!this.checkIfAbsent()) {
            this.setState({absent: [...this.state.absent, {name: this.state.date, id: uuidv4() }]}, this.logAbsents);            
        }
    }

    logAbsents = () => {
        console.log('Total absents', this.state.absent);
    }
  
    render() {

        let absentbtn = '', isAbsent = true;
        if(!this.checkIfAbsent()) {
            absentbtn =  <button onClick = {this.markAbsent}> Mark Absent </button>;
            isAbsent = false;
        }

        return (

            <div>
                <ShowDate date = {this.state.date} isAbsent = {isAbsent} />
                <button onClick = {this.setPreviousDate}> Previous</button>
                <button onClick = {this.setNextDate}> Next</button>

              {absentbtn}
 
                <AbsentList absent = {this.state.absent} />

            </div>

        );
    }

}

export default TrackingDate;