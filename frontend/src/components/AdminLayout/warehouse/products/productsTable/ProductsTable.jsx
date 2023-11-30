import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, TableFooter, TablePagination, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TablePaginationActions from '../../../../common/tablePaginationActions/TablePaginationActions'
import StyledTableRow from '../../../../common/StyledTableRow/StyledTableRow';


const NoResultsTable = () => {
    return (
        <TableBody >
            <TableRow>
                <TableCell align='center' sx={{ fontWeight: 600,height:'300px' }} colSpan={7}>No Results Found</TableCell>
            </TableRow>
        </TableBody>
    )
}


export default function ProductsTable({ products, handleEditProduct,handleDeleteProduct, category, searchTerm,topRef }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        topRef.current?.scrollIntoView({behaviour:'smooth'})
        return
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        return
    };

    //return to page 1 (0 index) when the category or search term changes
    React.useEffect(() => {
        setPage(0)
    }, [category, searchTerm])
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: '320px' }} size='small' aria-label="products table">
                <TableHead>
                    <TableRow >
                        <TableCell align='left' sx={{ fontWeight: 800 }}>Product</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 800,whiteSpace:'nowrap' }}>Category</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 800,whiteSpace:'nowrap' }}>Brand</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 800,whiteSpace:'nowrap' }}>{'Price ($)'}</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 800,whiteSpace:'nowrap' }}>{'Discount Price ($)'}</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 800 }}>Online</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 800 }}>Controls</TableCell>
                    </TableRow>
                </TableHead>
                {
                    !products.length ?
                        <NoResultsTable />
                        :
                        <TableBody>
                            {
                                (rowsPerPage > 0
                                    ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : products
                                ).map((product, index) => (
                                    <StyledTableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                                            <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                                <img src={product.mainImage || '/src/assets/no-image-icon.webp'} alt='product Image' style={{ objectFit: 'contain', width: '50px', maxHeight: '60px' }} />
                                                <Typography variant='body2' fontWeight={500} children={product.title} />
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 500,textTransform:'capitalize' }}>{product.category}</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 500,textTransform:'capitalize' }}>{product.brand}</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 500 }}>{product.price}</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 500 }}>{product.discountPrice}</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 500 }}>
                                            {
                                                product.isOnline? <CheckCircleOutlineIcon color='success' titleAccess='Online' /> : <HighlightOffIcon color='error' titleAccess='Offline' />
                                            }
                                        </TableCell>
                                        <TableCell align="center" >
                                            <IconButton aria-label="edit" title='Edit' onClick={() => handleEditProduct(product)}>
                                                <EditIcon color='primary' />
                                            </IconButton>
                                            <IconButton aria-label="delete" title='Delete' onClick={() => handleDeleteProduct(product._id)}>
                                                <DeleteIcon color='error' />
                                            </IconButton>
                                        </TableCell>
                                    </StyledTableRow>
                                ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={4} />
                                </TableRow>
                            )
                            }
                        </TableBody>
                }
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            align='left'
                            rowsPerPageOptions={[5, 7, 10, 20, { label: 'All', value: -1 }]}
                            count={products.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            labelRowsPerPage='Products per page'
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            labelDisplayedRows={({ from, to, count }) => `Products ${from}-${to} of ${count} Products`}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}