<script setup lang="ts">
import { computed } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import InputField from '@/Components/InputField.vue';
import Button from '@/Components/Button.vue';

const props = defineProps<{
    email: string;
    token: string;
}>();

const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
});

const hasMinLength = computed(() => form.password.length >= 8);
const hasSpecial = computed(() => /[^A-Za-z0-9]/.test(form.password));

const submit = () => {
    form.post(route('password.store'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <Head title="Set new password" />

    <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4">
        <!-- Background grid -->
        <div
            aria-hidden="true"
            class="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,#EAECF0_1px,transparent_1px),linear-gradient(to_bottom,#EAECF0_1px,transparent_1px)] [background-size:80px_80px] opacity-50 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_70%)]"
        />

        <div class="relative z-10 flex w-full max-w-[360px] flex-col items-center text-center">
            <!-- Lock icon -->
            <div
                class="flex size-14 items-center justify-center rounded-uui-xl border border-gray-200 shadow-uui-xs"
            >
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-gray-700"
                >
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
            </div>

            <h1 class="mt-6 text-display-sm-semibold text-gray-900">
                Set new password
            </h1>
            <p class="mt-3 text-md-regular text-gray-600">
                Your new password must be different to previously used passwords.
            </p>

            <form class="mt-8 flex w-full flex-col gap-5 text-left" @submit.prevent="submit">
                <InputField
                    v-model="form.password"
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                    :destructive="!!form.errors.password"
                    :hint="form.errors.password"
                />

                <InputField
                    v-model="form.password_confirmation"
                    type="password"
                    label="Confirm password"
                    placeholder="••••••••"
                    :destructive="!!form.errors.password_confirmation"
                    :hint="form.errors.password_confirmation"
                />

                <ul class="flex flex-col gap-2">
                    <li class="flex items-center gap-2 text-sm-regular text-gray-600">
                        <span
                            :class="[
                                'flex size-5 items-center justify-center rounded-full',
                                hasMinLength ? 'bg-success-500 text-white' : 'bg-gray-200 text-gray-400',
                            ]"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </span>
                        Must be at least 8 characters
                    </li>
                    <li class="flex items-center gap-2 text-sm-regular text-gray-600">
                        <span
                            :class="[
                                'flex size-5 items-center justify-center rounded-full',
                                hasSpecial ? 'bg-success-500 text-white' : 'bg-gray-200 text-gray-400',
                            ]"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </span>
                        Must contain one special character
                    </li>
                </ul>

                <Button
                    type="submit"
                    hierarchy="primary"
                    size="lg"
                    :disabled="form.processing"
                    class="w-full justify-center"
                >
                    Reset password
                </Button>
            </form>

            <Link
                :href="route('login')"
                class="mt-8 inline-flex items-center gap-2 text-sm-semibold text-gray-600 hover:text-gray-900"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m12 19-7-7 7-7" />
                    <path d="M19 12H5" />
                </svg>
                Back to log in
            </Link>
        </div>
    </div>
</template>
