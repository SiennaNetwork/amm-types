export declare type Uint128 = string;
export declare type Address = string;
export declare type TokenType = CustomToken | NativeToken;
export declare type Decimal = string;
/**
 * Base64 encoded
 */
export declare type ViewingKey = string;
export declare class TokenPair {
    readonly token_0: TokenType;
    readonly token_1: TokenType;
    constructor(token_0: TokenType, token_1: TokenType);
}
export declare class TokenPairAmount {
    readonly pair: TokenPair;
    readonly amount_0: Uint128;
    readonly amount_1: Uint128;
    constructor(pair: TokenPair, amount_0: Uint128, amount_1: Uint128);
}
export declare class TokenTypeAmount {
    readonly token: TokenType;
    readonly amount: Uint128;
    constructor(token: TokenType, amount: Uint128);
}
export interface CustomToken {
    custom_token: {
        contract_addr: Address;
        token_code_hash: string;
    };
}
export interface NativeToken {
    native_token: {
        denom: string;
    };
}
export interface TokenInfo {
    name: string;
    symbol: string;
    decimals: number;
    total_supply?: Uint128 | undefined;
}
export interface Exchange {
    pair: TokenPair;
    address: Address;
}
export interface PairInfo {
    pair: TokenPair;
    liquidity_token: ContractInfo;
}
export declare class IdoInitConfig {
    /**
     * This is the token that will be used to buy our token.
     */
    readonly input_token: TokenType;
    /**
     * Check this to understand how the rate is set: https://github.com/SiennaNetwork/sienna-swap-amm/blob/b3dc9b21d8f6c11c32d9282ebc1ad5267aa1fa44/ido/src/contract.rs#L277
     */
    readonly rate: Uint128;
    readonly snip20_init_info: Snip20TokenInitInfo;
    constructor(
    /**
     * This is the token that will be used to buy our token.
     */
    input_token: TokenType, 
    /**
     * Check this to understand how the rate is set: https://github.com/SiennaNetwork/sienna-swap-amm/blob/b3dc9b21d8f6c11c32d9282ebc1ad5267aa1fa44/ido/src/contract.rs#L277
     */
    rate: Uint128, snip20_init_info: Snip20TokenInitInfo);
}
export declare class Snip20TokenInitInfo {
    /**
     * Must be between 3-200 chars length.
     */
    readonly name: string;
    /**
     * Must be between 3-12 chars length, letters only.
     */
    readonly symbol: string;
    /**
     * Must be a base64 encoded string. Otherwise, the tx will fail.
     */
    readonly prng_seed: string;
    /**
     * Max is 18
     */
    readonly decimals: number;
    readonly config?: Snip20InitConfig | null | undefined;
    constructor(
    /**
     * Must be between 3-200 chars length.
     */
    name: string, 
    /**
     * Must be between 3-12 chars length, letters only.
     */
    symbol: string, 
    /**
     * Must be a base64 encoded string. Otherwise, the tx will fail.
     */
    prng_seed: string, 
    /**
     * Max is 18
     */
    decimals: number, config?: Snip20InitConfig | null | undefined);
}
export declare class Snip20InitConfig {
    public_total_supply?: boolean | null;
}
export declare class Pagination {
    readonly start: number;
    /**
     * Max is 30.
     */
    readonly limit: number;
    constructor(start: number, 
    /**
     * Max is 30.
     */
    limit: number);
}
export declare enum TypeOfToken {
    Native = 0,
    Custom = 1
}
export declare function get_token_type(token: TokenType): TypeOfToken;
export interface Allowance {
    spender: Address;
    owner: Address;
    allowance: Uint128;
    expiration?: number | null;
}
export interface ExchangeRate {
    rate: Uint128;
    denom: string;
}
export interface RewardPool {
    lp_token: ContractInfo;
    /**
     * The reward amount allocated to this pool.
     */
    share: number;
    /**
     * Total amount locked by all participants.
     */
    size: number;
}
export interface RewardsAccount {
    /**
     * The address of the LP token that this account is for.
     */
    lp_token_addr: Address;
    /**
     * The owner of this account.
     */
    owner: Address;
    /**
     * The last time that the user claimed their rewards.
     */
    last_claimed: number;
    /**
     * The amount of LP tokens the owner has locked into this contract.
     */
    locked_amount: number;
}
export declare type ClaimError = {
    type: "pool_empty";
} | {
    type: "account_zero_locked";
} | {
    type: "account_zero_reward";
} | {
    /**
     * In Unix seconds.
     */
    time_to_wait: number;
    type: "early_claim";
};
export interface ClaimSimulationResult {
    total_rewards_amount: Uint128;
    actual_claimed: Uint128;
    results: ClaimResult[];
}
export interface ClaimResult {
    error?: ClaimError | null;
    lp_token_addr: Address;
    reward_amount: Uint128;
    success: boolean;
}
export declare class ContractInfo {
    readonly code_hash: string;
    readonly address: Address;
    constructor(code_hash: string, address: Address);
}
export declare class ContractInstantiationInfo {
    readonly code_hash: string;
    readonly id: number;
    constructor(code_hash: string, id: number);
}
