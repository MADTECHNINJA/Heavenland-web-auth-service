<template>
    <div class="w-full bg-red-600 bg-opacity-20 w-full py-3 max-w-xl flex flex-col items-center mt-6">
        <FontAwesomeIcon icon="exclamation-triangle" class="text-red-500 h-7 w-7" />

        <div class="text-sm font-semibold text-red-500 mt-2 text-center">
            <p>Invalid state</p>
        </div>
    </div>

    <p class="text-sm text-gray-400 mt-6 text-center px-6">Client must be specified in order to be authenticated.</p>
</template>

<script lang="ts" setup></script>

<style scoped></style>
