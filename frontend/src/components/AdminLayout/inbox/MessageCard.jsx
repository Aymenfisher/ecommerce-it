import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'
import formatDate from '../../../helpers/formatDate'

const MessageCard = ({ message, handleOpenMessage }) => {
    return (
        <Paper sx={{ flex: 1, p:{xs:1,sm: 2}, bgcolor: message.isOpened ? 'inherit' : '#e3f2fd', cursor: 'pointer' }} onClick={() => handleOpenMessage(message)}>
            <Stack spacing={1}>
                <Stack>
                    <Typography sx={{ typography: { xs: 'body2', sm: 'body1' } }} fontWeight={'600 !important'}>Subject: {message.subject}</Typography>
                    <Typography variant='body2' color={'text.secondary'} fontWeight={500}>{message.name}</Typography>
                </Stack>
                <Stack direction={{xs:'column',sm:'row'}} justifyContent={'space-between'} spacing={2}>
                    <Typography fontFamily={'Roboto'} sx={{ typography: { xs: 'body2', sm: 'body1' }, textIndent: '2px', color: 'text.secondary' }} fontWeight={600}>{message.message.substring(0, 35)}...</Typography>
                    <Typography sx={{ alignSelf: 'flex-end', typography: { xs: 'caption' }, fontWeight: '500 !important' }}>{formatDate.dateWithTime(message.createdAt)}</Typography>
                </Stack>
            </Stack>

        </Paper>
    )
}

export default MessageCard