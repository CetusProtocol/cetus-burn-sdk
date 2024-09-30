import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519'
import { MainnetSDK } from './init_mainnet_sdk'
import { TestnetSDK } from './init_testnet_sdk'
import { CetusBurnSDK } from '../../src/sdk'
import dotenv from 'dotenv';

dotenv.config()
const privateKey = process.env.MNEMONIC_PHRASE || process.env.SECRET || ''

const envConfig = dotenv.config();
export enum SdkEnv {
  mainnet = 'mainnet',
  testnet = 'testnet',
}
export let currSdkEnv = SdkEnv.mainnet

export function buildSdk(sdkEnv: SdkEnv = currSdkEnv): CetusBurnSDK {
  currSdkEnv = sdkEnv
  switch (currSdkEnv) {
    case SdkEnv.mainnet:
      return MainnetSDK
    case SdkEnv.testnet:
      return TestnetSDK
    default:
      throw Error('not match SdkEnv')
  }
}


export function buildTestAccount(): Ed25519Keypair {
  // Please enter your test account secret or mnemonics
  const testAccountObject = Ed25519Keypair.deriveKeypair(privateKey)
  console.log(' Address: ', testAccountObject.getPublicKey().toSuiAddress())
  return testAccountObject
}


