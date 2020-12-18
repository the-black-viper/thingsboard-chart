import React, {useState, useEffect} from 'react';
import {VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel } from 'victory';
import "./Chart.css";


function Chart({startRange, endRange}) {
  
  const [data, setData] = useState([]);
  
  const data2012 = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: "16500"},
    {quarter: 3, earnings: "14250"},
    {quarter: 4, earnings: "19000"},
    {quarter: 1, earnings: "13000"},
    {quarter: 2, earnings: "16500"},
    {quarter: 3, earnings: "14250"},
    {quarter: 4, earnings: "19000"},
    {quarter: 1, earnings: "13000"},
    {quarter: 2, earnings: "16500"},
    {quarter: 3, earnings: "14250"},
    {quarter: 4, earnings: "19000"},
    {quarter: 1, earnings: "13000"},
    {quarter: 2, earnings: "16500"},
    {quarter: 3, earnings: "14250"},
    {quarter: 4, earnings: "19000"},
    {quarter: 1, earnings: "13000"},
    {quarter: 2, earnings: "16500"},
    {quarter: 3, earnings: "14250"},
    {quarter: 4, earnings: "19000"},
    {quarter: 1, earnings: "13000"},
    {quarter: 2, earnings: "16500"},
    {quarter: 3, earnings: "14250"},
    {quarter: 4, earnings: "19000"}
  ];

  const today = new Date();
  const yesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date);

  const todayValue = today.getTime();
  const yesterdayValue = yesterday.getTime();

  
  const getDateStringServ = timestamp => {

    // const plus0 = num => `0${num.toString()}`.slice(-2)
    // Months array
    const months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    const d = new Date(timestamp)
  
    const year = d.getFullYear()

    const month = months_arr[d.getMonth()];
    const date = "0" + d.getDate()
    const day = d.getDate();
    const hour = d.getHours();
    const minute = "0" + d.getMinutes()
    const second = "0" + d.getSeconds()
    
    // Display date time in MM-dd-yyyy h:m:s format
    const convdataTime = month+'-'+day+'-'+year+ '\n'+hour + ':' + minute.substr(-2) + ':' + second.substr(-2);
    return convdataTime
  }

  function convertData(arrobj) {
    const newArray = arrobj.map(item => {
    const container = {};

    container.time = getDateStringServ(item.ts);
    container.temp = item.value;
    return container;
  })
  return newArray;
}

  useEffect(() => {
    const startDate = new Date(Date.parse(startRange));
    const endDate = new Date(Date.parse(endRange));
    let startTimeVal = startDate.getTime();
    let endTimeVal = endDate.getTime();
    
    console.log('start range', startRange)
    fetch(`http://demo.thingsboard.io/api/plugins/telemetry/DEVICE/f42a0c60-3534-11eb-b861-97130ea8d378/values/timeseries?keys=temperature&startTs=${startTimeVal}&endTs=${endTimeVal}&limit=20&agg=AVG`,
    {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'X-Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaWx2ZXJjcm93LmFscGhhQGdtYWlsLmNvbSIsInNjb3BlcyI6WyJURU5BTlRfQURNSU4iXSwidXNlcklkIjoiZTM0MjgwZDAtMzUzNC0xMWViLWI4NjEtOTcxMzBlYThkMzc4IiwiZmlyc3ROYW1lIjoiRmVyZGVsYW5jZSIsImxhc3ROYW1lIjoiVmlwZXIiLCJlbmFibGVkIjp0cnVlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJlMjc2N2U0MC0zNTM0LTExZWItYjg2MS05NzEzMGVhOGQzNzgiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2MDcwNDQzMDIsImV4cCI6MTYwODg0NDMwMn0.8pKuo6dfhSUhNhnGK3qees-RltplaFiPKocBruBLOb6UBtDeHECNnC-KZx9SunZxl6yccn4SMgwiumlL9Pgh9w',
    }
    })
    .then(resp => resp.json())
    .then(rawData => rawData.temperature)
    .then(tempData => {
      if (Array.isArray(tempData) && tempData) {
        const formattedData = convertData(tempData)
        console.log(formattedData)
        return formattedData
      }
      const formattedData = []
      return formattedData
    })
    .then(cleanData => setData(cleanData.reverse()))
    .then(console.log('set data', data))
    .catch(err => console.log(err));
    }, [startRange, endRange])

  if (Array.isArray(data) && data.length) {
    console.log('not empty')
    console.log(data)
  } else {console.log('empty')}

  return ( 
    (Array.isArray(data) && data.length) ?
      <div className="ChartContainer">
        <VictoryChart
          className="Chart"
          theme={VictoryTheme.material}
          domainPadding={10}
          style={{ parent: { maxWidth: "100%" }}}
          // padding={{left: 75}}
          >
            <VictoryAxis
            // fixLabelOverlap
            axisLabelComponent={<VictoryLabel dy={20}
            />}
            style={
                {axisLabel: {
                    fontFamily: "inherit",
                    fontWeight: 100,
                    letterSpacing: "1px",
                    stroke: "white",
                    fontSize: 8
                },
                tickLabels: {
                  fontFamily: "inherit",
                  fontWeight: 100,
                  letterSpacing: "1px",
                  stroke: "#61dafb ",
                  fontSize: 6
                  }
              }
            }
            label="Time(ms)"
            tickCount={5}/>
            <VictoryAxis
            dependentAxis
            axisLabelComponent={<VictoryLabel dy={-25} />}
            style={
                {axisLabel: {
                    fontFamily: "inherit",
                    fontWeight: 100,
                    letterSpacing: "1px",
                    stroke: "white",
                    fontSize: 8
                },
                tickLabels: {
                fontFamily: "inherit",
                fontWeight: 100,
                letterSpacing: "1px",
                stroke: "#61dafb ",
                fontSize: 6
                }}
            }
            label="Temperature"
            tickCount={5}/>
            <VictoryLine 
            data={data}
            // data accessor for x values
            x="time"
            // data accessor for y values
            y={"temp"}
            />
          </VictoryChart>
          {/* <h1>Test</h1> */}
          </div>
    :
      <div className="MissingData">
        <img className="NoDataImage" src="../assets/img/shrug.png"/>
        <h1 className="NoDataHeader">Oops no data found</h1>
      </div>
  )
}

export default Chart;