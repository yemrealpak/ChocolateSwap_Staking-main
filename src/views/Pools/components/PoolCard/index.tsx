import BigNumber from 'bignumber.js'
import React from 'react'
import { CardBody, Flex, Text, CardRibbon, Tag, BlockIcon } from 'uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from 'contexts/Localization'
import tokens from 'config/constants/tokens'
import { BIG_ZERO } from 'utils/bigNumber'
import { DeserializedPool } from 'state/types'
import { TokenPairImage } from 'components/TokenImage'
import AprRow from './AprRow'
import { StyledCard } from './StyledCard'
import CardFooter from './CardFooter'
import PoolCardHeader, { PoolCardHeaderTitle } from './PoolCardHeader'
import CardActions from './CardActions'

const PoolCard: React.FC<{ pool: DeserializedPool; account: string }> = ({ pool, account }) => {
  const { sousId, stakingToken, earningToken, isFinished, userData, withdrawLock, depositFee, withdrawalFee } = pool
  const { t } = useTranslation()
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const accountHasStakedBalance = stakedBalance.gt(0)

  const isCakePool = earningToken.symbol === 'CAKE' && stakingToken.symbol === 'CAKE'
  const isLP = stakingToken === tokens.aethLp
  return (
    <StyledCard
      isFinished={isFinished && sousId !== 0}
      ribbon={isFinished && <CardRibbon variantColor="textDisabled" text={t('Finished')} />}
    >
      <PoolCardHeader isStaking={accountHasStakedBalance} isFinished={isFinished && sousId !== 0}>
        <PoolCardHeaderTitle
          title={isCakePool ? t('Manual') : t('Earn %asset%', { asset: earningToken.symbol })}
          subTitle={isCakePool ? t('Earn CAKE, stake CAKE') : t('Stake %symbol%', { symbol: stakingToken.symbol })}
        />
        <TokenPairImage primaryToken={earningToken} secondaryToken={stakingToken} width={64} height={64} />
      </PoolCardHeader>
      <CardBody>
        <AprRow pool={pool} stakedBalance={stakedBalance} />
        <Flex mt="20px" justifyContent="space-between">
          <Text mb="5px" fontSize="16px" color="text">
            {t('Withdraw Lock')}
          </Text>
          <Tag variant="primary" startIcon={<BlockIcon width="14px" color="primary" mr="4px" />}>
            {withdrawLock / 3600 / 24 + t('D')}
          </Tag>
        </Flex>
        {depositFee > 0 ? (
          <Flex mt="20px" justifyContent="space-between">
            <Text mb="5px" fontSize="16px" color="text">
              {t('Deposit Fee')}
            </Text>
            <span style={{ color: 'white' }}>{depositFee / 100}%</span>
          </Flex>
        ) : (
          <Flex mt="20px" justifyContent="space-between">
            <Text mb="5px" fontSize="16px" color="text">
              {t('Deposit Fee')}
            </Text>
             <span style={{ color: 'white' }}>0%</span>
          </Flex>
        )}
        {withdrawalFee > 0 ? (
          <Flex mt="20px" justifyContent="space-between">
            <Text mb="5px" fontSize="16px" color="text">
              {t('Withdrawal Fee')}
            </Text>
            <span style={{ color: 'white' }}>{withdrawalFee / 100}%</span>
          </Flex>
        ) : (
          <Flex mt="20px" justifyContent="space-between">
            <Text mb="5px" fontSize="16px" color="text">
              {t('Withdrawal Fee')}
            </Text>
            <span style={{ color: 'white' }}>0%</span>
          </Flex>
        )}

        {withdrawLock === 604800 || withdrawLock === 2592000 ? (
          <Flex mt="20px" justifyContent="space-between">
            <Text mb="5px" fontSize="16px" color="text">
              {t('Emergency Withdrawal Fee')}
            </Text>
            <span style={{ color: 'white' }}>20%</span>
          </Flex>
        ) : (
          <Flex mt="20px" justifyContent="space-between">
            <Text mb="5px" fontSize="16px" color="text">
              {t('Emergency Withdrawal Fee')}
            </Text>
            <span style={{ color: 'white' }}>20%</span>
          </Flex>
        )}

        <Flex mt="24px" flexDirection="column">
          {account ? (
            <CardActions pool={pool} stakedBalance={stakedBalance} />
          ) : (
            <>
              <Text mb="10px" textTransform="uppercase" fontSize="12px" color="textSubtle" bold>
                {t('Start earning')}
              </Text>
              <ConnectWalletButton />
            </>
          )}
        </Flex>
      </CardBody>
      <CardFooter pool={pool} account={account} />
    </StyledCard>
  )
}

export default PoolCard
