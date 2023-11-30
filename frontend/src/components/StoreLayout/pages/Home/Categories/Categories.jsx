import React from 'react';
import CategoryCard from './CategoryCard';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Slide  from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';
import useScrollTriggerOnce from '../../../../common/hooks/useScrollTriggeredOnce.js';

const Categories = () => {
    const navigate = useNavigate()
    const triggered = useScrollTriggerOnce()
    return (
        <Stack spacing={2} sx={{ p: 4, bgcolor: 'brights.one' }} >
            <Typography  sx={{ fontWeight: '800 !important',typography:{xs:'h6',sm:'h4'} }}>
                <u style={{ textDecorationThickness: '8px', textUnderlineOffset: '10px', textDecorationColor: '#f0ce16' }}>Explore</u> Our Vast Categories
            </Typography>
            <Grid container alignSelf={'center'} sx={{minHeight:'300px',overflow:'hidden',minWidth:'100%',py:0.1}} justifyContent={'center'} spacing={1}>
                <Slide in={triggered} direction='left' timeout={800} mountOnEnter unmountOnExit>
                    <Grid item onClick={() => { return navigate('/products?category=laptops') }}>

                        <CategoryCard
                            imageSrc="/assets/categories/laptops.webp"
                            title="Laptops"
                            description="Explore our wide range of laptops for all your computing needs."
                        />


                    </Grid>
                </Slide>
                <Slide in={triggered} direction='left' timeout={800} >
                    <Grid item onClick={() => { return navigate('/products?category=desktops') }}>

                        <CategoryCard
                            imageSrc="/assets/categories/desktoppc.webp"
                            title="Desktops"
                            description="Explore our wide range of desktops for all your computing needs."
                        />


                    </Grid>
                </Slide>
                <Slide  in={triggered} direction='left' timeout={800}>
                    <Grid item onClick={() => { return navigate('/products?category=phones') }}>

                        <CategoryCard
                            imageSrc="/assets/categories/phones.webp"
                            title="Phones"
                            description="Explore our wide range of phones for all your computing needs."
                        />


                    </Grid>
                </Slide>
                <Slide in={triggered} direction='left' timeout={800}>
                    <Grid item onClick={() => { return navigate('/products?category=printers') }}>

                        <CategoryCard
                            imageSrc="/assets/categories/printers.webp"
                            title="Printers"
                            description="Explore our wide range of Printers for all your computing needs."
                        />


                    </Grid>
                </Slide>
                <Slide in={triggered} direction='left' timeout={800}>
                    <Grid item onClick={() => { return navigate('/products?category=accessories') }}>

                        <CategoryCard
                            imageSrc="/assets/categories/others.webp"
                            title="Accessories"
                            description="A lot more of electronics and accessories !"
                        />

                    </Grid>
                </Slide>

            </Grid>
        </Stack>
    );
};

export default Categories;
