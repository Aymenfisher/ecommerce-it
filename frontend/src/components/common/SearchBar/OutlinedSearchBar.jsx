import TextField from '@mui/material/TextField'
import React from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const OutlinedSearchBar = ({sx,placeholder,searchTerm,handleSearchTermChange}) => {
    return (
            <TextField onChange={handleSearchTermChange} value={searchTerm}  sx={sx}  size={'medium'} id="search" variant='outlined' placeholder={placeholder}  type="search" InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }} />
            

    )
}

export default OutlinedSearchBar