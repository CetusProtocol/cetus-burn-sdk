# Cetus LP Burn SDK
## What is Cetus LP Burn ?
The primary functionality of this project, nominally referred to as "LP Burn," is essentially designed for users who wish to permanently lock their liquidity positions.  Once locked, the liquidity within these positions cannot be withdrawn, yet users retain the ability to claim any transaction fees and mining rewards generated from these positions.  This locking mechanism is implemented by wrapping the original position, effectively sealing the liquidity while still allowing the accrual of rewards.
The Cetus LP Burn SDK is particularly tailored for projects that have established liquidity pools and wish to relinquish their liquidity rights.  This feature allows these projects to commit to their community and ecosystem by locking liquidity permanently, thus providing stability and trust in the liquidity pool's longevity.

## How to Use the Cetus LP Burn SDK ?
#### Installation
To start using the Cetus LP Burn SDK, you need to first install it in your TypeScript project. You can add it to your project via npm, yarn or bun:

npm link: https://www.npmjs.com/package/@cetusprotocol/cetus-burn-sdk
```bash
npm install @cetusprotocol/cetus-burn-sdk
```
or 
```bash
bun install @cetusprotocol/cetus-burn-sdk
```

#### Setup
Import the SDK into your TypeScript file where you intend to use it:
```typescript
import { CetusBurnSDK } from '@cetusprotocol/cetus-burn-sdk';
```

#### Initializing the SDK
Initialize the SDK with the necessary configuration parameters. Typically, this involves setting up the network and API keys if required:
- **Mainnet**: 

```typescript
export const burn_mainnet: SdkOptions = {
  fullRpcUrl: 'https://sui-testnet-endpoint.blockvision.org',
  simulationAccount: {
    address: '0x...',
  },
  burn: {
    package_id: '0x12d73de9a6bc3cb658ec9dc0fe7de2662be1cea5c76c092fcc3606048cdbac27',
    published_at: '0xb92ae17938cde6d856ee39c686d4cfb968c94155e59e24520fbf60de38ebcd21',
    manager_id: '0x1d94aa32518d0cb00f9de6ed60d450c9a2090761f326752ffad06b2e9404f845',
    clmm_global_config: '0xdaa46292632c3c4d8f31f23ea0f9b36a28ff3677e9684980e4438403a67a3d8f',
    clmm_global_vault_id: '0xce7bceef26d3ad1f6d9b6f13a953f053e6ed3ca77907516481ce99ae8e588f2b',
    burn_pool_handle: '0xc9aacf74bd7cc8da8820ae28ca4473b7e01c87be19bc35bf81c9c7311e1b299e',
  }
}
const MainnetSDK = new CetusBurnSDK(burn_mainnet)
});
```

- **Testnet**: 

```typescript
export const burn_testnet: SdkOptions = {
  fullRpcUrl: 'https://sui-testnet-endpoint.blockvision.org',
  simulationAccount: {
    address: '0x...',
  },
  burn: {
   package_id: '0x3b494006831b046481c8046910106e2dfbe0d1fa9bc01e41783fb3ff6534ed3a',
    published_at: '0x3b494006831b046481c8046910106e2dfbe0d1fa9bc01e41783fb3ff6534ed3a',
    manager_id: '0xd04529ef15b7dad6699ee905daca0698858cab49724b2b2a1fc6b1ebc5e474ef',
    clmm_global_config: '0x9774e359588ead122af1c7e7f64e14ade261cfeecdb5d0eb4a5b3b4c8ab8bd3e',
    clmm_global_vault_id: '0xf78d2ee3c312f298882cb680695e5e8c81b1d441a646caccc058006c2851ddea',
    burn_pool_handle: "0x20262dac8853ab8f63c98e0b17bfb1c758efc33d0092ac3c5f204dfb7ba81ac5"
  }
}
const TestnetSDK = new CetusBurnSDK(burn_testnet)
});
```


## Function Description
### 1. getHaveBurnPoolList
This method retrieves a list of existing burn pools. It calls the sdk.Burn.getHaveBurnPoolList() method and prints the result.
```typescript
const poolIds = await sdk.Burn.getHaveBurnPoolList()

// result: 
poolIds: [
    '0x2dea79f17e61f8d02ff02ed755102836fd780049de2f57e3ca40db871295ce41',
    '0x6fd4915e6d8d3e2ba6d81787046eb948ae36fdfc75dad2e24f0d4aaa2417a416',
    '0xc41621d02d5ee00a7a993b912a8550df50524c9b2494339691e5896936ff269b',
    '0xaccdd1c40fdd6abf168def70044a565c89ff3ed61e7d32ad0387b2e82edb32a9',
    '0xc10e379b4658d455ee4b8656213c71561b1d0cd6c20a1403780d144d90262512',
    '0x1861771ab3b7f0f6a4252e1c60ed2705e2f7b28d64fe1ba7c12fe883cbebc362',
    '0x1b9b4f2271bc69df97ddafcb3f64599ca0de05cb94d5bb1386693559afdf1757',
    '0x473ab0306ff8952d473b10bb4c3516c632edeb0725f6bb3cda6c474d0ffc883f',
    '0x3a61bd98686e4aa6213fb5b3b5356459e6003bb1255447fabe5e1f6d42b6f8cd'
]
```

