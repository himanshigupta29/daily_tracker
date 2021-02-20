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
            isdateabsent: false,
            month: this.getDate().getMonth(),
            payperday: 65,
            pay: 0,
            workingDays: 0
        }
    }

    getDate() {

        return new Date();

    }

     daysInMonth = (month) => { 
         const year = this.getDate().getYear();
        return new Date(year, month+1, 0).getDate(); 
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

    changeMonth = (e) => {

        console.log('=======================', e.target.value);
        e.preventDefault();

        this.setState({month: e.target.value, pay:0, workingDays: 0});

    }

    computePay = () => {

        let totalabsent = 0, absentDate;

        for(let i = 0; i <this.state.absent.length; i++) {
            absentDate = this.state.absent[i].name;

            console.group('absentDate', absentDate.getMonth());

            if(absentDate.getMonth() === this.state.month) {
                console.log('1 matching month');
                totalabsent += 1;
            }

        }



        console.log('========= month ==========', this.state.month);
        console.log('toal Absent dats ', totalabsent);
        console.log(' Get present dats', this.daysInMonth(this.state.month));

        const wday = this.daysInMonth(this.state.month)-totalabsent;
        this.setState({workingDays:wday, pay: this.state.payperday*wday});
    }
  
    render() {

        let absentbtn = '', isAbsent = true;
        if(!this.checkIfAbsent()) {
            absentbtn =  <button onClick = {this.markAbsent}> Mark Absent </button>;
            isAbsent = false;
        }

        let pay;
        if(this.state.pay) {
             pay = <h4> Pay: {this.state.pay} for {this.state.workingDays} days </h4> ;
        }

        return (

            <div>

                <h3>
                    Rate per day {this.state.payperday}
                </h3>

                <select name="cars" id="cars" onChange = {this.changeMonth} value = {this.state.month} >
                    <option value="0">January</option>
                    <option value="1">February</option>
                    <option value="2">March</option>
                    <option value="3">April</option>
                    <option value="4">May</option>
                    <option value="5">June</option>
                    <option value="6">July</option>
                    <option value="7">August</option>
                    <option value="8">September</option>
                    <option value="9">October</option>
                    <option value="10">November</option>
                    <option value="11">December</option>
                </select>

                <button onClick = {this.computePay}> Compute Pay </button>
                {pay}


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