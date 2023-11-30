import React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmDialog = ({ title, content, confirmText, denyText, confirmOperation, open, setOpen }) => {

    const handleConfirm = () => {
        confirmOperation()
        setOpen(false)
    }
    const handleDeny = () => {
        setOpen(false)
    }
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' size='small' onClick={handleDeny}>{denyText}</Button>
                <Button color='primary' variant='contained' size='small' onClick={handleConfirm} autoFocus>
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog