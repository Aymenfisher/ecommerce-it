import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography  from '@mui/material/Typography'
import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import StyledTableRow from '../../../common/StyledTableRow/StyledTableRow'


const NoResultsTable = () => {
    return (
        <TableBody >
            <TableRow>
                <TableCell align='center' sx={{ fontWeight: 600,height:'300px' }} colSpan={5}>No Results Found</TableCell>
            </TableRow>
        </TableBody>
    )
}

const calculateMostSelledProducts = (orders) => {
    const productsSells = {}
    orders.forEach(order =>{
        order.products.forEach( product => {
            if(productsSells.hasOwnProperty(product.title)){
                productsSells[product.title].sales += product.total
                productsSells[product.title].orders += 1
                productsSells[product.title].quantity += product.quantity
            }else{
                productsSells[product.title] = {
                    title:product.title,
                    sales:product.total,
                    orders:1,
                    quantity:product.quantity,
                    category:product.category,
                }
            }
        })
    })
    return Object.values(productsSells).sort((a,b) => b.orders - a.orders).slice(0,5)
}



const MostSelledProducts = ({orders}) => {
    const [data,setData] = React.useState(false)

    React.useEffect(() =>{
        const top5Products = calculateMostSelledProducts(orders)
        setData(top5Products)
    },[])
    return (
        <Stack spacing={1}>
            <Typography variant='h6'>Most selled 5 products :</Typography>
            { data &&
            <TableContainer sx={{ minWidth: '100%' }} component={Paper}>
                <Table aria-label="order informations table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 800, width: '150px' }} align='left'>#</TableCell>
                            <TableCell sx={{ fontWeight: 800 }} align="center">Product</TableCell>
                            <TableCell sx={{ fontWeight: 800 }} align="center">Category</TableCell>
                            <TableCell sx={{ fontWeight: 800 }} align="center">orders</TableCell>
                            <TableCell sx={{ fontWeight: 800 }} align="center">Selled Units</TableCell>
                            <TableCell sx={{ fontWeight: 800 }} align="center">Total Sales ($)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !data.length ? <NoResultsTable/> :
                            data.map((product,index) =>{
                                return(
                                    <StyledTableRow key={product.title}>
                                    <TableCell component="th" scope="row" align='left'>
                                        {index+1}
                                    </TableCell>
                                    <TableCell align="center">{product.title}</TableCell>
                                    <TableCell align="center" sx={{textTransform:'capitalize'}}>{product.category}</TableCell>
                                    <TableCell align="center">{product.orders}</TableCell>
                                    <TableCell align="center">{product.quantity}</TableCell>
                                    <TableCell align="center">{product.sales}</TableCell>
                                </StyledTableRow>
                                )
                            })
                        }

                    </TableBody>
                </Table>
            </TableContainer>
            }
        </Stack>
    )
}

export default MostSelledProducts