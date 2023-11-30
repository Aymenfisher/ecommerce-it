import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'
import Counter from '../../common/Counter/Counter'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { removeItem, updateItemQuantity } from '../../../features/cart/cartSlice';
import displayTwoDecimalsIfFloat from '../../../helpers/displayTwoDecimalsIfFloat';


const CartItem = ({ item, isOneItem }) => { // used in both cart, and quick buy summary
    const dispatch = useDispatch()
    const [itemQuantity, setItemQuantity] = React.useState(item.quantity)
    React.useEffect(() => {
        if (!isOneItem) {
            dispatch(updateItemQuantity({
                _id: item.product._id,
                quantity: itemQuantity
            }))
        }else{
            return
        }

    }, [itemQuantity])

    const currentPrice = displayTwoDecimalsIfFloat(item.product.discountPrice > 0 ? item.product.price-item.product.discountPrice : item.product.price )


    return (
        <Grid container direction={'row'} spacing={2} alignItems={'center'} sx={{ margin: 0, pr: 1, maxWidth: '100%', boxSizing: 'border-box' }}>
            <Grid item>
                <img src={item.product.mainImage || '/src/assets/no-image-icon.webp'} alt={'product image'} style={{ objectFit: 'contain', width: '100px' }} />
            </Grid>
            <Grid item xs>
                <Stack spacing={1} >
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography variant='body2' fontWeight={600} children={item.product.title} />
                        <Typography variant='h6' fontWeight={600} children={`${ displayTwoDecimalsIfFloat(currentPrice * item.quantity)}$`} sx={{ pl: 1,whiteSpace:'nowrap' }} />
                    </Stack>
                    <Stack direction='row' spacing={1}>
                        <Typography variant='body2' children={`${currentPrice}$`} fontWeight={600} color={'text.secondary'} />
                        {
                            item.product.discountPrice>0 ?
                                <Typography variant="body2" fontWeight={600} color={'text.secondary'} sx={{ textDecoration: 'line-through' }}>
                                    {item.product.price}$
                                </Typography>
                                : ''
                        }


                    </Stack>

                    <Stack direction={'row'} justifyContent={'space-between'}>
                        {isOneItem ? <Typography variant='body1' fontWeight={'500 !important'}>Quantity: {itemQuantity}</Typography>: <Counter size={'small'} count={itemQuantity} setCount={setItemQuantity} />}
                        {isOneItem ? '' :
                            <IconButton
                                color="inherit"
                                aria-label="close cart"
                                sx={{ p: 0, alignSelf: 'flex-end' }}
                                onClick={e => dispatch(removeItem(item.product._id))}
                            >
                                <DeleteIcon color='error' fontSize='large' />
                            </IconButton>
                        }
                    </Stack>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default CartItem