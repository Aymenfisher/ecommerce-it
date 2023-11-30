import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Slide from '@mui/material/Slide'
import React from 'react'
import CommonButton from '../../../../components/common/commonButton/CommonButton'
import { useSelector } from 'react-redux'
import { selectStoreInfos } from '../../../../features/storeinfos/storeInfosSlice'
import { Link } from 'react-router-dom'
import Carousel from 'react-multi-carousel'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



const Description = () => {
    const storeInfos = useSelector(selectStoreInfos)
    const [images, setImages] = React.useState([]);
    const oneItemResponsive = {
        all: {
            breakpoint: { max: 4000, min: 0 },
            items: 1,
        }
    }

    React.useEffect(() => {
        const importImages = async () => {
            const imageFiles = import.meta.glob('/public/assets/storeInfos/*.+(png|jpe?g|svg|webp)');
            const importedImages = await Promise.all(
                Object.values(imageFiles).map((importedModule) => importedModule())
            );
            setImages(importedImages.map(image => image.default));
        };

        importImages();
    }, []);


    return (
        <Grid container spacing={1} sx={{ px:5, justifyContent: 'center',bgcolor:'darks.three',maxWidth:'100%',m:0,minHeight:'500px' }}  >
            <Slide in={true} direction='right' timeout={500}>
                <Grid item xs={12} md={6}>
                    <Stack spacing={2} width={'100%'} height={'100%'} justifyContent={'center'}>
                        <Stack>
                            <Typography color='brights.one' sx={{ typography: { xs: 'h4', sm: 'h2' }, fontWeight: '800 !important', alignSelf: { xs: 'center', md: 'flex-start' } }} children={storeInfos.title} />
                            <Typography color='brights.one' variant='h6' fontSize={{ xs: '1rem', sm: '20px' }}  children={storeInfos.description} />
                        </Stack>
                        <Stack direction={'row'} spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                            <Link to='/products'><CommonButton startIcon={<ShoppingCartIcon />} variant={'contained'} color={'yellow'} size={'large'} sx={{ width: '150px', color: 'darks.one' }} children={'Shop Now'} /></Link>

                        </Stack>
                    </Stack>

                </Grid>
            </Slide>
            <Slide in={true} direction='left' timeout={500}>
                <Grid item xs={12} md={6} justifyContent='center'>

                    <Carousel showDots={false} arrows={false} autoPlay={true} infinite={true} draggable={false} swipeable={false} responsive={oneItemResponsive}>
                        {
                            images.map((image, index) => {
                                return (
                                    <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                                        <img alt="store poster" src={image} style={{ objectFit: 'cover', maxWidth: '100%' }} />
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </Grid>
            </Slide>

        </Grid>
    )
}

export default Description