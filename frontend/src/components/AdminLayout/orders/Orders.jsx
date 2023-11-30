import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import React from 'react'
import OrdersTable from './ordersTable/OrdersTable';
import SelectComponent from '../../common/SelectComponent/SelectComponent';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, completeOrder, fetchAllOrders, selectAllOrders, selectHasErrorDeleteOrder, selectHasErrorOrders, selectIsLoadingDeleteOrder, selectIsLoadingOrders, selectIsLoadingCompleteOrder, selectHasErrorCompleteOrder } from '../../../features/orders/ordersSlice';
import Loading from '../../common/Loading/Loading';
import ErrorLoading from '../../common/ErrorLoading/ErrorLoading';
import OrderDetails from './ordersTable/OrderDetails';
import Toast from '../../common/Toast/Toast';
import ConfirmDialog from '../../common/Dialog/ConfirmDialog';
import BasicModal from '../../common/BasicModal/BasicModal';
import RefreshIcon from '@mui/icons-material/Refresh';



const Orders = () => {
    //selecting data from store
    const orders = useSelector(selectAllOrders)
    const isLoadingOrders = useSelector(selectIsLoadingOrders)
    const hasErrorOrders = useSelector(selectHasErrorOrders)
    //search
    const [searchTerm, setSearchTerm] = React.useState('')

    //  filter
    const [filter, setfilter] = React.useState('pending') //  all ,  pending ,  completed
    const handleChangeFilter = (filter) => {
        setfilter(filter)
    }
    const filters = ['all', 'pending', 'completed']
    const filteredOrders = orders.filter((order) => {
        switch (filter) {
            case 'pending':
                return !order.isCompleted
            case 'completed':
                return order.isCompleted
            default:
                return true
        }
    })
    //orders to show by search
    const searchedOrders = filteredOrders.filter(order => JSON.stringify(order).toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))

    // order details modal 
    const [openOrderDetails, setOpenOrderDetails] = React.useState(false)
    const [orderToOpen, setOrderToOpen] = React.useState(false) // false or the order to inspect
    const handleOpenOrderDetails = (order) => {
        setOrderToOpen(order)
        setOpenOrderDetails(true)
        return
    }
    const handleCloseOrderDetails = () => {
        setOpenOrderDetails(false)
        setOrderToOpen(false) //clear opened order state
        return
    }

    // set order as completed
    const dispatch = useDispatch()
    const [orderToComplete, setOrderToComplete] = React.useState(false) // false or the order object that will be set completed
    const [openCompleteOrderToast, setOpenCompleteOrderToast] = React.useState(false) // complete order snackbars 
    const [openCompleteOrderDialog, setOpenCompleteOrderDialog] = React.useState(false)  //  confirm complete order dialog setting


    const isLoadingCompleteOrder = useSelector(selectIsLoadingCompleteOrder)
    const hasErrorCompleteOrder = useSelector(selectHasErrorCompleteOrder)

    const handleCompleteOrder = (_id) => {
        setOrderToComplete(_id)
        setOpenCompleteOrderDialog(true)
        return
    }

    // handle delete order
    const [orderToDelete, setOrderToDelete] = React.useState(false) // false or the order object that will be deleted
    const [openDeleteOrderToast, setOpenDeleteOrderToast] = React.useState(false) // delete order snackbars 
    const [openDeleteOrderDialog, setOpenDeleteOrderDialog] = React.useState(false)  //  confirm delete order dialog setting
    const isLoadingDeleteOrder = useSelector(selectIsLoadingDeleteOrder)
    const hasErrorDeleteOrder = useSelector(selectHasErrorDeleteOrder)

    const handleDeleteOrder = (_id) => {
        setOrderToDelete(_id)
        setOpenDeleteOrderDialog(true)
        return
    }

    return (
        <Container maxWidth={false} disableGutters sx={{ display: 'flex', flexDirection: 'column', rowGap: '15px', p: 2 }}>
            {openOrderDetails && <BasicModal children={<OrderDetails close={handleCloseOrderDetails} order={orderToOpen} />} open={openOrderDetails} handleClose={handleCloseOrderDetails} />}
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant='h4' fontWeight={'500'} alignSelf={'flex-start'}>Orders</Typography>
                <IconButton onClick={() => dispatch(fetchAllOrders())} sx={{title:'Refresh Orders'}}>
                    <RefreshIcon/>
                </IconButton>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} flexWrap={'wrap'} rowGap={2}>
                <SelectComponent
                    items={filters}
                    alwaysShow
                    label={'status'}
                    size={'small'}
                    defaultValue={'pending'}
                    props={{ sx: { maxWidth: '200px' } }}
                    setActiveItem={handleChangeFilter}
                />
                <TextField onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{
                        bgcolor: 'white.main',
                        "& input::placeholder": { fontSize: "12px", fontWeight: '500' },
                        minWidth: '180px'
                    }}
                    size={'small'} id="outlined-search" placeholder={`Search by any order detail`} type="search"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ width: '20px' }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            <Stack spacing={2}>
                {
                    isLoadingOrders ? <Loading /> :
                        hasErrorOrders ? <ErrorLoading reload={() => dispatch(fetchAllOrders())} /> :
                            <OrdersTable
                                orders={searchedOrders}
                                handleOpenOrderDetails={handleOpenOrderDetails}
                                handleCompleteOrder={handleCompleteOrder}
                                handleDeleteOrder={handleDeleteOrder}
                            />
                }

            </Stack>
            {/* Complete order dialog*/}
            {openCompleteOrderDialog &&
                <ConfirmDialog
                    title={'Complete Order ?'}
                    content={'Clicking confirm will set this order as completed.'}
                    confirmText={'Confirm'}
                    denyText={'Cancel'}
                    open={openCompleteOrderDialog}
                    setOpen={setOpenCompleteOrderDialog}
                    confirmOperation={() => {
                        setOpenCompleteOrderToast(true) // lodaing
                        dispatch(completeOrder(orderToComplete))
                        setOrderToComplete(false) // clear order to complete state
                        setOpenCompleteOrderToast(true) // success / failure
                    }}
                />}
            {/* Delete order dialog*/}
            {openDeleteOrderDialog &&
                <ConfirmDialog
                    title={'Delete Order ?'}
                    content={'Clicking confirm will delete this order PERMANENTLY.'}
                    confirmText={'Confirm'}
                    denyText={'Cancel'}
                    open={openDeleteOrderDialog}
                    setOpen={setOpenDeleteOrderDialog}
                    confirmOperation={() => {
                        setOpenDeleteOrderToast(true) // loading
                        dispatch(deleteOrder(orderToDelete))
                        setOrderToDelete(false) //clear order to delete state
                        setOpenDeleteOrderToast(true) // success  - failure
                    }}
                />}
            {/* Completing order snackbars */}
            {isLoadingCompleteOrder && <Toast open={openCompleteOrderToast} setOpen={setOpenCompleteOrderToast} message='Completing Order...' severity='info' />}
            {(!isLoadingCompleteOrder && !hasErrorCompleteOrder && openCompleteOrderToast) && <Toast open={openCompleteOrderToast} setOpen={setOpenCompleteOrderToast} message='Order completed successfully!' severity='success' />}
            {(hasErrorCompleteOrder && openCompleteOrderToast) && <Toast open={openCompleteOrderToast} setOpen={setOpenCompleteOrderToast} message='Couldnt complete order, please try again.' severity='error' />}
            {/* Deleting order snackbar */}
            {isLoadingDeleteOrder && <Toast open={openDeleteOrderToast} setOpen={setOpenDeleteOrderToast} message='Deleting Order...' severity='info' />}
            {(!isLoadingDeleteOrder && !hasErrorDeleteOrder && openDeleteOrderToast) && <Toast open={openDeleteOrderToast} setOpen={setOpenDeleteOrderToast} message='Order Deleted successfully!' severity='success' />}
            {(hasErrorDeleteOrder && openDeleteOrderToast) && <Toast open={openDeleteOrderToast} setOpen={setOpenDeleteOrderToast} message='Couldnt Delete order, please try again.' severity='error' />}

        </Container>
    )
}

export default Orders