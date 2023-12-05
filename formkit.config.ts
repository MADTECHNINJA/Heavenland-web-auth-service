// formkit.config.ts
import { DefaultConfigOptions } from '@formkit/vue';

const greaterThan = ({ value }, min = 0) => {
    return Number(value) > Number(min);
};

const containsUppercase = ({ value }) => {
    return value !== value.toLowerCase();
};

const containsNumber = ({ value }) => {
    return /\d/.test(value);
};

const config: DefaultConfigOptions = {
    rules: {
        greaterThan,
        containsUppercase,
        containsNumber,
    },
};

export default config;
