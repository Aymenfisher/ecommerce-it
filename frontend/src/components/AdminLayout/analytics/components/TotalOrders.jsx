import React from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import getLast14Days from '../../../../helpers/getLast14Days';
import displayTwoDecimalsIfFloat from '../../../../helpers/displayTwoDecimalsIfFloat';

const calculateWeekOrders = (weekDays, orders) => {
    let weekOrders = 0
    orders.some(order => {
        const orderDay = new Date(order.createdAt)

        // breaking loop if we are iterating outside weekDays . assuming: orders are sorted by newest, while weekdays by oldest
        if (orderDay < weekDays[0]) { 
            return true
        }
        //if the order date exists in weekDays : add the order to weekOrder
        if (weekDays.some(date => date.getDate() === orderDay.getDate())) {
            weekOrders += 1
        }

    })
    return weekOrders
}

const TotalOrders = ({ orders }) => {
    const totalOrders = orders.length

    const last14Days = getLast14Days()
    const lastWeekOrders = calculateWeekOrders(last14Days.slice(0, 7), orders)
    const thisWeekOrders = calculateWeekOrders(last14Days.slice(7, 14), orders)

    const ordersDifference = thisWeekOrders - lastWeekOrders
    const differencePercentage = displayTwoDecimalsIfFloat(ordersDifference * 100 / (lastWeekOrders + thisWeekOrders)) || 0

    return (
        <Card sx={{ minWidth: 275, p: 2, bgcolor: 'rgba(255, 99, 132, 0.5)' }}>
            <Stack spacing={1}>
                <Stack direction='row' spacing={1} alignItems={'center'}>
                    <ShoppingCartCheckoutIcon />
                    <Typography variant='h6'>Total Orders</Typography>
                </Stack>
                <Typography variant='h6' fontWeight={600}>{totalOrders} Order</Typography>
                <Stack direction='row' spacing={1} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction='row' spacing={1} alignItems={'center'}>
                        {ordersDifference >= 0 ? <TrendingUpIcon fontSize='1rem' sx={{ typography: 'body1' }} color='success' /> :
                            <TrendingDownIcon fontSize='1rem' sx={{ typography: 'body1' }} color='error' />
                        }
                        <Typography sx={{ color: ordersDifference >= 0 ? 'success.main' : 'error.main' }} variant='caption' fontWeight={600}>% {differencePercentage}</Typography>
                    </Stack>
                    <Typography variant='caption' fontWeight={600}>{thisWeekOrders} This week</Typography>
                </Stack>
            </Stack>
        </Card>
    )
}

export default TotalOrders