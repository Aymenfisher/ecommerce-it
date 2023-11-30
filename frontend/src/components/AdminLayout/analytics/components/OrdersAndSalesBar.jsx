import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar} from 'react-chartjs-2';
import Stack from '@mui/material/Stack';
import Typography  from '@mui/material/Typography';
import getLast14Days from '../../../../helpers/getLast14Days';
import displayTwoDecimalsIfFloat from '../../../../helpers/displayTwoDecimalsIfFloat';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

/* helpers */
const calculateDaysSales = (weekDays, orders) => { // return an array of total sales for each day
    const daysSales = new Array(14).fill(0)
    orders.some((order) => {
        const orderDay = new Date(order.createdAt)

        // breaking loop if we are iterating outside weekDays . assuming: orders are sorted by newest, while weekdays by oldest
        if (orderDay < weekDays[0]) {
            return true
        }
        // assuming each element index in weekDays and daysSales points to the same day:
        const dayIndex = weekDays.findIndex(day => day.toDateString() == orderDay.toDateString())
        daysSales[dayIndex] += displayTwoDecimalsIfFloat(order.total)
    })
    return daysSales
}

const calculateDaysOrders = (weekDays, orders) => { // return an array of total orders for each day
    const daysOrders = new Array(14).fill(0)
    orders.some(order => {
        const orderDay = new Date(order.createdAt)
        if (orderDay < weekDays[0]) { // assuming: orders are sorted by newest, while weekdays by oldest
            return true
        }
        // assuming each element index in weekDays and daysOrders points to the same day:
        const dayIndex = weekDays.findIndex(day => day.toDateString() == orderDay.toDateString())
        daysOrders[dayIndex] += 1
    })
    return daysOrders
}


/* end helpers */

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
            text: 'Orders vs Sales',
        }
    },
    scales: {
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
                display: true,
                text: 'Orders',
            },
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
                drawOnChartArea: false,
            },
            title: {
                display: true,
                text: 'Sales ($)',
            },
        }
    },
};



const OrdersAndSalesBars = ({ orders }) => {
    const [data, setData] = React.useState(false) // false or data


    React.useEffect(() => {
        const last14Days = getLast14Days()
        // last 14 days : sales and orders
        const last14DaysSales = calculateDaysSales(last14Days, orders)

        const last14DaysOrders = calculateDaysOrders(last14Days, orders)
        const labels = last14Days.map(day => day.toDateString().split(' ').slice(1, 3).join(' '))
        setData({
            labels,
            datasets: [
                {
                    label: 'Orders',
                    data: last14DaysOrders,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    yAxisID: 'y',
                },
                {
                    label: 'Sales ($)',
                    data: last14DaysSales,
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    yAxisID: 'y1'
                },
            ],
        })
    },[])

    return (
        <Stack spacing={1} flex={1}>
            <Typography variant='h6'>Orders and sales last 2 weeks:</Typography>
            {!!data  && <Bar options={options} data={data} type='bar' />}
        </Stack>

    )
}

export default OrdersAndSalesBars