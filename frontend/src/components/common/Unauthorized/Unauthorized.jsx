import React from 'react';
import { Link } from 'react-router-dom';
import CommonButton from '../commonButton/CommonButton'
import HomeIcon from '@mui/icons-material/Home';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Unauthorized = () => (
    <Container sx={{ width: '100vw',minHeight:'70vh', textAlign: 'center',display:'flex',flexDirection:'Column',justifyContent:'center',gap:'10px' }}>
        <Typography variant='h1' fontWeight={800}>401 - Unauthorized ✋⛔️!</Typography>
        <Typography variant='body2'>
            You dont have access to this page !
        </Typography>
        <Link to='/' style={{textDecoration:'none'}}>      
        <CommonButton variant="contained"  startIcon={<HomeIcon />}>
            Home
        </CommonButton>
        </Link>
    </Container>
);

export default Unauthorized;