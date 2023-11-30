import React from 'react'
import Toast from '../../../common/Toast/Toast'
import CommonButton from '../../../common/commonButton/CommonButton'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import Counter from '../../../common/Counter/Counter'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addItem } from '../../../../features/cart/cartSlice';
import Chip from '@mui/material/Chip';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import BasicModal from '../../../common/BasicModal/BasicModal'
import QuickBuy from '../checkout/QuickBuy/QuickBuy'
import CallIcon from '@mui/icons-material/Call';
import { selectStoreInfos } from '../../../../features/storeinfos/storeInfosSlice'
import displayTwoDecimalsIfFloat from '../../../../helpers/displayTwoDecimalsIfFloat'

const ProductInfos = ({ product }) => {
    const storeInfos = useSelector(selectStoreInfos)

    const [quantity, setQuantity] = React.useState(1)

    const dispatch = useDispatch()
    const [openToast, setOpenToast] = React.useState(false)

    const handleAddToCart = (e) => {
        dispatch(addItem({
            item: product,
            quantity: quantity
        }))
        setOpenToast(true)
    }

    const [quickBuy, setQuickBuy] = React.useState(false)
    const handleOpenQuickBuy = (e) => {
        setQuickBuy(true)
    }
    const handleCloseQuickBuy = (e) => {
        setQuickBuy(false)
    }
    const currentPrice = displayTwoDecimalsIfFloat(product.discountPrice > 0 ? product.price - product.discountPrice : product.price)
    return (
        <Stack spacing={4} flex={'1'} >
            <Stack >
                <Stack spacing={1}>
                    <Typography variant={'h4'} children={product.title} textTransform={'uppercase'} fontFamily={'Roboto'} fontWeight={500} />
                    <Typography variant='body1' color={'text.secondary'} whiteSpace={'pre-line !important'}>
                        {product.detailedDescription}
                    </Typography>
                </Stack>
                <Stack spacing={2} justifySelf={'center'}>
                    <Stack >
                        <Stack direction='row' alignItems='center' spacing={2}>
                            <Typography variant='h4' fontWeight={800} color={'success.light'}>{currentPrice} $</Typography>
                            {
                                product.discountPrice > 0 ? <Chip size='small' color='error' label={`- ${product.discountPercentage}%`}/> : ''
                            }
                        </Stack>
                        
                        {
                            product.discountPrice > 0 ?
                                <Typography variant="body1" color="warning.main" sx={{ textDecoration: 'line-through' }} fontWeight={600}>
                                    {product.price} $
                                </Typography>
                                : ''
                        }
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} >

                        <Counter size={'medium'} count={quantity} setCount={setQuantity} />
                        <CommonButton
                            color={'success'}
                            disabled={false}
                            size={'large'}
                            variant={'contained'}
                            startIcon={<AddShoppingCartIcon />}
                            children={'Add To Cart'}
                            onClick={handleAddToCart}
                            sx={{ maxWidth: '90%' }}
                        />
                        <CommonButton
                            color={'primary'}
                            disabled={false}
                            size={'large'}
                            variant={'contained'}
                            startIcon={<ShoppingBagIcon />}
                            children={'Buy Now'}
                            onClick={handleOpenQuickBuy}
                            sx={{ maxWidth: '90%' }}
                        />
                        {quickBuy && <BasicModal open={quickBuy} handleClose={handleCloseQuickBuy}
                            children={<QuickBuy item={{ product: product, quantity: quantity }} handleClose={handleCloseQuickBuy} />}
                        />}
                        <Toast open={openToast} setOpen={setOpenToast} message={'Added To Cart !'} severity={'success'} />
                    </Stack>
                </Stack>
            </Stack>
            <Divider flexItem />
            <Stack>
                <Stack spacing={1}>
                    <Stack direction='row' alignItems={'center'} spacing={1}>
                        <Typography variant='body1' fontWeight={600}>
                            Availability :
                        </Typography>
                        <Chip label={product.inStock ? 'In Stock' : 'Out of stock'} color={product.inStock ? 'success' : 'error'} variant="outlined" />
                    </Stack>
                    <Stack direction='row' alignItems={'flex-end'} spacing={1}>
                        <Typography variant='body1' fontWeight={600}>
                            Brand :
                        </Typography>
                        <Typography variant='body1' fontWeight={800} textTransform={'capitalize'}>
                            {product.brand}
                        </Typography>
                    </Stack>
                    <Stack direction='row' alignItems={'center'} spacing={1}>
                        <LocalShippingIcon color='success' />
                        <Typography children={'Express Delivery'} variant='body1' fontWeight={600} textTransform={'capitalize'} />
                    </Stack>
                    <Stack direction='row' alignItems={'center'} spacing={1}>
                        <VerifiedIcon color='success' />
                        <Typography children={'Guarantee'} variant='body1' fontWeight={600} textTransform={'capitalize'} />
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} spacing={1}>
                        <CallIcon color='success' />
                        <Stack direction={'row'} flexWrap={'wrap'} justifyContent={'flex-start'} rowGap={1} columnGap={1}>
                            {
                                storeInfos.phones.map((phone, index) => {
                                    return (

                                        <a key={phone} style={{ textDecoration: 'none' }} href={`tel:${phone}`}>
                                            <Chip color='primary' label={phone} sx={{ cursor: 'pointer' }} />
                                        </a>

                                    )
                                })
                            }
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default ProductInfos