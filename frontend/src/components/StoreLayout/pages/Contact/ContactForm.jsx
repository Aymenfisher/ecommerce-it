import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField  from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import CommonButton from '../../../common/commonButton/CommonButton'
import SendIcon from '@mui/icons-material/Send';
import ThanksFeedback from './ThanksFeedback';
import Toast from '../../../common/Toast/Toast';

const ContactForm = () => {
    // feedback : success: show thanks page, failure: popup snackbar
    const [failureToast, setFailureToast] = React.useState(false)
    const [successSubmit, setSuccessSubmit] = React.useState(false)
    //form
    const form = useForm()
    const { register, handleSubmit, formState } = form
    const { errors, isDirty, isSubmitting, isSubmitSuccessful } = formState

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/store/inbox`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            if (!response.ok) {
                throw new Error('Request error')
            }
            setSuccessSubmit(true)
            window.scrollTo(0,0)
        } catch (e) {
            setFailureToast(true)
        }
        return
    }
    return (
        <>
            {isSubmitSuccessful && successSubmit ? <ThanksFeedback /> :
                <Stack spacing={2} px={2} pb={6} flex={'1'}>
                    <Typography sx={{ fontWeight: '600 !important', typography: { xs: 'h6', sm: 'h4' } }}>
                        <u style={{ textDecorationThickness: '8px', textUnderlineOffset: '10px', textDecorationColor: '#f0ce16' }}>Leave</u> a message
                    </Typography>
                    <Stack component={'form'} onSubmit={handleSubmit(onSubmit)} alignSelf='center' spacing={1} sx={{ width: '95%', alignItems: 'stretch' }}>
                        <Stack spacing={1}>
                            <Typography variant='h6' sx={{}} fontWeight={500} children='Name' />
                            <TextField id='name' size='small' variant='outlined' {...register('name', {
                                required: 'You must provide your name',
                                maxLength: {
                                    value: 100,
                                    message: 'This is a long name dude!'
                                }
                            })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant='h6' fontWeight={500} children='Email' />
                            <TextField id='email' size='small' variant='outlined' {...register('email', {
                                pattern: {
                                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    message: 'Enter a valid email address'
                                }
                            })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant='h6' fontWeight={500} children='Phone' />
                            <TextField id='phone' size='small' variant='outlined' {...register('phone', {
                                pattern: {
                                    value: /^[0-9]\d*$/,
                                    message: 'Invalid Number'
                                }
                            })}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant='h6' sx={{}} fontWeight={500} children='Subject' />
                            <TextField id='subject' size='small' variant='outlined' {...register('subject', {
                                required: 'Subject is required',
                                maxLength: {
                                    value: 100,
                                    message: 'This subject is too long'
                                }
                            })}
                                error={!!errors.subject}
                                helperText={errors.subject?.message}
                            />
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant='h6' fontWeight={500} children='Message' />
                            <TextField id='message' size='small' multiline minRows={4} variant='outlined' {...register('message', {
                                required: 'Please provide a message',
                                minLength: {
                                    value: 2,
                                    message: 'This message is short'
                                }
                            })}
                                error={!!errors.message}
                                helperText={errors.message?.message}
                            />
                        </Stack>
                        <CommonButton
                            disabled={isSubmitting || !isDirty}
                            type={'submit'}
                            color={'yellow'}
                            sx={{ alignSelf: 'flex-end' }}
                            variant={'contained'}
                            startIcon={<SendIcon />}
                            children={isSubmitting ? 'Sending...' : 'Send'}
                        />
                    </Stack>
                {/* Failure snackbar */}
                {failureToast && <Toast message={'Could not submit your feedback, Try again.'} open={failureToast} setOpen={setFailureToast} severity={'error'}/>}
                </Stack>}
        </>
    )
}

export default ContactForm