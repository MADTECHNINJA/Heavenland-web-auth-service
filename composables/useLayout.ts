import { useRoute } from '#app';
import { computed } from 'vue';
import useBreakpoints from '~/composables/useBreakpoints';

export const useSidebarLayout = () => {
    const route = useRoute();
    const { breakpoints } = useBreakpoints();

    const isCollapsed = computed(() => {
        return (
            (route.path.includes('/collections') &&
                route.path !== '/collections' &&
                route.path !== '/account/collections') ||
            breakpoints.is !== 'xl'
        );
    });

    const isHidden = computed(() => {
        return route.path.includes('/account');
    });

    return {
        isCollapsed,
        isHidden,
    };
};
