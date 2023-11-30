import React from 'react';
import Backdrop from '@mui/material/Backdrop';


export default function SimpleBackdrop({ children,open,handleClose }) {


    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                {children}
            </Backdrop>
        </div>
    );
}