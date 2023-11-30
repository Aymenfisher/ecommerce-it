import Typography from '@mui/material/Typography';
import Box  from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React from 'react';
import StoreIcon from '@mui/icons-material/Store';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {  selectStoreInfos } from '../../../features/storeinfos/storeInfosSlice';
import { selectRoutes } from '../../../features/routes/routesSlice';


const selectSocialMediaIcon = (platform) => {
    switch (platform.toLowerCase()) {
        case 'facebook':
            return <FacebookIcon color='primary' />
        case 'twitter':
            return <TwitterIcon color='primary' />
        case 'instagram':
            return <InstagramIcon color='error' />
        case 'youtube':
            return <YouTubeIcon color='error' />
        default:
            return false
    }
}

const Footer = () => {
    const storeInfos = useSelector(selectStoreInfos)
    const socialMediaLinks =  Object.entries(storeInfos.socialMedia).filter(link => link[1].length) // filter available social media links
    const navigationRoutes = useSelector(selectRoutes).filter(route => route.isNavigation)
    return (
        <Box component={'footer'}>
            <Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} columnGap={2} sx={{ p: 2, flexWrap: 'wrap', bgcolor: '#1f1f1f' }} justifyContent={{ xs: 'flex-start', sm: 'space-evenly' }} >
                            <Stack spacing={2}>
                                <Link to='/' style={{ textDecoration: 'none' }}>
                                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                        <img src='/logo.png' alt='store logo' style={{ height: '80px' }}></img>
                                        <Typography
                                            component="div"
                                            sx={{ flexGrow: 1, display: { md: 'flex' }, typography: { lg: 'h1', xs: 'h6' } }}
                                            color={'brights.one'}
                                        >
                                            {storeInfos.title}
                                        </Typography>
                                    </Stack>
                                </Link>
                                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                    <StoreIcon color='yellow' />
                                    <Typography variant='body2' color={'brights.one'}><b>Address :</b> {storeInfos.address}</Typography>
                                </Stack>
                                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                    <EmailIcon color='yellow' />
                                    <a style={{ textDecoration: 'none' }} href={`mailto:${storeInfos.email}`}>
                                        <Typography variant='body2' color={'brights.one'}><b>Email :</b> {storeInfos.email}</Typography>
                                    </a>
                                </Stack>
                                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                    <PhoneIphoneIcon color='yellow' />
                                    <Stack direction={'row'} alignItems={'center'}>
                                        <Typography variant='body2' color={'brights.one'} children={'Phones:'} fontWeight={800} />
                                        <Stack direction={'row'} flexWrap={'wrap'}>
                                            {
                                                storeInfos.phones.map((phone, index) => {
                                                    return (
                                                        <a key={phone} style={{ textDecoration: 'none' }} href={`tel:${phone}`}>
                                                            <Typography variant='body2' color={'brights.one'}>{`${phone}${index == storeInfos.phones.length - 1 ? '' : ' /'}`}</Typography>
                                                        </a>

                                                    )
                                                })
                                            }
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack spacing={2}>
                                <Stack justifyContent={'center'} sx={{ height: 80 }}>
                                    <Typography
                                        variant='h6'
                                        color={'brights.one'}
                                    >
                                        <u style={{ textDecorationThickness: '3px', textUnderlineOffset: '5px', textDecorationColor: '#f0ce16' }}>Site</u> Map
                                    </Typography>
                                </Stack>
                                {
                                    navigationRoutes.map((route) => {
                                        return (
                                            <Stack key={route.name} direction={'row'} spacing={1} alignItems={'center'}>
                                                <ArrowRightAltIcon color='yellow' />
                                                <Link to={route.path} style={{ textDecoration: 'none' }}>
                                                    <Typography variant='body2' color={'brights.one'} sx={{ '&:hover': { color: 'yellow.main' } }}>{route.name}</Typography>
                                                </Link>

                                            </Stack>
                                        )
                                    })
                                }
                            </Stack>
                            <Stack spacing={2}>
                                <Stack justifyContent={'center'} sx={{ height: 80 }}>
                                    <Typography
                                        variant='h6'
                                        color={'brights.one'}
                                    >
                                        <u style={{ textDecorationThickness: '3px', textUnderlineOffset: '5px', textDecorationColor: '#f0ce16' }}>Follow</u> Us On Social Media
                                    </Typography>
                                </Stack>
                                {
                                    socialMediaLinks.map((platform) => {
                                        const platfomName = platform[0]
                                        const platformLink = platform[1]
                                        return (
                                            <Stack key={platfomName} direction={'row'} spacing={1} alignItems={'center'}>
                                                {selectSocialMediaIcon(platfomName)}
                                                <a target='_blank' href={`//${platformLink}`} style={{ textDecoration: 'none' }}>
                                                    <Typography variant='body2' textTransform='capitalize' color={'brights.one'} sx={{ '&:hover': { color: 'yellow.main' } }}>{platfomName}</Typography>
                                                </a>

                                            </Stack>
                                        )
                                    })
                                }
                            </Stack>
                </Stack>
                <Box sx={{ bgcolor: '#101010', p: 2 }}>
                    <Typography color='brights.one' variant='body1'>
                        {`© ${new Date().getFullYear()}. Developed by `} <a style={{ textDecoration: 'none', color: '#f0ce16' }} target='_blank' href='//linkedin.com/in/aymen-boudabia'><b>Aymen Boudabia</b></a>
                    </Typography>
                </Box>
            </Stack>


        </Box>
    )
}

export default Footer