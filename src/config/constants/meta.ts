import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'ChocolateSwap',
  description: 'ChocolateSwap dApp Swap.',
  image: '/images/ChocolateSwapLogo.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Staking')} | ${t('ChocolateSwap')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('ChocolateSwap')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('ChocolateSwap')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('ChocolateSwap')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('ChocolateSwap')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('ChocolateSwap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('ChocolateSwap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('ChocolateSwap')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('ChocolateSwap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('ChocolateSwap')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('ChocolateSwap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('ChocolateSwap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('ChocolateSwap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('ChocolateSwap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('ChocolateSwap')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('ChocolateSwap')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('ChocolateSwap')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('ChocolateSwap')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('ChocolateSwap Info & Analytics')}`,
        description: 'View statistics for ChocolateSwap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('ChocolateSwap Info & Analytics')}`,
        description: 'View statistics for ChocolateSwap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('ChocolateSwap Info & Analytics')}`,
        description: 'View statistics for ChocolateSwap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('ChocolateSwap')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('ChocolateSwap')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Your Profile')} | ${t('ChocolateSwap')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('ChocolateSwap')}`,
      }
    default:
      return null
  }
}
