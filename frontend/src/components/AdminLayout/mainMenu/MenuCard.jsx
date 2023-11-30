import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';

const MenuCard = ({ title, description, link, image }) => {
    const navigate = useNavigate()
    return (
        <Card sx={{ width: { xs: '300px', sm: '350px' } }} onClick={() => navigate(link)}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={`${image}`}
                    alt="menu icon"
                    sx={{ objectFit: 'contain' }}
                />
                <CardContent>
                    <Typography textAlign={'center'} gutterBottom textTransform={'capitalize'} variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography textAlign={'center'} variant="body1" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default MenuCard