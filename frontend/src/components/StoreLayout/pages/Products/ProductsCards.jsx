import  Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery  from '@mui/material/useMediaQuery'
import React from 'react'
import ProductCard from '../../../common/ProductCard/ProductCard'
import PaginationComponent from '../../../common/Pagination/PaginationComponent'
import { storeTheme } from '../../../../storeTheme'
import {useSearchParams} from 'react-router-dom'

const ProductsCards = ({ products }) => {
    // page from search params:
    const [searchParams,setSearchParams] = useSearchParams()
    const page = searchParams.get('p') || 1
    const handleChangePage = (event, newPage) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('p', newPage);
        setSearchParams(newSearchParams);
    };

    // pagination configs

    const productsPerPage = useMediaQuery(storeTheme.breakpoints.down("md")) ? 10 : 15
    const productsLength = products.length
    const pagesNumber = productsLength % productsPerPage === 0 ? productsLength / productsPerPage : Math.ceil(productsLength / productsPerPage)
    const startIndex = (page - 1) * productsPerPage
    const endIndex = startIndex + productsPerPage

    const pageProducts = products.slice(startIndex, endIndex) // products to display for a specific page
    
    React.useEffect(() => {
        window.scrollTo(0, 0) // scroll to top on page change
    }, [page])

    return (
        <Stack spacing={2}>
            <Box sx={{ minHeight: '400px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 240px)', justifyContent: { xs: 'center', lg: 'space-between' }, gap: '50px' }}>
                {
                    productsLength ?
                        pageProducts.map((product) => {
                            return <ProductCard key={product.title} product={product} />
                        }) : <Typography sx={{ width: '100%', height: '100%' }} variant='h6' textAlign={'center'} color={'text.secondary'} children='No Products Found' />
                }
            </Box >
            <PaginationComponent pagesNumber={pagesNumber} page={Number(page)} handleChangePage={handleChangePage} sx={{ alignSelf: 'center', fontWeight: 800 }} />
        </Stack>
    )
}

export default ProductsCards