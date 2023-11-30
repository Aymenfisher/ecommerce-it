import React from 'react'
import Stack from '@mui/material/Stack'
import Typography  from '@mui/material/Typography'
import ContactForm from './ContactForm'

const Contact = () => {
  return (
    <Stack sx={{ minHeight: 600 }}>
      <Stack spacing={2} p={2}>
        <Typography sx={{ fontWeight: '600 !important', typography: { xs: 'h6', sm: 'h4' } }}>
          <u style={{ textDecorationThickness: '8px', textUnderlineOffset: '10px', textDecorationColor: '#f0ce16' }}>Contact</u> us
        </Typography>
        <Typography  variant='body1' textAlign={'center'} fontFamily={'Roboto'} fontWeight={500} color={'text.secondary'} fontSize={{ xs: '1rem', sm: 20 }} >
        We value your feedback and inquiries. Feel free to reach out to us through any of our Channels. Our dedicated team is here to assist you.
        </Typography>
      </Stack>
      <ContactForm/>
    </Stack>
  )
}

export default Contact