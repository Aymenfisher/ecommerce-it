import React from 'react'
import Typography from '@mui/material/Typography';
import  Stack from '@mui/material/Stack';
import NavBarItems from './NavBarItems';
import { navbarLinks } from './consts/navBarLinks';





const NavBarDashboard = () => {
    
    return (
        <Stack alignItems='flex-start' p={2}>
            <Stack>
                <Typography variant='h6' fontWeight={800} textTransform='capitalize'>Menu</Typography>
                <NavBarItems items={navbarLinks.menu}/>
            </Stack>
            <Stack>
                <Typography variant='h6' fontWeight={800} textTransform='capitalize'>Store</Typography>
                <NavBarItems items={navbarLinks.store}/>
            </Stack>
            <Stack>
                <Typography variant='h6' fontWeight={800} textTransform='capitalize'>Settings</Typography>
                <NavBarItems items={navbarLinks.settings}/>
            </Stack>
        </Stack>
    )
}

export default NavBarDashboard