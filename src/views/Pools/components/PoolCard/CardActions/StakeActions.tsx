import React, { useCallback, useEffect, useState } from 'react'
import { Flex, Text, Button, IconButton, AddIcon, MinusIcon, useModal, Skeleton, useTooltip } from 'uikit'
import BigNumber from 'bignumber.js'
import { useDispatch } from 'react-redux'
import { fetchPoolsUserDataAsync } from 'state/pools'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useSousChef } from 'hooks/useContract'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { DeserializedPool } from 'state/types'
import Balance from 'components/Balance'
import { useBlock } from 'state/block/hooks'
import useWithdrawalFeeTimer from 'views/Pools/hooks/useWithdrawalFeeTimer'
import NotEnoughTokensModal from '../Modals/NotEnoughTokensModal'
import StakeModal from '../Modals/StakeModal'
import WithdrawalFeeTimer from '../../CakeVaultCard/WithdrawalFeeTimer'
import UnstakingFeeCountdownRow from '../../CakeVaultCard/UnstakingFeeCountdownRow'



interface StakeActionsProps {
  pool: DeserializedPool
  stakingTokenBalance: BigNumber
  stakedBalance: BigNumber
  isBnbPool: boolean
  isStaked: ConstrainBoolean
  isLoading?: boolean
}

const StakeAction: React.FC<StakeActionsProps> = ({
  pool,
  stakingTokenBalance,
  stakedBalance,
  isBnbPool,
  isStaked,
  isLoading = false,
}) => {
  const { stakingToken, stakingTokenPrice, stakingLimit, isFinished, userData, contractAddress, sousId, endBlock } =
    pool
  const { t } = useTranslation()
  const {account} = useActiveWeb3React()
  const { currentBlock } = useBlock()
  const stakedTokenBalance = getBalanceNumber(stakedBalance, stakingToken.decimals)
  const [displayWithdraw, setDisplayWithdraw] = useState("")
  const stakedTokenDollarBalance = getBalanceNumber(
    stakedBalance.multipliedBy(stakingTokenPrice),
    stakingToken.decimals,
  )
  const [withdrawLocked, setWidrawLocked] = useState(false)
  const dispatch = useDispatch()
  const contract = useSousChef(sousId)
  const emergency = useCallback(async () => {
    if (displayWithdraw === "emergency") {
      await contract.emergencyWithdraw()
    } else if(displayWithdraw === "withdraw") {
      await contract.withdraw(new BigNumber(userData.stakedBalance).toString(10))
    }
    dispatch(fetchPoolsUserDataAsync(account))
  }, [contract, account,withdrawLocked, displayWithdraw, currentBlock, endBlock, userData.stakedBalance])
  useEffect(() => {
    // withdraw tokens => withdraw


    if ((pool.isFinished || !withdrawLocked ) && userData.stakedBalance.isGreaterThan(0)) {
      setDisplayWithdraw("withdraw")
    } else if ((!pool.isFinished && withdrawLocked && userData.stakedBalance.isGreaterThan(0))) {
      setDisplayWithdraw("emergency")
    } else {
      setDisplayWithdraw("")
    }
    // emergency => emergency
 

  },[contract, withdrawLocked, account, pool.isFinished, userData.stakedBalance, userData, pool.withdrawLock ])
  const emergencyOther = useCallback(async () => {
      await contract.emergencyWithdraw()
  }, [contract, userData.stakedBalance])

  useEffect(() => {
    if (pool.withdrawLock > 0) {
      const last = new BigNumber(userData.lastDepositTime)
    
      if (last.toNumber() + new BigNumber(pool.withdrawLock).toNumber() < Date.now() / 1000) {
        setWidrawLocked(false)
      } else {
        setWidrawLocked(true)
      }
    }
  }, [userData, pool.withdrawLock])
  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />)
  const { secondsRemaining, hasUnstakingFee } = useWithdrawalFeeTimer(
    parseInt(userData.lastDepositTime.toString(), 10),
   userData.stakedBalance,
    pool.withdrawLock,
  )
  const [onPresentStake] = useModal(
    <StakeModal
      isBnbPool={isBnbPool}
      pool={pool}
      stakingTokenBalance={stakingTokenBalance}
      stakingTokenPrice={stakingTokenPrice}
    />,
  )

  const [onPresentUnstake] = useModal(
    <StakeModal
      stakingTokenBalance={stakingTokenBalance}
      isBnbPool={isBnbPool}
      pool={pool}
      stakingTokenPrice={stakingTokenPrice}
      isRemovingStake
    />,
  )

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('You’ve already staked the maximum amount you can stake in this pool!'),
    { placement: 'bottom' },
  )

  const reachStakingLimit = stakingLimit.gt(0) && userData.stakedBalance.gte(stakingLimit)

  const renderStakeAction = () => {
    return isStaked ? (
      <Flex justifyContent="space-between" alignItems="center">
        <Flex flexDirection="column">
          <>
            <Balance bold fontSize="20px" decimals={3} value={stakedTokenBalance} />
          </>
        </Flex>
        {!pool.isFinished && (<Flex>
          {reachStakingLimit ? (
            <span ref={targetRef}>
              <IconButton variant="secondary">
                <AddIcon color="textDisabled" width="24px" height="24px" />
              </IconButton>
            </span>
          ) : (
            <IconButton
              variant="secondary"
              onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}
            >
              <AddIcon color="primary" width="24px" height="24px" />
            </IconButton>
          )}
        </Flex>)}
        {tooltipVisible && tooltip}
      </Flex>
    ) : (
      isFinished ? "" : <Button onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}>{t('Stake')}</Button>
    )
  }

  return (
    <Flex flexDirection="column">
      {isLoading ? (
        <Skeleton width="100%" height="52px" />
      ) : (
        <>
          {renderStakeAction()}
          {displayWithdraw === "emergency" && <Button style={{ backgroundColor: '#DB0500' }} onClick={emergency} mt="5px" mb="5px">
           Emergency Withdraw
          </Button>}
          {displayWithdraw === "withdraw" && <Button style={{ backgroundColor: '#296B3A' }} onClick={emergency} mt="5px" mb="5px">
            Withdraw your tokens
          </Button>}
          {!pool.isFinished && ( <span
            style={{
              fontSize: '12px',
              lineHeight: '1.5',
              textTransform: 'uppercase',
              marginBottom: '-10px',
              marginTop: '5px',
              fontWeight: 'bold',
            }}
          >
            Countdown for unstaking
          </span>)}
          {!pool.isFinished && (<Button style={{ background: '#9C7B17' }} isLoading={isLoading} disabled={!isStaked} width="100%" mt={2}>
            <WithdrawalFeeTimer secondsRemaining={secondsRemaining} />
          </Button>)}
        </>
      )}
    </Flex>
  )
}

export default StakeAction
