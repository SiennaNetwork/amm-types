import { NativeToken as UINativeToken, Token } from '../other';
import { TokenType } from "./types";
export declare function asset_to_token_type(asset: UINativeToken | Token): TokenType;
export declare function token_type_to_asset(type: TokenType): UINativeToken | Token;
