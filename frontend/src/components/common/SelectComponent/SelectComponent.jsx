import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectComponent({items,label,setActiveItem,alwaysShow,defaultValue,size,props}) {
    const [item, setItem] = React.useState(defaultValue || '');

    const handleChange = (event) => {
        setItem(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 150,display: (alwaysShow ? 'flex' :{xs:'flex',md:'none'}) }}>
            <FormControl fullWidth size={size} sx={{textTransform:'capitalize'}}>
                <InputLabel id="select-label" sx={{textTransform:'capitalize'}}>{label}</InputLabel>
                <Select
                    labelId="select-label"
                    id="select"
                    value={item}
                    label={label}
                    onChange={handleChange}
                    sx={{bgcolor:'brights.one'}}
                    defaultValue 
                    {...props}
                >
                    {
                        items.map((item,index) =>{
                            return <MenuItem key={item} sx={{textTransform:'capitalize'}} value={item} onClick={e => setActiveItem(item)}>{item}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box>
    );
}