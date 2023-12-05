<template>
    <div class="px-6 py-5 bg-gradient-to-r from-indigo-930 bg-indigo-940 shadow rounded-lg flex space-x-5">
        <AppSpinner v-if="type === AlertType.LOADING" :size="5" />
        <FontAwesomeIcon v-else-if="icon" class="h-8 w-8 mt-3.5" :icon="[iconSet, icon]" :class="[iconColor]" />

        <div class="flex flex-col">
            <p class="font-bold text-lg tracking-tight">
                <slot v-if="$slots['title']" name="title" />
                <span v-else-if="type === AlertType.LOADING">Data loading...</span>
                <span v-else>Error!</span>
            </p>

            <p class="text-sm mt-1" :class="[type === AlertType.ERROR ? 'text-red-500' : 'text-gray-300']">
                <slot name="desc" />
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { AlertType } from '~/types/Alert.utils';
    import { computed } from 'vue';

    const props = withDefaults(
        defineProps<{
            iconSet?: string;
            icon?: string;
            type: AlertType;
        }>(),
        {
            iconSet: 'fas',
        }
    );

    const icon = computed(() => {
        switch (props.type) {
            case AlertType.INFO:
                return props.icon;

            default:
                return 'triangle-exclamation';
        }
    });

    const iconColor = computed(() => {
        switch (props.type) {
            case AlertType.ERROR:
                return 'text-red-600';

            default:
                return 'text-indigo-600';
        }
    });
</script>

<style scoped></style>
