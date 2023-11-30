import { Container,Tab, Tabs, Typography, Stack } from '@mui/material';
import React from 'react';
import ProductsManagement from './products/ProductsManagement';
import CategoriesManagement from './categories/CategoriesManagement';
const Warehouse = () => {
    const [tab, setTab] = React.useState('products');
    const [tabpanel,setTabpanel] = React.useState(<ProductsManagement/>)

    const handleChangeTab = (event, newValue) => {
        setTab(newValue);
        switch(newValue){
            case 'products':
                setTabpanel(<ProductsManagement/>)
                break;
            case 'categories':
                setTabpanel(<CategoriesManagement/>)
                break;
        }
    };
    return (
        <Container maxWidth={false} disableGutters sx={{ display: 'flex', flexDirection: 'column', rowGap: '15px' }}>
            <Stack sx={{ bgcolor: 'darks.three', color: 'brights.one', p: 2 }} spacing={2}>
                <Typography variant='h4' fontWeight={'500'} alignSelf={'flex-start'}>Warehouse</Typography>
                <Tabs value={tab} onChange={handleChangeTab} aria-label="warehouse tabs"
                    textColor='inherit'
                    TabIndicatorProps={{ style: { backgroundColor: '#f0ce16' } }}
                >
                    <Tab label="Products" value={'products'} />
                    <Tab label="Categories" value={'categories'} />
                </Tabs>
            </Stack>
            <Container  maxWidth={false} disableGutters sx={{ p: 2 }}>
                {tabpanel}
            </Container>

        </Container>
    )
}

export default Warehouse