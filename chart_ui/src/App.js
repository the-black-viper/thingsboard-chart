import React, { Component, useEffect, useState } from 'react';
import './App.css';
import moment from 'moment';
import NavBar from './components/NavBar/NavBar';
import SideBar from './components/SideBar/SideBar';
import Chart from './components/Chart/ChartV';
import Footer from './components/Footer/Footer';
import DatePicker from './components/DatePicker/DatePicker2';



function App() {
  let now = new Date();
  const [startDate, setStartDate] = useState(moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0)));
  const [endDate, setEndDate] = useState(moment(startDate).add(1, "days").subtract(1, "seconds"));

  const onStartDateChange = (date) => {
    console.log("start", date.getTime())
    setStartDate(date)
    // console.log("new_start", startDate.getTime())
  }

  const onEndDateChange = (date) => {
    console.log("end", date.getTime())
    setEndDate(date)
  }

  const onDateChange = (date) => {
    console.log("start/end", date.getTime())
    setStartDate(date)
    setEndDate(date)
  }

  return (
    <div className="wrapper">
      <SideBar/>
      <div className="main-panel">
        <NavBar/>
        <Chart startRange={startDate} endRange={endDate}/>
        {/* <Chart startDate={startDate} endDate={endDate}/> */}
        <div className="time-header"><h3>Range</h3></div>
        <DatePicker startDateChange={onStartDateChange} endDateChange={onEndDateChange}/>
        
        <Footer/>
      </div>
    </div>
  )
}

export default App;
