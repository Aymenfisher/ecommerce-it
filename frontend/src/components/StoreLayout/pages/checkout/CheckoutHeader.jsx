import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectStoreInfos } from '../../../../features/storeinfos/storeInfosSlice';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CheckoutHeader = () => {
    const storeInfos = useSelector(selectStoreInfos)
    return (
        <Container component={'header'} maxWidth={false} sx={{ bgcolor: 'darks.two', color: 'white.main' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} p='5px 5px' justifyContent={'space-between'} alignItems={'center'}>
                <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                        <img src={'/logo.png'} alt='logo' style={{ height: '50px' }}></img>
                        <Typography
                            component="div"
                            sx={{ flexGrow: 1, display: { md: 'flex' }, typography: { lg: 'h1', xs: 'h6' } }}
                        >
                            {storeInfos.title}
                        </Typography>
                    </Stack>
                </Link>
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                    <CheckCircleIcon sx={{ height: '50px', color: 'success.light' }} />
                    <Typography
                        sx={{ typography: { lg: 'h1', xs: 'h6' }, letterSpacing: 1 }}
                        color='brights.one'
                        fontWeight={600}
                    >
                        {'CHECKOUT'}
                    </Typography>
                </Stack>

            </Stack>
        </Container>
    )
}

export default CheckoutHeader