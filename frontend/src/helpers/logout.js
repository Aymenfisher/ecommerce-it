const logout =() => {
    try{
        localStorage.removeItem('token')
        return true
    }catch(error){
        return false
    }

}

export default logout