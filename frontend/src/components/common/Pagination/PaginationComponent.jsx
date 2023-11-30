import  Pagination  from '@mui/material/Pagination';
import React from 'react'

const PaginationComponent = ({pagesNumber,page,handleChangePage,sx}) => {
    return (
        <Pagination sx={sx} page={page} count={pagesNumber} size="large" color='yellow' onChange={handleChangePage} />
        
    );
}

export default PaginationComponent