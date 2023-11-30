import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import  Typography from '@mui/material/Typography';

export default function PaymentMethod({ register, errors }) {
    const [paymentMethod, setPaymentMethod] = React.useState('cashOnDelivery');

    const handleChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    return (
        <TextField
            select
            fullWidth
            id='payment-method'
            label='payment method'
            size='medium'
            defaultValue={'cashOnDelivery'}
            inputProps={register('paymentMethod', {
                required: 'Please select a payment method',
            })}
            error={!!errors.paymentMethod}
            helperText={errors.paymentMethod?.message}
            sx={{ textTransform: 'capitalize' }}
        >
            <MenuItem value={paymentMethod}>
                <Stack spacing={1} direction={'row'}>
                    <MonetizationOnIcon />
                    <Typography variant='body1' children={'Cash On Delivery'} />
                </Stack>
            </MenuItem>
        </TextField>
            );
}