import React, { useState, useEffect } from 'react';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import './DatePicker.css';
 
function DatePicker({startDateChange, endDateChange}) {
  const [date, setDate] = useState([new Date(), new Date()]);


  useEffect(() => {
    startDateChange(date[0])
    endDateChange(date[1])
    },[date]) 

  return (
    <div className="DateContainer">
      <DateTimeRangePicker
        onChange={setDate}
        value={date}
      />
    </div>
  );
}

export default DatePicker;