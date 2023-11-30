import { InputAdornment, Stack, TextField, Typography, IconButton, Select, MenuItem, FormHelperText } from '@mui/material'
import React from 'react'
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import CommonButton from '../../common/commonButton/CommonButton'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ErrorIcon from '@mui/icons-material/Error';
import { useForm, Controller } from 'react-hook-form';
import validator from 'validator';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';

const SignupForm = ({ close,reloadUsers,setOpenSuccessSignupToast }) => {
    /* form handling */
    const form = useForm({
        defaultValues: {
            role: 'seller'
        }
    })
    const { register, formState, handleSubmit, control,setError } = form
    const { errors, isDirty, isSubmitting } = formState
    const submitSignup = async (data) => {
        try{
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/auth/signup`,{
                method:'POST',
                body:JSON.stringify({
                    ...data,
                    username:data.username.toLowerCase()
                }),
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const json = await response.json()
            if(!response.ok){
                if(response.status == 401){
                    location.replace('/admin/login')
                    return 
                }
                throw { customError:true, message:json.message}
            } 
            reloadUsers()
            setOpenSuccessSignupToast(true)
            close()
        }catch(error){
            if (error.customError) {
                setError('root.serverError',{message:error.message})
            } else {
                setError('root.serverError',{message:'Loggin in failed, verify your data then try again.'})
            }
        }
        return
    }
    // password input field settings
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <Stack spacing={2} sx={{ py: 2, px: { xs: 1, md: 3 }, bgcolor: 'brights.two' }}>
            <Stack spacing={2} sx={{ p: 2, width: { xs: '250px', sm: '300px' }, minHeight: '300px', borderRadius: '8px', alignSelf: 'center', justifySelf: 'center' }}>
                <Stack sx={{ alignItems: 'center' }}>
                    <PersonAddTwoToneIcon color='primary' style={{ fontSize: '3rem' }} />
                    <Typography variant='h4' children={'Signup'} />
                </Stack>
                <Stack component={'form'} onSubmit={handleSubmit(submitSignup)} noValidate spacing={1}>
                    <Stack spacing={1}>
                        <TextField
                            id='firstName'
                            name='firstName'
                            placeholder='First Name'
                            {...register('firstName', {
                                required: 'This field is required.',
                                maxLength: {
                                    value: 100,
                                    message: 'This is a long name !'
                                }
                            })}
                            helperText={errors.firstName?.message}
                            error={!!errors?.firstName}
                        />
                        <TextField
                            id='lastName'
                            name='lastName'
                            placeholder='Last Name'
                            {...register('lastName', {
                                required: 'This field is required.',
                                maxLength: {
                                    value: 100,
                                    message: 'This is a long name !'
                                }
                            })}
                            helperText={errors.lastName?.message}
                            error={!!errors?.lastName}
                        />
                        <TextField
                            id='username'
                            name='username'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                )
                            }}
                            placeholder='username'
                            {...register('username', {
                                required: 'Username is required',
                                maxLength: {
                                    value: 100,
                                    message: 'This is a long username'
                                }
                            })}
                            error={!!errors.username}
                            helperText={errors.username?.message}
                        />

                        <TextField
                            id='password'
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end" >
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            placeholder='password'
                            {...register('password', {
                                required: 'Password is required',
                                validate: {
                                    isStrong: value => validator.isStrongPassword(value) ? true : 'Weak Password'
                                }
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                        <Controller
                            name="role"
                            id="role"
                            control={control}
                            rules={{
                                required: 'This field is required'
                            }}

                            render={({ field }) => (
                                <>
                                    <Select
                                        label="role"
                                        variant='outlined'
                                        labelId="role-label"
                                        value={field.value}
                                        onChange={field.onChange}
                                        inputRef={field.ref}
                                        onBlur={field.onBlur}
                                        sx={{ textTransform: 'capitalize' }}
                                        error={!!errors.role}
                                    >
                                        <MenuItem value={'seller'} sx={{ textTransform: 'capitalize' }}>Seller</MenuItem>
                                        <MenuItem value={'owner'} sx={{ textTransform: 'capitalize' }}>Owner</MenuItem>
                                    </Select>
                                    <FormHelperText error>{errors.role?.message}</FormHelperText>
                                </>
                            )}
                        />

                    </Stack>
                    {errors?.root?.serverError &&
                        <Stack direction='row' alignItems='center' spacing={1}>
                            <ErrorIcon color='error' style={{ fontSize: '1.5rem' }} />
                            <Typography sx={{ fontFamily: 'Roboto', typography: { xs: 'caption', sm: 'body2' }, fontWeight: '600 !important' }} color='error'>{errors?.root?.serverError?.message}</Typography>
                        </Stack>
                    }
                    <CommonButton
                        color={'primary'}
                        size={'medium'}
                        variant={'contained'}
                        title={'Signup'}
                        children={isSubmitting ? 'Creating...' : 'Signup'}
                        type={'submit'}
                        disabled={isSubmitting || !isDirty}
                    />
                </Stack>
            </Stack>
            <Alert severity="info">
                <AlertTitle>Password must contain:</AlertTitle>
                <Stack>
                    <span>• At least 8 characters.</span>
                    <span>• A capital letter and a lowercase letter.</span>
                    <span>• A number.</span>
                    <span>• A symbol.</span>
                    <span>• Eg: Example0123*</span>
                </Stack>
            </Alert>
            <CommonButton
                color={'error'}
                size={'large'}
                variant={'contained'}
                title={'Close'}
                children={'Close'}
                startIcon={<CloseIcon />}
                sx={{ fontSize: `1rem`, maxWidth: '160px', fontWeight: 500, alignSelf: 'flex-end' }}
                onClick={close}
            />
        </Stack>
    )
}

export default SignupForm