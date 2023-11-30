import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Forbidden = () => (
    <Container sx={{ width: '100vw',minHeight:'70vh', textAlign: 'center',display:'flex',flexDirection:'Column',justifyContent:'center',gap:'10px' }}>
        <Typography variant='h1' fontWeight={800}>403 - Forbidden ⚠️!</Typography>
        <Typography variant='body2'>
            You dont have the permission to access this page !
        </Typography>
    </Container>
);

export default Forbidden;