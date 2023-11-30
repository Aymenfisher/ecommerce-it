import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectStoreInfos } from '../../../../features/storeinfos/storeInfosSlice'
import Location from './Location'

const About = () => {
  const storeInfos = useSelector(selectStoreInfos)

  return (
    <Stack sx={{ minHeight: 600 }}>
      <Stack spacing={2} p={2}>
        <Typography sx={{ fontWeight: '600 !important', typography: { xs: 'h6', sm: 'h4' } }}>
          <u style={{ textDecorationThickness: '8px', textUnderlineOffset: '10px', textDecorationColor: '#f0ce16' }}>About</u> us
        </Typography>
        <Stack spacing={2} p={1}>
                <Typography  variant='body1' fontFamily={'Roboto'} sx={{whiteSpace:'pre-wrap',textAlign:'justify'}} fontWeight={500} color={'text.secondary'} fontSize={{xs:'1rem',sm:20}} >{storeInfos.about}</Typography>
        </Stack>
      </Stack>
      <Location mapsLocation={storeInfos.mapsLocation}/>
    </Stack>
  )
}

export default About