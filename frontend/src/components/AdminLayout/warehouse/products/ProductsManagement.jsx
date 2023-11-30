import { Stack, TextField, Container, IconButton, Typography } from '@mui/material'
import React from 'react'
import CommonButton from '../../../common/commonButton/CommonButton'
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ProductsTable from './productsTable/ProductsTable';
import SelectComponent from '../../../common/SelectComponent/SelectComponent';
import { selectCategories } from '../../../../features/categories/categoriesSlice'
import { useDispatch, useSelector } from 'react-redux'
import BasicModal from '../../../common/BasicModal/BasicModal';
import ProductForm from './productForm/ProductForm';
import { fetchAdminProducts, selectHasErrorDeleteProduct,selectIsLoadingDeleteProduct, selectHasErrorAdminProducts,  selectIsLoadingAdminProducts, selectProducts, deleteProduct } from '../../../../features/products/productsSlice'
import Loading from '../../../common/Loading/Loading'
import ErrorLoading from '../../../common/ErrorLoading/ErrorLoading'
import Toast from '../../../common/Toast/Toast';
import ConfirmDialog from '../../../common/Dialog/ConfirmDialog';
import RefreshIcon from '@mui/icons-material/Refresh';


const ProductsManagement = () => {
  const dispatch = useDispatch()
  //getting products
  const products = useSelector(selectProducts)
  const isLoadingAdminProducts = useSelector(selectIsLoadingAdminProducts);
  const hasErrorAdminProducts = useSelector(selectHasErrorAdminProducts)
  //search term
  const [searchTerm, setSearchTerm] = React.useState('')
  // category filter
  const [category, setCategory] = React.useState('all')
  const handleChangeCategory = (newCategory) => {
    setCategory(newCategory)
  }
  const categories = ['all', ...Object.values(useSelector(selectCategories))]
  const productsByCategory = category == 'all' ? products : products.filter(
    product => product.category.toLocaleLowerCase() == category.toLocaleLowerCase()
  )
  const productsToShow = productsByCategory.filter(product => product.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()))

  // product form 
  const [openForm, setOpenForm] = React.useState(false)
  const [productToEdit, setProductToEdit] = React.useState(false) // false or the product object
  const [openSuccessToast, setOpenSuccessToast] = React.useState(false) // success insert / update product snackbar
  const handleEditProduct = (product) => {
    setProductToEdit(product)
    setOpenForm(true)
  }
  const handleCloseForm = () => {
    setOpenForm(false)
    setProductToEdit(false) //clear product editing
  }



  //delete product
  const [productToDelete, setProductToDelete] = React.useState(false) // false or the product id to delete
  const [openDeleteProductDialog, setOpenDeleteProductDialog] = React.useState(false)  //  confirm delete product dialog setting
  const [openDeleteProductToast, setOpenDeleteProductToast] = React.useState(false)
  const isLoadingDeleteProduct = useSelector(selectIsLoadingDeleteProduct)
  const hasErrorDeleteProduct = useSelector(selectHasErrorDeleteProduct)
  const handleDeleteProduct = (_id) => {
    setProductToDelete(_id)
    setOpenDeleteProductDialog(true)
    return
  }

  // top element ref: scroll into it on page change in the table
  const topRef = React.useRef(null)
  return (
    <Container maxWidth={false} disableGutters sx={{ display: 'flex', flexDirection: 'column', rowGap: '15px' }} ref={topRef}>
      {openForm && <BasicModal children={<ProductForm product={productToEdit} closeForm={handleCloseForm} setOpenSuccessToast={setOpenSuccessToast} />} open={openForm} handleClose={handleCloseForm} />}
      <Stack spacing={2}>
        <Stack direction={'row'} alignItems={'center'} justifyContent='space-between'>
          <CommonButton
            color={'primary'}
            size={'small'}
            variant={'contained'}
            title={'Add Product'}
            children={'Add Product'}
            startIcon={<AddIcon />}
            sx={{ fontSize: `1rem`, maxWidth: '160px', fontWeight: 500 }}
            onClick={() => setOpenForm(true)}
          />
          <IconButton onClick={() => dispatch(fetchAdminProducts())} sx={{ title: 'Refresh Products' }}>
            <RefreshIcon />
          </IconButton>
        </Stack>
        <Stack direction={'row'} rowGap={2} justifyContent={'space-between'} flexWrap={'wrap'}>
          <SelectComponent
            items={categories}
            alwaysShow
            label={'category'}
            size={'small'}
            defaultValue='all'
            setActiveItem={handleChangeCategory}
          />
          <TextField onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              bgcolor: 'white.main',
              "& input::placeholder": { fontSize: "14px", fontWeight: '500' },
              minWidth: '180px'
            }}
            size={'small'} id="outlined-search" placeholder={`Search in ${category == 'all' ? 'All Products' : category}`} type="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ width: '20px' }} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>
      <Typography variant='caption' fontWeight={600} color={'text.secondary'}>{productsToShow.length} Products Found.</Typography>
      {
        isLoadingAdminProducts ? <Loading /> :
          hasErrorAdminProducts ? <ErrorLoading reload={() => dispatch(fetchAdminProducts())} /> :
            <ProductsTable
              products={productsToShow}
              category={category}
              searchTerm={searchTerm}
              handleEditProduct={handleEditProduct}
              handleDeleteProduct={handleDeleteProduct}
              topRef={topRef}
            />

      }
      {/* successfull add/edit snackbar */}
      {openSuccessToast && <Toast open={openSuccessToast} setOpen={setOpenSuccessToast} message={productToEdit ? 'Product modified succussfully !' : 'Product created Succussfully!'} severity='success' />}
      {/* Delete product confirm dialog */}
      {openDeleteProductDialog &&
        <ConfirmDialog
          title={'Delete Product ?'}
          content={'Clicking confirm will delete this product PERMANENTLY.'}
          confirmText={'Confirm'}
          denyText={'Cancel'}
          open={openDeleteProductDialog}
          setOpen={setOpenDeleteProductDialog}
          confirmOperation={() => {
            setOpenDeleteProductToast(true) //loading 
            dispatch(deleteProduct(productToDelete))
            setProductToDelete(false) //clear state
            setOpenDeleteProductToast(true) // success or failure
          }}
        />}
      {/* Deleting product snackbar */}
      {isLoadingDeleteProduct && <Toast open={openDeleteProductToast} setOpen={setOpenDeleteProductToast} message='Deleting Product...' severity='info' />}
      {(!isLoadingDeleteProduct && !hasErrorDeleteProduct && openDeleteProductToast) && <Toast open={openDeleteProductToast} setOpen={setOpenDeleteProductToast} message='Product Deleted successfully!' severity='success' />}
      {(hasErrorDeleteProduct && openDeleteProductToast) && <Toast open={openDeleteProductToast} setOpen={setOpenDeleteProductToast} message='Couldnt Delete product, please try again.' severity='error' />}
    </Container>

  )
}

export default ProductsManagement