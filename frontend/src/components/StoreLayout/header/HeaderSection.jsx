import  Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import React from 'react'
import { Link } from 'react-router-dom'
import StyledSearchBar from '../../common/SearchBar/StyledSearchBar';

const HeaderSection = ({ storeInfos }) => {
    return (
        <Container maxWidth={false}  sx={{ bgcolor: 'darks.two', color: 'white.main' }}>
            <Stack direction={{xs:'column',sm:'row'}} p='5px 5px' justifyContent={'space-between'} alignItems={'center'}>
                <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                        <img src={'/logo.png'} alt='logo' style={{ height: '100px' }}></img>
                        <Typography
                            component="div"
                            sx={{ flexGrow: 1, display: { md: 'flex' },typography: {lg:'h1', xs: 'h6' } }}
                        >
                            {storeInfos.title}
                        </Typography>
                    </Stack>
                </Link>
                <StyledSearchBar sx={{ bgcolor: 'white.main' }}  />
            </Stack>

        </Container>


    )
}

export default HeaderSection