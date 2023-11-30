import React from 'react'
import Button from '@mui/material/Button';

const CommonButton = ({ children, color, disabled, size, sx, variant,onClick,type,startIcon,title }) => {
    return (
        <Button
            color={color}
            disabled={disabled}
            size={size}
            sx={sx}
            variant={variant}
            onClick={onClick}
            type={type}
            startIcon={startIcon}
            title={title}
        >
            {children}
        </Button>
    )
}

export default CommonButton