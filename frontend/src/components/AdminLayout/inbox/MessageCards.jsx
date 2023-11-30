import IconButton from '@mui/material/IconButton'
import  Stack from '@mui/material/Stack'
import Typography  from '@mui/material/Typography'
import React from 'react'
import MessageCard from './MessageCard'
import DeleteIcon from '@mui/icons-material/Delete';
import { useSearchParams } from 'react-router-dom'
import PaginationComponent from '../../common/Pagination/PaginationComponent';

const MessageCards = ({ messages, handleOpenMessage, handleDeleteMessage, parentRef }) => {
    // page from search params:
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get('p') || 1
    const handleChangePage = (event, newPage) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('p', newPage);
        setSearchParams(newSearchParams);
    };

    // pagination configs

    const messagesPerPage = 20
    const messagesLength = messages.length
    const pagesNumber = messagesLength % messagesPerPage === 0 ? messagesLength / messagesPerPage : Math.ceil(messagesLength / messagesPerPage)
    const startIndex = (page - 1) * messagesPerPage
    const endIndex = startIndex + messagesPerPage

    const pageMessages = messages.slice(startIndex, endIndex) // messages to display for a specific page

    React.useEffect(() => {
        parentRef.current?.scrollIntoView({ behaviour: 'smooth' }) // scroll to top on page change
    }, [page])
    return (
        <Stack spacing={2}>
            <Stack spacing={1.5}>
                {
                    !messages.length ? <Typography sx={{ alignSelf: 'center' }} variant='body1' fontWeight={600} color={'text.secondary'}>No Messages</Typography> :
                        pageMessages.map((message, index) => {
                            return (
                                <Stack direction={'row'} alignItems={'center'} key={`${message.name}.${index}`}>
                                    <MessageCard message={message} handleOpenMessage={handleOpenMessage} />
                                    <IconButton onClick={() => handleDeleteMessage(message._id)}>
                                        <DeleteIcon color='error' />
                                    </IconButton>
                                </Stack>
                            )
                        })
                }
            </Stack>
            <PaginationComponent pagesNumber={pagesNumber} page={Number(page)} handleChangePage={handleChangePage} sx={{ alignSelf: 'center', fontWeight: 800 }} />
        </Stack>
    )
}

export default MessageCards