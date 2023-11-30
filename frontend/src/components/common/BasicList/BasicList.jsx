import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import ListSubheader from '@mui/material/ListSubheader';


export default function BasicList({ title, items, activeItem, setActiveItem ,sx}) {


    return (

        <Card sx={{ width: '100%', minHeight: '300px',p:1, maxWidth: 250, borderRadius: '2px', ...sx }}>
            <List
                subheader={<ListSubheader
                    sx={{ fontWeight: 800, fontSize: '1.2rem',color:'darks.one', position: 'static', textDecoration: 'underline', textUnderlineOffset: '4px', textUnderlinePosition: '2px', textDecorationColor: '#f0ce16',textDecorationThickness:'3px' }}>
                    {title}
                </ListSubheader>}
            >
                {
                    items.map((item) => {
                        return (
                            <ListItem key={item} disablePadding onClick={e => setActiveItem(item)}>
                                <ListItemButton>
                                    <ListItemText disableTypography sx={{ textTransform: 'capitalize', color: item === activeItem ? 'yellow.main' : '', fontWeight: item === activeItem ? 800 : 400 }}>{item}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }
            </List>
        </Card>
    );
}