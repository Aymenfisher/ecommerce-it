import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const NoSpecs = () => {
    return (
        <Stack alignItems={'center'} justifyContent={'center'} sx={{ height: '300px' }}>
            <Typography variant='body1' fontWeight={800} color={'text.secondary'}>There are no specifications for now</Typography>
        </Stack>
    )
}

const ProductSpecs = ({ specs }) => {
    return (
        <Stack p={2} spacing={1}>
            <Typography variant='h4' fontWeight={500}>Specifications</Typography>
            {!specs.length ? <NoSpecs /> :
                <TableContainer component={Paper}>
                    <Table aria-label="product specifications table">
                        <TableBody>
                            {
                                specs.map((spec) => {
                                    return (
                                        <TableRow key={spec.title}>
                                            <TableCell component="th" scope="row" sx={{ fontWeight: 600, textTransform: 'uppercase', bgcolor: 'action.hover' }}>
                                                {spec.title}
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 400,fontFamily:'Roboto' }} align="left">{spec.value}</TableCell>
                                        </TableRow>
                                    )

                                })}
                        </TableBody>
                    </Table>
                </TableContainer>}
        </Stack>
    )
}

export default ProductSpecs