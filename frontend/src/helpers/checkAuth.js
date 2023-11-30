import {jwtDecode} from 'jwt-decode'
const checkAuth = async (roles='all') => { // check for user authentication (server side), and user role (client side)
    try{
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/auth/check`,{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        switch(response.status){
            case 200: // user is authenticated : checking for permission if needed
                const userRole = jwtDecode(localStorage.getItem('token')).role
                if(roles=='all' || roles.includes(userRole)){
                    return 200
                }
                return 403
            case 401:
                return 401
            default:
                return 422
        }
    }catch(error){
        return 422
    }


}

export default checkAuth