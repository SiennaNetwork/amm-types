import { Address, TokenPair, IdoInitConfig, Pagination, TokenPairAmount, Decimal, Uint128, ContractInfo, TokenInfo, ViewingKey, TokenTypeAmount, Exchange, Allowance, ExchangeRate, PairInfo, ClaimSimulationResult, RewardsAccount, RewardPool } from './types';
import { ExecuteResult, SigningCosmWasmClient, CosmWasmClient } from 'secretjs';
export interface Coin {
    readonly denom: string;
    readonly amount: string;
}
export interface Fee {
    readonly amount: ReadonlyArray<Coin>;
    readonly gas: Uint128;
}
export declare function create_fee(amount: Uint128, gas?: Uint128 | undefined): Fee;
export declare class SmartContract {
    readonly address: Address;
    readonly signing_client: SigningCosmWasmClient;
    readonly client?: CosmWasmClient | undefined;
    constructor(address: Address, signing_client: SigningCosmWasmClient, client?: CosmWasmClient | undefined);
    protected query_client(): CosmWasmClient | SigningCosmWasmClient;
}
export declare class FactoryContract extends SmartContract {
    readonly address: Address;
    readonly signing_client: SigningCosmWasmClient;
    readonly client?: CosmWasmClient | undefined;
    constructor(address: Address, signing_client: SigningCosmWasmClient, client?: CosmWasmClient | undefined);
    create_exchange(pair: TokenPair, fee?: Fee | undefined): Promise<ExecuteResult>;
    create_ido(info: IdoInitConfig, fee?: Fee | undefined): Promise<ExecuteResult>;
    get_exchange_address(pair: TokenPair): Promise<Address>;
    list_idos(pagination: Pagination): Promise<Address[]>;
    list_exchanges(pagination: Pagination): Promise<Exchange[]>;
}
export interface SwapSimulationResponse {
    return_amount: Uint128;
    spread_amount: Uint128;
    commission_amount: Uint128;
}
export declare class ExchangeContract extends SmartContract {
    readonly address: Address;
    readonly signing_client: SigningCosmWasmClient;
    readonly client?: CosmWasmClient | undefined;
    constructor(address: Address, signing_client: SigningCosmWasmClient, client?: CosmWasmClient | undefined);
    provide_liquidity(amount: TokenPairAmount, tolerance?: Decimal | null, fee?: Fee | undefined): Promise<ExecuteResult>;
    withdraw_liquidity(amount: Uint128, recipient: Address, fee?: Fee | undefined): Promise<ExecuteResult>;
    swap(amount: TokenTypeAmount, expected_return?: Decimal | null, fee?: Fee | undefined): Promise<ExecuteResult>;
    get_pair_info(): Promise<PairInfo>;
    get_factory_info(): Promise<ContractInfo>;
    get_pool(): Promise<TokenPairAmount>;
    simulate_swap(amount: TokenTypeAmount): Promise<SwapSimulationResponse>;
}
export declare class Snip20Contract extends SmartContract {
    readonly address: Address;
    readonly signing_client: SigningCosmWasmClient;
    readonly client?: CosmWasmClient | undefined;
    constructor(address: Address, signing_client: SigningCosmWasmClient, client?: CosmWasmClient | undefined);
    increase_allowance(spender: Address, amount: Uint128, expiration?: number | null, padding?: string | null, fee?: Fee | undefined): Promise<ExecuteResult>;
    get_allowance(owner: Address, spender: Address, key: ViewingKey): Promise<Allowance>;
    get_balance(address: Address, key: ViewingKey): Promise<Uint128>;
    get_token_info(): Promise<TokenInfo>;
    get_exchange_rate(): ExchangeRate;
    set_viewing_key(key: ViewingKey, padding?: string | null, fee?: Fee | undefined): Promise<ExecuteResult>;
    deposit(amount: Uint128, padding?: string | null, fee?: Fee | undefined): Promise<ExecuteResult>;
    transfer(recipient: Address, amount: Uint128, padding?: string | null, fee?: Fee | undefined): Promise<ExecuteResult>;
    mint(recipient: Address, amount: Uint128, padding?: string | null, fee?: Fee | undefined): Promise<ExecuteResult>;
}
export declare class RewardsContract extends SmartContract {
    readonly address: Address;
    readonly signing_client: SigningCosmWasmClient;
    readonly client?: CosmWasmClient | undefined;
    constructor(address: Address, signing_client: SigningCosmWasmClient, client?: CosmWasmClient | undefined);
    claim(lp_tokens: Address[], fee?: Fee | undefined): Promise<ExecuteResult>;
    claim_simulation(address: Address, viewing_key: ViewingKey, current_time_secs: number, lp_tokens: Address[]): Promise<ClaimSimulationResult>;
    lock_tokens(amount: Uint128, lp_token: Address, fee?: Fee | undefined): Promise<ExecuteResult>;
    retrieve_tokens(amount: Uint128, lp_token: Address, fee?: Fee | undefined): Promise<ExecuteResult>;
    get_pools(): Promise<RewardPool[]>;
    get_accounts(address: Address, lp_tokens: Address[], viewing_key: ViewingKey): Promise<RewardsAccount[]>;
}
