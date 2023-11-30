import React from 'react'
import checkAuth from '../../../helpers/checkAuth'
import Forbidden from '../Forbidden/Forbidden'
import { Navigate } from 'react-router-dom'
import Loading from '../Loading/Loading'
import ErrorLoading from '../ErrorLoading/ErrorLoading'


const ProtectedRoute = ({component,roles}) => {
    const [status,setStatus] = React.useState('loading')
    React.useEffect(() =>{
        checkAuth(roles).then(
            (statusCode) => {
                setStatus(statusCode)
            }
        )
    },[])
    switch(status){
        case 'loading':
            return <Loading/>
        case 401:
            return <Navigate to='/admin/login' replace/>
        case 403:
            return <Forbidden/>
        case 200:
            return component
        default:
            return <ErrorLoading message={'Authentication failed. Please check your network and try again.'} reload={() => location.reload()}/>
    }
}

export default ProtectedRoute