import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import  Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { selectStoreInfos, selectIsLoadingStoreInfos } from '../../../features/storeinfos/storeInfosSlice';
import formatDate from '../../../helpers/formatDate'
import Toast from '../../common/Toast/Toast';
import Loading from '../../common/Loading/Loading';
import StoreInfosForm from './StoreInfosForm';


const StoreInfos = () => {
  const isLoadingInfos = useSelector(selectIsLoadingStoreInfos)
  const storeInfos = useSelector(selectStoreInfos)
  const { updatedAt, ...currentInfos } = storeInfos
  const [openSuccessToast, setOpenSuccessToast] = React.useState(false)

  //scroll to top on submission error (request error)
  const parentRef = React.useRef(null)
  return (
    <Container maxWidth={false} disableGutters sx={{ display: 'flex', flexDirection: 'column', rowGap: '15px', p: 2 }} ref={parentRef}>

      <Typography variant='h4' fontWeight={'500'}>Store Informations</Typography>
      <Typography variant='body1' color={'text.secondary'} textAlign={'justify'} fontWeight={'500'} alignSelf={'flex-start'}>
        Edit some informations related to the store that appears on the website. Like the home page description, social
        media links, phone numbers, your store location on maps..etc .
      </Typography>
      <Divider />
      {storeInfos.hasOwnProperty('updatedAt') ?
        <Typography variant='caption' color={'text.secondary'} fontWeight={'500'}>Last update: {formatDate.dateWithTime(storeInfos.updatedAt)}</Typography>
        :
        !isLoadingInfos && <Alert severity="warning" sx={{ alignSelf: 'stretch' }}>Could not get latest store informations, displaying default informations instead. (Check your netwok and Refresh the page)</Alert>
      }
      {isLoadingInfos ? <Loading /> :
        <StoreInfosForm setOpenSuccessToast={setOpenSuccessToast} currentInfos={currentInfos} parentRef={parentRef} />
      }
      {/* success edit store info snackbar */}
      {openSuccessToast && <Toast open={openSuccessToast} setOpen={setOpenSuccessToast} message='Modified successfully!' severity='success' />}
    </Container>
  )
}

export default StoreInfos