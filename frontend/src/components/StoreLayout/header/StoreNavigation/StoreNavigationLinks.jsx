import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {
    Link,
    matchPath,
    useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectRoutes } from '../../../../features/routes/routesSlice';






function useRouteMatch(patterns,homePath) {
    // homePath : string representing the home path , returned when the path is /
    // patterns: array of strings that repesents the paths we want to match with, ex: ['/products','/about','/home']

    const { pathname } = useLocation();

    if(pathname ==='/'){
        return matchPath(homePath,homePath)
    }
    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath({
            path:pattern,
            end:false // to match descendant paths (query parameter is not returned in the object when we have a match)
        }, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }

    return null;
}

export default function StoreNavigationLinks({orientation}) {
    // - You need to provide the routes in descendant order.
    //      This means that if you have nested routes like:
    //      users, users/new, users/edit.
    //      Then the order should be ['users/add', 'users/edit', 'users'].
    // - Routes is an object of 2 properties: path and name
    const routes = useSelector(selectRoutes)// select only store layout navigation bar routes
    const patterns = routes.map((route) => {return route.path})
    const routeMatch = useRouteMatch(patterns,'/home');
    const currentTab = routeMatch?.pattern?.path;


    return (
        <Tabs value={currentTab ? currentTab : false} orientation={orientation} TabIndicatorProps={{style:{background:'none'}}} sx={{'.Mui-selected':{color:'yellow.main',fontWeight:800}}} textColor='inherit' >
            {
                routes.map((route) =>{
                    return route.isNavigation && 
                    <Tab sx={{fontSize:{xs:'16px',lg:'18px'},fontWeight:'600',color:'brights.one'}} label={route.name}  key={route.path} value={route.path} to={route.path} component={Link}/>
                })
            }
        </Tabs>
    );
}
