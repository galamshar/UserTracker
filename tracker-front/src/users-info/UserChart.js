import React, { props, useEffect, useState } from "react";
import Chart from "react-google-charts";
import tooltip from "react-google-charts"

export default function UserChart(props) {
    const [items, setItems] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => {
        setItems(props.data)
        let array = [];
        array.push(["Ids", "Lifetime"])
        items.map((item) => {
            let lifetimes = (item.lastActivity.getTime() - item.registrationDate.getTime()) / (1000 * 3600 * 24)
            array.push([item.id, lifetimes])
        })
        setData(array)
    })
    return (
        <Chart
            width={'500px'}
            height={'300px'}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
                title: 'Lifetimes of users',
                chartArea: { width: '50%' },
                hAxis: {
                    title: 'Lifetime',
                    minValue: 0,
                },
                vAxis: {
                    title: 'Ids',
                    format: '0',
                },
                tooltip: { isHtml: true, trigger: "visible" }
            }}
            // For tests
            rootProps={{ 'data-testid': '1' }}
        />
    )
}