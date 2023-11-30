import * as React from 'react';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '95%',
    boxShadow: 24,
};

export default function BasicModal({ children, open, handleClose }) {

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Stack alignItems={'stretch'} style={style} >
                <Stack direction={'row'} justifyContent={'flex-end'} sx={{ bgcolor: 'transparent' }}>
                    <IconButton onClick={handleClose} sx={{p:0}}>
                        <CancelRoundedIcon color='white' />
                    </IconButton>
                </Stack>
                <div style={{backgroundColor:'white',overflow:'auto',flex:'1',display:'flex',flexDirection:'column'}}>
                {children}
                </div>
                    
            </Stack>

        </Modal>
    );
}