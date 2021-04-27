import { NativeToken as UINativeToken, Token } from '../other'
import { TokenType, get_token_type, TypeOfToken, NativeToken as SNativeToken, CustomToken as SCustomToken } from "./types"

export function asset_to_token_type(asset: UINativeToken | Token): TokenType {
    if ('token' in asset) {
        return {
            custom_token: {
                contract_addr: asset.token.contract_addr,
                token_code_hash: asset.token.token_code_hash
            }
        }
    }

    return {
        native_token: {
            denom: asset.native_token.denom
        }
    }
}


export function token_type_to_asset(type: TokenType): UINativeToken | Token {
    if (get_token_type(type) === TypeOfToken.Native) {
        const denom = type as SNativeToken

        return {
            type: 'native_token',
            native_token: {
                denom: denom.native_token.denom
            }
        }
    } else {
        const tokenObj = type as SCustomToken

        return {
            type: 'token',
            token: {
                contract_addr: tokenObj.custom_token.contract_addr,
                token_code_hash: tokenObj.custom_token.token_code_hash,
                viewing_key: ''
            }
        }
    }
}



