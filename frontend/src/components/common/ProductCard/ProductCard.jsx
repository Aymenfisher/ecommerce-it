import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CommonButton from '../../common/commonButton/CommonButton';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../features/cart/cartSlice';
import Toast from '../Toast/Toast';
import displayTwoDecimalsIfFloat from '../../../helpers/displayTwoDecimalsIfFloat'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'

const ProductCard = ({ product }) => {
    const navigate = useNavigate()
    const handleRedirect = e => navigate(`/products/${product._id}`)
    const dispatch = useDispatch()
    const [openToast, setOpenToast] = React.useState(false)

    const handleAddToCart = (e) => {
        dispatch(addItem({
            item: product,
            quantity: 1
        }))
        setOpenToast(true)
    }


    return (
        <Card sx={{ position:'relative',width: '240px', height: '310px', borderRadius: 3, display: 'grid', gridTemplate: '100px 45px 45px 25px 69px /1fr', gap: '2px', p: '10px', alignItems: 'center', boxSizing: 'border-box', bgcolor: 'brights.one' }}>
            {product.discountPrice ?  <Chip color='error' label={`- ${product.discountPercentage}%`} sx={{position:'absolute',top:1,left:1,borderRadius:'100px'}}/> : ''}
            <CardMedia
                component="img"
                image={product.mainImage || '/src/assets/no-image-icon.webp'}
                alt={product.title}
                sx={{ objectFit: 'contain', height: "100%", width: '100%', cursor: 'pointer' }}
                onClick={handleRedirect}
                loading='lazy'
            />
            <Typography variant="body2" justifySelf={'center'} fontFamily={'Roboto'} fontWeight={800} textTransform={'capitalize'} sx={{ cursor: 'pointer' }} onClick={handleRedirect}>
                {product.title.length <= 60 ? product.title : `${product.title.substring(0, 55)}...`}
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ cursor: 'pointer', wordBreak: 'break-word', textAlign: 'left' }} onClick={handleRedirect}>
                {product.shortDescription}
            </Typography>
            <Stack direction={'row'} spacing={3} alignItems={'center'}>
                <Typography variant="h6" fontFamily={'Roboto'} color="success.light" fontWeight={800}>
                    {displayTwoDecimalsIfFloat(product.discountedPrice)} $
                </Typography>
                {
                    product.discountPrice > 0 ?
                        <Typography variant="body1" color="warning.main" sx={{ textDecoration: 'line-through' }} fontWeight={800}>
                            {product.price} $
                        </Typography>
                        : ''
                }
            </Stack>
            <Stack direction='row' justifyContent='center' spacing={2} >
                <IconButton onClick={handleRedirect} sx={{ border:'1px solid',borderColor:'primary.main' }}>
                    <VisibilityIcon color='primary' />
                </IconButton>
                <IconButton onClick={handleAddToCart} sx={{ bgcolor:'success.main','&:hover':{bgcolor:'success.dark'} }}>
                    <AddShoppingCartIcon color='white' />
                </IconButton>
            </Stack>
            {openToast && <Toast open={openToast} setOpen={setOpenToast} message={'Added To Cart!'} severity={'success'} />}
        </Card>
    )
}

export default ProductCard