export const enum Path {
    AUTH = 'auth',
    WOV = 'wov',
    IDM = 'idm',
}

export const SubPath = {
    AUTH: {
        ACCESS_TOKEN: 'tokens/access-token',
        GAME_AUTH_TOKEN: 'tokens/game-auth-token',
        LOGIN: 'login',
    },
    WOV: {
        SIGN_REQUESTS: 'sign-requests',
    },
    IDM: {
        CHECK_ACCOUNT_EXISTENCE: 'accounts/check-account-existence',
    },
};
