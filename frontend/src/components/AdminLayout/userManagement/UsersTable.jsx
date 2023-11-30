import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {  IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import StyledTableRow from '../../common/StyledTableRow/StyledTableRow';


const NoResultsTable = () => { // empty rows in case no results
    return (
        <TableBody >
            <TableRow>
                <TableCell align='center' sx={{ fontWeight: 600, height: '300px' }} colSpan={4}>No Results Found</TableCell>
            </TableRow>
        </TableBody>
    )
}

const UsersTable = ({users,handleDeleteUser}) => {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: '320px' }} size='small' aria-label="users table">
                <TableHead>
                    <TableRow >
                        <TableCell align='left' sx={{ fontWeight: 800 }}>Username</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 800 }}>Full Name</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 800, whiteSpace: 'nowrap' }}>Role</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 800 }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                {!users.length ?
                    <NoResultsTable />
                    :
                    <TableBody >
                        {
                        users
                        .map((user, index) => (
                            <StyledTableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>{user.username}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 500 }}>{`${user.firstName} ${user.lastName}`}</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{user.role}</TableCell>
                                <TableCell width={150} sx={{ whiteSpace: 'nowrap' }} align="center" >
                                    <IconButton aria-label="delete" title='Delete'
                                        onClick={() => handleDeleteUser(user._id)}
                                    >
                                        <DeleteIcon sx={{ width: '20px' }} color='error' />
                                    </IconButton>
                                </TableCell>
                            </StyledTableRow>

                        ))}
                    </TableBody>
                }
            </Table>
        </TableContainer>
    )
}

export default UsersTable