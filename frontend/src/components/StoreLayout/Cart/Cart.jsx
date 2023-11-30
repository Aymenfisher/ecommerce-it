import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import  Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography  from '@mui/material/Typography'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import CartItem from './CartItem';
import CommonButton from '../../common/commonButton/CommonButton'
import { useSelector } from 'react-redux';
import { selectCart } from '../../../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import displayTwoDecimalsIfFloat from '../../../helpers/displayTwoDecimalsIfFloat';


function Cart() {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(old => !old);
    };

    const navigate = useNavigate()
    const handleProceedOrder = (e) => {
        navigate('/checkout')
        setOpen(false)
    }

    const cart = Object.values(useSelector(selectCart))

    const total = displayTwoDecimalsIfFloat(cart.reduce((a, v) => {
        const price = v.product.discountPrice ? v.product.price-v.product.discountPrice : v.product.price
        return a+price*v.quantity
    }, 0))

    return (
        <React.Fragment>
            <Badge badgeContent={cart.length} showZero color="error">
                <IconButton
                    color="inherit"
                    aria-label="open cart"
                    edge="start"
                    onClick={toggleDrawer}
                    sx={{ p: 0, color: 'brights.one' }}
                >
                    <ShoppingCartIcon fontSize='large' />
                </IconButton>
            </Badge>
            <Drawer
                anchor={'right'}
                open={open}
                onClose={toggleDrawer}
            >
                <Box
                    sx={{ width: { xs: '100vw', md: '50vw' } }}
                    role="cart"
                >
                    <Stack spacing={2} sx={{ boxSizing: 'border-box', py: 1 }}>
                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                            <Typography variant='h6' children={'Shopping Cart'} sx={{ pl: 1 }} />
                            <IconButton
                                color="inherit"
                                aria-label="close cart"
                                onClick={toggleDrawer}
                                sx={{ p: 0, alignSelf: 'flex-end' }}
                            >
                                <CloseIcon fontSize='large' />
                            </IconButton>
                        </Stack>
                        {
                            !cart.length ? <Typography variant='body2' children={'Nothing In Cart Yet!'} textAlign={'center'} /> :

                                <>
                                    <Stack spacing={1} justifyContent={'center'} sx={{ width: '100%', minHeight: '115px', maxHeight: '70%' }}>
                                        {
                                            cart.map(product => <CartItem item={product} key={product.product._id} />)
                                        }
                                    </Stack>


                                    <Stack spacing={1} sx={{ px: 1 }} justifyContent={'center'}>
                                        <Stack direction={'row'} justifyContent={'space-between'}>
                                            <Typography variant='h4' fontWeight={600} children={'Total:'} />
                                            <Typography variant='h4' fontWeight={600} children={`${total} $`} sx={{ pl: 1 }} />
                                        </Stack>
                                        <CommonButton
                                            color={'primary'}
                                            disabled={false}
                                            size={'large'}
                                            variant={'contained'}
                                            children={'Proceed Order'}
                                            onClick={handleProceedOrder}
                                        />
                                        <CommonButton
                                            disabled={false}
                                            size={'large'}
                                            variant={'contained'}
                                            children={'Continue Shopping'}
                                            color={'inherit'}
                                            onClick={toggleDrawer}
                                        />


                                    </Stack>
                                </>
                        }
                    </Stack>
                </Box>
            </Drawer>

        </React.Fragment>
    );
}

export default Cart