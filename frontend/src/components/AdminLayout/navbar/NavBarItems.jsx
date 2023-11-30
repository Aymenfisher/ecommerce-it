import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import { jwtDecode } from 'jwt-decode';

const NavBarItems = ({ items }) => {
    const navigate = useNavigate()
    const { pathname } = useLocation();
    const userRole = jwtDecode(localStorage.getItem('token')).role
    return (
        <List component='nav' disablePadding>
            <Stack alignItems={'flex-start'}>
                {
                    items.map((item, index) => {
                        const currentTab = item.route == pathname
                        return (!item.roles.includes(userRole) ? <React.Fragment key={item.title}></React.Fragment> :

                            <ListItem key={item.title} disablePadding alignItems='flex-start' onClick={e => navigate(item.route)}>
                                <ListItemButton sx={{ color: currentTab ? 'primary.main' : 'text.secondary' }} selected={currentTab}>
                                    {item.icon &&
                                        <ListItemIcon sx={{ minWidth: '40px', color: currentTab ? 'primary.main' : 'text.secondary' }}>
                                            {item.icon}
                                        </ListItemIcon>
                                    }
                                    <ListItemText disableTypography={true} sx={{ textTransform: 'capitalize', fontWeight: 600 }}>{item.title}</ListItemText>
                                </ListItemButton>
                            </ListItem>)

                    })
                }
            </Stack>
        </List>
    )
}

export default NavBarItems