import { defineNuxtPlugin } from '#app';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import specific icons */
import {
    faBars as fasBars,
    faCaretDown,
    faCaretUp,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faCircleCheck,
    faCircleX,
    faSignOutAlt,
    faTimes,
    faTriangleExclamation,
    faWallet,
} from '@fortawesome/pro-solid-svg-icons';

import { faKey, faCheckCircle, faTimesCircle, faUserCircle } from '@fortawesome/pro-regular-svg-icons';

import { faGrid2 } from '@fortawesome/pro-duotone-svg-icons';

export default defineNuxtPlugin((nuxtApp) => {
    library.add(
        faKey,
        faTriangleExclamation,
        faCheckCircle,
        faTimesCircle,
        fasBars,
        faGrid2,
        faCircleX,
        faCircleCheck,
        faChevronRight,
        faChevronLeft,
        faTimes,
        faSignOutAlt,
        faWallet,
        faCaretDown,
        faCaretUp
    );

    // @ts-ignore
    nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon);
});
