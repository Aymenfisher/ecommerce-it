import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Alert  from '@mui/material/Alert'
import React from 'react'
import OrderSummary from './OrderSummary'
import PaymentMethod from './PaymentMethod'
import BallotIcon from '@mui/icons-material/Ballot';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, selectCart } from '../../../../features/cart/cartSlice';
import CheckoutHeader from './CheckoutHeader';
import ThankYou from './ThankYou';
import displayTwoDecimalsIfFloat from '../../../../helpers/displayTwoDecimalsIfFloat';

const Checkout = () => {
    const dispatch = useDispatch()
    //order details on succussfull purchase
    const [orderDetails, setOrderDetails] = React.useState('')
    // generating form
    const form = useForm({
        defaultValues: {
            paymentMethod: 'cashOnDelivery',
            phones: []
        }
    })
    const { register, handleSubmit, formState: { errors, isSubmitting, isDirty, isSubmitSuccessful },setError } = form

    // getting cart items and calculating the total
    const cart = Object.values(useSelector(selectCart))
    const total = displayTwoDecimalsIfFloat(cart.reduce((a, v) => {
        const price = v.product.discountPrice ? v.product.discountedPrice : v.product.price
        return a + price * v.quantity
    }, 0))

    // handling form submission
    const onSubmit = async (data) => {
        // contructing data 
        const cartItems = cart.map(item => {
            return {
                _id: item.product._id,
                quantity: item.quantity
            }
        })
        const orderData = {
            client: {
                name: data.name,
                address: data.address,
                state: data.state,
                phones: data.phones.filter(phone => phone.length) // remove secondary phone if not provided
            },
            paymentMethod: data.paymentMethod,
            products: cartItems,
            total: total
        }
        //sending data
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/store/orders`, {
                method: 'POST',
                body: JSON.stringify(orderData),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (!response.ok) {
                throw {status:response.status}
            }
            // on succussful response
            const result = await response.json()
            setOrderDetails(result) //to display in thanks page
            dispatch(clearCart())

        } catch (error) { // handling server 
            switch(error.status){
                case 400:
                    setError('root.serverError',{
                        message:'Bad Request'
                    })
                    break;
                case 404:
                    setError('root.serverError',{
                        message:'Product no longer exists'
                    })
                    break;
                default:
                    setError('root.serverError',{
                        message:'Server Error'
                    })
                    break;
            }
            window.scrollTo(0,0)
        }
        return
    }


    return (
        <>
            {
                isSubmitSuccessful && orderDetails!='' ? <ThankYou order={orderDetails} /> :
                    <Stack component={'main'} sx={{ minHeight: '100vh', width: '100vw', justifyContent: 'stretch' }}>
                        <CheckoutHeader />
                        {errors?.root?.serverError && <Alert severity="error">There was an error while submitting your order( {errors?.root?.serverError?.message} ), please try again or refresh the page.</Alert>}
                        <Box component={'form'} onSubmit={handleSubmit(onSubmit)} sx={{ bgcolor: '#eeeeee4d', flex: 1 }} noValidate>
                            <Grid container spacing={2} sx={{ height: '100%' }} py={2} px={1}>
                                <Grid item xs={12} md={6} >
                                    <Stack spacing={2} bgcolor={'brights.one'} p={2}>
                                        <Stack spacing={1}>
                                            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                                <LocalShippingIcon />
                                                <Typography variant='h6' children={'Shipping'} />
                                            </Stack>
                                            <Box
                                            >
                                                <Stack>
                                                    <Typography variant='body1' fontWeight={600} children={'Full Name'} />
                                                    <TextField size='small' id="name" variant="outlined" {...register('name', {
                                                        required: 'This field is required'
                                                    })}
                                                        error={!!errors.name}
                                                        helperText={errors.name?.message}
                                                    />
                                                </Stack>
                                                <Stack>
                                                    <Typography variant='body1' fontWeight={600} children={'Phone Numbers'} />
                                                    <Stack spacing={1}>
                                                        <TextField size='small' id="phone.0" variant="outlined" {...register('phones.0', {
                                                            required: 'This field is required',
                                                            pattern: {
                                                                value: /^[0-9]\d*$/,
                                                                message: 'Invalid Number'
                                                            }
                                                        })}
                                                            error={!!errors.phones?.[0]}
                                                            helperText={errors.phones?.[0]?.message}
                                                        />
                                                        <TextField size='small' id="phone.1" variant="outlined" {...register('phones.1', {
                                                            pattern: {
                                                                value: /^[0-9]\d*$/,
                                                                message: 'Invalid Number'
                                                            }
                                                        })}
                                                            error={!!errors.phones?.[1]}
                                                            helperText={errors.phones?.[1]?.message}
                                                        />
                                                    </Stack>
                                                </Stack>
                                                <Stack>
                                                    <Typography variant='body1' fontWeight={600} children={'State'} />
                                                    <TextField size='small' id="state" variant="outlined" {...register('state', {
                                                        required: 'This field is required'
                                                    })}
                                                        error={!!errors.state}
                                                        helperText={errors.state?.message}
                                                    />
                                                </Stack>
                                                <Stack>
                                                    <Typography variant='body1' fontWeight={600} children={'Address'} />
                                                    <TextField size='small' id="address" variant="outlined" {...register('address', {
                                                        required: 'This field is required'
                                                    })}
                                                        error={!!errors.address}
                                                        helperText={errors.address?.message}
                                                    />
                                                </Stack>
                                            </Box>
                                        </Stack>
                                        <Stack spacing={1}>
                                            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                                <PaymentIcon />
                                                <Typography variant='h6' children={'Payment Method'} />
                                            </Stack>
                                            <Box
                                            >
                                                <PaymentMethod register={register} errors={errors} />
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item xs>
                                    <Stack spacing={1} bgcolor={'brights.one'} p={2}>
                                        <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                            <BallotIcon />
                                            <Typography variant='h6' children={'Order Summary'} />
                                        </Stack>
                                        <OrderSummary isSubmitting={isSubmitting} isDirty={isDirty} cart={cart} total={total} />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ bgcolor: 'brights.one', p: 2 }}>
                            <Typography color='darks.one' variant='body1'>
                                {`© ${new Date().getFullYear()}. Developed by `} <a style={{ textDecoration: 'none', color: 'black' }} target='_blank' href='//linkedin.com/in/aymen-boudabia'><b>Aymen Boudabia</b></a>
                            </Typography>
                        </Box>
                    </Stack>
            }
        </>


    )
}

export default Checkout