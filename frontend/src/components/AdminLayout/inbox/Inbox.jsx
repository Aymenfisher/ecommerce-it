import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import  Stack  from '@mui/material/Stack'
import React from 'react'
import MessageCards from './MessageCards'
import BasicModal from '../../common/BasicModal/BasicModal'
import MessageDetails from './MessageDetails'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMessage, fetchMessages, selectHasErrorDeleteMessage, selectHasErrorFetchMessages, selectIsLoadingDeleteMessage, selectIsLoadingFetchMessages, selectMessages, setMessageViewed } from '../../../features/inbox/inboxSlice'
import Loading from '../../common/Loading/Loading';
import ErrorLoading from '../../common/ErrorLoading/ErrorLoading';
import ConfirmDialog from '../../common/Dialog/ConfirmDialog'
import Toast from '../../common/Toast/Toast'
import RefreshIcon from '@mui/icons-material/Refresh';



const Inbox = () => {

    const dispatch = useDispatch()
    const isLoadingMessages = useSelector(selectIsLoadingFetchMessages)
    const hasErrorMessages = useSelector(selectHasErrorFetchMessages)
    const messages = useSelector(selectMessages)
    // open message 
    const [openMessage, setOpenMessage] = React.useState(false)
    const [messageToOpen, setMessageToOpen] = React.useState(false) // false or the message to inspect
    const handleOpenMessage = (message) => {
        !message.isOpened && dispatch(setMessageViewed(message._id))
        setMessageToOpen(message)
        setOpenMessage(true)
        return
    }
    const handleCloseMessage = () => {
        setOpenMessage(false)
        setMessageToOpen(false) //clear opened message state
        return
    }

    // delete message
    const [messageToDelete, setMessageToDelete] = React.useState(false) //false or the message id
    const [openDeleteMessageToast, setOpenDeleteMessageToast] = React.useState(false)
    const [openDeleteMessageDialog, setOpenDeleteMessageDialog] = React.useState(false)
    const isLoadingDeleteMessage = useSelector(selectIsLoadingDeleteMessage)
    const hasErrorDeleteMessage = useSelector(selectHasErrorDeleteMessage)

    const handleDeleteMessage = (_id) => {
        setMessageToDelete(_id)
        setOpenDeleteMessageDialog(true)
        return
    }

    const parentRef = React.useRef(null)

    return (
        <Container maxWidth={false} disableGutters sx={{ display: 'flex', flexDirection: 'column', rowGap: '15px', p: 2, bgColor: 'brights.two' }} ref={parentRef}>
            {openMessage && <BasicModal open={openMessage} handleClose={handleCloseMessage} children={<MessageDetails message={messageToOpen} handleCloseMessage={handleCloseMessage} />} />}
            <Typography variant='h4' fontWeight={'500'}>Inbox</Typography>
            <Typography variant='body1' color={'text.secondary'} textAlign={'justify'} fontWeight={'500'} alignSelf={'flex-start'}>
                In this section, you can see messages and feedback sent by clients using the store's contact form
            </Typography>
            <Divider />
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Typography variant='caption' fontWeight={600} color={'text.secondary'}>{messages.length} Messages Found.</Typography>
            <IconButton  onClick={() => dispatch(fetchMessages())} sx={{ title: 'Refresh Messages',alignSelf:'flex-end' }}>
                <RefreshIcon />
            </IconButton>
            </Stack>

            {
                isLoadingMessages ? <Loading /> :
                    hasErrorMessages ? <ErrorLoading reload={() => dispatch(fetchMessages())} /> :
                        <MessageCards messages={messages} handleOpenMessage={handleOpenMessage} handleDeleteMessage={handleDeleteMessage} parentRef={parentRef} />
            }
            {/* Delete message dialog*/}
            {openDeleteMessageDialog &&
                <ConfirmDialog
                    title={'Delete This Message ?'}
                    content={'Clicking confirm will delete this message PERMANENTLY.'}
                    confirmText={'Confirm'}
                    denyText={'Cancel'}
                    open={openDeleteMessageDialog}
                    setOpen={setOpenDeleteMessageDialog}
                    confirmOperation={() => {
                        setOpenDeleteMessageToast(true) // loading
                        dispatch(deleteMessage(messageToDelete))
                        setMessageToDelete(false) //clear message to delete state
                        setOpenDeleteMessageToast(true) // success  - failure
                    }}
                />
            }
            {/* Deleting message snackbar */}
            {isLoadingDeleteMessage && <Toast open={openDeleteMessageToast} setOpen={setOpenDeleteMessageToast} message='Deleting Message...' severity='info' />}
            {(!isLoadingDeleteMessage && !hasErrorDeleteMessage && openDeleteMessageToast) && <Toast open={openDeleteMessageToast} setOpen={setOpenDeleteMessageToast} message='Message Deleted successfully!' severity='success' />}
            {(hasErrorDeleteMessage && openDeleteMessageToast) && <Toast open={openDeleteMessageToast} setOpen={setOpenDeleteMessageToast} message='Couldnt Delete message, please try again.' severity='error' />}

        </Container>
    )
}

export default Inbox