import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import CommonButton from '../../../common/commonButton/CommonButton';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ThanksFeedback = () => {
    return (
        <Stack spacing={1} component={'main'} sx={{ bgcolor: 'brights.one' }} flex='1' alignItems={'center'} p={{ xs: 1, sm: 4 }}>
            <CheckCircleIcon color='success' sx={{ width: '150px', height: '150px' }} />
            <Typography variant='h1' fontWeight={600} textAlign={'center'}>
                Thank you !
            </Typography>
            <Typography variant='body1' textAlign={'center'} fontFamily={'Roboto'} fontWeight={500} color={'text.secondary'} fontSize={{ xs: '1rem', sm: 20 }} >
                we appreciate your feedback ! Our team will get your feedback soon !
            </Typography>
            <Stack direction={'row'} spacing={2}>

            </Stack>
            <Stack direction={'row'} spacing={1}>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <CommonButton variant="outlined" startIcon={<HomeIcon />}>
                        Home
                    </CommonButton>
                </Link>
                <Link to='/products' style={{ textDecoration: 'none' }}>
                    <CommonButton variant="contained" color={'yellow'} sx={{color:'darks.one'}} startIcon={<ShoppingCartIcon />}>
                        Products
                    </CommonButton>
                </Link>
            </Stack>

        </Stack>
    )
}

export default ThanksFeedback