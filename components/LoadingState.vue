<template>
    <div class="w-full bg-indigo-920 w-full py-3 max-w-xl flex flex-col items-center mt-6">
        <AppSpinner :size="5" />

        <div class="text-base font-semibold text-gray-300 mt-2 text-center">
            <p>Please wait...</p>
        </div>
    </div>

    <p class="text-sm text-gray-400 mt-6 text-center px-6">User verification is in progress.</p>
</template>

<script lang="ts" setup></script>

<style scoped></style>
