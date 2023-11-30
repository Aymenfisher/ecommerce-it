import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import  TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import  Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePaginationActions from '../../../common/tablePaginationActions/TablePaginationActions'
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StyledTableRow from '../../../common/StyledTableRow/StyledTableRow';
import formatDate from '../../../../helpers/formatDate'



const NoResultsTable = () => { // empty rows in case no results
    return (
        <TableBody >
            <TableRow>
                <TableCell align='center' sx={{ fontWeight: 600, height: '300px' }} colSpan={7}>No Results Found</TableCell>
            </TableRow>
        </TableBody>
    )


}

const OrdersTable = ({ orders,handleOpenOrderDetails,handleCompleteOrder,handleDeleteOrder }) => {
    // table pagination settings
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: '320px' }} size='small' aria-label="orders table">
                <TableHead>
                    <TableRow >
                        <TableCell align='left' sx={{ fontWeight: 800 }}>ID</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 800 }}>Client</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 800, whiteSpace: 'nowrap' }}>{'Total ($)'}</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 800 }}>Destination</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 800 }}>Date</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 800 }}>Status</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 800 }}>Controls</TableCell>
                    </TableRow>
                </TableHead>
                {!orders.length ?
                    <NoResultsTable />
                    :
                    <TableBody >
                        {(rowsPerPage > 0
                            ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : orders
                        ).map((order, index) => (
                            <StyledTableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>{order._id.substring(0, 3) + '...'}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 500 }}>{order.client.name}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{order.total}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 500 }}>{order.client.state}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 500 }}>{formatDate.dateOnly(order.createdAt)}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 500 }}>
                                    {
                                        order.isCompleted ? <Chip label="Completed" sx={{ width: '98px' }} color="success" variant="filled" /> : <Chip label="Pending" sx={{ width: '98px' }} color="warning" variant="filled" />
                                    }
                                </TableCell>
                                <TableCell width={150} sx={{ whiteSpace: 'nowrap' }} align="center" >
                                    <IconButton aria-label="details" title='More Details' onClick={() => handleOpenOrderDetails(order)}>
                                        <InfoIcon sx={{ width: '20px' }} color='primary' />
                                    </IconButton>
                                    <IconButton disabled={order.isCompleted} aria-label="mark-as-completed" title='Mark as completed'
                                        onClick={() => handleCompleteOrder(order._id)}
                                    >
                                        <CheckCircleIcon sx={{ width: '20px' }} color={order.isCompleted ? 'text.secondary' : 'success'} />
                                    </IconButton>
                                    <IconButton aria-label="delete" title='Delete'
                                        onClick={() => handleDeleteOrder(order._id)}
                                    >
                                        <DeleteIcon sx={{ width: '20px' }} color='error' />
                                    </IconButton>
                                </TableCell>
                            </StyledTableRow>

                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                }
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            align='left'
                            rowsPerPageOptions={[5, 7, 10, 20, { label: 'All', value: -1 }]}
                            count={orders.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            labelRowsPerPage='Orders per page'
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            labelDisplayedRows={({ from, to, count }) => `Orders ${from}-${to} of ${count} Orders`}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default OrdersTable