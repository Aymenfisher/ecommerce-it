import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import React from 'react'

const FormSelect = ({label,name,validations}) => {
    // name and validations and 
    return (
        <TextField
            select
            fullWidth
            label={label}
            defaultValue=''
            inputProps={register('currency', {
                required: 'Please enter currency',
            })}
            error={errors.currency}
            helperText={errors.currency?.message}
        >
            {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    )
}

export default FormSelect