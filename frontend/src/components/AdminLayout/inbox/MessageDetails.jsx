import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'
import CommonButton from '../../common/commonButton/CommonButton'
import CloseIcon from '@mui/icons-material/Close';
import formatDate from '../../../helpers/formatDate';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

const MessageDetails = ({ message, handleCloseMessage }) => {
    return (
        <Paper sx={{ py: 2, px: { xs: 1, md: 3 }, bgcolor: 'brights.two', flex: 1 }}>
            <Stack spacing={2} alignItems={'stretch'} justifyContent={'space-between'} width={'100%'} minHeight={'100%'}>
                <Stack spacing={2}>
                    <Stack>
                        <Stack direction={'row'} spacing={1}>
                            <PersonIcon />
                            <Typography component={'div'} variant='h6'>From: <Box sx={{ display: 'inline', color: 'text.secondary', fontWeight: 400 }}>{message.name}</Box></Typography>
                        </Stack>
                        <Stack>
                            <Stack direction={'row'} spacing={1}>
                                <CalendarMonthIcon />
                                <Typography component={'div'} variant='h6' fontWeight={500}>Date: <Box sx={{ display: 'inline', color: 'text.secondary', fontWeight: 400 }}>{formatDate.dateWithTime(message.createdAt)}</Box></Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={1}>
                                <EmailIcon />
                                <Typography component={'div'} variant='h6' fontWeight={500}>Email: <Box sx={{ display: 'inline', color: 'text.secondary', fontWeight: 400 }}>{message.email || '/'}</Box></Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={1}>
                                <PhoneAndroidIcon />
                                <Typography component={'div'} variant='h6' fontWeight={500}>Phone: <Box sx={{ display: 'inline', color: 'text.secondary', fontWeight: 400 }}>{message.phone || '/'}</Box></Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Divider sx={{ width: '50%' }} />
                    <Stack spacing={2}>
                        <Typography component={'div'} variant='h6' fontWeight={500}>Subject: <Box sx={{ display: 'inline', color: 'text.secondary', fontWeight: 400 }}>{message.subject}</Box></Typography>
                        <Typography variant='body1' component={'div'} fontWeight={400} whiteSpace={'pre-line !important'}>{message.message}</Typography>
                    </Stack>
                </Stack>
                <Divider sx={{ width: '100%' }} />
                <CommonButton
                    color={'error'}
                    size={'large'}
                    variant={'contained'}
                    title={'Close'}
                    children={'Close'}
                    startIcon={<CloseIcon />}
                    sx={{ fontSize: `1rem`, maxWidth: '160px', maxHeight: '50px', fontWeight: 500, alignSelf: 'flex-end' }}
                    onClick={handleCloseMessage}
                />
            </Stack>
        </Paper>
    )
}

export default MessageDetails