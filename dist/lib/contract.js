"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardsContract = exports.Snip20Contract = exports.ExchangeContract = exports.FactoryContract = exports.SmartContract = exports.create_fee = void 0;
const types_1 = require("./types");
function create_coin(amount) {
    return {
        denom: 'uscrt',
        amount
    };
}
function create_fee(amount, gas) {
    if (gas === undefined) {
        gas = amount;
    }
    return {
        amount: [{ amount, denom: "uscrt" }],
        gas,
    };
}
exports.create_fee = create_fee;
class SmartContract {
    constructor(address, signing_client, client) {
        this.address = address;
        this.signing_client = signing_client;
        this.client = client;
    }
    query_client() {
        if (this.client !== undefined) {
            return this.client;
        }
        return this.signing_client;
    }
}
exports.SmartContract = SmartContract;
class FactoryContract extends SmartContract {
    constructor(address, signing_client, client) {
        super(address, signing_client, client);
        this.address = address;
        this.signing_client = signing_client;
        this.client = client;
    }
    create_exchange(pair, fee) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = {
                create_exchange: {
                    pair
                }
            };
            if (fee === undefined) {
                fee = create_fee('700000');
            }
            return yield this.signing_client.execute(this.address, msg, undefined, undefined, fee);
        });
    }
    create_ido(info, fee) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = {
                create_ido: {
                    info
                }
            };
            if (fee === undefined) {
                fee = create_fee('200000');
            }
            return yield this.signing_client.execute(this.address, msg, undefined, undefined, fee);
        });
    }
    get_exchange_address(pair) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = {
                get_exchange_address: {
                    pair
                }
            };
            const result = yield this.query_client().queryContractSmart(this.address, msg);
            return result.get_exchange_address.address;
        });
    }
    list_idos(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = {
                list_idos: {
                    pagination
                }
            };
            const result = yield this.query_client().queryContractSmart(this.address, msg);
            return result.list_idos.idos;
        });
    }
    list_exchanges(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = {
                list_exchanges: {
                    pagination
                }
            };
            const result = yield this.query_client().queryContractSmart(this.address, msg);
            return result.list_exchanges.exchanges;
        });
    }
}
exports.FactoryContract = FactoryContract;
class ExchangeContract extends SmartContract {
    constructor(address, signing_client, client) {
        super(address, signing_client, client);
        this.address = address;
        this.signing_client = signing_client;
        this.client = client;
    }
    provide_liquidity(amount, tolerance, fee) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = {
                add_liquidity: {
                    deposit: amount,
                    slippage_tolerance: tolerance
                }
            };
            if (fee === undefined) {
                fee = create_fee('3000000');
            }
            const transfer = add_native_balance_pair(amount);
            return yield this.signing_client.execute(this.address, msg, undefined, transfer, fee);
        });
    }
    withdraw_liquidity(amount, recipient, fee) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = {
                remove_liquidity: {
                    amount,
                    recipient
                }
            };
            if (fee === undefined) {
                fee = create_fee('2500000');
            }
            return yield this.signing_client.execute(this.address, msg, undefined, undefined, fee);
        });
    }
    swap(amount, expected_return, fee) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = {
                swap: {
                    offer: amount,
                    expected_return
                }
            };
            if (fee === undefined) {
                fee = create_fee('2400000');
            }
            const transfer = add_native_balance(amount);
            return yield this.signing_client.execute(this.address, msg, undefined, transfer, fee);
        });
    }
    get_pair_info() {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = 'pair_info'; //yeah...
            const result = yield this.query_client().queryContractSmart(this.address, msg);
            return result.pair_info;
        });
    }
    get_factory_info() {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = 'factory_info';
            const result = yield this.query_client().queryContractSmart(this.address, msg);
            return result.factory_info;
        });
    }
    get_pool() {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = 'pool';
            const result = yield this.query_client().queryContractSmart(this.address, msg);
            return result.pool;
        });
    }
    simulate_swap(amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = {
                swap_simulation: {
                    offer: amount
                }
            };
            return yield this.query_client().queryContractSmart(this.address, msg);
        });
    }
}
exports.ExchangeContract = ExchangeContract;
class Snip20Contract extends SmartContract {
    constructor(address, signing_client, client) {
        super(address, signing_client, client);
        this.address = address;
        this.signing_client = signing_client;
        this.client = client;
    }
    increase_allowance(spender, amount, expiration, padding, fee) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = {
                increase_allowance: {
                    spender,
                    amount,
                    expiration,
                    padding
                }
            };
            if (fee === undefined) {
                fee = create_fee('200000');
            }
            return yield this.signing_client.execute(this.address, msg, undefined, undefined, fee);
        });
    }
    get_allowance(owner, spender, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = {
                allowance: {
                    owner,
                    spender,
                    key
                }
            };
            const result = yield this.query_client().queryContractSmart(this.address, msg);
            return result.allowance;
        });
    }
    get_balance(address, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = {
                balance: {
                    address,
                    key
                }
            };
            const result = yield this.query_client().queryContractSmart(this.address, msg);
            return result.balance.amount;
        });
    }
    get_token_info() {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = {
                token_info: {}
            };
            const result = yield this.query_client().queryContractSmart(this.address, msg);
            return result;
        });
    }
    get_exchange_rate() {
        /*
        const msg = {
            exchange_rate: { }
        }

        const result = await this.client.queryContractSmart(this.address, msg)
        return result as GetExchangeRateResponse
        */
        // This is hardcoded in the contract
        return {
            rate: "1",
            denom: "uscrt"
        };
    }
    set_viewing_key(key, padding, fee) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = {
                set_viewing_key: {
                    key,
                    padding
                }
            };
            if (fee === undefined) {
                fee = create_fee('200000');
            }
            return yield this.signing_client.execute(this.address, msg, undefined, undefined, fee);
        });
    }
    deposit(amount, padding, fee) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = {
                deposit: {
                    padding
                }
            };
            if (fee === undefined) {
                fee = create_fee('200000');
            }
            const transfer = [create_coin(amount)];
            return yield this.signing_client.execute(this.address, msg, undefined, transfer, fee);
        });
    }
    transfer(recipient, amount, padding, fee) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = {
                transfer: {
                    recipient,
                    amount,
                    padding
                }
            };
            if (fee === undefined) {
                fee = create_fee('200000');
            }
            return yield this.signing_client.execute(this.address, msg, undefined, undefined, fee);
        });
    }
    mint(recipient, amount, padding, fee) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = {
                mint: {
                    recipient,
                    amount,
                    padding
                }
            };
            if (fee === undefined) {
                fee = create_fee('200000');
            }
            return yield this.signing_client.execute(this.address, msg, undefined, undefined, fee);
        });
    }
}
exports.Snip20Contract = Snip20Contract;
class RewardsContract extends SmartContract {
    constructor(address, signing_client, client) {
        super(address, signing_client, client);
        this.address = address;
        this.signing_client = signing_client;
        this.client = client;
    }
    claim(lp_tokens, fee) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = {
                claim: {
                    lp_tokens
                }
            };
            if (fee === undefined) {
                fee = create_fee('200000');
            }
            return yield this.signing_client.execute(this.address, msg, undefined, undefined, fee);
        });
    }
    claim_simulation(address, viewing_key, current_time_secs, lp_tokens) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = {
                claim_simulation: {
                    address,
                    current_time: current_time_secs,
                    lp_tokens,
                    viewing_key
                }
            };
            let result = yield this.query_client().queryContractSmart(this.address, msg);
            return result.claim_simulation;
        });
    }
    lock_tokens(amount, lp_token, fee) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = {
                lock_tokens: {
                    amount,
                    lp_token
                }
            };
            if (fee === undefined) {
                fee = create_fee('200000');
            }
            return yield this.signing_client.execute(this.address, msg, undefined, undefined, fee);
        });
    }
    retrieve_tokens(amount, lp_token, fee) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = {
                retrieve_tokens: {
                    amount,
                    lp_token
                }
            };
            if (fee === undefined) {
                fee = create_fee('200000');
            }
            return yield this.signing_client.execute(this.address, msg, undefined, undefined, fee);
        });
    }
    get_pools() {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = 'pools';
            let result = yield this.query_client().queryContractSmart(this.address, msg);
            return result.pools;
        });
    }
    get_accounts(address, lp_tokens, viewing_key) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = {
                accounts: {
                    address,
                    lp_tokens,
                    viewing_key
                }
            };
            let result = yield this.query_client().queryContractSmart(this.address, msg);
            return result.accounts;
        });
    }
}
exports.RewardsContract = RewardsContract;
function add_native_balance_pair(amount) {
    let result = [];
    if (types_1.get_token_type(amount.pair.token_0) == types_1.TypeOfToken.Native) {
        result.push({
            denom: 'uscrt',
            amount: amount.amount_0
        });
    }
    else if (types_1.get_token_type(amount.pair.token_1) == types_1.TypeOfToken.Native) {
        result.push({
            denom: 'uscrt',
            amount: amount.amount_1
        });
    }
    else {
        result = undefined;
    }
    return result;
}
function add_native_balance(amount) {
    let result = [];
    if (types_1.get_token_type(amount.token) == types_1.TypeOfToken.Native) {
        result.push({
            denom: 'uscrt',
            amount: amount.amount
        });
    }
    else {
        result = undefined;
    }
    return result;
}
