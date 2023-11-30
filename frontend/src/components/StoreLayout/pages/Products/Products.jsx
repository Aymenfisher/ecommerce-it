import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import React from 'react'
import BasicList from '../../../common/BasicList/BasicList'
import SelectComponent from '../../../common/SelectComponent/SelectComponent'
import ProductsCards from './ProductsCards'
import { useDispatch, useSelector } from 'react-redux'
import { selectCategories } from '../../../../features/categories/categoriesSlice'
import { selectProducts, selectIsLoadingStoreProducts, selectHasErrorStoreProducts, fetchStoreProducts } from '../../../../features/products/productsSlice'
import { useSearchParams } from 'react-router-dom'
import OutlinedSearchBar from '../../../common/SearchBar/OutlinedSearchBar';
import Loading from '../../../common/Loading/Loading';
import ErrorLoading from '../../../common/ErrorLoading/ErrorLoading';

const Products = () => {
  //fetching products state
  const isLoadingStoreProducts = useSelector(selectIsLoadingStoreProducts)
  const hasErrorStoreProducts = useSelector(selectHasErrorStoreProducts)

  const [searchParams, setSearchParams] = useSearchParams()
  //search term
  const searchTerm = searchParams.get('search') || ''
  const handleSearchTermChange = (e) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('search', e.target.value);
    newSearchParams.set('p', 1); //reset page
    setSearchParams(newSearchParams);
  }

  //category
  const category = searchParams.get('category') || 'all'//get category from query string
  const changeCategory = (newCategory) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('category', newCategory);
    newSearchParams.set('p', 1); //reset page
    setSearchParams(newSearchParams);
  }
  const categories = ['all', ...Object.values(useSelector(selectCategories))]

  // sorting :
  const sortOptions = [{title: 'Default'},{title: 'Highest to lowest price',field:'discountedPrice',order:-1},{title: 'Lowest to highest price',field:'discountedPrice',order:1}] //( -1 for descending , 1 for ascending)
  const sortOptionsTitles = sortOptions.map(option => option.title)
  const [sortingOption, setSortingOption] = React.useState({title: 'Default'})
  const handleChangeSortOption = (newSortOptionTitle) => {
    const newOption = sortOptions.find(option => option.title == newSortOptionTitle)
    setSortingOption(newOption)
    return
  }
  // products to display :
  const products = useSelector(selectProducts).filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase())) //All products filtered by search
  const filteredProducts = category == 'all' ? products :products.filter(product => product.category === category)
  const sortedProducts = sortingOption == 'Default' ? filteredProducts : filteredProducts.sort((a,b) =>{
    return ((a[sortingOption.field] - b[sortingOption.field]) * sortingOption.order)
  })
  const dispatch = useDispatch()

  return (
    <Stack direction={'row'} >

      <BasicList setActiveItem={changeCategory} items={categories} activeItem={category} title={'Categories'} sx={{ display: { xs: 'none', md: 'flex' } }} />
      <Paper component={'main'} sx={{ bgcolor: 'brights.two', p: 2, width: '100%' }}>
        <Stack spacing={4}   >
          <Stack direction={{ xs: 'column-reverse', md: 'row' }} justifyContent={'space-between'} rowGap={2}>
            <Stack spacing={.5} width='100%' >
              <Stack rowGap={1} columnGap={.5} flexWrap='wrap' direction='row' justifyContent='space-between'>
                <OutlinedSearchBar
                  sx={{ bgcolor: 'brights.one',minWidth:'300px' }}
                  placeholder={'Products Search..'}
                  searchTerm={searchTerm}
                  handleSearchTermChange={handleSearchTermChange}
                />
                <SelectComponent label={'sort'} defaultValue={'Default'}  items={sortOptionsTitles} alwaysShow={true} setActiveItem={handleChangeSortOption} />
              </Stack>
              <Typography variant='caption' fontWeight={600} color={'text.secondary'}>{sortedProducts.length} Products Found.</Typography>
            </Stack>
            <SelectComponent label={'categories'} defaultValue={category} items={categories} alwaysShow={false} setActiveItem={changeCategory} />
          </Stack>
          {
            isLoadingStoreProducts ?
              <Loading /> :
              hasErrorStoreProducts ?
                <ErrorLoading reload={() => dispatch(fetchStoreProducts())} /> :
                <ProductsCards products={sortedProducts} />
          }

        </Stack>
      </Paper>
    </Stack>



  )
}

export default Products