import React from 'react'
import { Button, useWalletModal } from 'uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import CountdownCircle from 'views/Nft/market/Collection/IndividualNFTPage/PancakeBunnyPage/ForSaleTableCard/CountdownCircle'

const ConnectWalletButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  return (
    <>
      <Button mt="5px" mb="5px" onClick={onPresentConnectModal} {...props}>
        {t('Connect Wallet')}
      </Button>
    </>
  )
}

export default ConnectWalletButton
