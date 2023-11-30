import React from 'react'
import { Paper, Stack, TextField, Typography, Divider, MenuItem, IconButton, Select, Tooltip, Alert } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import CommonButton from '../../../../common/commonButton/CommonButton';
import ImagesForm from './imagesForm/ImagesForm';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories } from '../../../../../features/categories/categoriesSlice';
import { useForm, Controller, useFieldArray, useWatch } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import HelpIcon from '@mui/icons-material/Help';
import CircularProgress from '@mui/material/CircularProgress';
import FormHelperText from '@mui/material/FormHelperText';
import { fetchAdminProducts } from '../../../../../features/products/productsSlice'
import formatDate from '../../../../../helpers/formatDate';
import displayTwoDecimalsIfFloat from '../../../../../helpers/displayTwoDecimalsIfFloat';

/* form submit handlers */
// 1- edit product handler
const handleEditProductSubmit = async (data, dirtyFields, productId) => {
    // data to submit : dirty fields only
    const dataToSubmit = Object.fromEntries(Object.entries(data).filter(field => dirtyFields.hasOwnProperty(field[0])))
    // estimating discountPercentage and calculating discounted price value
    dataToSubmit.discountPercentage = Math.ceil(data.discountPrice * 100 / data.price)
    dataToSubmit.discountedPrice = displayTwoDecimalsIfFloat(data.price - data.discountPrice)
    // separating files to upload from existing images urls
    const imagesToUpload = []
    const existingImages = []

    if (dataToSubmit.hasOwnProperty('images')) {
        dataToSubmit.images.forEach((image) => {
            // mime object files has a name property, urls are strings
            image.name ? imagesToUpload.push(image) : existingImages.push(image)
        })
        dataToSubmit.images = existingImages
    }

    // setting the main image as  index if it its changed , -1 if product has no images :
    dataToSubmit.hasOwnProperty('mainImage') && (dataToSubmit.mainImage = data.images.indexOf(dataToSubmit.mainImage))

    /* send data as multipart/form-data, with 2 fields: 
        1- textData(json) data (including existing images in an array of urls) 
        2- images(array of images files to upload)
    */
    const formData = new FormData()
    formData.append('jsonData', JSON.stringify(dataToSubmit))
    imagesToUpload.forEach(
        image => formData.append('images', image)
    )



    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/products/${productId}`, {
        method: 'PATCH',
        body: formData,
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (!response.ok) {
        if(response.status == 401){
            location.replace('/admin/login')
            return
        }
        throw { status: response.status }
    }
}

// 2- add product handler
const handleCreateProductSubmit = async (data) => {

    // estimating discountPercentage and calculating discounted price
    data.discountPercentage = Math.ceil(data.discountPrice * 100 / data.price)
    data.discountedPrice = displayTwoDecimalsIfFloat(data.price - data.discountPrice)
    // files to upload  :
    const imagesToUpload = data.images
    // setting the main image as  index of its image in the images array or -1 if no images provided
    data.mainImage = data.images.indexOf(data.mainImage)
    // send data as multipart/form-data, with 2 fields: textData(json) data (including existing images in an array of urls) and images(array of images mime)
    const formData = new FormData()
    formData.append('jsonData', JSON.stringify(data))
    imagesToUpload.forEach(
        image => formData.append('images', image)
    )

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/products`, {
        method: 'POST',
        body: formData,
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (!response.ok) {
        if(response.status == 401){
            location.replace('/admin/login')
            return
        }
        throw { status: response.status }
    }
}

const ProductForm = ({ closeForm, product, setOpenSuccessToast }) => { //product prop provided when editing a product, else its an add mode

    const addModeDefaultValues = { //default values for creating new product
        title: '',
        shortDescription: '',
        detailedDescription: '',
        discountPrice: 0,
        category: '',
        brand: '',
        isNewProduct: false,
        isTopProduct: false,
        isOnline: true,
        specs: [],
        inStock: true,
        images: [],
        mainImage: ''
    }
    const editModeDefaultValues = product && { //default values for editing product
        title: product.title,
        shortDescription: product.shortDescription,
        detailedDescription: product.detailedDescription,
        price: product.price,
        discountPrice: product.discountPrice,
        category: product.category,
        brand: product.brand,
        isNewProduct: product.isNewProduct,
        isTopProduct: product.isTopProduct,
        isOnline: product.isOnline,
        specs: product.specs,
        inStock: product.inStock,
        images: product.images,
        mainImage: product.mainImage
    }

    //init form
    const form = useForm({
        defaultValues: product ? editModeDefaultValues : addModeDefaultValues
    })
    const { register, formState, control, handleSubmit, getValues, setValue, watch, setError } = form
    const { errors, isDirty, isSubmitting, dirtyFields } = formState

    const { fields, append, remove } = useFieldArray({ // dynamic fields for specifications
        name: 'specs',
        control: control
    })
    // watched price and discount price to estimate the percentage, and display it to the user
    const discountPriceField = useWatch({ control, name: 'discountPrice' })
    const priceField = useWatch({ control, name: 'price' })
    //get catgories
    const categories = useSelector(selectCategories)

    //scroll to top on submission error (request error)
    const topRef = React.useRef(null) // error alert ref. (scroll to it on request error)

    //handle form submission
    const dispatch = useDispatch()
    const onSubmit = async (data) => {
        try {
            // execute the right handler :
            product ? await handleEditProductSubmit(data, dirtyFields, product._id) : await handleCreateProductSubmit(data)
            // on succussful response : alert user, close form , and reload products
            dispatch(fetchAdminProducts())
            setOpenSuccessToast(true)
            closeForm()

        } catch (error) {
            switch (error.status) {
                case 400:
                    setError('root.serverError', {
                        message: 'Bad Request'
                    })
                    break;
                default:
                    setError('root.serverError', {
                        message: 'Server Error'
                    })
                    break;
            }
            topRef.current?.scrollIntoView({ behaviour: 'smooth' })
        }
        return
    }


    return (
        <Paper sx={{ py: 2, px: { xs: 1, md: 3 }, bgcolor: 'brights.two' }} ref={topRef}>
            <Stack spacing={2} alignItems={'flex-start'} >
                <Typography variant='h4' fontWeight={500}>{
                    product ? <>Edit Product  <Typography variant='caption'> - {product._id}</Typography></> : 'Add Product'}
                </Typography>
                <Divider sx={{ width: '100%' }} />
                {product &&
                    <Stack direction={'row'} spacing={2}>
                        <Typography variant='caption' fontWeight={600} color={'text.secondary'}>Created At : {formatDate.dateWithTime(product.createdAt)}</Typography>
                        <Typography variant='caption' fontWeight={600} color={'text.secondary'}>Last Update : {formatDate.dateWithTime(product.updatedAt)}</Typography>
                    </Stack>}
                {errors.root?.serverError && <Alert severity="error" sx={{ alignSelf: 'stretch' }}>There was an error while submitting your order( {errors?.root?.serverError?.message} ), please try again or refresh the page.</Alert>}
                <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Stack spacing={2} >
                        <Stack spacing={1}>
                            <Typography variant='h5' fontWeight={500} children={'Title'} />
                            <TextField size='medium' id="title" variant="outlined" fullWidth
                                {...register('title', {
                                    required: 'This field is required',
                                    maxLength: {
                                        value: 120,
                                        message: 'Title cant exceed 120 characters long.'
                                    }
                                })}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />
                        </Stack>
                        <Divider sx={{ width: '100%' }} />
                        <Stack spacing={1}>
                            <Typography variant='h5' fontWeight={500} children={'Price ($)'} />
                            <TextField size='medium' id="price" variant="outlined"
                                {...register('price', {
                                    required: 'This field is required',
                                    valueAsNumber: true,
                                    max: {
                                        value: 9999999,
                                        message: 'Thats a big price buddy 😅'
                                    },
                                    min: {
                                        value: 0,
                                        message: 'Price must be positve number'
                                    },
                                    validate: {
                                        isValidNumber: value => (typeof (value) != 'number' || isNaN(value)) ? 'Invalid Number' : true
                                    }
                                })}
                                error={!!errors.price}
                                helperText={errors.price?.message}
                            />
                        </Stack>
                        <Stack spacing={1}>
                            <Stack direction={'row'} alignItems={'center'}>
                                <Typography variant='h5' fontWeight={500} children={'Discount Price ($)'} />
                                <Tooltip title={'The reduced price from the original price.\n the Discount percentage and the new price will be estimated automatically '}>
                                    <IconButton >
                                        <HelpIcon sx={{ height: '20px' }} />
                                    </IconButton>
                                </Tooltip>
                            </Stack>

                            <TextField size='medium' id="discountPrice" variant="outlined"
                                {...register('discountPrice', {
                                    valueAsNumber: true,
                                    required: 'Discount Price must range between 0 and the price',
                                    max: {
                                        value: priceField,
                                        message: 'Discount price must be less than the actual price'
                                    },
                                    min: {
                                        value: 0,
                                        message: 'Price must be positive number'
                                    },
                                    validate: {
                                        isPositive: value => (typeof (value) != 'number' || isNaN(value)) ? 'Invalid Number' : true
                                    }
                                })}
                                error={!!errors.discountPrice}
                                helperText={errors.discountPrice?.message}
                            />
                            {/* showing estimated discount percentage , and the new price to the user*/}
                            {!errors.price && !errors.discountPrice && priceField && discountPriceField ?
                                <Typography variant='caption'>
                                    {`Discount Percentage will be around :${Math.ceil(discountPriceField * 100 / priceField)}%`}<br/>
                                    {`The new price will be  :${displayTwoDecimalsIfFloat(priceField-discountPriceField)}$`}
                                </Typography> : ''
                            }
                        </Stack>
                        <Divider sx={{ width: '100%' }} />
                        <Stack spacing={1}>
                            <Typography variant='h5' fontWeight={500} children={'Category'} />
                            <Controller
                                name="category"
                                id="category"
                                control={control}
                                rules={{
                                    required: 'This field is required'
                                }}

                                render={({ field }) => (
                                    <>
                                        <Select
                                            labelId="category-label"
                                            value={field.value}
                                            onChange={field.onChange}
                                            inputRef={field.ref}
                                            onBlur={field.onBlur}
                                            sx={{ textTransform: 'capitalize' }}
                                            error={!!errors.category}
                                        >
                                            {
                                                categories.map((category) => {
                                                    return <MenuItem key={category} value={category} sx={{ textTransform: 'capitalize' }}>{category}</MenuItem>
                                                })
                                            }
                                        </Select>
                                        <FormHelperText error>{errors.category?.message}</FormHelperText>
                                    </>
                                )}
                            />
                        </Stack>
                        <Divider sx={{ width: '100%' }} />
                        <Stack spacing={1}>
                            <Typography variant='h5' fontWeight={500} children={'Status'} />
                            <Stack direction={'row'} sx={{ rowGap: 2, columnGap: 1 }} flexWrap={'wrap'}>
                                <FormControlLabel
                                    label='Online'
                                    control={
                                        <Controller
                                            control={control}
                                            name="isOnline"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Checkbox
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    id='isOnline'
                                                    checked={value}
                                                />
                                            )}
                                        />}
                                />
                                <FormControlLabel
                                    label='In Stock'
                                    control={
                                        <Controller
                                            control={control}
                                            name="inStock"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Checkbox
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    id='inStock'
                                                    checked={value}
                                                />
                                            )}
                                        />}
                                />
                                <FormControlLabel
                                    label='New Arrival'
                                    control={
                                        <Controller
                                            control={control}
                                            name="isNewProduct"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Checkbox
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    id='isNewProduct'
                                                    checked={value}
                                                />
                                            )}
                                        />}
                                />
                                <FormControlLabel control={
                                    <Controller
                                        control={control}
                                        name="isTopProduct"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Checkbox
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                checked={value}
                                                id='isTopProduct'
                                            />
                                        )}
                                    />}
                                    label='Top Product'
                                    htmlFor='isTopProduct'
                                />
                            </Stack>
                        </Stack>

                        <Divider sx={{ width: '100%' }} />
                        <Stack spacing={1}>
                            <Typography variant='h5' fontWeight={500} children={'Brand'} />
                            <TextField size='medium' id="brand" variant="outlined" fullWidth
                                {...register('brand', {
                                    required: 'This field is required',
                                })}
                                error={!!errors.brand}
                                helperText={errors.brand?.message}
                            />
                        </Stack>
                        <Stack spacing={1}>
                            <Stack direction={'row'} alignItems={'center'}>
                                <Typography variant='h5' fontWeight={500} children={'Short Description'} />
                                <Tooltip title={'description shown on product card. its important to leave space between details to allow line breaks if needed (see example)'}>
                                    <IconButton >
                                        <HelpIcon sx={{ height: '20px' }} />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                            <TextField size='medium' id="short-description" variant="outlined"
                                placeholder='example: 8GB RAM / 500GB SSD / Intel Core I3 10th / 15"'
                                {...register('shortDescription', {
                                    required: 'This field is required',
                                    maxLength: {
                                        value: 70,
                                        message: 'Short description must not be longer than 70 characters'
                                    }
                                })}
                                error={!!errors.shortDescription}
                                helperText={errors.shortDescription?.message}
                            />
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant='h5' fontWeight={500} children={'Detailed Description'} />
                            <TextField size='medium' id="detailed-description" variant="outlined"
                                multiline
                                rows={10}
                                {...register('detailedDescription', {
                                    required: 'This field is required',
                                })}
                                error={!!errors.detailedDescription}
                                helperText={errors.detailedDescription?.message}
                            />
                        </Stack>
                        <Divider sx={{ width: '100%' }} />
                        <Stack spacing={2}>
                            <Typography variant='h5' fontWeight={500} children={'Specifications'} />
                            <Stack>
                                {
                                    fields.map((field, index) => {
                                        return (
                                            <Stack key={field.id} sx={{ px: 1 }} direction={{ xs: 'column', sm: 'row' }} spacing={1} width={'100%'}>
                                                <Stack>
                                                    <Typography variant='body1' fontWeight={500} children='Title' />
                                                    <TextField size='small' id={`title${index}`} variant="outlined"
                                                        inputProps={{ style: { fontSize: '0.8rem', fontWeight: 800 } }}
                                                        {...register(`specs.${index}.title`,
                                                            {
                                                                required: 'This field is required'
                                                            }

                                                        )}
                                                        error={!!errors.specs?.[index]?.title}
                                                        helperText={errors.specs?.[index]?.title?.message}
                                                    />
                                                </Stack>
                                                <Stack>
                                                    <Typography variant='body1' fontWeight={600} children='Value' />
                                                    <TextField size='small' id={`value${index}`} variant="outlined"
                                                        sx={{ width: { sm: '400px' } }}
                                                        inputProps={{ style: { fontSize: '0.8rem' } }}
                                                        {...register(`specs.${index}.value`,
                                                            {
                                                                required: 'This field is required'
                                                            }

                                                        )}
                                                        error={!!errors.specs?.[index]?.value}
                                                        helperText={errors.specs?.[index]?.value?.message}
                                                    />
                                                    <IconButton onClick={() => remove(index)} aria-label="delete" title='Delete' sx={{ alignSelf: 'flex-end' }}>
                                                        <DeleteIcon color='error' />
                                                    </IconButton>
                                                </Stack>
                                            </Stack>
                                        )
                                    })
                                }
                                <CommonButton
                                    color={'primary'}
                                    size={'small'}
                                    variant={'contained'}
                                    title={'Add'}
                                    children={'Add Field'}
                                    startIcon={<AddIcon />}
                                    sx={{ fontSize: `.8rem`, maxWidth: '110px', fontWeight: 500 }}
                                    onClick={() => append({ title: '', value: '' })}
                                />
                            </Stack>
                        </Stack>
                        <Divider sx={{ width: '100%' }} />
                        <Stack spacing={1}>
                            <Stack direction={'row'} spacing={1}>
                                <Typography variant='h5' fontWeight={500} children={'Images'} />
                                <Typography variant='caption' alignSelf={'flex-end'} color={'text.secondary'} fontWeight={500} children={'(Choose the main image by clicking on it)'} />
                            </Stack>

                            <ImagesForm
                                getValues={getValues}
                                setValue={setValue}
                                watch={watch}
                            />

                        </Stack>
                        <Stack spacing={1} direction={'row'} justifyContent='flex-end'>
                            <CommonButton
                                color={'primary'}
                                size={'medium'}
                                variant={'contained'}
                                title={'Save'}
                                children={isSubmitting ? 'Uploading...' : 'Save'}
                                startIcon={isSubmitting ? <CircularProgress size='1rem' /> : <SaveIcon />}
                                sx={{ fontSize: `1rem`, width: isSubmitting ? '150px' : '110px', fontWeight: 500 }}
                                type={'submit'}
                                disabled={!isDirty || isSubmitting}
                            />
                            <CommonButton
                                color={'error'}
                                size={'medium'}
                                variant={'contained'}
                                title={'Cancel'}
                                children={'Cancel'}
                                startIcon={<CloseIcon />}
                                sx={{ fontSize: `1rem`, width: '110px', fontWeight: 500 }}
                                onClick={closeForm}
                            />
                        </Stack>

                    </Stack>
                </form>
            </Stack >

        </Paper >
    )
}


export default ProductForm