<template>
    <p :class="secondary ? 'text-xs text-gray-300' : 'text-sm text-gray-400 mb-2 tracking-tight'">{{ title }}</p>
</template>

<script lang="ts" setup>
    const props = defineProps<{
        title: string;
        secondary?: boolean;
    }>();
</script>

<style scoped></style>
