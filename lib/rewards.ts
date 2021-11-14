import {
  Address, Uint128, Uint256, Fee, create_fee, ContractInfo, ViewingKey, Moment, Duration
} from './core'

import { SmartContract } from './contract'

import { ExecuteResult, SigningCosmWasmClient, CosmWasmClient } from 'secretjs'

/**
 * Reward pool configuration
 */
export interface RewardsConfig {
  bonding?: number;
  lp_token?: ContractInfo;
  reward_token?: ContractInfo;
  reward_vk?: string;
  timekeeper?: Address;
};

export interface RewardsClock {
  /**
   * "For what point in time do the reported values hold true?" Got from env.block time on transactions, passed by client in queries.
   */
  now: Moment;
  /**
   * "What is the current reward epoch?" Incremented by external periodic call.
   */
  number: number;
  /**
   * "When did the epoch last increment?" Set to current time on epoch increment.
   */
  started: Moment;
  /**
   * "What was the total pool liquidity at the epoch start?" Set to `total.volume` on epoch increment.
   */
  volume: Uint256;
}

export interface RewardsTotal {
  clock: RewardsClock;
  /**
   * "How long must the user wait between claims?" Configured on init. Account bondings are reset to this value on claim.
   */
  bonding: Duration;
  /**
   * "What amount of rewards is currently available for users?" Queried from reward token.
   */
  budget: Uint128;
  /**
   * "Is this pool closed, and if so, when and why?" Set irreversibly via handle method.
   */
  closed?: [Moment, string];
  /**
   * "What rewards has everyone received so far?" Incremented on claim.
   */
  distributed: Uint128;
  /**
   * "What liquidity is there in the whole pool right now?" Incremented/decremented on lock/unlock.
   */
  staked: Uint128;
  /**
   * "what rewards were unlocked for this pool so far?" computed as balance + claimed.
   */
  unlocked: Uint128;
  /**
   * "When was the last time someone staked or unstaked tokens?" Set to current time on lock/unlock.
   */
  updated: Moment;
  /**
   * "What liquidity has this pool contained up to this point?" Before lock/unlock, if staked > 0, this is incremented by total.elapsed * total.staked
   */
  volume: Uint256;
}

/**
 * Account status
 */
export interface RewardsAccount {
  /**
   * "What is the overall state of the pool?" Passed at instantiation.
   */
  total: RewardsTotal;
  /**
   * How much has `total.unlocked` grown, i.e. how much rewards have been unlocked since this user entered? Multiply this by the reward share to compute earnings.
   */
  accumulated_pool_rewards: Uint128;
  /**
   * How much has `total.volume` grown, i.e. how much liquidity has accumulated in the pool since this user entered? Used as basis of reward share calculation.
   */
  accumulated_pool_volume: Uint256;
  /**
   * How many units of time remain until the user can claim? Decremented on update, reset to pool.bonding on claim.
   */
  bonding: Duration;
  /**
   * How much rewards has this user earned? Computed as user.reward_share * pool.unlocked
   */
  earned: Uint128;
  /**
   * "How much time has passed since the user updated their stake?" Computed as `current time - updated`
   */
  elapsed: Duration;
  /**
   * What portion of the pool is currently owned by this user? Computed as user.staked / pool.staked
   */
  pool_share: [Uint128, Uint128];
  /**
   * User-friendly reason why earned is 0
   */
  reason?: string | null;
  /**
   * What portion of all the liquidity accumulated since this user's entry is due to this particular user's stake? Computed as user.volume / pool.volume
   */
  reward_share: [Uint256, Uint256];
  /**
   * How much liquidity does this user currently provide? Incremented/decremented on lock/unlock.
   */
  staked: Uint128;
  /**
   * How much rewards were already unlocked when the user entered? Set to `total.unlocked` on initial deposit.
   */
  starting_pool_rewards: Uint128;
  /**
   * What was the volume of the pool when the user entered? Set to `total.volume` on initial deposit.
   */
  starting_pool_volume: Uint256;
  /**
   * "When did this user's liquidity amount last change?" Set to current time on update.
   */
  updated: Moment;
  /**
   * How much liquidity has this user provided since they first appeared? Incremented on update by staked * elapsed if staked > 0
   */
  volume: Uint256;
}

export class RewardsContract extends SmartContract {
    constructor(
        readonly address: Address,
        readonly signing_client: SigningCosmWasmClient,
        readonly client?: CosmWasmClient | undefined
    ) {
        super(address, signing_client, client)
    }

    async claim(fee?: Fee): Promise<ExecuteResult> {
        const msg = {
            rewards: {
                claim: { }
            }
        }

        if (fee === undefined) {
            fee = create_fee('300000')
        }

        return await this.signing_client.execute(this.address, msg, undefined, undefined, fee)
    }

    async deposit_tokens(amount: Uint128, fee?: Fee): Promise<ExecuteResult> {
        const msg = {
            rewards: {
                deposit: {
                    amount
                }
            }
        }

        if (fee === undefined) {
            fee = create_fee('280000')
        }

        return await this.signing_client.execute(this.address, msg, undefined, undefined, fee)
    }

    async withdraw_tokens(amount: Uint128, fee?: Fee): Promise<ExecuteResult> {
        const msg = {
            rewards: {
                withdraw: {
                    amount
                }
            }
        }

        if (fee === undefined) {
            fee = create_fee('260000')
        }

        return await this.signing_client.execute(this.address, msg, undefined, undefined, fee)
    }

    async get_pool(at: number): Promise<RewardsTotal> {
        const msg = {
            rewards: {
                pool_info: {
                    at
                }
            }
        }

        const result = await this.query_client().queryContractSmart(this.address, msg) as GetPoolResponse;
        return result.rewards.pool_info;
    }

    async get_account(
        address: Address,
        key: ViewingKey,
        at: number
    ): Promise<RewardsAccount> {
        const msg = {
            rewards: {
                user_info: {
                    address,
                    key,
                    at
                }
            }
        }

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
