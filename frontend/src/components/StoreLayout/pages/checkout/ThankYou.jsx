import React from 'react'
import  Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import { useSelector } from 'react-redux'
import { selectStoreInfos } from '../../../../features/storeinfos/storeInfosSlice'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, Navigate } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Footer from '../../footer/Footer';
import StyledTableRow from '../../../common/StyledTableRow/StyledTableRow';


const ThankYou = ({ order }) => {
    const storeInfos = useSelector(selectStoreInfos)

    //scroll to top on mount
    const topRef = React.useRef(null)
    React.useEffect(() =>{
        topRef.current?.scrollIntoView({behaviour:'smooth'}) 
    })
    return (
        <Stack minHeight={'100vh'}>
            {
                !order ? <Navigate to={'/products'} /> :
                    <>
                        <Container component={'header'} maxWidth={false} sx={{ bgcolor: 'darks.two', color: 'white.main' }} ref={topRef}>
                            <Stack spacing={2} p='5px 5px' justifyContent={'center'} alignItems={'center'}>
                                <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                        <img src='/logo.png' style={{ height: '50px' }}></img>
                                        <Typography
                                            component="div"
                                            sx={{ flexGrow: 1, display: { md: 'flex' }, typography: { lg: 'h1', xs: 'h6' } }}
                                        >
                                            {storeInfos.title}
                                        </Typography>
                                    </Stack>
                                </Link>
                            </Stack>
                        </Container>
                        <Stack spacing={1} component={'main'} sx={{ bgcolor: 'brights.one' }} flex='1' alignItems={'center'} p={{ xs: 1, sm: 4 }}>
                            <CheckCircleIcon color='success' sx={{ width: '150px', height: '150px' }} />
                            <Typography variant='h1' fontWeight={600} textAlign={'center'}>
                                Thank You For Your Purchase
                            </Typography>
                            <Typography variant='body1' textAlign={'center'} fontFamily={'Roboto'} fontWeight={500} color={'text.secondary'} fontSize={{ xs: '1rem', sm: 20 }} >
                                Your order was completed successfully. It will be delivered soon !
                            </Typography>
                            <Typography variant='body1' textAlign={'center'} fontFamily={'Roboto'} fontWeight={500} color={'text.secondary'} fontSize={{ xs: '1rem', sm: 20 }} >
                                <u>Your order ID is :</u><br/> <b style={{ color: 'green' }}>  {order._id}</b><br/>keep it for a reference.
                            </Typography>
                            <Stack spacing={2} alignSelf={'flex-start'} width={'100%'} >
                                <Typography variant='h6' fontWeight='600 !important'>
                                    <u style={{ textDecorationThickness: '8px', textUnderlineOffset: '10px', textDecorationColor: '#f0ce16' }}> Summary</u>
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table sx={{ width: '100%' }} aria-label="order products table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 800 }} align='left' >Product</TableCell>
                                                <TableCell sx={{ fontWeight: 800 }} align="center">Unit Price</TableCell>
                                                <TableCell sx={{ fontWeight: 800 }} align="center">Discounted Unit Price</TableCell>
                                                <TableCell sx={{ fontWeight: 800 }} align="center">Quantity</TableCell>
                                                <TableCell sx={{ fontWeight: 800 }} align="center">Sub-total</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {order.products.map((product) => (
                                                <StyledTableRow key={product._id}>
                                                    <TableCell sx={{ fontWeight: 600 }} component="th" scope="row" align='left'>
                                                        {product.title}
                                                    </TableCell>
                                                    <TableCell sx={{ fontWeight: 600,whiteSpace:'nowrap'}} align="center">{product.price} $</TableCell>
                                                    <TableCell sx={{ fontWeight: 600,whiteSpace:'nowrap'}} align="center">{product.discountedPrice} $</TableCell>
                                                    <TableCell sx={{ fontWeight: 600 }} align="center">{product.quantity}</TableCell>
                                                    <TableCell sx={{ fontWeight: 600,whiteSpace:'nowrap'}} align="center">{product.total} $</TableCell>
                                                </StyledTableRow>
                                            ))}
                                            <StyledTableRow>
                                                <TableCell colSpan={3} />
                                                <TableCell align='center' sx={{ fontWeight: 800, fontSize: '18px' }}>Total</TableCell>
                                                <TableCell align='center' sx={{ fontWeight: 800,whiteSpace:'nowrap' }} >{order.total} $</TableCell>
                                            </StyledTableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TableContainer sx={{ minWidth: '100%' }} component={Paper}>
                                    <Table aria-label="client informations table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 800 }} align='left' >Client Name</TableCell>
                                                <TableCell sx={{ fontWeight: 800 }} align="center">State</TableCell>
                                                <TableCell sx={{ fontWeight: 800 }} align="center">Address</TableCell>
                                                <TableCell sx={{ fontWeight: 800 }} align="center">Phone</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <StyledTableRow>
                                                <TableCell component="th" scope="row" align='left' sx={{ fontWeight: 600 }}>
                                                    {order.client.name}
                                                </TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 600 }}>{order.client.state}</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 600 }}>{order.client.address}</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 600,whiteSpace:'nowrap' }}>{order.client.phones.length > 1 ? order.client.phones.join(' / ') : order.client.phones[0]}</TableCell>
                                            </StyledTableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Stack>
                        </Stack>
                        <Footer />
                    </>
            }
        </Stack>

    )
}

export default ThankYou