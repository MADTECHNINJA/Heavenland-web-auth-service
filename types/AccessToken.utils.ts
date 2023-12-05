import decode from 'jwt-decode';

export const JWTDecode = function (token) {
    return decode(token);
};
