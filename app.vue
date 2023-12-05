<template>
    <div ref="client" :class="{ connected: hasConnectedWallet }">
        <div class="z-50 bottom-3 fixed -right-[350px] w-full md:w-auto md:min-w-[350px]">
            <transition-group name="list-complete">
                <div class="list-complete-item" v-for="notification in NM.notifications" :key="notification.id">
                    <AppNotification :width="client.clientWidth" :notification="notification" />
                </div>
            </transition-group>
        </div>

        <main id="appMain" class="w-screen h-screen flex items-center justify-center">
            <div
                class="bg-gradient-to-r w-full py-3 max-w-xl flex flex-col from-indigo-920 items-center to-indigo-940 rounded-xl mt-3 mx-3"
            >
                <div class="w-full pt-3 pb-4">
                    <div class="flex justify-center mb-5">
                        <img class="h-[1.8rem]" :src="heavenauth" alt="Heavenauth" />
                    </div>

                    <Authentication />
                </div>
            </div>
        </main>
    </div>

    <div class="absolute bottom-0 text-center px-4 px-0 right-6 py-3">
        <p class="text-xs text-gray-400">© All right reserved 2022</p>
    </div>
</template>

<script lang="ts" setup>
    import heavenauth from '@/assets/logo/heavenauth.png';
    import { useAuthStore } from '~/store/auth';
    import { computed, onMounted, ref } from '#imports';
    import { NotificationManager } from '~/types/NotificationManager.types';
    import Authentication from '~/components/Authentication.vue';

    const NM = NotificationManager.getInstance();
    const client = ref(null);
    import { useWallet } from 'solana-wallets-vue';

    const { publicKey } = useWallet();

    const authStore = useAuthStore();

    const hasConnectedWallet = computed(() => {
        return publicKey.value;
    });

    onMounted(() => {
        authStore.storeToken();
    });
</script>

<style scoped></style>
