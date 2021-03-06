import {
    Address, Uint128, Uint256, Fee,
    create_fee, ContractInfo, ViewingKey
} from './core'

import { SmartContract } from './contract'

import { ExecuteResult, SigningCosmWasmClient, CosmWasmClient } from 'secretjs'

export type Moment = number;
export type Duration = number;

/**
 * Reward pool configuration
 */
export interface RewardsConfig {
  lp_token?:     ContractInfo;
  reward_token?: ContractInfo;
  reward_vk?:    string;
  bonding?:      number;
  timekeeper?:   Address;
};

export interface RewardsClock {
  /** "For what point in time do the reported values hold true?" */
  now: Moment;
  /** "What is the current reward epoch?" */
  number: number;
  /** "When did the epoch last increment?" */
  started: Moment;
  /** "What was the total pool liquidity at the epoch start?" */
  volume: Uint256;
}

export interface RewardsTotal {
  /** What is the current time and epoch? */
  clock: RewardsClock;
  /** When was the last time someone staked or unstaked tokens?" */
  updated: Moment;
  /** What liquidity is there in the whole pool right now? */
  staked: Uint128;
  /** What liquidity has this pool contained up to this point? */
  volume: Uint256;
  /** What amount of rewards is currently available for users? */
  budget: Uint128;
  /** What rewards has everyone received so far? */
  distributed: Uint128;
  /** What rewards were unlocked for this pool so far? */
  unlocked: Uint128;
  /** How long must the user wait between claims? */
  bonding: Duration;
  /** Is this pool closed, and if so, when and why? */
  closed?: [Moment, string];
}

/** Account status */
export interface RewardsAccount {
  /** What is the overall state of the pool? */
  total: RewardsTotal;
  /** "When did this user's liquidity amount last change?" Set to current time on update. */
  updated: Moment;
  /** How much time has passed since the user updated their stake? */
  elapsed: Duration;
  /** How much liquidity does this user currently provide? */
  staked: Uint128;
  /** What portion of the pool is currently owned by this user? */
  pool_share: [Uint128, Uint128];
  /** How much liquidity has this user provided since they first appeared? */
  volume: Uint256;
  /** What was the volume of the pool when the user entered? */
  starting_pool_volume: Uint256;
  /** How much liquidity has accumulated in the pool since this user entered? */
  accumulated_pool_volume: Uint256;
  /** What portion of all liquidity accumulated since this user's entry is from this user?  */
  reward_share: [Uint256, Uint256];
  /** How much rewards were already unlocked when the user entered? */
  starting_pool_rewards: Uint128;
  /** How much rewards have been unlocked since this user entered? */
  accumulated_pool_rewards: Uint128;
  /** How much rewards has this user earned? */
  earned: Uint128;
  /** How many units of time (seconds) remain until the user can claim? */
  bonding: Duration;
}

export class RewardsContract extends SmartContract {
    constructor(
        readonly address: Address,
        readonly signing_client: SigningCosmWasmClient,
        readonly client?: CosmWasmClient | undefined
    ) {
        super(address, signing_client, client)
    }

    async claim(
        fee: Fee = create_fee('300000')
    ): Promise<ExecuteResult> {
        const msg = { rewards: { claim: { } } }
        return await this.signing_client.execute(this.address, msg, undefined, undefined, fee)
    }

    async deposit_tokens(
        amount: Uint128,
        fee:    Fee = create_fee('280000')
    ): Promise<ExecuteResult> {
        const msg = { rewards: { deposit: { amount } } }
        return await this.signing_client.execute(this.address, msg, undefined, undefined, fee)
    }

    async withdraw_tokens(
        amount: Uint128,
        fee:    Fee = create_fee('260000')
    ): Promise<ExecuteResult> {
        const msg = { rewards: { withdraw: { amount } } }
        return await this.signing_client.execute(this.address, msg, undefined, undefined, fee)
    }

    async get_pool(
        at: number
    ): Promise<RewardsTotal> {
        const msg = { rewards: { pool_info: { at } } }
        const result = await this.query_client().queryContractSmart(this.address, msg) as GetPoolResponse;
        return result.rewards.pool_info;
    }

    async get_account(
        address: Address,
        key:     ViewingKey,
        at:      number
    ): Promise<RewardsAccount> {
        const msg = { rewards: { user_info: { address, key, at } } }
        const result = await this.query_client().queryContractSmart(this.address, msg) as GetAccountResponse;
        return result.rewards.user_info;
    }
}

interface GetAccountResponse {
    rewards: { user_info: RewardsAccount; }
}

interface GetPoolResponse {
    rewards: { pool_info: RewardsTotal; };
}
