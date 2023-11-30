import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography  from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import React from 'react'
import MenuCard from './MenuCard'
import { useSelector } from 'react-redux'
import { selectAllOrders } from '../../../features/orders/ordersSlice'
import { jwtDecode } from 'jwt-decode'

const menuItems = [
    { title: 'orders', description: 'Manage Orders', link: '/admin/dashboard/orders', image: '/assets/menuImages/orders.webp', roles: ['owner', 'seller'] },
    { title: 'warehouse', description: 'Manage products and categories', link: '/admin/dashboard/warehouse', image: '/assets/menuImages/warehouse.webp', roles: ['owner', 'seller'] },
    { title: 'analytics', description: 'View store statistics', link: '/admin/dashboard/analytics', image: '/assets/menuImages/analytics.webp', roles: ['owner', 'seller'] },
    { title: 'store informations', description: 'Manage informations about the store', link: '/admin/dashboard/storeinfos', image: '/assets/menuImages/storeInfos.webp', roles: ['owner'] },
    { title: 'Inbox', description: 'See messages sent by clients', link: '/admin/dashboard/inbox', image: '/assets/menuImages/inbox.webp', roles: ['owner', 'seller'] }
]

const MainMenu = () => {
    const pendingOrders = useSelector(selectAllOrders).filter(order => order.isCompleted == false).length
    const userRole = jwtDecode(localStorage.getItem('token')).role
    return (
        <Container maxWidth={false} disableGutters sx={{ display: 'flex', flexDirection: 'column', rowGap: '15px', p: 2 }}>
            <Typography variant='h4' fontWeight={'500'} alignSelf={'center'}>Welcome</Typography>
            <Divider />
            {!pendingOrders ? '' :
            <>
                <Alert severity="info" sx={{ width: '100%' }}>
                    <AlertTitle>Pending Orders</AlertTitle>
                    You have <strong>{pendingOrders}</strong> pending orders — <Link style={{ color: '#2196f3', textDecoration: 'none' }} to={'/admin/dashboard/orders'}><strong>Check it out</strong></Link>
                </Alert>
            
            <Divider />
            </>
            }
            <Stack spacing={2}>
                <Typography sx={{ fontWeight: '600', typography: { xs: 'h6', sm: 'h4' } }}>
                    <u style={{ textDecorationThickness: '5px', textUnderlineOffset: '10px', textDecorationColor: '#f0ce16' }}>Menu</u>
                </Typography>
                <Stack p={2} direction={'row'} rowGap={'20px'} columnGap={'20px'} flexWrap={'wrap'} justifyContent={'center'}>
                    {
                        menuItems.map(item => {
                            return (!item.roles.includes(userRole) ? '' :
                                <MenuCard key={item.title} title={item.title} description={item.description} link={item.link} image={item.image} />
                            )
                        })
                    }
                </Stack>
            </Stack>
        </Container>
    )
}

export default MainMenu