"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.token_type_to_asset = exports.asset_to_token_type = void 0;
const types_1 = require("./types");
function asset_to_token_type(asset) {
    if ('token' in asset) {
        return {
            custom_token: {
                contract_addr: asset.token.contract_addr,
                token_code_hash: asset.token.token_code_hash
            }
        };
    }
    return {
        native_token: {
            denom: asset.native_token.denom
        }
    };
}
exports.asset_to_token_type = asset_to_token_type;
function token_type_to_asset(type) {
    if (types_1.get_token_type(type) === types_1.TypeOfToken.Native) {
        const denom = type;
        return {
            type: 'native_token',
            native_token: {
                denom: denom.native_token.denom
            }
        };
    }
    else {
        const tokenObj = type;
        return {
            type: 'token',
            token: {
                contract_addr: tokenObj.custom_token.contract_addr,
                token_code_hash: tokenObj.custom_token.token_code_hash,
                viewing_key: ''
            }
        };
    }
}
exports.token_type_to_asset = token_type_to_asset;
