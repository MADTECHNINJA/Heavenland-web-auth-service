<template>
    <div class="flex justify-center py-1.5 items-center space-x-3 items-center text-center rounded-xl">
        <o-switch
            size="small"
            :value="modelValue"
            @change="$emit('update:modelValue', isSwitched)"
            v-model="isSwitched"
        />

        <p class="text-xs text-gray-300 tracking-tight">
            <slot />
        </p>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    const props = defineProps<{
        title?: string;
        modelValue: boolean;
    }>();

    const isSwitched = ref(false);
</script>

<style type="postcss">
    .o-switch__label {
        @apply text-sm;
    }
</style>
