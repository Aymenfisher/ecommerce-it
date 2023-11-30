import React from 'react';
import { Link } from 'react-router-dom';
import CommonButton from '../commonButton/CommonButton'
import HomeIcon from '@mui/icons-material/Home';
import  Container from '@mui/material/Container';
import Typography  from '@mui/material/Typography';

const NotFound = () => (
    <Container sx={{ width: '100vw', minHeight: '70vh', textAlign: 'center', display: 'flex', flexDirection: 'Column', justifyContent: 'center', gap: '10px' }}>
        <Typography variant='h1' fontWeight={800}>404 - Not Found!</Typography>
        <Typography variant='body2'>
            This Page doesnt exist !
        </Typography>

        <CommonButton variant="contained" sx={{width:'300px'}} startIcon={<HomeIcon />}>
            <Link to='/' style={{ textDecoration: 'none' }}>
                Home
            </Link>
        </CommonButton>

    </Container>
);

export default NotFound;