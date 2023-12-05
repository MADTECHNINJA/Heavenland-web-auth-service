<template>
    <h1 class="font-bold tracking-tight" :class="['text-' + size]">
        <slot />
    </h1>
</template>

<script lang="ts" setup>
    withDefaults(
        defineProps<{
            size?: string;
        }>(),
        {
            size: 'md',
        }
    );
</script>

<style scoped></style>
