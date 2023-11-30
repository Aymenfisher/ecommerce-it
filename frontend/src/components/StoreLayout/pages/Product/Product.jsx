import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles'
import React from 'react'
import CommonButton from '../../../common/commonButton/CommonButton'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {  useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductById, selectIsLoadingStoreProducts, selectHasErrorStoreProducts, fetchStoreProducts } from '../../../../features/products/productsSlice';
import GalleryCarousel from '../../../common/GalleryCarousel/GalleryCarousel';
import ProductInfos from './ProductInfos';
import ProductSpecs from './ProductSpecs';
import MoreProducts from './MoreProducts';
import Loading from '../../../common/Loading/Loading';
import ErrorLoading from '../../../common/ErrorLoading/ErrorLoading';
import NotFound from '../../../common/NotFound/NotFound';


const Product = () => {
    //fetching products state
    const isLoadingStoreProducts = useSelector(selectIsLoadingStoreProducts)
    const hasErrorStoreProducts = useSelector(selectHasErrorStoreProducts)

    const navigate = useNavigate()
    const { id } = useParams()
    const product = useSelector(state => selectProductById(state, id))


    // carousel settings
    const theme = useTheme();
    const lessThanMid = useMediaQuery(theme.breakpoints.down("md"));

    // more products carousel settings
    const carouselImages = !isLoadingStoreProducts && !hasErrorStoreProducts && !!product ? product.images.length ? product.images.map(image => {
        return { src: image }
    }) : [{ src: '/src/assets/no-image-icon.webp' }]
        : []
    
    const dispatch = useDispatch()
    return (
        <main>
            {
                isLoadingStoreProducts ? <Loading sx={{minHeight:'600px'}} /> :
                    hasErrorStoreProducts  ? <ErrorLoading sx={{minHeight:'600px'}} reload={() => dispatch(fetchStoreProducts())} /> :
                        !product ? <NotFound/> :
                        <>
                            <Stack spacing={2} py={2} px={1}>
                                <CommonButton startIcon={<KeyboardBackspaceIcon />}
                                    color={'inherit'}
                                    disabled={false}
                                    size={'large'}
                                    variant={'outlined'}
                                    onClick={() => { return navigate(-1) }}
                                    sx={{ width: '150px', fontSize: '1rem', ml: 2 }}
                                    children={'Back'}
                                />
                                <Stack direction={{ xs: 'column', md: 'row' }} bgcolor={'brights.two'} spacing={2} justifySelf={'center'} sx={{ maxWidth: '100%', p: 3 }}>
                                    <Container sx={{ width: { xs: '100%', md: '40%' } }}>
                                        <GalleryCarousel images={carouselImages} hasThumbnails={lessThanMid ? false : true} hasSizeButton={'topRight'} dots={lessThanMid} hasIndexBoard={false} />
                                    </Container>

                                    <ProductInfos product={product} />
                                </Stack>
                                <ProductSpecs specs={product.specs} />

                            </Stack>
                            <MoreProducts category={product.category} />
                        </>
            }
        </main>
    )
}

export default Product