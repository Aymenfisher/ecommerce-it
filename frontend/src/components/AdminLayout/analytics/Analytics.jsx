import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import IconButton  from '@mui/material/IconButton'
import TotalSales from './components/TotalSales'
import TotalOrders from './components/TotalOrders'
import OrdersBars from './components/OrdersAndSalesBar'
import SalesByCategoryPie from './components/OrdersByCategoryPie'
import MostSelledProducts from './components/MostSelledProducts'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrders, selectAllOrders, selectHasErrorOrders, selectIsLoadingOrders } from '../../../features/orders/ordersSlice'
import RefreshIcon from '@mui/icons-material/Refresh';
import Loading from '../../common/Loading/Loading'
import ErrorLoading from '../../common/ErrorLoading/ErrorLoading'

const Analytics = () => {
    const orders = useSelector(selectAllOrders)
    const isLoadingOrders = useSelector(selectIsLoadingOrders)
    const hasErrorOrders = useSelector(selectHasErrorOrders)
    const dispatch = useDispatch()
    return (
        <Container maxWidth={false} disableGutters sx={{ display: 'flex', flexDirection: 'column', rowGap: '15px', p: 2, bgColor: 'brights.two' }}>
            <Typography variant='h4' fontWeight={'500'}>Analytics</Typography>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='body1' color={'text.secondary'} textAlign={'justify'} fontWeight={'500'}>
                    Here's whats happenning in the store.
                </Typography>
                <IconButton onClick={() => dispatch(fetchAllOrders())} sx={{ title: 'Refresh' }}>
                    <RefreshIcon />
                </IconButton>
            </Stack>
            <Divider />
            {isLoadingOrders ? <Loading /> :
                hasErrorOrders ? <ErrorLoading /> :
                    <Stack spacing={2} flexWrap='wrap'>
                        <Stack direction='row' rowGap={2} columnGap={2} flexWrap='wrap'>
                            <TotalSales orders={orders} />
                            <TotalOrders orders={orders} />
                        </Stack>
                        <Stack direction='row' rowGap={2} columnGap={2} flexWrap='wrap'>
                            <OrdersBars orders={orders} />
                            <SalesByCategoryPie orders={orders} />
                        </Stack>
                        <MostSelledProducts orders={orders} />
                    </Stack>
            }
        </Container>
    )
}

export default Analytics