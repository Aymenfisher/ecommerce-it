import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import StoreNavigationLinks from './StoreNavigationLinks';
import Grid from '@mui/material/Grid';
import Cart from '../../Cart/Cart';



const drawerWidth = 300;


function StoreNavigationBar(props) {
    const { window } = props;
    const {storeInfos} = props
    const [mobileOpen, setMobileOpen] = React.useState(false);

    

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center',p:1,height:'100%',bgcolor:'rgb(40,40,40)' }}>
            <Container>
                <img style={{width:'100px'}} alt='logo' src={'/logo.png'} />
            </Container>
            
            <Typography variant="h1" sx={{ my: 2,color:'brights.one' }}>
                {storeInfos.title}
            </Typography>
            <Divider sx={{borderColor:'brights.two'}} />
            <StoreNavigationLinks orientation={'vertical'}/>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div style={{height:'100%',maxWidth:'100%'}}>
            <CssBaseline />
            <AppBar component="nav" color='transparent' sx={{ boxShadow: 'none',position:'static',bgcolor:'darks.one' }}>
                <Toolbar sx={{px:5}}>
                    <Grid container sx={{ width: '100%'}} direction={'row'} justifyContent={'space-between'} alignItems={'center'} >
                        <Grid item sx={{ display: { md: 'none' } }}>
                            <IconButton
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                            >
                                <MenuIcon fontSize='large' color='white'/>
                            </IconButton>
                        </Grid>

                        <Grid item>
                            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                            <StoreNavigationLinks orientation={'horizontal'}/>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Cart/>
                        </Grid>

                    </Grid>

                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </div>
    );
}

export default StoreNavigationBar;