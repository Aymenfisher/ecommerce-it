import React from 'react'
import Stack from '@mui/material/Stack'
import HeaderSection from './HeaderSection'
import StoreNavigationBar from './StoreNavigation/StoreNavigationBar'
import { selectStoreInfos } from '../../../features/storeinfos/storeInfosSlice'
import { useSelector } from 'react-redux'


const Header = () => {
  const storeInfos = useSelector(selectStoreInfos)
  return (
    <Stack component={'header'}>
      <HeaderSection storeInfos={storeInfos}/>
      <StoreNavigationBar storeInfos={storeInfos} />
    </Stack>
  )
}

export default Header