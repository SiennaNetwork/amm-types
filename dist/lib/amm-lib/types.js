"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractInstantiationInfo = exports.ContractInfo = exports.get_token_type = exports.TypeOfToken = exports.Pagination = exports.Snip20InitConfig = exports.Snip20TokenInitInfo = exports.IdoInitConfig = exports.TokenTypeAmount = exports.TokenPairAmount = exports.TokenPair = void 0;
var TokenPair = /** @class */ (function () {
    function TokenPair(token_0, token_1) {
        this.token_0 = token_0;
        this.token_1 = token_1;
    }
    return TokenPair;
}());
exports.TokenPair = TokenPair;
var TokenPairAmount = /** @class */ (function () {
    function TokenPairAmount(pair, amount_0, amount_1) {
        this.pair = pair;
        this.amount_0 = amount_0;
        this.amount_1 = amount_1;
    }
    return TokenPairAmount;
}());
exports.TokenPairAmount = TokenPairAmount;
var TokenTypeAmount = /** @class */ (function () {
    function TokenTypeAmount(token, amount) {
        this.token = token;
        this.amount = amount;
    }
    return TokenTypeAmount;
}());
exports.TokenTypeAmount = TokenTypeAmount;
var IdoInitConfig = /** @class */ (function () {
    function IdoInitConfig(
    /**
     * This is the token that will be used to buy our token.
     */
    input_token, 
    /**
     * Check this to understand how the rate is set: https://github.com/SiennaNetwork/sienna-swap-amm/blob/b3dc9b21d8f6c11c32d9282ebc1ad5267aa1fa44/ido/src/contract.rs#L277
     */
    rate, snip20_init_info) {
        this.input_token = input_token;
        this.rate = rate;
        this.snip20_init_info = snip20_init_info;
    }
    return IdoInitConfig;
}());
exports.IdoInitConfig = IdoInitConfig;
var Snip20TokenInitInfo = /** @class */ (function () {
    function Snip20TokenInitInfo(
    /**
     * Must be between 3-200 chars length.
     */
    name, 
    /**
     * Must be between 3-12 chars length, letters only.
     */
    symbol, 
    /**
     * Must be a base64 encoded string. Otherwise, the tx will fail.
     */
    prng_seed, 
    /**
     * Max is 18
     */
    decimals, config) {
        this.name = name;
        this.symbol = symbol;
        this.prng_seed = prng_seed;
        this.decimals = decimals;
        this.config = config;
    }
    return Snip20TokenInitInfo;
}());
exports.Snip20TokenInitInfo = Snip20TokenInitInfo;
var Snip20InitConfig = /** @class */ (function () {
    function Snip20InitConfig() {
    }
    return Snip20InitConfig;
}());
exports.Snip20InitConfig = Snip20InitConfig;
var Pagination = /** @class */ (function () {
    function Pagination(start, 
    /**
     * Max is 30.
     */
    limit) {
        this.start = start;
        this.limit = limit;
    }
    return Pagination;
}());
exports.Pagination = Pagination;
var TypeOfToken;
(function (TypeOfToken) {
    TypeOfToken[TypeOfToken["Native"] = 0] = "Native";
    TypeOfToken[TypeOfToken["Custom"] = 1] = "Custom";
})(TypeOfToken = exports.TypeOfToken || (exports.TypeOfToken = {}));
function get_token_type(token) {
    var raw = token;
    if (raw.hasOwnProperty('native_token')) {
        return TypeOfToken.Native;
    }
    return TypeOfToken.Custom;
}
exports.get_token_type = get_token_type;
var ContractInfo = /** @class */ (function () {
    function ContractInfo(code_hash, address) {
        this.code_hash = code_hash;
        this.address = address;
    }
    return ContractInfo;
}());
exports.ContractInfo = ContractInfo;
var ContractInstantiationInfo = /** @class */ (function () {
    function ContractInstantiationInfo(code_hash, id) {
        this.code_hash = code_hash;
        this.id = id;
    }
    return ContractInstantiationInfo;
}());
exports.ContractInstantiationInfo = ContractInstantiationInfo;
//# sourceMappingURL=types.js.map