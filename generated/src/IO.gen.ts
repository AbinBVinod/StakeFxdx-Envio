/* TypeScript file generated from IO.res by genType. */
/* eslint-disable import/first */


import type {EventSyncState_eventSyncState as DbFunctions_EventSyncState_eventSyncState} from './DbFunctions.gen';

import type {ethAddress as Ethers_ethAddress} from '../src/bindings/Ethers.gen';

import type {inMemoryStoreRow as Types_inMemoryStoreRow} from './Types.gen';

// tslint:disable-next-line:interface-over-type-literal
export type InMemoryStore_stringHasher<val> = (_1:val) => string;

// tslint:disable-next-line:interface-over-type-literal
export type InMemoryStore_storeState<entity,entityKey> = { readonly dict: {[id: string]: Types_inMemoryStoreRow<entity>}; readonly hasher: InMemoryStore_stringHasher<entityKey> };

// tslint:disable-next-line:interface-over-type-literal
export type InMemoryStore_EventSyncState_value = DbFunctions_EventSyncState_eventSyncState;

// tslint:disable-next-line:interface-over-type-literal
export type InMemoryStore_EventSyncState_key = number;

// tslint:disable-next-line:interface-over-type-literal
export type InMemoryStore_EventSyncState_t = InMemoryStore_storeState<InMemoryStore_EventSyncState_value,InMemoryStore_EventSyncState_key>;

// tslint:disable-next-line:interface-over-type-literal
export type InMemoryStore_rawEventsKey = { readonly chainId: number; readonly eventId: string };

// tslint:disable-next-line:interface-over-type-literal
export type InMemoryStore_RawEvents_t = InMemoryStore_storeState<InMemoryStore_RawEvents_value,InMemoryStore_RawEvents_key>;

// tslint:disable-next-line:interface-over-type-literal
export type InMemoryStore_dynamicContractRegistryKey = { readonly chainId: number; readonly contractAddress: Ethers_ethAddress };

// tslint:disable-next-line:interface-over-type-literal
export type InMemoryStore_DynamicContractRegistry_t = InMemoryStore_storeState<InMemoryStore_DynamicContractRegistry_value,InMemoryStore_DynamicContractRegistry_key>;

// tslint:disable-next-line:interface-over-type-literal
export type InMemoryStore_EventsSummary_t = InMemoryStore_storeState<InMemoryStore_EventsSummary_value,InMemoryStore_EventsSummary_key>;

// tslint:disable-next-line:interface-over-type-literal
export type InMemoryStore_RewardFxdxVault_AddReward_t = InMemoryStore_storeState<InMemoryStore_RewardFxdxVault_AddReward_value,InMemoryStore_RewardFxdxVault_AddReward_key>;

// tslint:disable-next-line:interface-over-type-literal
export type InMemoryStore_RewardFxdxVault_SendReward_t = InMemoryStore_storeState<InMemoryStore_RewardFxdxVault_SendReward_value,InMemoryStore_RewardFxdxVault_SendReward_key>;

// tslint:disable-next-line:interface-over-type-literal
export type InMemoryStore_RewardFxdxVault_TotalReserves_t = InMemoryStore_storeState<InMemoryStore_RewardFxdxVault_TotalReserves_value,InMemoryStore_RewardFxdxVault_TotalReserves_key>;

// tslint:disable-next-line:interface-over-type-literal
export type InMemoryStore_StakedFxdxVault_Stake_t = InMemoryStore_storeState<InMemoryStore_StakedFxdxVault_Stake_value,InMemoryStore_StakedFxdxVault_Stake_key>;

// tslint:disable-next-line:interface-over-type-literal
export type InMemoryStore_StakedFxdxVault_TotalReserves_t = InMemoryStore_storeState<InMemoryStore_StakedFxdxVault_TotalReserves_value,InMemoryStore_StakedFxdxVault_TotalReserves_key>;

// tslint:disable-next-line:interface-over-type-literal
export type InMemoryStore_StakedFxdxVault_Unstake_t = InMemoryStore_storeState<InMemoryStore_StakedFxdxVault_Unstake_value,InMemoryStore_StakedFxdxVault_Unstake_key>;

// tslint:disable-next-line:interface-over-type-literal
export type InMemoryStore_t = {
  readonly eventSyncState: InMemoryStore_EventSyncState_t; 
  readonly rawEvents: InMemoryStore_RawEvents_t; 
  readonly dynamicContractRegistry: InMemoryStore_DynamicContractRegistry_t; 
  readonly eventsSummary: InMemoryStore_EventsSummary_t; 
  readonly rewardFxdxVault_AddReward: InMemoryStore_RewardFxdxVault_AddReward_t; 
  readonly rewardFxdxVault_SendReward: InMemoryStore_RewardFxdxVault_SendReward_t; 
  readonly rewardFxdxVault_TotalReserves: InMemoryStore_RewardFxdxVault_TotalReserves_t; 
  readonly stakedFxdxVault_Stake: InMemoryStore_StakedFxdxVault_Stake_t; 
  readonly stakedFxdxVault_TotalReserves: InMemoryStore_StakedFxdxVault_TotalReserves_t; 
  readonly stakedFxdxVault_Unstake: InMemoryStore_StakedFxdxVault_Unstake_t
};
