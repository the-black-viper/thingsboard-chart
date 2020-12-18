import React, {useEffect, useState, Component} from 'react';
import moment from 'moment';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker';
import {FormControl} from 'react-bootstrap';
import './DatePicker.css';


function DatePicker() {
    let now = new Date();
    let initStart = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
    let initEnd = moment(initStart).add(1, "days").subtract(1, "seconds");

    const [start, setStart] = useState(initStart);
    const [end, setEnd] = useState(initEnd);

    const applyCallback = (startDate, endDate) => {
        setStart(startDate);
        setEnd(endDate);
    }

    let ranges = {
        "Today Only": [moment(start), moment(end)],
        "Yesterday Only": [moment(start).subtract(1, "days"), moment(end).subtract(1, "days")],
        "3 Days": [moment(start).subtract(3, "days"), moment(end)]
    }
    let local = {
        "format":"DD-MM-YYYY HH:mm",
        "sundayFirst" : false
    }
    let value = `${start.format(
        "DD-MM-YYYY HH:mm"
        )} - ${end.format("DD-MM-YYYY HH:mm")}`;
    let disabled = true;

    let maxDate = moment(start).add(24, "hour")
    
    return (
        <div>
            <div className='dateHeader'>Enter Date Range here</div>
            <DateTimeRangeContainer 
                ranges={ranges}
                start={start}
                end={end}
                local={local}
                maxDate={maxDate}
                applyCallback={applyCallback}
            >    
                <FormControl
                id="formControlsTextB"
                type="text"
                label="Text"
                placeholder="Enter Date Here"
                defaultValue={value}
                />
            </DateTimeRangeContainer>
        </div>
    )

}

export default DatePicker;
// export default class DatePicker extends React.Component {
 
//     constructor(props){
//         super(props);
//         let now = new Date();
//         let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
//         let end = moment(start).add(1, "days").subtract(1, "seconds");
//         this.state = {
//             start : start,
//             end : end
//         }
 
//         this.applyCallback = this.applyCallback.bind(this);
//     }
 
//     applyCallback(startDate, endDate){
//         console.log(startDate.getUTCDate())
//         this.setState({
//                 start: startDate,
//                 end : endDate
//             }
//         )
        
//     }
    
 
//     render(){
//             let now = new Date();
//             let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
//             let end = moment(start).add(1, "days").subtract(1, "seconds");
//             let ranges = {
//                 "Today Only": [moment(start), moment(end)],
//                 "Yesterday Only": [moment(start).subtract(1, "days"), moment(end).subtract(1, "days")],
//                 "3 Days": [moment(start).subtract(3, "days"), moment(end)]
//             }
//             let local = {
//                 "format":"DD-MM-YYYY HH:mm",
//                 "sundayFirst" : false
//             }
//             let value = `${this.state.start.format(
//                 "DD-MM-YYYY HH:mm"
//               )} - ${this.state.end.format("DD-MM-YYYY HH:mm")}`;
//             let disabled = true;

//             let maxDate = moment(start).add(24, "hour")
//             return(
//                 <div>
//                     <div className='dateHeader'>Enter Date Range here</div>
//                     <DateTimeRangeContainer 
//                         ranges={ranges}
//                         start={this.state.start}
//                         end={this.state.end}
//                         local={local}
//                         maxDate={maxDate}
//                         applyCallback={this.applyCallback}
//                     >    
//                         <FormControl
//                         id="formControlsTextB"
//                         type="text"
//                         label="Text"
//                         placeholder="Enter Date Here"
//                         defaultValue={value}
//                         />
//                     </DateTimeRangeContainer>
//                 </div>
//             );
//         }
// }