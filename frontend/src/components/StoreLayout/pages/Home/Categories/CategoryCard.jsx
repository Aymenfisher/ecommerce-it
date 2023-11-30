import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const CategoryCard = ({ imageSrc, title, description }) => {
    return (
        <Card sx={{width:'220px',height:'280px',borderRadius:4}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={imageSrc}
                    alt={title}
                    sx={{objectFit:'fill'}}
                />
                <CardContent>
                    <Typography gutterBottom fontFamily={'Roboto'} variant="h5" component="div" fontWeight={500}>
                        {title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CategoryCard