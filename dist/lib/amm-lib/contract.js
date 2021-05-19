"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardsContract = exports.Snip20Contract = exports.ExchangeContract = exports.FactoryContract = exports.SmartContract = exports.create_fee = void 0;
var types_1 = require("./types");
function create_coin(amount) {
    return {
        denom: 'uscrt',
        amount: amount
    };
}
function create_fee(amount, gas) {
    if (gas === undefined) {
        gas = amount;
    }
    return {
        amount: [{ amount: amount, denom: "uscrt" }],
        gas: gas,
    };
}
exports.create_fee = create_fee;
var SmartContract = /** @class */ (function () {
    function SmartContract(address, signing_client, client) {
        this.address = address;
        this.signing_client = signing_client;
        this.client = client;
    }
    SmartContract.prototype.query_client = function () {
        if (this.client !== undefined) {
            return this.client;
        }
        return this.signing_client;
    };
    return SmartContract;
}());
exports.SmartContract = SmartContract;
var FactoryContract = /** @class */ (function (_super) {
    __extends(FactoryContract, _super);
    function FactoryContract(address, signing_client, client) {
        var _this = _super.call(this, address, signing_client, client) || this;
        _this.address = address;
        _this.signing_client = signing_client;
        _this.client = client;
        return _this;
    }
    FactoryContract.prototype.create_exchange = function (pair, fee) {
        return __awaiter(this, void 0, void 0, function () {
            var msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            create_exchange: {
                                pair: pair
                            }
                        };
                        if (fee === undefined) {
                            fee = create_fee('700000');
                        }
                        return [4 /*yield*/, this.signing_client.execute(this.address, msg, undefined, undefined, fee)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FactoryContract.prototype.create_ido = function (info, fee) {
        return __awaiter(this, void 0, void 0, function () {
            var msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            create_ido: {
                                info: info
                            }
                        };
                        if (fee === undefined) {
                            fee = create_fee('200000');
                        }
                        return [4 /*yield*/, this.signing_client.execute(this.address, msg, undefined, undefined, fee)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FactoryContract.prototype.get_exchange_address = function (pair) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            get_exchange_address: {
                                pair: pair
                            }
                        };
                        return [4 /*yield*/, this.query_client().queryContractSmart(this.address, msg)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.get_exchange_address.address];
                }
            });
        });
    };
    FactoryContract.prototype.list_idos = function (pagination) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            list_idos: {
                                pagination: pagination
                            }
                        };
                        return [4 /*yield*/, this.query_client().queryContractSmart(this.address, msg)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.list_idos.idos];
                }
            });
        });
    };
    FactoryContract.prototype.list_exchanges = function (pagination) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            list_exchanges: {
                                pagination: pagination
                            }
                        };
                        return [4 /*yield*/, this.query_client().queryContractSmart(this.address, msg)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.list_exchanges.exchanges];
                }
            });
        });
    };
    return FactoryContract;
}(SmartContract));
exports.FactoryContract = FactoryContract;
var ExchangeContract = /** @class */ (function (_super) {
    __extends(ExchangeContract, _super);
    function ExchangeContract(address, signing_client, client) {
        var _this = _super.call(this, address, signing_client, client) || this;
        _this.address = address;
        _this.signing_client = signing_client;
        _this.client = client;
        return _this;
    }
    ExchangeContract.prototype.provide_liquidity = function (amount, tolerance, fee) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, transfer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            add_liquidity: {
                                deposit: amount,
                                slippage_tolerance: tolerance
                            }
                        };
                        if (fee === undefined) {
                            fee = create_fee('3000000');
                        }
                        transfer = add_native_balance_pair(amount);
                        return [4 /*yield*/, this.signing_client.execute(this.address, msg, undefined, transfer, fee)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ExchangeContract.prototype.withdraw_liquidity = function (amount, recipient, fee) {
        return __awaiter(this, void 0, void 0, function () {
            var msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            remove_liquidity: {
                                amount: amount,
                                recipient: recipient
                            }
                        };
                        if (fee === undefined) {
                            fee = create_fee('2500000');
                        }
                        return [4 /*yield*/, this.signing_client.execute(this.address, msg, undefined, undefined, fee)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ExchangeContract.prototype.swap = function (amount, expected_return, fee) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, transfer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            swap: {
                                offer: amount,
                                expected_return: expected_return
                            }
                        };
                        if (fee === undefined) {
                            fee = create_fee('2400000');
                        }
                        transfer = add_native_balance(amount);
                        return [4 /*yield*/, this.signing_client.execute(this.address, msg, undefined, transfer, fee)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ExchangeContract.prototype.get_pair_info = function () {
        return __awaiter(this, void 0, void 0, function () {
            var msg, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = 'pair_info' //yeah...
                        ;
                        return [4 /*yield*/, this.query_client().queryContractSmart(this.address, msg)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.pair_info];
                }
            });
        });
    };
    ExchangeContract.prototype.get_factory_info = function () {
        return __awaiter(this, void 0, void 0, function () {
            var msg, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = 'factory_info';
                        return [4 /*yield*/, this.query_client().queryContractSmart(this.address, msg)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.factory_info];
                }
            });
        });
    };
    ExchangeContract.prototype.get_pool = function () {
        return __awaiter(this, void 0, void 0, function () {
            var msg, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = 'pool';
                        return [4 /*yield*/, this.query_client().queryContractSmart(this.address, msg)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.pool];
                }
            });
        });
    };
    ExchangeContract.prototype.simulate_swap = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            swap_simulation: {
                                offer: amount
                            }
                        };
                        return [4 /*yield*/, this.query_client().queryContractSmart(this.address, msg)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ExchangeContract;
}(SmartContract));
exports.ExchangeContract = ExchangeContract;
var Snip20Contract = /** @class */ (function (_super) {
    __extends(Snip20Contract, _super);
    function Snip20Contract(address, signing_client, client) {
        var _this = _super.call(this, address, signing_client, client) || this;
        _this.address = address;
        _this.signing_client = signing_client;
        _this.client = client;
        return _this;
    }
    Snip20Contract.prototype.increase_allowance = function (spender, amount, expiration, padding, fee) {
        return __awaiter(this, void 0, void 0, function () {
            var msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            increase_allowance: {
                                spender: spender,
                                amount: amount,
                                expiration: expiration,
                                padding: padding
                            }
                        };
                        if (fee === undefined) {
                            fee = create_fee('200000');
                        }
                        return [4 /*yield*/, this.signing_client.execute(this.address, msg, undefined, undefined, fee)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Snip20Contract.prototype.get_allowance = function (owner, spender, key) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            allowance: {
                                owner: owner,
                                spender: spender,
                                key: key
                            }
                        };
                        return [4 /*yield*/, this.query_client().queryContractSmart(this.address, msg)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.allowance];
                }
            });
        });
    };
    Snip20Contract.prototype.get_balance = function (address, key) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            balance: {
                                address: address,
                                key: key
                            }
                        };
                        return [4 /*yield*/, this.query_client().queryContractSmart(this.address, msg)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.balance.amount];
                }
            });
        });
    };
    Snip20Contract.prototype.get_token_info = function () {
        return __awaiter(this, void 0, void 0, function () {
            var msg, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            token_info: {}
                        };
                        return [4 /*yield*/, this.query_client().queryContractSmart(this.address, msg)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Snip20Contract.prototype.get_exchange_rate = function () {
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
    };
    Snip20Contract.prototype.set_viewing_key = function (key, padding, fee) {
        return __awaiter(this, void 0, void 0, function () {
            var msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            set_viewing_key: {
                                key: key,
                                padding: padding
                            }
                        };
                        if (fee === undefined) {
                            fee = create_fee('200000');
                        }
                        return [4 /*yield*/, this.signing_client.execute(this.address, msg, undefined, undefined, fee)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Snip20Contract.prototype.deposit = function (amount, padding, fee) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, transfer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            deposit: {
                                padding: padding
                            }
                        };
                        if (fee === undefined) {
                            fee = create_fee('200000');
                        }
                        transfer = [create_coin(amount)];
                        return [4 /*yield*/, this.signing_client.execute(this.address, msg, undefined, transfer, fee)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Snip20Contract.prototype.transfer = function (recipient, amount, padding, fee) {
        return __awaiter(this, void 0, void 0, function () {
            var msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            transfer: {
                                recipient: recipient,
                                amount: amount,
                                padding: padding
                            }
                        };
                        if (fee === undefined) {
                            fee = create_fee('200000');
                        }
                        return [4 /*yield*/, this.signing_client.execute(this.address, msg, undefined, undefined, fee)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Snip20Contract.prototype.mint = function (recipient, amount, padding, fee) {
        return __awaiter(this, void 0, void 0, function () {
            var msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            mint: {
                                recipient: recipient,
                                amount: amount,
                                padding: padding
                            }
                        };
                        if (fee === undefined) {
                            fee = create_fee('200000');
                        }
                        return [4 /*yield*/, this.signing_client.execute(this.address, msg, undefined, undefined, fee)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Snip20Contract;
}(SmartContract));
exports.Snip20Contract = Snip20Contract;
var RewardsContract = /** @class */ (function (_super) {
    __extends(RewardsContract, _super);
    function RewardsContract(address, signing_client, client) {
        var _this = _super.call(this, address, signing_client, client) || this;
        _this.address = address;
        _this.signing_client = signing_client;
        _this.client = client;
        return _this;
    }
    RewardsContract.prototype.claim = function (lp_tokens, fee) {
        return __awaiter(this, void 0, void 0, function () {
            var msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            claim: {
                                lp_tokens: lp_tokens
                            }
                        };
                        if (fee === undefined) {
                            fee = create_fee('200000');
                        }
                        return [4 /*yield*/, this.signing_client.execute(this.address, msg, undefined, undefined, fee)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RewardsContract.prototype.claim_simulation = function (address, viewing_key, current_time_secs, lp_tokens) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            claim_simulation: {
                                address: address,
                                current_time: current_time_secs,
                                lp_tokens: lp_tokens,
                                viewing_key: viewing_key
                            }
                        };
                        return [4 /*yield*/, this.query_client().queryContractSmart(this.address, msg)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.claim_simulation];
                }
            });
        });
    };
    RewardsContract.prototype.lock_tokens = function (amount, lp_token, fee) {
        return __awaiter(this, void 0, void 0, function () {
            var msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            lock_tokens: {
                                amount: amount,
                                lp_token: lp_token
                            }
                        };
                        if (fee === undefined) {
                            fee = create_fee('200000');
                        }
                        return [4 /*yield*/, this.signing_client.execute(this.address, msg, undefined, undefined, fee)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RewardsContract.prototype.retrieve_tokens = function (amount, lp_token, fee) {
        return __awaiter(this, void 0, void 0, function () {
            var msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            retrieve_tokens: {
                                amount: amount,
                                lp_token: lp_token
                            }
                        };
                        if (fee === undefined) {
                            fee = create_fee('200000');
                        }
                        return [4 /*yield*/, this.signing_client.execute(this.address, msg, undefined, undefined, fee)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return RewardsContract;
}(SmartContract));
exports.RewardsContract = RewardsContract;
function add_native_balance_pair(amount) {
    var result = [];
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
    var result = [];
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
//# sourceMappingURL=contract.js.map