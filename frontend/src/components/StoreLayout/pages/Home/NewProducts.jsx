import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import React from 'react'
import CarouselSlider from '../../../common/Carousel/CarouselSlider'
import ProductCard from '../../../common/ProductCard/ProductCard'
import { useSelector } from 'react-redux'
import { selectNewProducts } from '../../../../features/products/productsSlice'

const NoProducts = () => {
    return (
        <Stack alignItems={'center'} justifyContent={'center'} sx={{ height: '300px' }}>
            <Typography variant='body1' fontWeight={800} color={'text.secondary'}>There are no products for now</Typography>
        </Stack>
    )
}

const NewProducts = () => {

    const newProducts = useSelector(selectNewProducts)
    const newProductsCards = newProducts.map(product => <ProductCard product={product} />)
    return (
        <Stack spacing={2} sx={{ p: 4, bgcolor: 'brights.two' }}>
            <Typography sx={{ fontWeight: '800 !important', typography: { xs: 'h6', sm: 'h4' } }}>
                <u style={{ textDecorationThickness: '8px', textUnderlineOffset: '10px', textDecorationColor: '#f0ce16' }}>New</u> Arrivals
            </Typography>
            {
                newProducts.length ?
                    <CarouselSlider items={newProductsCards} />
                    :
                    <NoProducts />
            }
        </Stack>
    )
}

export default NewProducts