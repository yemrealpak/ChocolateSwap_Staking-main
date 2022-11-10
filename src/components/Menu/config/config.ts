import { MenuItemsType, DropdownMenuItemType, menuStatus } from 'uikit'
import { ContextApi } from 'contexts/Localization/types'
import { nftsBaseUrl } from 'views/Nft/market/constants'

export type ConfigMenuItemsType = MenuItemsType & { hideSubNav?: boolean }

const config: (t: ContextApi['t']) => ConfigMenuItemsType[] = (t) => [
  {
    label: 'Staking',
    href: '/',
    items: [],
    showItemsOnMobile: false,
  },

 /* {
    label: 'Referral',
    href: '/referral',
    items: [],
    showItemsOnMobile: false,
  }, */
]

export default config
