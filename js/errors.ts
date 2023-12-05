export const isUserRejectedTx = (e: any) => {
    return JSON.parse(JSON.stringify(e))?.['error']?.['code'] === 4001;
};

export const isFormValidationError = (e: any) => {
    return JSON.parse(JSON.stringify(e))?.status === 409;
};
