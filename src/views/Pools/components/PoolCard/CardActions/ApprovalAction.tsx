import React from 'react'
import { Button, AutoRenewIcon, Skeleton } from 'uikit'
import { useTranslation } from 'contexts/Localization'
import { useERC20 } from 'hooks/useContract'
import { DeserializedPool, VaultKey } from 'state/types'
import Countdown from 'react-countdown'
import useWithdrawalFeeTimer from 'views/Pools/hooks/useWithdrawalFeeTimer'
import { useVaultPoolByKey } from 'state/pools/hooks'
import { useApprovePool } from '../../../hooks/useApprove'
import WithdrawalFeeTimer from '../../CakeVaultCard/WithdrawalFeeTimer'
import UnstakingFeeCountdownRow from '../../CakeVaultCard/UnstakingFeeCountdownRow'

interface ApprovalActionProps {
  pool: DeserializedPool
  isLoading?: boolean
  vaultKey: VaultKey
}

const ApprovalAction: React.FC<ApprovalActionProps> = ({ pool, isLoading = false, vaultKey }) => {
  const { sousId, stakingToken, earningToken } = pool
  const { t } = useTranslation()
  const stakingTokenContract = useERC20(stakingToken.address || '')
  const {
    userData: { lastDepositedTime, userShares },
    fees: { withdrawalFee, withdrawalFeePeriod },
  } = useVaultPoolByKey(vaultKey)
  const { handleApprove, requestedApproval } = useApprovePool(stakingTokenContract, sousId, earningToken.symbol)
  const { secondsRemaining, hasUnstakingFee } = useWithdrawalFeeTimer(
    parseInt(lastDepositedTime, 10),
    userShares,
    withdrawalFeePeriod,
  )

  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="52px" />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Button
            isLoading={requestedApproval}
            endIcon={requestedApproval ? <AutoRenewIcon spin color="currentColor" /> : null}
            disabled={requestedApproval}
            onClick={handleApprove}
            width="100%"
          >
            {t('Enable')}
          </Button>
         
        </div>
      )}
    </>
  )
}

export default ApprovalAction
