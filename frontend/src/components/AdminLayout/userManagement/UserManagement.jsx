import React from 'react';
import { Typography, Container, Divider, Stack, IconButton } from '@mui/material';
import Toast from '../../common/Toast/Toast';
import Loading from '../../common/Loading/Loading';
import CommonButton from '../../common/commonButton/CommonButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UsersTable from './UsersTable';
import ConfirmDialog from '../../common/Dialog/ConfirmDialog'
import ErrorLoading from '../../common/ErrorLoading/ErrorLoading';
import BasicModal from '../../common/BasicModal/BasicModal'
import RefreshIcon from '@mui/icons-material/Refresh';
import SignupForm from './SignupForm';


/* helper functions : delete user request */

const deleteUser = async (_id) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/user/${_id}`, {
    method: 'DELETE',
    headers:{
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  if (!response.ok) {
    if(response.status == 422){
      throw Error('This user cant be deleted')
    }
    throw Error('Could not Delete user')
  }
  const json = await response.json()

  return json
}

const UserManagement = () => {
  /* open signup form logic */
  const [openSignupModal,setOpenSignupModal] = React.useState(false)
  const [openSuccessSignupToast,setOpenSuccessSignupToast] = React.useState(false)

  /* Deleting user logic */
  const [openDeleteToast, setOpenDeleteToast] = React.useState(false)
  const [userToDelete, setUserToDelete] = React.useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(true)
  const [hasErrorDeleting, setHasErrorDeleting] = React.useState(false)
  const handleDeleteUser = (_id) => {
    setUserToDelete(_id)
    setOpenDeleteDialog(true)
    return
  }

  /* fetch users logic */
  const [isLoadingFetchUsers, setIsLoadingFetchUsers] = React.useState(true)
  const [hasErrorFetchUsers, setHasErrorFetchUsers] = React.useState(false)
  const [users, setUsers] = React.useState([])
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoadingFetchUsers(true)
        setHasErrorFetchUsers(false)
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/user`, {
          headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (!response.ok) {
          throw Error('Could not fetch users')
        }
        const json = await response.json()
        setUsers(json)
      } catch (error) {
        setHasErrorFetchUsers(true)
      }
      setIsLoadingFetchUsers(false)
      return
    }
    if(isLoadingFetchUsers){
      fetchUsers()
    }
  }, [isLoadingFetchUsers])
  return (
    <Container maxWidth={false} disableGutters sx={{ display: 'flex', flexDirection: 'column', rowGap: '15px', p: 2 }}>
      {openSignupModal && <BasicModal open={openSignupModal} handleClose={() => setOpenSignupModal(false)} children={<SignupForm reloadUsers={() => setIsLoadingFetchUsers(true)} setOpenSuccessSignupToast={setOpenSuccessSignupToast} close={() => setOpenSignupModal(false)}/>}/>}
      <Typography variant='h4' fontWeight={'500'}>User Management</Typography>
      <Typography variant='body1' color={'text.secondary'} textAlign={'justify'} fontWeight={'500'} alignSelf={'flex-start'}>
        Manage store admins, create new admin, set specific role to admins, delete an admin.
      </Typography>
      <Divider />
      <Stack spacing={1}>
        <Stack direction='row' justifyContent={'space-between'}>
        <CommonButton
          startIcon={<PersonAddIcon />}
          sx={{ alignSelf: 'flex-start' }}
          size='large'
          children='New Admin'
          onClick={() => setOpenSignupModal(true)}
        />
        <IconButton onClick={() => setIsLoadingFetchUsers(true)}>
          <RefreshIcon/>
        </IconButton>
        </Stack>
        {
          isLoadingFetchUsers ? <Loading /> :
            hasErrorFetchUsers ? <ErrorLoading message={'Could not fetch users, please try again'} reload={() => {setIsLoadingFetchUsers(true)}} /> :
              <UsersTable users={users} handleDeleteUser={handleDeleteUser} />
        }
      </Stack>
      {/* Delete user dialog */}
      {
        openDeleteDialog &&
        <ConfirmDialog
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          title={'Delete Admin ?'}
          content={'Clicking confirm will delete this admin permanently.'}
          confirmText={'Confirm'}
          denyText={'Cancel'}
          confirmOperation={async () => {
            try {
              setHasErrorDeleting(false)
              setIsDeleting(true)
              setOpenDeleteToast(true)
              await deleteUser(userToDelete)
              setIsLoadingFetchUsers(true) //reload

            } catch (error) {
              setHasErrorDeleting(true)
            }
            setIsDeleting(false)
            setOpenDeleteToast(true)
            setUserToDelete(false)
            return
          }}
        />
      }
      {/* Delete user snackbar*/}
      {(openDeleteToast && isDeleting) && <Toast message={'Deleting user...'} open={openDeleteToast} setOpen={setOpenDeleteToast} severity={'info'} />}
      {(openDeleteToast && !isDeleting && hasErrorDeleting) && <Toast message={'Could not delete user.'} open={openDeleteToast} setOpen={setOpenDeleteToast} severity={'error'} />}
      {(openDeleteToast && !isDeleting && !hasErrorDeleting) && <Toast message={'User deleted with success'} open={openDeleteToast} setOpen={setOpenDeleteToast} severity={'success'} />}
      {/* Success signup toast */}
      {openSuccessSignupToast && <Toast message={'User Created with success'} open={openSuccessSignupToast} setOpen={setOpenSuccessSignupToast} severity={'success'} />}
    </Container>
  )
}

export default UserManagement