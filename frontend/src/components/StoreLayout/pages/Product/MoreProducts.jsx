import React from 'react'
import  Stack from '@mui/material/Stack'
import  Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { selectProducts } from '../../../../features/products/productsSlice'
import CarouselSlider from '../../../common/Carousel/CarouselSlider'
import ProductCard from '../../../common/ProductCard/ProductCard'

const MoreProducts = ({category}) => { // shows random products of the same category
    // select 5 products from the same category
    const categoryProducts = Object.values(useSelector(selectProducts)).filter(product => product.category ==category).slice(0,5)
    const categoryProductsCards = categoryProducts.map(product => <ProductCard product={product} />)
    return (
        <Stack  spacing={3} py={4} px={2} bgcolor={'brights.two'}>
            <Typography variant='h4' alignSelf={'center'} fontWeight={500} lineHeight={1.5}><u style={{ textDecorationThickness: '8px', textUnderlineOffset: '10px', textDecorationColor: '#f0ce16' }}>Products</u> You May Like</Typography>
            <CarouselSlider items={categoryProductsCards} />
        </Stack>
    )
}

export default MoreProducts