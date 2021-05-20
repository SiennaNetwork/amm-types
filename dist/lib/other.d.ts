export interface Token {
    type: 'token';
    token: {
        contract_addr: string;
        token_code_hash: string;
        viewing_key: string;
    };
}
export interface NativeToken {
    type: 'native_token';
    native_token: {
        denom: string;
    };
}
