import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavBarDashboard from './navbar/NavBarDashboard';
import { Outlet, useNavigate } from 'react-router-dom';
import { Stack, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoreInfos, selectStoreInfos } from '../../features/storeinfos/storeInfosSlice'
import { fetchAllOrders } from '../../features/orders/ordersSlice';
import { fetchAdminProducts } from '../../features/products/productsSlice';
import { fetchMessages } from '../../features/inbox/inboxSlice';
import CommonButton from '../common/commonButton/CommonButton';
import BadgeAvatar from '../common/BadgeAvatar/BadgeAvatar';
import logout from '../../helpers/logout';
import Toast from '../common/Toast/Toast';
import { jwtDecode } from 'jwt-decode';


const drawerWidth = 250;

function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const storeInfos = useSelector(selectStoreInfos)

    const handleDrawerToggle = () => {
        setMobileOpen(current => !current);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} width={drawerWidth} >
            <Stack direction={'row'} spacing={1} alignItems={'center'} sx={{ height: '64px', bgcolor: 'darks.three', p: 1 }}>
                <img src={'/logo.png'} style={{ height: '50px' }}></img>
                <Typography
                    component="div"
                    color={'brights.one'}
                    sx={{ flexGrow: 1, display: { lg: 'flex' } }}
                    variant='body1'
                >
                    {storeInfos.title}
                </Typography>
            </Stack>
            <Divider />
            <NavBarDashboard />
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    //handle logout
    const [failedLogout,setFailedLogout] = React.useState(false)
    const navigate = useNavigate()
    const handleLogout = () =>{
        const logoutStatus = logout()
        if(logoutStatus){
            navigate('/admin/login')
            return
        }else{
            setFailedLogout(true)
        }
    }

    //fetching data on mount
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(fetchStoreInfos())
        dispatch(fetchAllOrders())
        dispatch(fetchAdminProducts())
        dispatch(fetchMessages())
    }, [])

    return (
        <Stack direction={'row'} sx={{ width: '100vw', height: '100vh' }}>
            <CssBaseline />
            <Stack width={{ xs: '0', lg: drawerWidth }}>
                <Box
                    component="nav"
                    aria-label="dashboard menus"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'flex', lg: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box' },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', lg: 'flex' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box' },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
            </Stack>
            <Stack sx={{ width: { xs: '100%', lg: `calc(100% - ${drawerWidth}px)` }, minHeight: '100vh' }}>
                <Toolbar sx={{ backgroundColor: 'darks.one', color: 'white.main', height: '64px' }}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width='100%'>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} spacing={1}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, display: { lg: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography sx={{typography:{xs:'body1',sm:'h5'}}} fontWeight={'600 !important'}>
                                Dashboard
                            </Typography>
                        </Stack>
                        <Stack direction='row' alignItems={'center'} columnGap={{xs:2,sm:4}}>
                            <Stack direction='row' alignItems={'center'} columnGap={{xs:1,sm:2}}>
                                <Typography sx={{typography:{xs:'caption',sm:'body2'}}}>{jwtDecode(localStorage.getItem('token')).firstName}</Typography>
                                <BadgeAvatar/>
                            </Stack>
                            <CommonButton
                                children={'Logout'}
                                color={'error'}
                                onClick={handleLogout}
                            />
                        </Stack>
                    </Stack>
                </Toolbar>
                <Container
                    component="main"
                    disableGutters
                    maxWidth={false}
                    sx={{ boxSizing: 'border-box', backgroundColor: 'brights.two', flex: 1, overflow: 'auto' }}
                >
                    <Outlet />
                </Container>
            </Stack>
            {/* Failed logout snackbar */}
            {failedLogout && <Toast message={'Logout failed, try again.'} open={failedLogout} setOpen={setFailedLogout} severity={'error'}/>}
        </Stack>
    );
}

export default Dashboard;
