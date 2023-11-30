import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const NoResultsTable = () => {
    return (
        <TableBody >
            <TableRow>
                <TableCell align='center' sx={{ fontWeight: 600,height:'300px' }} colSpan={4}>No Results Found</TableCell>
            </TableRow>
        </TableBody>
    )


}

const CategoriesTable = ({categories}) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: '320px' }} size='medium' aria-label="categories table">
                <TableHead>
                    <TableRow >
                        <TableCell align="center" sx={{ fontWeight: 800, whiteSpace: 'nowrap' }}>Category</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 800, whiteSpace: 'nowrap' }}>Products</TableCell>
                    </TableRow>
                </TableHead>
                {
                    !categories.length ?
                        <NoResultsTable />
                        :
                        <TableBody>
                            {
                                categories.map((category, index) => (
                                    <TableRow
                                        key={category.title}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" sx={{ fontWeight: 500, textTransform: 'capitalize' }}>{category.title}</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 500 }}>{category.products}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                }
            </Table>
        </TableContainer>
    )
}

export default CategoriesTable