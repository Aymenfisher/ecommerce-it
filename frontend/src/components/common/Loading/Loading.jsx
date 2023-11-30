import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading({sx}) {
    return (
        <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center',minHeight:'400px',...sx }}>
            <CircularProgress />
        </Box>
    );
}