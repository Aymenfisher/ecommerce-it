import * as React from 'react';
import  Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CartItem from '../../Cart/CartItem';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CommonButton from '../../../common/commonButton/CommonButton';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const NoItems = () => {
    return (
        <Stack spacing={1} alignSelf={'center'} alignItems={'center'}>
            <Typography variant='body1'>
                There are no items !
            </Typography>
            <Link to='/products' style={{ textDecoration: 'none' }}>
                <CommonButton variant="contained" color={'yellow'} sx={{color:'darks.one'}} startIcon={<StorefrontIcon />}>
                    Continue Shopping
                </CommonButton>
            </Link>
        </Stack>
    )
}

const OrderSummary = ({ isSubmitting, isDirty, cart, total }) => {
    return (
        <Box
            role="order-summary"
        >
            <Stack spacing={2} sx={{ boxSizing: 'border-box', py: 1 }}>
                <Stack spacing={1} justifyContent={'center'} sx={{ width: '100%', maxHeight: '70%' }}>
                    {
                        cart.length ? cart.map(item => <CartItem key={item.product.title} item={item} />) : <NoItems/>
                    }
                </Stack>
                <Stack spacing={1} sx={{ px: 1 }} justifyContent={'center'}>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography variant='h4' fontWeight={600} children={'Total:'} />
                        <Typography variant='h4' fontWeight={600} children={`${total} $`} sx={{ pl: 1, color: 'success.light' }} />
                    </Stack>
                    <CommonButton
                        color={'success'}
                        size={'large'}
                        variant={'contained'}
                        children={isSubmitting? <CircularProgress size={'1rem'}/>:'Proceed Order'}
                        disabled={!cart.length || isSubmitting || !isDirty}
                        type={'submit'}
                    />
                </Stack>
            </Stack>
        </Box>
    )
}

export default OrderSummary