import { TimePicker } from 'components/DatePicker'
import React from 'react'
import { Flex, IconButton, CogIcon, useModal } from 'uikit'
import CountdownCircle from 'views/Nft/market/Collection/IndividualNFTPage/PancakeBunnyPage/ForSaleTableCard/CountdownCircle'
import SettingsModal from './SettingsModal'

type Props = {
  color?: string
  mr?: string
}

const GlobalSettings = ({ color, mr = '8px' }: Props) => {
  const [onPresentSettingsModal] = useModal(<SettingsModal />)

  return (
    <Flex>
      <IconButton onClick={onPresentSettingsModal} variant="text" scale="sm" mr={mr} id="open-settings-dialog-button">
        <CogIcon height={24} width={24} color={color || 'textSubtle'} />
      </IconButton>
    </Flex>
  )
}

export default GlobalSettings
