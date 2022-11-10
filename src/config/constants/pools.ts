import { VaultKey } from 'state/types'
import tokens, { serializeTokens } from './tokens'
import { SerializedPoolConfig, PoolCategory } from './types'

const serializedTokens = serializeTokens()

export const vaultPoolConfig = {
  [VaultKey.CakeVault]: {
    name: 'Auto CAKE',
    description: 'Automatic restaking',
    autoCompoundFrequency: 5000,
    gasLimit: 380000,
    tokenImage: {
      primarySrc: `/images/tokens/${tokens.cake.address}.svg`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.IfoPool]: {
    name: 'IFO CAKE',
    description: 'Stake CAKE to participate in IFOs',
    autoCompoundFrequency: 1,
    gasLimit: 500000,
    tokenImage: {
      primarySrc: `/images/tokens/${tokens.cake.address}.svg`,
      secondarySrc: `/images/tokens/${tokens.cake.address}.svg`,
    },
  },
} as const

const pools: SerializedPoolConfig[] = [
  {
    sousId: 0,
    stakingToken: serializedTokens.chocolateswap,
    earningToken: serializedTokens.chocolateswap,
    contractAddress: {
      97: '',
      56: '0xE47f6D49f078486608C867B812166A0CBCe398E0',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
  },

  {
    sousId: 1,
    stakingToken: serializedTokens.chocolateswap,
    earningToken: serializedTokens.busd,
    contractAddress: {
      97: '',
      56: '0xE47f6D49f078486608C867B812166A0CBCe398E0',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.0034',
    sortOrder: 1,
    depositFee: 0,
    withdrawalFee: 0,
    withdrawLock: 2592000,
    isFinished: false,
  },

  ]

  export default pools
