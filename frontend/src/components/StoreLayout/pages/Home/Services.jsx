import  Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import  Slide from '@mui/material/Slide'
import React from 'react'
import useScrollTriggerOnce from '../../../common/hooks/useScrollTriggeredOnce'

const Services = () => {
    const triggered = useScrollTriggerOnce()
    return (
        <Stack direction={'row'} justifyContent={'space-evenly'} sx={{ bgcolor: 'brights.two', py: 4 }}>
            <Slide direction='up' in={triggered} timeout={800}>
                <Stack alignItems={'center'}>
                    <Box
                        component="img"
                        sx={{
                            maxWidth: { xs: 50, sm: 150 },
                            objectFit: 'cover'
                        }}
                        alt="express delivery"
                        src='/assets/features/quickDelivery.webp'
                    />
                    <Typography sx={{ typography: { xs: 'body2', sm: 'h6' },fontWeight:'600 !important' }}>Fast Delivery</Typography>
                </Stack>
            </Slide>

            <Divider orientation='vertical' variant='middle' flexItem sx={{ bgcolor: 'darks.one' }} />
            <Slide direction='up' in={triggered} timeout={800}>
                <Stack alignItems={'center'}>
                    <Box
                        component="img"
                        sx={{
                            maxWidth: { xs: 50, sm: 150 },
                            objectFit: 'cover'
                        }}
                        alt="guarantee and quality"
                        src='/assets/features/guarantee.webp'
                    />
                    <Typography sx={{ typography: { xs: 'body2', sm: 'h6' },fontWeight:'600 !important'  }}>Guarantee 100%</Typography>
                </Stack>
            </Slide>

            <Divider orientation='vertical' variant='middle' flexItem sx={{ bgcolor: 'darks.one' }} />
            <Slide direction='up' in={triggered} timeout={800}>
                <Stack alignItems={'center'}>
                    <Box
                        component="img"
                        sx={{
                            maxWidth: { xs: 50, sm: 150 },
                            objectFit: 'cover'
                        }}
                        alt="top customer service"
                        src='/assets/features/customerService.webp'
                    />
                    <Typography sx={{ typography: { xs: 'body2', sm: 'h6' },fontWeight:'600 !important'  }}>Five Stars Service</Typography>
                </Stack>
            </Slide>

        </Stack>
    )
}

export default Services