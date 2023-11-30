import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import  Stack from '@mui/material/Stack'
import Typography  from '@mui/material/Typography'
import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CommonButton from '../../../common/commonButton/CommonButton';
import CloseIcon from '@mui/icons-material/Close';
import StyledTableRow from '../../../common/StyledTableRow/StyledTableRow'
import formatDate from '../../../../helpers/formatDate';
import displayTwoDecimalsIfFloat from '../../../../helpers/displayTwoDecimalsIfFloat';

const OrderDetails = ({ order, close }) => {
    return (
        <Paper sx={{  py: 2, px: {xs:1,md:3}, bgcolor: 'brights.two' }}>
            <Stack spacing={2} alignItems={'flex-start'} width={'100%'} >
                <Typography variant='h4' fontWeight={600} alignSelf='center'>Order Details</Typography>
                <Divider sx={{ width: '100%' }} />
                <Typography variant='h5' fontWeight={600} >General Informations</Typography>
                <Stack spacing={3} alignSelf='stretch'>
                    <TableContainer sx={{ minWidth: '100%' }} component={Paper}>
                        <Table aria-label="order informations table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 800, width: '150px' }} align='left'>Order ID</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }} align="center">Date</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }} align="center">Status</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }} align="center">Complete Date</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }} align="center">Total($)</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }} align="center">Products</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow>
                                    <TableCell component="th" scope="row" align='left'>
                                        {order._id}
                                    </TableCell>
                                    <TableCell align="center">{formatDate.dateWithTime(order.createdAt)}</TableCell>
                                    <TableCell align="center">
                                        {
                                            order.isCompleted ? <Chip label="Completed" sx={{ width: '98px' }} color="success" variant="filled" /> : <Chip label="Pending" sx={{ width: '98px' }} color="warning" variant="filled" />
                                        }
                                    </TableCell>
                                    <TableCell align="center">{order.isCompleted ? formatDate.dateWithTime(order.updatedAt) : '/'}</TableCell>
                                    <TableCell align="center">{order.total}</TableCell>
                                    <TableCell align="center">{order.products.length}</TableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography variant='h5' fontWeight={600} >Client Informations</Typography>
                    <TableContainer sx={{ minWidth: '100%' }} component={Paper}>
                        <Table aria-label="client informations table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 800 }} align='left' >Client Name</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }} align="center">State</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }} align="center">Address</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }} align="center">Phones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow>
                                    <TableCell component="th" scope="row" align='left'>
                                        {order.client.name}
                                    </TableCell>
                                    <TableCell align="center">{order.client.state}</TableCell>
                                    <TableCell align="center">{order.client.address}</TableCell>
                                    <TableCell align="center">{order.client.phones.length > 1 ? order.client.phones.join(' / ') : order.client.phones[0]}</TableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
                <Typography variant='h5' fontWeight={600} >Order Products</Typography>
                <TableContainer sx={{ minWidth: '100%' }} component={Paper}>
                    <Table aria-label="order products table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 800 }} align='left' >ID</TableCell>
                                <TableCell sx={{ fontWeight: 800 }} align='center' >Title</TableCell>
                                <TableCell sx={{ fontWeight: 800 }} align='center' >Category</TableCell>
                                <TableCell sx={{ fontWeight: 800 }} align='center' >Brand</TableCell>
                                <TableCell sx={{ fontWeight: 800 }} align="center">Unit Price</TableCell>
                                <TableCell sx={{ fontWeight: 800 }} align="center">Discounted Unit Price</TableCell>
                                <TableCell sx={{ fontWeight: 800 }} align="center">Quantity</TableCell>
                                <TableCell sx={{ fontWeight: 800 }} align="center">Subtotal</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {order.products.map((product) => (
                                <StyledTableRow key={product._id}>
                                    <TableCell component="th" scope="row" align="left">{product._id}</TableCell>
                                    <TableCell align='left'>
                                        {product.title}
                                    </TableCell>
                                    <TableCell align="center">{product.category}</TableCell>
                                    <TableCell align="center">{product.brand}</TableCell>
                                    <TableCell align="center" sx={{whiteSpace:'nowrap'}}>{product.price} $</TableCell>
                                    <TableCell align="center" sx={{whiteSpace:'nowrap'}}>{displayTwoDecimalsIfFloat(product.price - product.discountPrice)} $</TableCell>
                                    <TableCell align="center">{product.quantity}</TableCell>
                                    <TableCell align="center" sx={{whiteSpace:'nowrap'}}>{product.total} $</TableCell>
                                </StyledTableRow>
                            ))}
                            <StyledTableRow>
                                <TableCell colSpan={6}/>
                                <TableCell align='center' sx={{ fontWeight: 800, fontSize: '18px' }}>Total</TableCell>
                                <TableCell align='center' sx={{ fontWeight: 800,whiteSpace:'nowrap' }} >{order.total} $</TableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <CommonButton
                    color={'error'}
                    size={'large'}
                    variant={'contained'}
                    title={'Close'}
                    children={'Close'}
                    startIcon={<CloseIcon />}
                    sx={{ fontSize: `1rem`, maxWidth: '160px', fontWeight: 500, alignSelf: 'flex-end' }}
                    onClick={close}
                />
            </Stack>
        </Paper>
    )
}

export default OrderDetails