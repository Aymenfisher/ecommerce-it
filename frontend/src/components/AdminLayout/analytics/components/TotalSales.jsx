import React from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import displayTwoDecimalsIfFloat from '../../../../helpers/displayTwoDecimalsIfFloat'
import getLast14Days from '../../../../helpers/getLast14Days';
import formatNumber from '../../../../helpers/formatNumber'

const calculateWeekSales = (weekDays, orders) => {
    let weekTotal = 0
    orders.some(order => {
        const orderDay = new Date(order.createdAt)
        // assuming: orders are sorted by newest, while weekdays by oldest
        // stop loop if we are looping in older dates (dates before weekdays)
        if (orderDay < weekDays[0]) {
            return true
        }

        //if the order date exists in weekDays : add its total to weekTotal
        if (weekDays.some(date => date.getDate() === orderDay.getDate())) {
            weekTotal += order.total
        }


    })
    return displayTwoDecimalsIfFloat(weekTotal)
}

const TotalSales = ({ orders }) => {
    const totalSales = displayTwoDecimalsIfFloat(orders.reduce((a, v) => { return a += v.total }, 0))

    const last14Days = getLast14Days()

    const lastWeekSales = calculateWeekSales(last14Days.slice(0, 7), orders)
    const thisWeekSales = calculateWeekSales(last14Days.slice(7, 14), orders)


    const salesDifference = thisWeekSales - lastWeekSales
    const percentage = salesDifference > 0 ? Math.floor(thisWeekSales * 100 / lastWeekSales) : salesDifference == 0 ? 0 :Math.floor(lastWeekSales * 100 / thisWeekSales)

    return (
        <Card sx={{ minWidth: 275, p: 2, bgcolor: 'rgba(53, 162, 235, 0.5)' }}>
            <Stack spacing={1}>
                <Stack direction='row' spacing={1} alignItems={'center'}>
                    <MonetizationOnIcon />
                    <Typography variant='h6'>Total Sales</Typography>
                </Stack>
                <Typography variant='h6' fontWeight={800}>$ {totalSales}</Typography>
                <Stack direction='row' spacing={1} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction='row' spacing={1} alignItems={'center'}>
                        {salesDifference >= 0 ? <TrendingUpIcon fontSize='1rem' sx={{ typography: 'body1' }} color='success' /> :
                            <TrendingDownIcon fontSize='1rem' sx={{ typography: 'body1' }} color='error' />
                        }
                        <Typography sx={{ color: salesDifference >= 0 ? 'success.main' : 'error.main' }} variant='caption' fontWeight={600}>% {percentage}</Typography>
                    </Stack>
                    <Typography variant='caption' fontWeight={600}>{formatNumber(thisWeekSales)} $ This week</Typography>
                </Stack>
            </Stack>
        </Card>
    )
}

export default TotalSales