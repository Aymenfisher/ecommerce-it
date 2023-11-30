import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import MailIcon from '@mui/icons-material/Mail';

export const navbarLinks ={
    menu:[
        {title:'Main Menu',icon:<DashboardIcon/>,route:'/admin/dashboard/menu',roles:['owner','seller']},
        {title:'Analytics',icon:<BarChartIcon/>,route:'/admin/dashboard/analytics',roles:['owner','seller']},
        {title:'Inbox',icon:<MailIcon/>,route:'/admin/dashboard/inbox',roles:['owner','seller']}
    ],
    store:[
        {title:'warehouse',icon:<WarehouseIcon/>,route:'/admin/dashboard/warehouse',roles:['owner','seller']},
        {title:'orders',icon:<ShoppingCartCheckoutIcon/>,route:'/admin/dashboard/orders',roles:['owner','seller']}
        
    ],
    settings:[
        {title:'Store Informations',icon:<InfoRoundedIcon/>,route:'/admin/dashboard/storeinfos',roles:['owner']},
        {title:'User Management',icon:<ManageAccountsIcon/>,route:'/admin/dashboard/accounts',roles:['owner']},
    ]
}