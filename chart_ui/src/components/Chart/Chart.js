import React, { useEffect, useState } from "react";
import {Line} from 'react-chartjs-2';

const Chart = ({startDate, endDate}) => {
    const [chartData, setChartData] = useState({});
    const LineChart = () => {
        setChartData ({
            labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            datasets: [
                {
                    label: 'level of thiccness',
                    data: [32, 42, 30, 26, 69],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.6)'
                    ],
                    borderWidth: 4
                }
            ]
        })
        
    }
    useEffect(() => {
        LineChart()
    }, [])

    return (
        <div>
            <Line data={chartData} options={{
                responsive: true,
                title: {text: 'TEST CHART', display: true},
                scales: {
                    yAxes: [
                        {
                            gridLines: {display: false}
                        }
                    ],
                    xAxes: [
                        {
                            gridLines: {display: false}
                        }
                    ]
                }
            }}/>
        </div>
    )
};

export default Chart;