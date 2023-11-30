import React from 'react'
import CartItem from '../../../Cart/CartItem'
import { useForm } from 'react-hook-form';
import  Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Alert  from '@mui/material/Alert'
import CheckoutHeader from '../CheckoutHeader';
import BallotIcon from '@mui/icons-material/Ballot';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import PaymentMethod from '../PaymentMethod';
import CommonButton from '../../../../common/commonButton/CommonButton';
import ThankYou from '../ThankYou';
import CircularProgress from '@mui/material/CircularProgress';
import displayTwoDecimalsIfFloat from '../../../../../helpers/displayTwoDecimalsIfFloat';



const QuickBuy = ({ item, handleClose }) => {

    //order details on succussfull purchase
    const [orderDetails, setOrderDetails] = React.useState('')

    //generating form
    const form = useForm({
        defaultValues: {
            paymentMethod: 'cashOnDelivery',
            phones: []
        }
    })
    const { register, handleSubmit, formState: { errors, isSubmitting, isDirty, isSubmitSuccessful }, control, setError } = form

    //calculating the total
    const total = displayTwoDecimalsIfFloat(item.product.discountedPrice * item.quantity)


    //scroll to top on submission error (request error)
    const topRef = React.useRef(null) // error alert ref. (scroll to it on request error)

    //handle submission
    const onSubmit = async (data) => {
        //constructing data
        const orderData = {
            client: {
                name: data.name,
                address: data.address,
                state: data.state,
                phones: data.phones.filter(phone => phone.length) // remove secondary phone if not provided
            },
            paymentMethod: data.paymentMethod,
            products: [{
                _id: item.product._id,
                quantity: item.quantity
            }],
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
                throw { status: response.status }
            }
            // on succussful response
            const result = await response.json()
            setOrderDetails(result) //to display in thanks page
            return
        } catch (error) {
            switch (error.status) {
                case 400:
                    setError('root.serverError', {
                        message: 'Bad Request'
                    })
                    break;
                case 404:
                    setError('root.serverError', {
                        message: 'Product no longer exists'
                    })
                    break;
                default:
                    setError('root.serverError', {
                        message: 'Server Error'
                    })
                    break;
            }
            topRef.current?.scrollIntoView({behaviour:'smooth'})
        }
    }



    return (
        <>
            {
                isSubmitSuccessful && orderDetails != '' ? <ThankYou order={orderDetails} /> :
                    <Stack component={'main'} sx={{ justifyContent: 'stretch', bgcolor: 'brights.two' }} ref={topRef}>
                        <CheckoutHeader />
                        <Box component={'form'} onSubmit={handleSubmit(onSubmit)} sx={{ bgcolor: '#eeeeee4d', flex: 1 }}>
                        {errors?.root?.serverError && <Alert severity="error">There was an error while submitting your order( {errors?.root?.serverError?.message} ), please try again or refresh the page.</Alert>}
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
                                                <PaymentMethod register={register} errors={errors} control={control} />
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

                                        <Box
                                            role="order-summary"
                                        >
                                            <Stack spacing={2} sx={{ boxSizing: 'border-box', py: 1 }}>
                                                <Stack spacing={1} justifyContent={'center'} sx={{ width: '100%', maxHeight: '70%' }}>
                                                    <CartItem item={item} isOneItem={true} />
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
                                                        children={isSubmitting ? <CircularProgress size='1rem' /> : 'Proceed Order'}
                                                        disabled={isSubmitting || !isDirty}
                                                        type={'submit'}
                                                    />
                                                </Stack>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap-reverse'} rowGap={1} sx={{ bgcolor: 'brights.one', p: 2 }}>
                            <Typography color='darks.one' variant='body1'>
                                {`© ${new Date().getFullYear()}. Developed by `} <a style={{ textDecoration: 'none', color: 'black' }} target='_blank' href='//linkedin.com/in/aymen-boudabia'><b>Aymen Boudabia</b></a>
                            </Typography>
                            <CommonButton
                                color={'error'}
                                size={'large'}
                                variant={'contained'}
                                children={'Close'}
                                onClick={() => handleClose()}
                            />
                        </Stack>
                    </Stack>
            }
        </>
    )
}

export default QuickBuy