import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import  Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import  Alert from '@mui/material/Alert';
import CommonButton from '../../common/commonButton/CommonButton';
import HelpIcon from '@mui/icons-material/Help';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SaveIcon from '@mui/icons-material/Save';
import { useFieldArray, useForm } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { fetchStoreInfos } from '../../../features/storeinfos/storeInfosSlice';
import Toast from '../../common/Toast/Toast';

const StoreInfosForm = ({ currentInfos, setOpenSuccessToast, parentRef }) => {

    const { register, handleSubmit, control, formState: { errors, isDirty, isSubmitting }, setError, reset } = useForm({
        defaultValues: {
            socialMedia: currentInfos.socialMedia,
            title: currentInfos.title,
            description: currentInfos.description,
            phones: currentInfos.phones,
            address: currentInfos.address,
            email: currentInfos.email,
            about: currentInfos.about,
            mapsLocation: currentInfos.mapsLocation,
        }
    })

    const { fields, append, remove } = useFieldArray({ name: 'phones', control: control }) // phones array fields


    const dispatch = useDispatch()
    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/storeInfos`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (!response.ok) {
                if (response.status == 401) {
                    location.replace('/admin/login')
                    return
                }
                throw { status: response.status }
            }
            dispatch(fetchStoreInfos())
            setOpenSuccessToast(true)
        } catch (error) {
            switch (error.status) {
                case 400:
                    setError('root.serverError', {
                        message: 'Bad Request'
                    })
                    break;
                case 404:
                    setError('root.serverError', {
                        message: 'Resource not found'
                    })
                    break;
                case 403:
                    setError('root.serverError', {
                        message: 'Permission denied'
                    })
                    break;
                default:
                    setError('root.serverError', {
                        message: 'Server Error'
                    })
                    break;
            }
            parentRef.current?.scrollIntoView({ behaviour: 'smooth' })
        }
        return
    }

    // reset form fields to default:
    const [openResetFormToast, setOpenResetFormToast] = React.useState(false)
    const handleResetForm = () => {
        reset()
        setOpenResetFormToast(true)
    }
    return (
        <Stack component={'form'} onSubmit={handleSubmit(onSubmit)} noValidate>
            {errors.root?.serverError && <Alert severity="error" sx={{ alignSelf: 'stretch' }}>Failed to update: {errors?.root?.serverError?.message}</Alert>}
            <Stack sx={{ p: 1 }}>
                <Stack spacing={2}>
                    <Typography variant='h5' fontWeight={'500'} alignSelf={'flex-start'}>Descriptions & Address</Typography>
                    <Stack>
                        <Typography variant='h6' fontWeight={'400'} alignSelf={'flex-start'}>Home page description</Typography>
                        <TextField
                            multiline
                            rows={4}
                            id='description'
                            size='small'
                            variant='outlined'
                            sx={{ bgcolor: 'brights.one' }}
                            placeholder='keep it short and meaningfull'
                            {...register('description', {
                                required: 'This Field is required',
                                maxLength: {
                                    value: 130,
                                    message: 'This description is too long'
                                }
                            })}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                    </Stack>
                    <Stack>
                        <Typography variant='h6' fontWeight={'400'} alignSelf={'flex-start'}>About</Typography>
                        <TextField
                            multiline
                            rows={15}
                            id='about'
                            size='small'
                            variant='outlined'
                            sx={{ bgcolor: 'brights.one' }}
                            placeholder='About the store'
                            {...register('about', {
                                required: 'This Field is required'
                            })}
                            error={!!errors.about}
                            helperText={errors.about?.message}
                        />
                    </Stack>
                    <Stack>
                        <Typography variant='h6' fontWeight={'400'} alignSelf={'flex-start'}>Address</Typography>
                        <TextField
                            id='address'
                            size='small'
                            variant='outlined'
                            sx={{ bgcolor: 'brights.one' }}
                            placeholder='ex: Algiers, algeria'
                            {...register('address', {
                                required: 'This Field is required'
                            })}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />
                    </Stack>
                    <Stack>
                        <Stack direction={'row'} alignItems={'flex-end'}>
                            <Typography variant='h6' fontWeight={'400'} alignSelf={'flex-start'}>Maps Link</Typography>
                            <Tooltip title="Paste link from google maps link, (example: https://www.google.com/maps/place/Algiers/@36.7598351,2.9717457,11z) ">
                                <IconButton>
                                    <HelpIcon sx={{ height: '20px' }} />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        <TextField
                            id='mapsLocation'
                            size='small'
                            variant='outlined'
                            sx={{ bgcolor: 'brights.one' }}
                            placeholder='Example: https://www.google.com/maps/place/Algiers/@36.7598351,2.9717457,11z'
                            fullWidth
                            {...register('mapsLocation', {
                                pattern: {
                                    value: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
                                    message: 'Please enter a valid link (see the example)'
                                }
                            })}
                            error={!!errors.mapsLocation}
                            helperText={errors.mapsLocation?.message}
                        />

                    </Stack>
                    <Divider />

                </Stack>

            </Stack>
            <Stack sx={{ p: 1 }}>
                <Stack spacing={2}>
                    <Typography variant='h5' fontWeight={'500'} alignSelf={'flex-start'}>Contact & Social media</Typography>
                    <Stack>
                        <Typography variant='h6' fontWeight={'400'} alignSelf={'flex-start'}>Phone Numbers</Typography>
                        <Stack alignItems={'flex-start'} spacing={0.5}>
                            {
                                fields.map((field, index) => {
                                    return (
                                        <Stack key={field.id} direction={{ xs: 'column', sm: 'row' }} spacing={1} width={'100%'}>
                                            <Stack direction={'row'} alignItems={'center'}>
                                                <TextField size='small' id={`phone${index}`} variant="outlined"
                                                    sx={{ width: { sm: '400px' }, bgcolor: 'brights.one' }}
                                                    {...register(`phones.${index}`, {
                                                        required: {
                                                            value: true,
                                                            message: 'This field is required'
                                                        },
                                                        pattern: {
                                                            value: /^[0-9]+$/,
                                                            message: 'Invalid number'
                                                        }
                                                    }
                                                    )}
                                                    error={!!errors.phones?.[index]}
                                                    helperText={errors.phones?.[index]?.message}
                                                />
                                                {
                                                    index ? <IconButton onClick={() => remove(index)} aria-label="delete" title='Delete'>
                                                        <DeleteIcon color='error' />
                                                    </IconButton> : false
                                                }

                                            </Stack>
                                        </Stack>
                                    )
                                })
                            }
                            <IconButton
                                color={'primary'}
                                title={'Add'}
                                sx={{ p: 0 }}
                                onClick={() => append('')}
                            >
                                <AddCircleRoundedIcon />
                            </IconButton>
                        </Stack>
                    </Stack>
                    <Stack>
                        <Typography variant='h6' fontWeight={'400'} alignSelf={'flex-start'}>Email</Typography>
                        <TextField
                            id='email'
                            size='small'
                            variant='outlined'
                            sx={{ bgcolor: 'brights.one' }}
                            placeholder='Email Address'
                            {...register('email', {
                                required: 'This Field is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email address'
                                }
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Stack>
                    <Stack spacing={1}>
                        <Stack direction={'row'} spacing={2} alignItems={'flex-end'}>
                            <Typography variant='h6' fontWeight={'400'} alignSelf={'flex-start'}>Social Media Links</Typography>
                            <Typography variant='caption'>(Leave the field empty for the unused platforms)</Typography>
                        </Stack>


                        <Stack spacing={1}>
                            <Stack direction={{ sm: 'row' }} spacing={1} alignItems={{ xs: 'flex-start', sm: 'center' }}>
                                <FacebookIcon color='primary' />
                                <Typography variant='body1' fontWeight={'400'} sx={{ width: '90px' }}>Facebook</Typography>
                                <TextField
                                    id='facebook'
                                    size='small'
                                    variant='outlined'
                                    sx={{ bgcolor: 'brights.one' }}
                                    placeholder='Example: https://www.facebook.com/'
                                    fullWidth
                                    {...register('socialMedia.facebook', {
                                        pattern: {
                                            value: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
                                            message: 'Invalid link format'
                                        }
                                    })}
                                    error={!!errors.socialMedia?.facebook}
                                    helperText={errors.socialMedia?.facebook?.message}
                                />
                            </Stack>
                            <Stack direction={{ sm: 'row' }} spacing={1} alignItems={{ xs: 'flex-start', sm: 'center' }}>
                                <InstagramIcon color='error' />
                                <Typography variant='body1' fontWeight={'400'} sx={{ width: '90px' }}>Instagram</Typography>
                                <TextField
                                    id='instagram'
                                    size='small'
                                    variant='outlined'
                                    sx={{ bgcolor: 'brights.one' }}
                                    placeholder='Example: https://www.instagram.com/'
                                    fullWidth
                                    {...register('socialMedia.instagram', {
                                        pattern: {
                                            value: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
                                            message: 'Invalid link format'
                                        }
                                    })}
                                    error={!!errors.socialMedia?.instagram}
                                    helperText={errors.socialMedia?.instagram?.message}
                                />
                            </Stack>
                            <Stack direction={{ sm: 'row' }} spacing={1} alignItems={{ xs: 'flex-start', sm: 'center' }}>
                                <YouTubeIcon color='error' />
                                <Typography variant='body1' fontWeight={'400'} sx={{ width: '90px', justifySelf: 'flex-start' }}>Youtube</Typography>
                                <TextField
                                    id='youtube'
                                    size='small'
                                    variant='outlined'
                                    sx={{ bgcolor: 'brights.one' }}
                                    placeholder='Example: https://www.youtube.com/'
                                    fullWidth
                                    {...register('socialMedia.youtube', {
                                        pattern: {
                                            value: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
                                            message: 'Invalid link format'
                                        }
                                    })}
                                    error={!!errors.socialMedia?.youtube}
                                    helperText={errors.socialMedia?.youtube?.message}
                                />
                            </Stack>
                            <Stack direction={{ sm: 'row' }} spacing={1} alignItems={{ xs: 'flex-start', sm: 'center' }}>
                                <TwitterIcon color='primary' />
                                <Typography variant='body1' fontWeight={'400'} sx={{ width: '90px' }}>Twitter</Typography>
                                <TextField
                                    id='twitter'
                                    size='small'
                                    variant='outlined'
                                    sx={{ bgcolor: 'brights.one' }}
                                    placeholder='Example: https://www.twitter.com/'
                                    fullWidth
                                    {...register('socialMedia.twitter', {
                                        pattern: {
                                            value: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
                                            message: 'Invalid link format'
                                        }
                                    })}
                                    error={!!errors.socialMedia?.twitter}
                                    helperText={errors.socialMedia?.twitter?.message}
                                />
                            </Stack>

                        </Stack>

                    </Stack>
                    <Divider />
                    <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
                        <CommonButton
                            variant={'contained'}
                            children={isSubmitting ? <CircularProgress size='1rem' /> : 'Save'}
                            type={'submit'}
                            startIcon={isSubmitting ? '' : <SaveIcon />}
                            sx={{ width: '100px' }}
                            alignSelf={'flex-end'}
                            disabled={!isDirty || isSubmitting}
                        />
                        <CommonButton
                            variant={'contained'}
                            children={'Reset Changes'}
                            onClick={handleResetForm}
                            title={'undo all changes'}
                            startIcon={<SettingsBackupRestoreIcon />}
                            sx={{ width: '180px' }}
                            alignSelf={'flex-end'}
                            disabled={!isDirty}
                            color='error'
                        />
                    </Stack>
                </Stack>
            </Stack>
            {openResetFormToast && <Toast open={openResetFormToast} setOpen={setOpenResetFormToast} message='Changes have been discarted' severity='info' />}
        </Stack>
    )
}

export default StoreInfosForm