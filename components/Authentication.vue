<template>
    <div>
        <LoadingState v-if="isVerificationPending" />
        <InvalidState v-else-if="!isCorrectAuthParams" />

        <div v-else class="px-12">
            <p class="text-sm text-gray-400 leading-6 mt-6 leading-6 text-center">
                In order to authenticate yourself<br />
                please verify your wallet by following the steps below.
            </p>

            <ol class="relative mt-9 border-l border-gray-700 flex justify-center flex-col w-full max-w-sm mx-auto">
                <li class="mb-6 last:mb-0 ml-5">
                    <div
                        class="absolute w-2 h-2 bg-gray-300 rounded-full mt-2 -left-1"
                        :class="[!isConnected ? 'bg-green-500' : 'bg-gray-300']"
                    />

                    <p
                        class="text-sm pt-1 leading-none font-semibold"
                        :class="[!isConnected ? 'text-green-500' : 'text-gray-300']"
                    >
                        1. Connect your wallet
                    </p>
                    <div class="flex text-sm flex-col space-y-3 mt-3">
                        <div class="flex">
                            <ConnectButton />
                        </div>
                    </div>
                </li>

                <li class="mb-6 last:mb-0 ml-5">
                    <div
                        class="absolute w-2 h-2 rounded-full mt-2 -left-1"
                        :class="[isConnected && !isRegistrationActive ? 'bg-green-500' : 'bg-gray-300']"
                    />

                    <p
                        class="text-sm pt-1 leading-none font-semibold"
                        :class="[isConnected && !isRegistrationActive ? 'text-green-500' : 'text-gray-300']"
                    >
                        2. {{ isHwWalletEnabled ? 'Sign transaction' : 'Sign message' }}
                    </p>

                    <div v-if="!isRegistrationActive">
                        <p class="text-xs pt-1 leading-5 leading-none text-gray-400 mt-2">
                            {{
                                isHwWalletEnabled
                                    ? 'Signed transaction is not sent to blockchain and only serves for ownership verification'
                                    : 'Message signed by your wallet only serves for ownership verification'
                            }}
                        </p>

                        <div class="w-full max-w-[185px] bg-white bg-opacity-[5%] rounded-full mt-2">
                            <AppSwitch v-model="isHwWalletEnabled"> Are you using Ledger? </AppSwitch>
                        </div>

                        <div class="flex text-sm flex-col space-y-3 mt-5">
                            <div class="flex">
                                <AppButton @click="sign" :loading="verifyButtonLoading" :disabled="!isConnected">
                                    Continue
                                </AppButton>
                            </div>
                        </div>
                    </div>
                </li>

                <li v-if="isRegistrationActive" class="mb-6 last:mb-0 ml-5">
                    <div
                        class="absolute w-2 h-2 rounded-full mt-2 -left-1"
                        :class="[isRegistrationActive ? 'bg-green-500' : 'bg-gray-300']"
                    />

                    <p
                        class="text-sm pt-1 leading-none font-semibold"
                        :class="[isRegistrationActive ? 'text-green-500' : 'text-gray-300']"
                    >
                        3. Registration
                    </p>

                    <div>
                        <div
                            class="flex text-xs pt-1 items-center space-x-1.5 leading-5 leading-none text-gray-400 mt-2 h-7"
                            @click="isReferralDisplayed = !isReferralDisplayed"
                        >
                            <span>Referral (optional)</span>
                            <FontAwesomeIcon
                                :icon="!isReferralDisplayed ? 'caret-down' : 'caret-up'"
                                :class="{ 'mt-0.5': isReferralDisplayed }"
                            />
                        </div>

                        <div v-if="isReferralDisplayed" class="referral-box mt-1">
                            <FormKit id="form_account_username" v-model="referral" />
                        </div>

                        <div class="w-full max-w-[230px] bg-white bg-opacity-[5%] rounded-full mt-3">
                            <AppSwitch v-model="isTermsAgreed">
                                I agree to
                                <a class="hyperlink" href="https://heavenland.io/HL-Referral.pdf" target="_blank"
                                    >Terms & Conditions</a
                                >
                            </AppSwitch>
                        </div>

                        <div class="flex text-sm flex-col space-y-3 mt-5">
                            <div class="flex">
                                <AppButton
                                    @click="processSign"
                                    :loading="verifyButtonLoading"
                                    :disabled="!isTermsAgreed"
                                >
                                    Sign up
                                </AppButton>
                            </div>
                        </div>
                    </div>
                </li>
            </ol>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, useAuth, useQueryRoute } from '#imports';
    import { API } from '~/api';
    import { Variant } from '~/types/Notification.types';
    import { NotificationManager } from '~/types/NotificationManager.types';
    import { NotificationTitles } from '~/types/Notification.data';
    import { logger } from '~/plugins/logger.client';
    import { isUserRejectedTx } from '~/js/errors';
    import { Notification } from '~/types/Notification.types';
    import { signMessage } from '~/js/metaplex/utils';
    import InvalidState from '~/components/InvalidState.vue';
    import LoadingState from '~/components/LoadingState.vue';
    import * as web3 from '@solana/web3.js';
    import { useWallet } from 'solana-wallets-vue';
    import { Solana } from '~/js/solana';
    import { SignRequest } from '~/types/Wov.types';
    import { onMounted, reactive, watch } from 'vue';
    import { useCookie } from '#app';

    const MEMO_PROGRAM_ID = new web3.PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');

    const { redirectTo, isCorrectAuthParams, refCode } = useQueryRoute();
    const { isConnected, walletPk, isVerificationPending } = useAuth();
    const verifyButtonLoading = ref(false);
    const isHwWalletEnabled = ref(false);
    const isTermsAgreed = ref(false);

    const { publicKey, signTransaction } = useWallet();

    const referralCookie = useCookie('hl-auth-rc');
    const isRegistrationActive = ref(false);
    const isReferralDisplayed = ref(false);
    const referral = ref('');

    const _buildAuthTx = (nonce: string) => {
        const tx = new web3.Transaction();

        tx.add(
            new web3.TransactionInstruction({
                programId: MEMO_PROGRAM_ID,
                keys: [],
                data: Buffer.from(nonce, 'utf8'),
            })
        );

        return tx;
    };

    onMounted(() => {
        if (referralCookie.value) {
            referral.value = referralCookie.value;
        } else if (!referralCookie.value && refCode.value) {
            referralCookie.value = refCode.value;
            referral.value = refCode.value;
        }
    });

    watch(publicKey, () => {
        if (!publicKey.value) {
            isRegistrationActive.value = false;
        }
    });

    const signature = ref('');
    let signRequestResponse = reactive<SignRequest>(null);

    const checkAccountExistence = async () => {
        if (!isConnected.value) {
            throw new Error('not defined: wallet.publicKey');
        }

        await signWallet();

        const response = await API.AccountService.checkAccountExistence({
            identifier: 'solana-account-address:' + publicKey.value?.toBase58(),
            signRequestId: signRequestResponse.id,
            signatureAsJsonArray: signature.value,
        });

        return response.exists;
    };

    const signWallet = async () => {
        signRequestResponse = await API.WovService.getSignRequests('authentication');

        logger.info('[VERIFY] signRequestResponse', signRequestResponse);

        if (isHwWalletEnabled.value) {
            const tx = _buildAuthTx(signRequestResponse.rawMessage);
            tx.feePayer = publicKey.value ?? undefined;
            tx.recentBlockhash = await Solana.getInstance().getLatestBlockhash();

            const signedTx = await signTransaction.value?.(tx);

            if (!signedTx) {
                new Error('tx: not signed');
                return;
            }

            signature.value = '[' + Array.from(signedTx.serialize()) + ']';
        } else {
            const signedTx = await signMessage(signRequestResponse.rawMessage);
            signature.value = '[' + Array.from(signedTx).toString() + ']';
        }
    };

    const sign = async () => {
        verifyButtonLoading.value = true;

        const notification = createVerificationNotification();

        try {
            const isAccountExisting = await checkAccountExistence();

            if (isAccountExisting) {
                await processSign(notification);
            } else {
                verifyButtonLoading.value = false;
                isRegistrationActive.value = true;
            }
        } catch (e) {
            if (isUserRejectedTx(e)) {
                notification.setError('User rejected the transaction');
            } else {
                notification.setError('Transaction execution failed');
            }

            verifyButtonLoading.value = false;
        }
    };

    const createVerificationNotification = () => {
        return NotificationManager.getInstance().create({
            title: NotificationTitles.WALLET_VERIFIED,
            message: 'Verifying your wallet...',
            variant: Variant.LOADING,
        });
    };

    const processSign = async (n?: Notification) => {
        let notification: Notification;

        try {
            logger.info('[VERIFY] sign method invoked');

            verifyButtonLoading.value = true;

            if (isConnected.value) {
                new Error('not defined: wallet.publicKey');
            }

            if (signature.value === '' || signRequestResponse === null) {
                new Error('not defined: signature or signRequestResponse');
            }

            notification = n ?? createVerificationNotification();

            logger.info('[VERIFY] txSig', signature);
            logger.info('[VERIFY] loginRequest', {
                clientType: 'browser',
                signRequestId: signRequestResponse.id,
                publicKey: walletPk.value.toBase58(),
                type: 'signature',
                signatureAsJsonArray: signature,
            });

            const loginResponse = await API.AuthService.loginWithSignature({
                referralCode: refCode.value,
                continue: redirectTo.value,
                clientType: 'browser',
                signRequestId: signRequestResponse.id,
                publicKey: walletPk.value.toBase58(),
                type: 'signature',
                signatureAsJsonArray: signature.value,
            });

            logger.info('[VERIFY] loginResponse', loginResponse);

            const form = document.createElement('form');
            document.body.appendChild(form);
            form.method = loginResponse.method;
            form.action = loginResponse.redirectUrl;
            form.submit();

            notification.setSuccess('Transaction verification successful');
        } catch (e) {
            logger.info('[VERIFY] Sign error', e);

            if (isUserRejectedTx(e)) {
                notification.setError('User rejected the transaction');
            } else {
                notification.setError('Transaction execution failed');
            }

            verifyButtonLoading.value = false;
        }
    };
</script>

<style lang="postcss">
    .referral-box .formkit-input {
        @apply h-8 w-32 text-xs px-3 text-gray-300;
    }
</style>
