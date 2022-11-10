import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import { updateUserStakedBalance, updateUserBalance } from 'state/actions'
import { stakeFarm } from 'utils/calls'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL, DEFAULT_GAS_LIMIT } from 'config'
import { BIG_TEN } from 'utils/bigNumber'
import { useMasterchef, useSousChef } from 'hooks/useContract'
import getGasPrice from 'utils/getGasPrice'
import CryptoJS from 'crypto-js'
import { ethers } from 'ethers'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const sousStake = async (sousChefContract, amount, decimals = 18, referral) => {
  const gasPrice = getGasPrice()
  let address
  if(referral !== undefined && referral !== '') {
   address = `0x${referral}`;
   
  } else {
    address = '0x000000000000000000000000000000000000dead'
  }
  console.log(address)
let tx
let receipt = {status:""}
try {
   tx = await sousChefContract.deposit(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString(),address, {
   
  
  })
   receipt = await tx.wait()
   return receipt.status
}catch(err){
  console.log("error",err)
  throw err
}

}

const sousStakeBnb = async (sousChefContract, amount) => {
  const gasPrice = getGasPrice()
  const tx = await sousChefContract.deposit(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(),'0x000000000000000000000000000000000000dead', {

  })
  const receipt = await tx.wait()
  return receipt.status
}

const useStakePool = (sousId: number, isUsingBnb = false) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)

  const handleStake = useCallback(
    async (amount: string, decimals: number, code:string) => {
      if (sousId === 0) {
        await stakeFarm(masterChefContract, 0, amount)
      } else if (isUsingBnb) {
        await sousStakeBnb(sousChefContract, amount)
      } else {
        await sousStake(sousChefContract, amount, decimals, code)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
    },
    [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId],
  )

  return { onStake: handleStake }
}

export default useStakePool