### 2. getBurnPositionList
This method fetches a list of burn positions for a specified account. It retrieves data using the sdk.Burn.getBurnPositionList(account) method.

```typescript
const walletAddress = '0x...'
const positionIds = await sdk.Burn.getBurnPositionList(walletAddress)
// result:
positionIds: [
    '0x1b9b4f2271bc69df97ddafcb3f64599ca0de05cb94d5bb1386693559afdf1757'
]
```

### 3. getBurnPositon
This method obtains detailed information about a specific burn position. It fetches data using the sdk.Burn.getBurnPositon(posId) method, where posId is the specified burn position ID, and prints the result.

```typescript
const posId = '0x...'
const positionInfo = await sdk.Burn.getBurnPositon(posId)

positionInfo: {
    id: '0x88678e4cd2681bf41b7f2afdd49c1583a1ca0ae8d6c8f5581bf1db1e021a1e48',
    url: 'https://bq7bkvdje7gvgmv66hrxdy7wx5h5ggtrrnmt66rdkkehb64rvz3q.arweave.net/DD4VVGknzVMyvvHjceP2v0_TGnGLWT96I1KIcPuRrnc',
    pool_id: '0xc41621d02d5ee00a7a993b912a8550df50524c9b2494339691e5896936ff269b',
    coinTypeA: '0x26b3bc67befc214058ca78ea9a2690298d731a2d4309485ec3d40198063c4abc::usdc::USDC',
    coinTypeB: '0x26b3bc67befc214058ca78ea9a2690298d731a2d4309485ec3d40198063c4abc::cetus::CETUS',
    description: 'Cetus Liquidity Position',
    name: 'Cetus Burned LP | Pool9-115',
    liquidity: '19387676',
    clmm_position_id: '0x092f07a470479f86927fe161a53074b725126337398ee01640d8ddd7bce7fa09',
    clmm_pool_id: '0xc41621d02d5ee00a7a993b912a8550df50524c9b2494339691e5896936ff269b',
    tick_lower_index: -443580,
    tick_upper_index: 443580,
    index: '115',
    is_lp_burn: true
}
```

### 4. burn lock
This method creates a transaction builder for a burn lock.
```typescript
const pool = '0xc41621d02d5ee00a7a993b912a8550df50524c9b2494339691e5896936ff269b'
const pos = '0x4e1970683fc49de834478339724509a051764e7f34d55b4dc4d2a37b7034669c' // is burn success
const coinTypeA = '26b3bc67befc214058ca78ea9a2690298d731a2d4309485ec3d40198063c4abc::usdc::USDC'
const coinTypeB = '26b3bc67befc214058ca78ea9a2690298d731a2d4309485ec3d40198063c4abc::cetus::CETUS'
const txb = await sdk.Burn.createBurnPayload({
    pool,
    pos,
    coinTypeA,
    coinTypeB
})

const simulateRes = await sdk.fullClient.devInspectTransactionBlock({
    transactionBlock: txb,
    sender: account,
})
```

### 5. claim
This method creates transaction builder for collecting fees.
```typescript
const pool = '0xc41621d02d5ee00a7a993b912a8550df50524c9b2494339691e5896936ff269b'
const pos = '0x2f10a5816747fd02218dd7a3a7d0417d287da55ccee5943eb5c94f5a6b552299' // is wrap pos id
const coinTypeA = '26b3bc67befc214058ca78ea9a2690298d731a2d4309485ec3d40198063c4abc::usdc::USDC'
const coinTypeB = '26b3bc67befc214058ca78ea9a2690298d731a2d4309485ec3d40198063c4abc::cetus::CETUS'

const rewarderCoinTypes = ['0x26b3bc67befc214058ca78ea9a2690298d731a2d4309485ec3d40198063c4abc::cetus::CETUS']
let txb = sdk.Burn.createCollectFeePaylaod({
    pool,
    pos,
    coinTypeA,
    coinTypeB,
    account
})

txb = sdk.Burn.crateCollectRewardPayload({
    pool,
    pos,
    coinTypeA,
    coinTypeB,
    rewarderCoinTypes,
    account
})

const simulateRes = await sdk.fullClient.devInspectTransactionBlock({
    transactionBlock: txb,
    sender: account,
    })
```


### 6. burn LP position
This method creates a transaction builder for a burning an LP position.
```typescript
const pos = '0x4e1970683fc49de834478339724509a051764e7f34d55b4dc4d2a37b7034669c' // is burn success
const txb = await sdk.Burn.createBurnLPV2Payload(pos)

const simulateRes = await sdk.fullClient.devInspectTransactionBlock({
    transactionBlock: txb,
    sender: account,
})
```


# More About Cetus

Use the following links to learn more about Cetus:

Learn more about working with Cetus in the [Cetus Documentation](https://cetus-1.gitbook.io/cetus-docs).

Join the Cetus community on [Cetus Discord](https://discord.com/channels/1009749448022315008/1009751382783447072).
