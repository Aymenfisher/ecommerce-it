import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import  Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import  FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox  from '@mui/material/Checkbox'
import React from 'react'
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import CommonButton from '../../common/commonButton/CommonButton'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from 'react-router-dom';
import checkAuth from '../../../helpers/checkAuth';
import Loading from '../../common/Loading/Loading';

const Login = () => {
    const [isLoadingForm, setIsloadingForm] = React.useState(true)
    // password input field settings
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // form data
    const [formData, setFormData] = React.useState({
        username: '',
        password: '',
        keepSigned: false
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        setError('')
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        return
    };

    // Handle form submission
    const [error, setError] = React.useState('')
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false)
        setIsSubmitting(true)
        // Logging in :
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            setIsSubmitting(false)

            const data = await response.json();
            if (!response.ok) {
                throw {
                    customError: true,
                    message: data.message
                }
            }
            localStorage.setItem('token', data.token)
            navigate('/admin/dashboard')
        } catch (error) {
            if (error.customError) {
                setError(error.message)
            } else {
                setError('Loggin in failed, verify your data then try again.')
            }
            setIsSubmitting(false)
        }
        return
    };

    React.useEffect(() => { // redirect to dashboard if already authenticated
        checkAuth().then(status => {
            if (status == 200) {
                navigate('/admin/dashboard')
                return
            }
            setIsloadingForm(false)
            return
        })
    }, [])
    return (
        <Stack spacing={1} alignItems={'center'} justifyContent={'center'} sx={{ width: '100vw', height: '100vh', bgcolor: 'darks.three' }}>
            <Stack justifyContent={'center'} alignItems={'center'}>
                <img src='/logo.png' alt='store logo' width='100px' height='100px' style={{ objectFit: 'contain' }} />
                <Typography variant='h1' color='brights.one'>Aymen Store Info</Typography>
            </Stack>
            {isLoadingForm ? <Loading /> :
                <Stack spacing={2} sx={{ p: 2, bgcolor: 'brights.one', width: { xs: '250px', sm: '300px' }, minHeight: '300px', borderRadius: '8px' }}>
                    <Stack sx={{ alignItems: 'center' }}>
                        <AccountCircleTwoToneIcon color='primary' style={{ fontSize: '3rem' }} />
                        <Typography variant='h4' children={'Login'} />
                    </Stack>
                    <Stack component={'form'} onSubmit={handleSubmit} noValidate spacing={1}>
                        <Stack spacing={1}>
                            <TextField
                                id='username'
                                name='username'
                                value={formData.username}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    )
                                }}
                                onChange={handleInputChange}
                                placeholder='username'
                            />

                            <TextField
                                id='password'
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
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
                                onChange={handleInputChange}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox id='keepSigned' name='keepSigned' checked={formData.keepSigned} sx={{ alignSelf: 'flex-start', pl: 0, '& .MuiSvgIcon-root': { fontSize: '1.2rem' } }}
                                        onChange={(e) => {
                                            setFormData((data) => {
                                                return {
                                                    ...data,
                                                    keepSigned: e.target.checked
                                                }
                                            })
                                        }}
                                    />
                                }
                                label={<Typography variant='body1' fontWeight={500}>Remember me</Typography>}
                            />

                        </Stack>
                        {error &&
                            <Stack direction='row' alignItems='center' spacing={1}>
                                <ErrorIcon color='error' style={{ fontSize: '1.5rem' }} />
                                <Typography sx={{ fontFamily: 'Roboto', typography: { xs: 'caption', sm: 'body2' }, fontWeight: '600 !important' }} color='error'>{error}</Typography>
                            </Stack>
                        }
                        <CommonButton
                            color={'primary'}
                            size={'medium'}
                            variant={'contained'}
                            title={'login'}
                            children={isSubmitting ? 'Loggin in...' : 'Login'}
                            type={'submit'}
                            disabled={isSubmitting}
                        />
                    </Stack>
                </Stack>}
        </Stack >
    )
}

export default Login