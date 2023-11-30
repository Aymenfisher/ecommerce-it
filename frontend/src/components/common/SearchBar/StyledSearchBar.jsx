import React from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const StyledSearchBar = ({ sx }) => {

    const navigate = useNavigate()
    const [searchTerm,setSearchTerm] = React.useState('')
    const handleSearchTermChange = (e) =>{
        setSearchTerm(e.target.value)
        return
    }
    const handleSubmitSearch = (e) =>{
        e.preventDefault()
        navigate(`/products?search=${searchTerm}`)
        return
    }
    return (
        <Paper
            component={'form'}
            onSubmit={handleSubmitSearch}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center',borderRadius:'20px', width: {xs:300,lg:400},boxSizing:'border-box',...sx }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Quick Search Products.."
                inputProps={{ 'aria-label': 'Quick Search Products' }}
                value={searchTerm}
                onChange={handleSearchTermChange}
            />
            <IconButton   type="submit" sx={{ width:'60px',borderRadius:'60px',color:'white.main',bgcolor:'yellow.main','&:hover':{bgcolor:'darks.one'} }} aria-label="search">
                <SearchIcon/>
            </IconButton>
        </Paper>

    )
}

export default StyledSearchBar